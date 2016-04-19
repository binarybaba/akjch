var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var util = require('util');
var http = require('http');
var startDate = require('../startDate.js');



/*var stockList = require('../../model/stocklist.js');*/


//TODO: figure out a way to catch all routes for !req.user and redirect to / else next() and refactor
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
        }
        else{
            res.redirect('/');
        }
    });

dashboardRouter.route('/historical-data')
    .post(function(req, res){
        if(req.user){
            console.log(req.body); //[ 'DDD', 'WBAI', 'AHC', 'ATEN' ]
            var histories = [];
            function onResult(results){
                res.send(results);
            }
            function getHistory(symbol){
                var options={
                    host:'marketdata.websol.barchart.com',
                    path:'/getHistory.json?key='+process.env.BARCHARTKEY+'&symbol='+symbol+'&type=daily&startDate='+startDate,
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                };
                http.get(options, function(response){
                    var output = '';
                    response.setEncoding('utf8');
                    response.on('data', function(data){
                        output += data;
                    });
                    response.on('end', function(){
                        var obj = JSON.parse(output);
                        histories.push(obj);
                        console.log(histories.length)
                        if(req.body.length === histories.length){
                            res.send(histories);
                        }
                        //res.send(obj);
                    });
                    response.on('error', function(){
                        res.send('Cant connect');

                    })
                })


            }
            req.body.forEach(function(stock){
            getHistory(stock);
            })
            

            /*var options={
                host:'marketdata.websol.barchart.com',
                path:'/getHistory.json?key='+process.env.BARCHARTKEY+'&symbol=MMM&type=daily&startDate='+startDate,
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }
            http.get(options, function(response){
                var output = '';
                response.setEncoding('utf8');
                response.on('data', function(data){
                    output += data;
                });
                response.on('end', function(){
                    var obj = JSON.parse(output);
                    console.log(obj);
                    res.send(obj);
                });
                response.on('error', function(){
                    console.log('Cant connect.');
                })
            }) // works*/


        }
        else{
            res.redirect('/');
        }
    })

dashboardRouter.route('/user/portfolios')

    .get(function(req, res){
        if(req.user){
            var url = 'mongodb://localhost:27017/akjch'
            mongodb.connect(url, function(err, db){
                var cursor = db.collection('users').findOne({username:req.user.username}, function(err, document){
                    //console.log(document);
                    res.send(document.portfolios);
                    db.close();
                });
            })
        }
        else{
            res.redirect('/');
        }
    })

    .post(function(req, res){
        if(req.user) {
            //console.log(req.body); // [{ name: 'this', stocks: [ 'DDD', 'WUBA' ] }]

                var url = 'mongodb://localhost:27017/akjch';
                console.log('user id is ' + req.user._id);
                mongodb.connect(url, function (err, db) {
                    var Users = db.collection('users');
                    //TODO: if portfolio already exists, dont add
                    req.body.forEach(function (elem) {
                        Users.updateOne(
                            {username: req.user.username},
                            {$push: {portfolios: elem}}
                        );
                    });
                });
                res.send('Added documents to collection');

        }

        else{
            res.redirect('/');
        }

    })

    .put(function(req, res){
        var url = 'mongodb://localhost:27017/akjch'
        mongodb.connect(url, function(err, db){
            var Users = db.collection('users');
            Users.update(
                {username:req.user.username},
                { $pull : {portfolios : { name:req.body.name }}}, function(err, d){
                    console.log('done');
                    res.send('ok');

                }
            )
        })
    })




module.exports = dashboardRouter;