var key = "MTMxMjk5MmEtZDEyNi00MGI3LTg1NmMtN2ZiNjgwOGY4N2VjNTI5N2EwZDYtNzc0"
var sys = require('util')
var exec = require('child_process').exec;
var fs = require("fs");
var child;
var res;
// executes `pwd`
writeInfo = function (str) {
    fs.writeFileSync("./info", str)
}
readInfo = function () {
    return JSON.parse(fs.readFileSync("./info", "utf8"));
}
execCurl = function (str) {
    //    console.log(str);
    child = exec(str,
        function (error, stdout, stderr) {
            //            console.log('stdout: ' + stdout);
            //            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            writeInfo(stdout);
            //            console.log(stdout);
        });
}

personId = function (name, email) {
    var data = []
    if (name) {
        data.push("displayName=" + name)
    }
    if (email) {
        data.push("email=" + email)
    }
    return formatCurl("people", key, data, "GET");
}

roomCurl = function () {
    return formatCurl("rooms", key, [], "GET")
}

findRoomId = function (room) {
    execCurl(roomCurl());
    res = readInfo()["items"];
    //    console.log(res);
    for (var i = 0; i < res.length; i++) {
        if (room == res[i]["title"]) {
            return res[i]['id'];
        }
    }
}
formatCurl = function (f, key, data, method) {
    var c;
    if (method == "GET") {
        c = "curl -G 'https://api.ciscospark.com/v1/" + f + "'"
        for (var i = 0; i < data.length; i++) {
            c += " --data-urlencode '" + data[i] + "'";
        }
        c += " -H 'Authorization:Bearer " + key + "'"
    } else {
        c = "curl https://api.ciscospark.com/v1/" + f + " -X POST -H 'Authorization:Bearer " + key + "'"
        for (var i = 0; i < data.length; i++) {
            c += " --data '" + data[i] + "'";
        }
    }
    return c;
}
postMessage = function (dest, msg) {
        console.log(dest);
        execCurl(formatCurl("messages", key, [dest, "text='" + encodeURI(msg) + "'"], "POST"));
    }
    //execCurl(personId("", "shanemendez223@gmail.com"));
postMessage("roomId='" + findRoomId("testet") + "'", "DUDE! THIS IS FROM MY NODE SERVER!");



//<------------------------------------------>






//Server used to recieve files recordings from user
var express = require("express");
var fs = require("fs");
var app = express();


app.post('/text', function (req, res) {
    fs.writeFileSync("./tropoinfo", req.body);
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});
