var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/akjch'
var _db;

module.exports = {
    connectToServer: function(callback){
        mongodb.connect(url, function(err, db){
            _db = db;
            callback(err);
        });
    },
    getDb:function(){
        return _db;
    }
}




/*

    mongodb.connect(url, function(err, db){
        if(!err){
            users = db.collection('users');
        }
    });
module.exports = users;


*/
