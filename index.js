var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var shell = require("shelljs");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.get("/index.html", function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});
app.get("/python/:user/:project/:file", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "python ../projects/" +
        req.params.user +
        "/python/" +
        req.params.project +
        "/" +
        req.params.file,
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});
app.get("/cpp/:user/:project/:file", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "cd ../projects/" +
        req.params.user +
        "/cpp/" +
        req.params.project +
        "/ && g++ " +
        req.params.file +
        " && a.exe",
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});

app.get("/c/:user/:project/:file", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "cd ../projects/" +
        req.params.user +
        "/c/" +
        req.params.project +
        "/ && gcc " +
        req.params.file +
        " && a.exe",
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});
app.get("/cs/:user/:project/:file", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "cd ../projects/" +
        req.params.user +
        "/cs/" +
        req.params.project +
        " && mcs index.cs -out:main.exe" +
        " && mono main.exe",
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});


app.get("/nodejs/:user/:project", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "node ../projects/" + req.params.user + "/nodejs/" + req.params.project,
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});
app.get("/ruby/:user/:project/:file", urlencodedParser, function(req, res) {
    // Prepare output in JSON format

    shell.exec(
        "ruby ../projects/" + req.params.user + "/ruby/" + req.params.project + '/' + req.params.file,
        function(code, stdout, stderr) {
            res.end(stdout);
        }
    );
});
var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
