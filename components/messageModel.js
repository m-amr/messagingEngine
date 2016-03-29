/**
 * Created by amr on 3/29/16.
 */

var MessageModel = function(){

    _self = this;
    _senderId = -1;
    _receiverId = -1;
    _message = -1;

    _self.setSenderId = function(senderId){
        _senderId = senderId;
    };

    _self.getSenderId = function(){
        return _senderId;
    };

    _self.setReceiverId = function(receiverId){
        _receiverId = receiverId;
    };

    _self.getReceiverId = function(){
        return _receiverId;
    };

    _self.setMessage = function(message){
        _message = message;
    };

    _self.getMessage = function(){
        return _message;
    };

    _self.getJSON = function(){

        return {
            'senderId' : _self.getSenderId(),
            'receiverId' : _self.getReceiverId(),
            'message' : _self.getMessage()
        }
    };
};

exports.createMessageModel = function(messageData){
    var messageModel = new MessageModel();
    messageModel.setSenderId(messageData.senderId);
    messageModel.setReceiverId(messageData.receiverId);
    messageModel.setMessage(messageData.message);

    return messageModel;

};
