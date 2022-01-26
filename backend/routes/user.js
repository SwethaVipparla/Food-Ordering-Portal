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
            const pass = req.body.password
            // Find user by email
            Buyer.findOne({
                email
            }).then(usera => {
                    // Check if user email exists
                    if (!usera) {
                        Vendor.findOne({
                            email
                        }).then(userr => {
                                // Check if user email exists
                                if (!userr) {
                                    return res.status(404).json({
                                        error: "Email not found",
                                    });
                                } else {
                                    // Check password
                                    if (pass === userr.password) {
                                        return res.status(200).json(userr);
                                    } else {
                                        return res.status(404).json({
                                            error: "Incorrect Password",
                                        });
                                    }
                                }
                            })
                    }
                        else {
                            // Check password
                            if (pass === usera.password) {
                                return res.status(200).json(usera);
                            } else {
                                return res.status(404).json({
                                    error: "Incorrect Password",
                                });
                            }
                        }

                    });
                
            });