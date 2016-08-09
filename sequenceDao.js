const mongo = require("mongodb").MongoClient;
module.exports = {
    getNextSequence: function getNextSequence(collectionName, db, callback) {
        var sequence = db.collection("sequence");
        // Find sequence for collection of name collectionName
        sequence.find({
            _id: collectionName
        }).toArray(handleGetNextSequence.bind(null, collectionName, sequence, callback));
    }
};

function initSequence(collectionName, sequence) {
    sequence.insert({
        _id: collectionName,
        seq: 0
    }, function(err, result) {
        if (err) {
            throw err;
        }
    });    
}

function updateSequence(collectionName, sequence, callback) {
    sequence.findAndModify(
        { _id: collectionName },
        [['_id','asc']],
        { $inc: { seq: 1 } },
        { new: true }
    , function(err, result) {
            if (err) {
                throw err;
            }
            return callback(result.value.seq);
    });
}

function handleGetNextSequence(collectionName, sequence, callback, err, documents) {
    if (err) {
        throw err;
    }
    var isEmpty = documents.length <= 0;
    if (isEmpty) {
        initSequence(collectionName, sequence);
    }
    return updateSequence(collectionName, sequence, callback);
}
