//Server used to recieve files recordings from user
var express = require("express");
var fs = require("fs");
var app = express();


app.get('/text', function (req, res) {
    fs.writeFileSync(req);
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});
