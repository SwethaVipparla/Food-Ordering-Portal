const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	type: {
		type: String,
		required: true
	},
	manager_name: {
		type: String,
		required: true
	},
    shop_name: {
		type: String,
		required: true,
        unique: true
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

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
