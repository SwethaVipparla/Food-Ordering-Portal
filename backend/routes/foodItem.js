var express = require("express");
var router = express.Router();

// Load FoodItem model
const FoodItem = require("../models/food.model");

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

// POST request 
module.exports = router;