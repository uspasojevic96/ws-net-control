const exec =  require('child_process').exec;

var client = require('./index')({
	GATE: 'ws://localhost:3000/gate',
	KEY: 'laptop'
});

client.onMessage(function(message) {
	if(message.action == "unsubscribe") {
		console.log("unsubbing");
	}
});
