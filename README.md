# ws-net-control

### server
[![Dependency Status](https://www.versioneye.com/user/projects/583c5313d2fd57003fdfbe6f/badge.svg?style=flat)]

ws-net-control is client-server project for controlling devices over network

It's based on:

	* [tasker-server](https://github.com/nemanjan00/tasker-server)

	* [tasker-client](https://github.com/nemanjan00/tasker-client)

## API

API is similar to tasker-server and tasker-client

### Sending events

Request example:

POST /

```javascript
{
	"action":"nextSong", //action you want to do (can't begin with _)
	"key":"laptop" //client selector, it must be unique or it won't be registered
}
```

Response example:

```javascript
{
	"status":"ok", //event sent
}
```

## Contributors

[Uros Spasojevic] (https://github.com/uspasojevic96) - [uspasojevic96@gmail.com] (uspasojevic96@gmail.com)

[Nemanja Nedeljkovic] (https://github.com/nemanjan00) - [nemanjan00@gmail.com] (nemanjan00@gmail.com)
