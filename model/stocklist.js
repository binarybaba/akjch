var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/akjch';
var Stocks;
mongodb.connect(url, function(err, db){
        db.collection('stocks').find().toArray(function(err, items){
            console.log('ITEMS===================');
            console.log(items);
            console.log('ITEMS===================');
            console.log(typeof items);
            module.exports = items;
            //TODO: items is an object and angular is expecting an array. FIX THIS
        })

    });





var stocklist = [
{
    "name" : "NASDAQ",
    "ticker" : "^IXIC",
    "weight" : 49.50159783475101
},
{

    "name" : "S&P 500",
    "ticker" : "SPYV",
    "weight" : 61.16700223181397
},
{

    "name" : "3D Systems Corporation",
    "ticker" : "DDD",
    "weight" : 45.229717968031764
},

];

