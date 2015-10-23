
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

	};

	main();
}).call(this);

