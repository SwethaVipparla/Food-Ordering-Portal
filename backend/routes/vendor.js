var express = require("express");
var router = express.Router();

// Load User model
const Vendor = require("../models/vendor.model");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Vendor.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
            console.log(users);

			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new Vendor({
        manager_name: req.body.manager_name,
        shop_name: req.body.shop_name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time,
        type: req.body.type
    });
    console.log(newUser);
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put("/editVendor", (req, res) => {
    Vendor.findOneAndUpdate({ email: req.body.email }, {
        manager_name: req.body.manager_name,
        number: req.body.number,
        shop_name: req.body.shop_name,
        password: req.body.password,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            res.status(200).json(val);
        }
    });
});

router.post("/getVendor", (req, res) => {
    const email = req.body.email
    console.log("yo")
    console.log(email)
    Vendor.findOne({ email }).then(vendor => {
        if (!vendor) {
            return res.status(404).json({
                error: "vendor not found",
            });
        } else {
            res.status(200).json(vendor);
            console.log(vendor)
        }

    })
});


// POST request 
// Login


module.exports = router;

