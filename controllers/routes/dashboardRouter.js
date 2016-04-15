var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');


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






module.exports = dashboardRouter;