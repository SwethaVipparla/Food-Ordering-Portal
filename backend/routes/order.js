var express = require("express");
var router = express.Router();

// Load FoodItem model
const FoodItem = require("../models/food.model");
const Wallet = require("../models/wallet.model");
const Order = require("../models/order.model");

router.get("/", function(req, res) {
    Order.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/register", (req,res) => {
    const newItem = new Order({
        name: req.body.name,
        foodItem: req.body.foodItem,
        status: req.body.status,
        quantity: req.body.quantity,
        addOn: req.body.addOn,
        total: req.body.total,
        vendor: req.body.vendor,
        time: req.body.time,
        rating: 0
    });

    newItem.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
 
});

module.exports = router;