const express = require("express");
const service = require("./service");
var app = express();
app.use(express.static("public"));
app.get("/short/*", function(req, resp) {
    var url = req.params[0];
    var shortUrl = service.short(url);
    resp.json(shortUrl);
});
var port = process.env.PORT || 8080;
app.listen(port);
