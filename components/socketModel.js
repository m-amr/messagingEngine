/**
 * Created by amr on 3/29/16.
 */

var SocketModel = function(){

    var _self = this;
    var _socketId = -1;
    var _key;

    _self.setSocketId = function(socketId){
        _socketId = socketId;
    };

    _self.getSocketId = function () {
        return _socketId;
    };

    _self.setKey = function(key){
        _key = key;
    }

    _self.getKey = function(){
        return _key;
    };

    _self.getJSON = function(){
        return {
            'socketId': _self.getSocketId(),
            'key' : _self.getKey()
        }
    }
};

exports.createSocketModel = function(){

    var socketModel = new SocketModel();
    return socketModel;
};
