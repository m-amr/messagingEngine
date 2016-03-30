var socketCollectionFactory = require('../components/socketCollection');
var socketDetailsFactory = require('../components/socketDetails');
var messageDetailsBuilder = require('../components/messageDetail');

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
            var messageDetails = _self.getMessageDetails(message);
            _self.registerSocket(socket.id, messageDetails.getSenderId());
        });

        socket.on(MESSAGING_EVENT, function (message) {
            var messageDetails = _self.getMessageDetails(message);
            _self.sendMessage(messageDetails);
        });
    };

    _self.registerSocket = function(socketId, userId){
        var socketDetails = socketDetailsFactory.createSocketDetails();
        socketDetails.setSocketId(socketId);
        socketDetails.setKey(userId);
        _socketCollection.addSocketDetails(socketDetails);
    };

    _self.getMessageDetails = function(message){
        return messageDetailsBuilder.buildMessageDetails(message);
    };

    _self.sendMessage = function(messageDetails){
        var receiverSocketDetails= _socketCollection.getSocketDetails(messageDetails.getReceiverId());
        var receiverSocketId = receiverSocketDetails.getSocketId();
        var socket = _io.sockets.connected[receiverSocketId];
        _self.sendToSocket(socket, messageDetails);
    };

    _self.sendToSocket = function(socket, messageDetails){
        socket.emit(MESSAGING_EVENT, messageDetails.serializeToJSON());
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