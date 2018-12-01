'use strict';

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Implementing a basic logging middleware for all requests
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

//implementation for microservice
app.get('/api/timestamp/:date_string', function (req, res) {
    var numericDate = parseInt(req.params.date_string);
    var dateFromParams = !isNaN(numericDate) ? numericDate : req.params.date_string;
    var parsedDate = dateFromParams ? new Date(dateFromParams) : new Date();
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});