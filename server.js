const express = require("express");
const service = require("./service");
var app = express();
app.use(express.static("public"));
app.get("/short/*", function(req, resp) {
    var url = req.params[0];
    service.short(url, function(sequence) {
       console.log("chegou aki - sequence = " + sequence);
       resp.json(sequence); 
    });
});
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("URLshortener app listening on port " + process.env.PORT);
});
