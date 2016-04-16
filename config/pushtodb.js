var mongodb = require('mongodb').MongoClient;
module.exports = function(sheet){
    var url = 'mongodb://localhost:27017/akjch';
    mongodb.connect(url, function(err, db){
        db.createCollection('stocks', {strict:true}, function(err, collection) {
            //will throw error if the database already exists
            if(!err){
                try{
                    collection.insertMany(sheet);
                    console.log("Created new collection stocks successfully");
                    db.close();
                }catch(er){
                    console.log("Something went wrong: "+er);
                }
            }
            else{
                console.log('Stocks collection already present. Not creating.');
            }
        });
    })
}