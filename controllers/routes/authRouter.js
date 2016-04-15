var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



    authRouter.route('/signup')
        .post(function(req, res){
            /*bodypraser will transform req into cool json*/
            console.log(req.body);
            var url = 'mongodb://localhost:27017/akjch';
            mongodb.connect(url, function(err, db){
                var Users = db.collection('users');
                var user = {
                    username: req.body.uname,
                    password: req.body.pass
                };
                /*TODO: find the username in the database, if exists, redirect else proceed*/
                    Users.findOne({"username":user.username}, function(err, result){
                        if (result){
                            res.redirect('/');

                        }
                        else{
                            Users.insert(user, function(err, results){
                             req.login(results.ops[0], function(){
                             /*res.render('pages/profile', {
                             name: results.ops[0].username
                             }) Forget this one*/
                                 /*res.redirect('/dashboard');*/
                                 /*Add user to request and redirect to dashboard. WORKS!*/

                                 //Test code experimenting now something
                             res.redirect('/auth/profile');
                             })
                             });

                        }
                    })

            });


            /*res.send('cool');*/
        })
    authRouter.route('/signin')
        .post(function(req, res){
            var url = 'mongodb://'

        })



authRouter.route('/profile')
    .get(function(req, res){
        res.json(req.user); //once signed in, passport appends user object to the request
    })



authRouter.route('/dash')
        .get(function(req, res){
            res.json(req.user);
        })

module.exports = authRouter;




