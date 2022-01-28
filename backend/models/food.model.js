const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching-v2');

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
		required: true,
		default: 0,
		min: 0,
		max: 5
	},
    preference: {
        type: String,
        required: true,
		enum: ["veg", "non-veg"]
    },
    addon: {
        type: Array,
        required: false,
		default: []
    },
	tags: {	
		type: Array,
		required: false,
		default: []
	}
});

FoodItemSchema.plugin(mongoose_fuzzy_searching, { fields: ['name']});
module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
