var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



    authRouter.route('/signup')
        .post(function(req, res){
            /*bodypraser will transform req into cool json*/
            console.log(req.body);
            // passport adds a login function to the request. Ideal when directly login after sign up
            req.login(req.body , function(){
                res.redirect('/dash');
            })
            /*res.send('cool');*/
        })

    authRouter.route('/signin')
        .post(function(req, res){
            console.log(req.body);
            res.send('alright');
        })
    authRouter.route('/dash')
        .get(function(req, res){
            res.json(req.user);
        })

module.exports = authRouter;




