const mongo = require("mongodb").MongoClient;
const daoSequence = require("./daoSequence.js");
var dbUrl = "mongodb://localhost:27017/urlshortener-fcc-api";
module.exports = {
    find: function(url, callback) {
        console.log("Starting find process");
        mongo.connect(dbUrl, function(err, db) {
            if (err) {
                console.log("Unable to connect to the mongoDB server. Error:", dbUrl);
                throw err;
            } else {
                console.log("Connection established to", dbUrl);
                var collectionName = "url";
                var urlColl = db.collection(collectionName);
                urlColl.find({"url": url}).toArray( function(err, documents) {
                    console.log("Found result = " + JSON.stringify(documents));
                    return callback(documents);
                    db.close;
                });
            }
        });
    },
    
    save: function(url, callback) {
        console.log("Starting save process");
        mongo.connect(dbUrl, function(err, db) {
            if (err) {
                console.log("Unable to connect to the mongoDB server. Error:", dbUrl);
                throw err;
            } else {
                console.log("Connection established to", dbUrl);
                var collectionName = "url";
                var urlColl = db.collection(collectionName);
                daoSequence.getNextSequence(collectionName, db, function(sequence) {
                    var urlObject = {seq: sequence, "url": url};
                    urlColl.insert(urlObject, function(err, data) {
                        if (err) {
                            throw err;
                        }
                        console.log("Saved sequence as ", sequence);
                        db.close;
                        return callback(sequence);
                    });
                });
            }
        });
    }
};