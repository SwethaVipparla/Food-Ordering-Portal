var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/buyer.model");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Buyer.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.get("/buyer", function (req, res) {
    Buyer.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

router.get("/getBuyer", async (req, res) => {
    console.log(req.headers.email)
    buyer = Buyer.findOne({ email: req.body.email });
    if (!buyer) {
        return res.status(404).json({
            error: "buyer not Found",
        });
    } else {
        res.json(buyer);
    }
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    Buyer.findOne({ email: req.body.email }, function (err, found) {
        if (found) {
            return res.status(404).json({
                error: "Buyer with same email exists",
            });
        }
        else {
            Vendor.findOne({ email: req.body.email }, function (err1, found1) {
                if (found1) {
                    return res.status(404).json({
                        error: "Vendor with same email exists",
                    });
                }
            }
            );
        }
    }
    );

    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
		password: req.body.password,
        age: req.body.age,
        batch: req.body.batch,
        type: req.body.type
    });

    newBuyer.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put("/editBuyer", (req, res) => {
    Buyer.findOneAndUpdate({ email: req.body.email }, {
        name: req.body.name,
        number: req.body.number,
        password: req.body.password,
        age: req.body.age,
        batch: req.body.batch
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.statusjson(val)
        }
    });
});


// POST request 
module.exports = router;

