var express = require("express");
var router = express.Router();

// Load FoodItem model
const FoodItem = require("../models/food.model");
const Wallet = require("../models/wallet.model");
const Order = require("../models/order.model");

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

router.post("/getWallet", (req,res) => {
    
    Wallet.findOne({ email: req.body.email }).then(users => {
		// Check if users email exists
		if (!users) {
			    res.status(400).send("Email not found");
		}
        else{
                res.status(200).json(users);
        }
	});
});

router.post("/vendorDetails", (req,res) => {
    const vendor = req.body.shop_name
    FoodItem.find({ vendor }).then(users => {
		// Check if users email exists
		if (!users) {
			res.status(400).send("Email not found");
		}
        else {
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
        addon_price: req.body.addon_price, 
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
    const email = req.body.email;
    const amount = req.body.amount;

    const newItem = new Wallet({
        email: email,
        amount: amount
    });

    let oldAmt = 0;

    Wallet.findOne({ email: email }).then(food => {
		// Check if users email exists
		if (!food) {
            newItem.save()
            .then(fooditem => {
                res.status(200).json(fooditem);
            })
            .catch(err => {
                res.status(400).send(err);
            });
		}
        else {
            oldAmt = parseInt(food.amount);
            newamount = parseInt(oldAmt + parseInt(amount));
           
            Wallet.updateMany({email: email},{$set: {email: email, amount: newamount}}).then(item => {
                // Check if users email exists
                if (!item) {
                    res.status(400).send("Email not found");
                }
                else {
                    res.status(200).json({email: email, amount: newamount});
                }
            }); 
        }
    });
});

router.post("/registerOrder", (req,res) => {
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
    console.log(newItem);
    newItem.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
 
});

router.post("/handleBuyWallet", (req,res) => {
    const email = req.body.email;
    Wallet.findOne({email: email}, function(err, wallet) {
        if (!wallet) {
            console.log(err);
            res.status(400).send(err);
            return;
        } else {
            const amt = parseInt(wallet.amount);
            let final = parseInt(amt - parseInt(req.body.total));
            if(final < 0){
                res.status(400).send("Insufficient Balance");
            }

            Wallet.updateMany({email: email},{$set: {email: email, amount: parseInt(final)}}).then(item => {
                if (!item) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    res.status(200).json({email: email, amount: parseInt(final)});
                }
            }); 
        }
    });
});


router.post("/orders", function(req, res) {
    
    Order.find({ name: req.body.email }).then(orders => {
        if (!orders) {
            res.status(400).send("Email not found");
        } else {
            console.log(orders);
            res.status(200).json(orders);
        }
    });

});

router.post("/delete", function(req, res) {
    FoodItem.deleteOne({ name: req.body.name }, function(err, fooditem) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log(req.body.name);
            res.status(200).json(fooditem);
        }
    })
});

router.put("/editItem", (req, res) => {
    FoodItem.findOneAndUpdate({ name: req.body.name }, {
        name: req.body.name,
        price: req.body.price,
        preference: req.body.preference,
        addon: req.body.addon,
        addon_price: req.body.addon_price,
        vendor: req.body.vendor,
        tags: req.body.tags,
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});



// POST request 
module.exports = router;