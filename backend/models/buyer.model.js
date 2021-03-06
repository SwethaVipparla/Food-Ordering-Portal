const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	number: {
		type: Number,
		required: true
	},
	password: {	
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
