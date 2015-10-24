
(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

		this.changedFilenames = [];
		var t = this;

		var socket = io('http://localhost:8888');
		socket.on('connect', function() {
			console.log("connect!");
		});
		socket.on('greeting', function(data) {
			console.log(data);
		});
		socket.on('disconnect', function() {
			console.log("disconnect!");
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

		chrome.webRequest.onBeforeSendHeaders.addListener(
			function(details) {
				if (details.url && details.url.includes("google")) {
					console.log("===");
					console.log(details.url);
					console.log(details.requestHeaders);
					var found = false;
					details.requestHeaders.forEach(function(header, index) {
						console.log(header);
						if (header.name && header.name === "Cache-Control") {
							found = true;
							header.value = "no-cache";
						}
					}, t);
					if (!found)
						details.requestHeaders.push({name: "Cache-Control", value: "no-cache"});
					console.log(details.requestHeaders);
				}
				return {requestHeaders: details.requestHeaders};
			},
			{urls: ["<all_urls>"]},
			["requestHeaders"]
		);

	};

	main();
}).call(this);

