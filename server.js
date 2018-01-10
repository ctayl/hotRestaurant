// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var tables = [];
var waitlist = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitlist);
});

app.get("/api/tables", function (req, res) {
    res.json(tables);
});

// Listen on post for api/reservation
app.post("/api/reservation", function(req, res) {
    //if table.length <= 5
    var newRes = req.body;

    if (tables.length < 5) {
        // add to table array
        tables.push(newRes);
        // send the response
        res.send(true);
    }
    else {
        // add to waitlist array
        waitlist.push(newRes);
        // send the response 
        res.send(false);
    }
});

app.get("/api/clear", function(req, res) {
    tables = [];
    waitlist = [];
})

app.listen(PORT, function () {
    console.log("Listening to PORT: " + PORT);
})