var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/akjch'
var users;

    mongodb.connect(url, function(err, db){
        if(!err){
            users = db.collection('users');
        }
    });
module.exports = users;


