// Init express

var express = require('express');
var app = express();

app.set("port", process.env.PORT || 3000);

// Parse JSON Body

var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Add websocket support

var expressWs = require('express-ws')(app);

// Subscriptions

var subscriptions = {};
var keys = [];

// Gate for client

app.ws('/gate', function(ws, req) {
	ws.on('message', function(msg) {
		msg = JSON.parse(msg);

		if(msg.message == "subscribe") {
			if(subscriptions[msg.key] == undefined) {
				subscriptions[msg.key] = ws;
				keys = Object.keys(subscriptions);
				subscriptions[msg.key].send(JSON.stringify({action: "unsubscribe"}));
				console.log("added and sent");
			}
		}

		if(msg.message == "unsubscribe") {
			if(keys.indexOf(msg.key) != -1) {
				subscriptions[msg.key].close();
				delete subscriptions[msg.key];
				keys = Object.keys(subscriptions);
				console.log("deleted");
			}
		}
	});
});

// Gate for Tasker

app.post('/', function (req, res) {
	var key = req.body.key;

	var sentTo = [];

	keys.forEach(function(key){
		if(subscriptions[key] == undefined){
			subscriptions[key] = [];
		}

		subscriptions[key] = subscriptions[key].filter(function (ws){
			try{
				if(sentTo.indexOf(ws) == -1){
					ws.send(JSON.stringify(req.body));

					sentTo.push(ws);
				}
				else
				{
					ws.send(JSON.stringify({action: "_ping"}));
				}

				return true;
			} catch(e){
				return false;
			}
		});
	});

	res.send({status: "ok", sentTo: sentTo.length});
});

// Listen

app.listen(app.get("port"), function () {
	console.log('ws-net-control is listening on '+app.get("port")+"!");
});

