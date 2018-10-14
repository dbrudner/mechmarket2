const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	senderId: String, //populate
	receiverId: String, //populate
	timeSent: Date,
	timeRead: Date,
	read: Boolean,
	message: String
});

module.exports = mongoose.model("Message", messageSchema);
