const urlRegex = /http(s)*:\/\/(www\.)*([a-zA-Z0-9\-])+(\.\w+){1,2}/g;
const urlDao = require("./urlDao");
module.exports = {
    short: function short(url, callback) {
        var regex = new RegExp(urlRegex);
        if (url.match(regex) ) {
            urlDao.find(url, getShortUrl.bind(null, url, callback));
        } else {
            return callback(new Error("URL is not valid. Verify protocol and address"), null);
        }
    },
    
    find: function find(sequence, callback) {
        urlDao.findBySequence(sequence, getBySequence.bind(null, callback));
    }
};

function getBySequence(callback, result) {
    if (result.length > 0) {
        return callback(null, result[0].url);
    }
    return callback(new Error("Does not exist matching url"), null);
}

function getShortUrl(url, callback, result) {
    if (result.length > 0) {
        // Url already exists
        return callback(null, result[0].seq);
    } else {
        // New url, save and then return
        urlDao.save(url, function(sequence) {
            return callback(null, sequence);
        });        
    }
}