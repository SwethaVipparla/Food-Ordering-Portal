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
	rating: {
		type: Number,
		required: false,
		default: 0,
		min: 0,
		max: 5
	},
    preference: {
        type: Array,
        required: true,
    },
    addon: {
        type: Array,
        required: false,
		default: []
    },
	addon_price: {
		type: Array,
		required: false,
		default: {}
	},
	tags: {	
		type: Array,
		required: false,
		default: []
	},
	vendor: {
		type: String,
		required: true
	}
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
