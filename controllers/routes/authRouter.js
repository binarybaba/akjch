var express = require('express'),
    authRouter = express.Router(),
    mongodb = require('mongodb').MongoClient,
    passport = require('passport');




    authRouter.route('/signup')
        .post(function(req, res){
            /*bodypraser will transform req into cool json*/
            console.log(req.body);
            var url = 'mongodb://localhost:27017/akjch';
            mongodb.connect(url, function(err, db){
                var Users = db.collection('users');
                var user = {
                    username: req.body.uname,
                    password: req.body.pass,
                    email:req.body.email,
                    name:req.body.name
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
                                 res.redirect('/dashboard');
                                 /*Add user to request and redirect to dashboard. WORKS!*/

                                 //Test code experimenting now something
                             /*res.redirect('/auth/profile');*/
                             })
                             });

                        }
                    })

            });

            /*res.send('cool');*/
        })

/*TODO: handle err. breaks when user signs in with invalid username/pass. Maybe do it manually rather than handing it over to passport?*/
    authRouter.route('/signin')
        .post(passport.authenticate('local', {
            failureRedirect:'/signup',
        }), function(req, res){
                /*res.redirect('/auth/profile');*/
            res.redirect('/dashboard');
        });



authRouter.route('/profile')
    .get(function(req, res){
        res.json(req.user); //once signed in, passport appends user object to the request
    })



authRouter.route('/dash')
        .get(function(req, res){
            res.json(req.user);
        })

module.exports = authRouter;




