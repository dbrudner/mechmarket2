const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	switches: String,
	size: String,
	layout: String,
	custom: Boolean,
	description: String,
	sold: Boolean,
	condition: String,
	imgs: Array,
	plate: String,
	askingPrice: Number,
	keycaps: String,
	timeStampVerified: { type: Boolean, default: false, required: true },
	upvotes: {
		type: Number,
		default: 0,
		required: true
	},
	created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Keyboard", keyboardSchema);
