var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/akjch';
var util = require('util');
module.exports = function(){
var res=[];
    mongodb.connect(url, function(err, db){

        var cursor = db.collection('stocks').find();
        cursor.forEach(function(doc, err){
            res.push(doc);
        });

        /*db.collection('stocks').find().toArray(function(err, items){
         module.exports = items;
         /!*console.log('Logging from stocklist.js. Items from db is-'+ util.inspect(items,false,null));*!/

         //TODO: items is an object and angular is expecting an array. FIX THIS
         })
         */
    });
return res;
};

