/**
 * Created by amr on 3/29/16.
 */

var SocketCollection = function(){

    var _self = this;
    var _sockets = [];

    _self.addSocketDetails = function(socketModel){
        _sockets[socketModel.getKey()] = socketModel;
    };

    _self.getSocketDetails = function (key) {
        return _sockets[key];
    }
};

exports.createCollection = function(){

   return new SocketCollection();
};
