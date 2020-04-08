const MessengerHelper = require('./MessengerHelper');
const API = require('./API');
var nodemailer = require('nodemailer');

// Add code to implement the tasks here.

exports.receivedMessage = function (user, messagingEvent) {
    const psid = messagingEvent.sender.id;
    console.log(`Text message received from ${psid}`);
    console.log(messagingEvent);
    var callback = function (name, msg) {
        // console.log("Sending message");
        MessengerHelper.sendMessageText(psid, `Hello Mr. ${user.last_name},\nThanks for responding to us. We are currently busy but would respond to your following message later:\n${this.msg}`);
        // console.log("Message sent");
    }
    API.getUser(psid, callback.bind({ "msg": messagingEvent.message.text }));
}

exports.receivedPostback = function (user, messagingEvent) {
    const psid = messagingEvent.sender.id;
    console.log(`Postback received from ${psid}`);
    console.log(messagingEvent);
};

exports.receivedReferral = function (user, messagingEvent) {
    const psid = messagingEvent.sender.id;
    console.log(`Referral received from ${psid}`);
    console.log(messagingEvent);
};
