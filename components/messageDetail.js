/**
 * Created by amr on 3/29/16.
 */

var MessageDetails = function(){

    var _self = this;
    var _senderId = -1;
    var _receiverId = -1;
    var _message = -1;

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

    _self.serializeToJSON = function(){

        return {
            'senderId' : _self.getSenderId(),
            'receiverId' : _self.getReceiverId(),
            'message' : _self.getMessage()
        }
    };

    _self.buildFromJson = function(messageData){
        _self.setSenderId(messageData.senderId);
        _self.setReceiverId(messageData.receiverId);
        _self.setMessage(messageData.message);
    }
};

exports.buildMessageDetails = function(messageData){
    var messageDetails = new MessageDetails();
    messageDetails.buildFromJson(messageData);

    return messageDetails;

};
