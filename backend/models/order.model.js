const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    foodItem: {
        type: String,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    addOn: {
        type: Array,
        required: false,
        default: []
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    vendor:{
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = User = mongoose.model("Order", OrderSchema);