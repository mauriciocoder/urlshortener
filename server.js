const express = require("express");
const urlService = require("./urlService");
var app = express();
app.use(express.static("public"));
app.get("/short/*", handleShortRequest);
var port = process.env.PORT || 8080;
app.listen(port, handleServerStart);

function handleServerStart() {
    console.log("URLShortener app listening on port " + process.env.PORT);
}

function handleShortRequest(req, resp) {
    var url = req.params[0];
    urlService.short(url, handleShortService.bind(null, req, resp));
}

function handleShortService(req, resp, sequence) {
    var shortUrl = req.get("host") + "/" + sequence;
    resp.end(shortUrl);
}
