var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/vendor.model");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        manager_name: req.body.manager_name,
        shop_name: req.body.shop_name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login


module.exports = router;

