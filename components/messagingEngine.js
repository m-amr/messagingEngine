var socketCollectionFactory = require('../components/socketCollection');
var socketModelFactory = require('../components/socketModel');
var messageModelFactory = require('../components/messageModel');

var MessagingEngine = function () {
    var _self = this;
    var _io = null;
    var _socketCollection = socketCollectionFactory.createCollection();

    var CONNECTION_EVENT = 'connection';
    var MESSAGING_EVENT = 'messaging_event';
    var AUTHENTICATION_EVENT = 'authentication_event';

    _self.init = function (io) {
        _io = io;
        _self.listenToConnection();
    };

    _self.listenToConnection = function () {
        _io.on(CONNECTION_EVENT, function (socket) {
            _self.listenToMessaging(socket);
        });
    };

    _self.listenToMessaging = function(socket){

        socket.on(AUTHENTICATION_EVENT, function(message){
            var messageModel = _self.getMessageModel(message);
            _self.registerSocket(socket.id, messageModel.getSenderId());
        });

        socket.on(MESSAGING_EVENT, function (message) {
            var messageModel = _self.getMessageModel(message);
            _self.sendMessage(messageModel);
        });
    };

    _self.registerSocket = function(socketId, userId){
        var socketModel = socketModelFactory.createSocketModel();
        socketModel.setSocketId(socketId);
        socketModel.setKey(userId);
        _socketCollection.addSocket(socketModel);
    };

    _self.getMessageModel = function(message){
        return messageModelFactory.createMessageModel(message);
    };

    _self.sendMessage = function(messageModel){
        var receiverSocketModel= _socketCollection.getSocket(messageModel.getReceiverId());
        var receiverSocketId = receiverSocketModel.getSocketId();
        var socket = sockets.connected[receiverSocketId];
        _self.sendToSocket(socket, messageModel);
    };

    _self.sendToSocket = function(socket, messageModel){
        socket.emit(MESSAGING_EVENT, messageModel.getJSON());
    }
};

/**
 *
 * @param httpServer
 * @returns {MessagingEngine}
 */
exports.createApplication = function(httpServer){

    var socketIO = require('socket.io');
    var io = socketIO(httpServer);

    var messagingEngine = new MessagingEngine();
    messagingEngine.init(io);

    return MessagingEngine;
};