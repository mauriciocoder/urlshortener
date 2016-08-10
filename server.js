const express = require("express");
const urlService = require("./urlService");
var app = express();

app.use(express.static("public"));

var port = process.env.PORT || 8080;
app.listen(port, handleServerStart);
function handleServerStart() {
    console.log("URLShortener app listening on port " + process.env.PORT);
    console.log("Env variable SHORTENER_APP_DB_URL = " + process.env.SHORTENER_APP_DB_URL);
}

// To short url
app.get("/short/*", handleShortRequest);
function handleShortRequest(req, resp, next) {
    var url = req.params[0];
    urlService.short(url, handleShortService.bind(null, req, resp, next));
}

function handleShortService(req, resp, next, err, sequence) {
    if (err) {
        next(err);
    } else {
        var shortUrl = req.get("host") + "/" + sequence;
        resp.end(shortUrl);
    }
}

// To redirect short url
app.get("/*", handleRedirectRequest);
function handleRedirectRequest(req, resp, next) {
    var sequence = req.params[0];
    urlService.find(sequence, redirectUrl.bind(null, req, resp, next));
}

function redirectUrl(req, resp, next, err, url) {
    if (err) {
        next(err);
    } else {
        resp.redirect(url);
    }
}

// For error handling
app.use(function(err, req, resp, next) {
  resp.end(err.message);
});
