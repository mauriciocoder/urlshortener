const urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const urlDao = require("./urlDao");
module.exports = {
    short: function short(url, callback) {
        var regex = new RegExp(urlRegex);
        if (url.match(regex) ) {
            urlDao.find(url, getShortUrl.bind(null, url, callback));
        } else {
            throw new Error("URL is not valid");
        }
    }
};

function getShortUrl(url, callback, result) {
    if (result.length > 0) {
        // Url already exists
        return callback(result[0].seq);
    } else {
        // New url, save and then return
        urlDao.save(url, function(sequence) {
            return callback(sequence);
        });        
    }
}