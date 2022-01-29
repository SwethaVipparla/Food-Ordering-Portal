const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "newa"

// routes
var vendor = require("./routes/vendor");
var buyer = require("./routes/buyer");
var login = require("./routes/login");
var foodItem = require("./routes/foodItem");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/vendor", vendor);
app.use("/buyer", buyer);
app.use("/login", login);
app.use("/foodItem", foodItem);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
