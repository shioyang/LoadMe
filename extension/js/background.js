
(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

		this.changedFilenames = [];
		var t = this;

		this.rewriteHeader = function(details) {
			if (details.url && details.url.includes("google")) {
				console.log("===");
				console.log(details.url);
				console.log(details.requestHeaders);
				var foundCacheControl = false;
				var foundPragma = false;
				details.requestHeaders.forEach(function(header, index) {
					console.log(header);
					if (header.name && header.name === "Cache-Control") {
						foundCacheControl = true;
						header.value = "no-cache";
					}
					if (header.name && header.name === "Pragma") {
						foundPragma = true;
						header.value = "no-cache";
					}
				}, t);
				if (!foundCacheControl)
					details.requestHeaders.push({name: "Cache-Control", value: "no-cache"});
				if (!foundPragma)
					details.requestHeaders.push({name: "Pragma", value: "no-cache"});
				console.log(details.requestHeaders);
			}
			return {requestHeaders: details.requestHeaders};
		};

		var socket = io('http://localhost:8888');
		socket.on('connect', function() {
			console.log("connect!");
			chrome.webRequest.onBeforeSendHeaders.addListener(
				t.rewriteHeader,
				{urls: ["*://www.google.co.jp/images/*"]},
//				{urls: ["<all_urls>"]},
				["requestHeaders"]
			);
		});

		socket.on('greeting', function(data) {
			console.log(data);
		});
		socket.on('disconnect', function() {
			console.log("disconnect!");
			chrome.webRequest.onBeforeSendHeaders.removeListener( t.rewriteHeader );
		});

		// when 'changed' received:
		socket.on('changed', function(data) {
			t.logDebug(data);
			// ChangedInfo
			//    {
			//       filenames: [
			//          "sample.txt"
			//       ]
			//    }
			var changedInfo = JSON.parse(data);
			var filenames = changedInfo.filenames;
			filenames.forEach(function(filename, index) {
				// Add the filename if not exist in changedFilenames
				if (this.changedFilenames.indexOf(filename) < 0)
					this.changedFilenames.push(filename);
				this.logDebug(this.changedFilenames);
			}, t);
		});

	};

	main();
}).call(this);

