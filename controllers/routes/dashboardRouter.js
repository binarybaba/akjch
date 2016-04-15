var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


dashboardRouter.route('/')
    .get(function(req, res){
        if(req.user) {
            res.render('pages/dashboard', {
                name: req.user.username
            })
        }
        else{
            res.redirect('/');
        }
    });





module.exports = dashboardRouter;