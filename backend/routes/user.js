var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/buyer.model");
const Vendor = require("../models/vendor.model");

router.post("/login", (req, res) => {
            if (!req.body.email) {
                return res.status(404).json({
                    error: "Invalid input",
                });
            }

            const email = req.body.email; 
            // Find user by email
            Buyer.findOne({
                email
            }).then(buyer => {
                    // Check if user email exists
                    if (!buyer) {
                        Vendor.findOne({
                            email
                        }).then(vendor => {
                                // Check if user email exists
                                if (!vendor) {
                                    return res.status(404).json({
                                        error: "Email not found",
                                    });
                                } else {
                                    // Check password
                                    if (req.body.password === vendor.password) {
                                        return res.status(200).json(vendor);
                                    } else {
                                        return res.status(404).json({
                                            error: "Incorrect password",
                                        });
                                    }
                                }
                            })
                    }
                        else {
                            // Check password
                            if (req.body.password === buyer.password) {
                                return res.status(200).json(buyer);
                            } else {
                                return res.status(404).json({
                                    error: req.body.password,
                                });
                            }
                        }

                    });
                
            });


            module.exports = router;