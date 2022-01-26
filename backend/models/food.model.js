const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    price: {
		type: Number,
		required: true,
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
    opening_time: {
        type: String,
        required: true
    },
    closing_time: {
        type: String,
        required: true
    },
	password: {	
		type: String,
		required: true
	}
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
