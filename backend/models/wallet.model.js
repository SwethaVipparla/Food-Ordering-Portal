const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WalletSchema = new Schema({
	email: {
		type: String,
		required: true
	},
    amount: {
		type: Number,
		required: true,
	}
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);
