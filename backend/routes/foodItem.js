var express = require("express");
var router = express.Router();

// Load FoodItem model
const FoodItem = require("../models/food.model");
const Wallet = require("../models/wallet.model");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    FoodItem.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/search", function (req, res) {
    FoodItem.fuzzySearch({
        name: req.body.name
    }, function (err, srch) {
        if (err) {
            return res.status(404).json({
                error: "Error while searching",
            });
        } else {
            res.json(srch)
        }
    });
});

router.post("/getWallet", (req,res) => {
    
    Wallet.findOne({ name: req.body.email }).then(users => {
		// Check if users email exists
		if (!users) {
			    res.status(400).send("Email not found");
		}
        else{
                res.status(200).json(users);
        }
	});
});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/addItem", (req, res) => {
    const newFood = new FoodItem({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        preference: req.body.preference,
        addon: req.body.addon,
        vendor: req.body.vendor,
        tags: req.body.tags
    });

    newFood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/VendorsFilter", (req, res) => {
    
    const vendors = req.body.vendors;
    FoodItem.find({vendor: {$in: vendors}}, function(err, fooditems) {
        if (err) {
            console.log(err);
        } else {
            res.json(fooditems);
        }
    });
});

router.post("/handleWallet", (req,res) => {
    const newItem = new Wallet({
        email: req.body.email,
        amount: req.body.amount
    });

    var org_amt = 0;

    Wallet.findOne({ email: req.body.email }).then(users => {
		// Check if users email exists
		if (!users) {
            newItem.save()
            .then(fooditem=> {
                res.status(200).json(fooditem);
            })
            .catch(err => {
                res.status(400).send(err);
            });
		}
        else{
            org_amt = users.amount;
           
            Wallet.updateMany({name: req.body.email},{$set: {name: req.body.email, amount: parseInt(parseInt(org_amt) + parseInt(req.body.amount))}}).then(usersa => {
                // Check if users email exists
                if (!usersa) {
                        res.status(400).send("Email not found");
                }
                else{
                        res.status(200).json({name: req.body.email, amount: parseInt(parseInt(org_amt) + parseInt(req.body.amount))});
                        console.log(usersa)
                }
            }); 
        }
    });
});

// POST request 
module.exports = router;