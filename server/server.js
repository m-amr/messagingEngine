/**
 * Created by amr on 3/28/16.
 */

var express = require('express');
var app = express();

var http = require('http');
var httpServer = http.Server(app);

var messagingEngine = require('../components/messagingEngine');
var messagingApplication = messagingEngine.createApplication(httpServer);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

httpServer.listen(3000, function(){
    console.log('listening on *:3000');
});


