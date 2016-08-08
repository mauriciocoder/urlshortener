const mongo = require("mongodb").MongoClient;
module.exports = {
    getNextSequence: function(collectionName, db, callback) {
        console.log("Getting next sequence for collection " + collectionName);
        var sequence = db.collection("sequence");
        sequence.find({
            _id: collectionName
        }).toArray(function(err, documents) {
            if (err) {
                throw err;
            }
            console.log("sequences found for collection " + collectionName + " = " + JSON.stringify(documents));
            var isEmpty = documents.length <= 0;
            if (isEmpty) {
                console.log("Não entrou aki!!");
                sequence.insert({
                    _id: collectionName,
                    seq: 0
                }, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log("sequence.insert rodou com sucesso");
                });
            }
            sequence.findAndModify(
                { _id: collectionName },
                [['_id','asc']],
                { $inc: { seq: 1 } },
                { new: true }
            , function(err, result) {
                    console.log("Rodou antes");
                    if (err) {
                        throw err;
                    }
                    console.log("sequence.findAndModify rodou com sucesso");
                    console.log("sequence = " + JSON.stringify(result));
                    return callback(result.value.seq);
            });
        });
    }
};
