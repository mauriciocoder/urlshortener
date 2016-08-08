const urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const dao = require("./dao");
module.exports = {
    short: function(url, callback) {
        var regex = new RegExp(urlRegex);
        var urlId;
        if (url.match(regex) ) {
            dao.find(url, function(result) {
                if (result.length > 0) {
                    console.log("result.seq = " + result[0].seq);
                    return callback(result[0].seq);
                } else {
                    dao.save(url, function(sequence) {
                        return callback(sequence);
                    });        
                }
                
            });
        } else {
            console.log("No match");
            // Throw an error
            return null;
        }
    }
};