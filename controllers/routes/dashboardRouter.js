var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var util = require('util');
/*var stockList = require('../../model/stocklist.js');*/



dashboardRouter.route('/')
    .get(function(req, res){
        if(req.user) {
            res.render('pages/dashboard', {
                name: req.user.name,
                user:req.user.username,
                id:req.user._id
            })
        }
        else{
            res.redirect('/');
        }
    });
dashboardRouter.route('/logout')
    .get(function(req, res){
        req.logOut();
        res.redirect('/');
    });

dashboardRouter.route('/stocklist')
    .get(function(req, res,next){
        var stocks=[];
        if(req.user){
            var url = 'mongodb://localhost:27017/akjch';
            mongodb.connect(url, function(err, db){
                var cursor = db.collection('stocks').find();
                cursor.forEach(function(doc, err){
                    stocks.push(doc);
                 },function(){
                    db.close();
                    res.send(stocks);
                });

            });

            /*res.json(req.user.portfolio);*/
            /*res.send(stockList);*/
     }
        else{
            res.redirect('/');
        }
    });

dashboardRouter.route('/user/portfolios')
    .get(function(req, res){
        if(req.user){
            res.send('users portfolios');
        }
    })
    .post(function(req, res){
        if(req.user){
            console.log(req.body); // [{ name: 'this', stocks: [ 'DDD', 'WUBA' ] }]
            var url = 'mongodb://localhost:27017/akjch';
            console.log('user id is '+req.user._id);
            mongodb.connect(url, function(err,db){
                var Users = db.collection('users');
                Users.updateOne(
                    { username: req.user.username },
                    { $push: { portfolios:req.body }}
                    //TODO: Add portfolios:[] in database when creating user and convert [{}.{}] to {},{} to be insert
                );
            });



        }
    })
    /*TODO: Add post route and update to model*/



module.exports = dashboardRouter;