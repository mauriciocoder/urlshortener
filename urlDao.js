const mongo = require("mongodb").MongoClient;
const sequenceDao = require("./sequenceDao.js");
var dbUrl = "mongodb://localhost:27017/urlshortener-fcc-api";
module.exports = {
    find: function find(url, callback) {
        mongo.connect(dbUrl, handleFindUrl.bind(null, url, callback));
    },
    
    save: function save(url, callback) {
        mongo.connect(dbUrl, handleSaveUrl.bind(null, url, callback));
    }
};

function handleFindUrl(url, callback, err, db) {
    if (err) {
        throw err;
    } else {
        var collectionName = "url";
        var urlColl = db.collection(collectionName);
        urlColl.find({"url": url}).toArray(function(err, documents) {
            if (err) {
                throw err;
            }
            return callback(documents);
            db.close;   // Refactor. Find better place to close it!!
        });
    }
}

function handleSaveUrl(url, callback, err, db) {
    if (err) {
        throw err;
    } else {
        var collectionName = "url";
        sequenceDao.getNextSequence(collectionName, db, saveUrl.bind(null, collectionName, url, callback, db));
    }
}

function saveUrl(collectionName, url, callback, db, sequence) {
    var urlObject = {seq: sequence, "url": url};
    var urlColl = db.collection(collectionName);
    urlColl.insert(urlObject, function(err, data) {
        if (err) {
            throw err;
        }
        db.close;   // Refactor. Find better place to close it!!
        return callback(sequence);
    });
}