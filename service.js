const urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
module.exports = {
    short: function(url) {
        var regex = new RegExp(urlRegex);
        if (url.match(regex) ) {
            console.log("Successful match");
        } else {
            console.log("No match");
        }
        return {adaba:1};
    }
};