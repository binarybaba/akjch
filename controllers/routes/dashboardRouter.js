var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


dashboardRouter.route('/')
    .get(function(req, res){
        res.render('./pages/dashboard');
    })





module.exports = dashboardRouter;