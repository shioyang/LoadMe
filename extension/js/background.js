
(function() {
	main = function() {
		this.logDebug = function(msg) {
			console.log("[background] " + msg);
		};

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
			console.log(data);
		});

	};

	main();
}).call(this);

