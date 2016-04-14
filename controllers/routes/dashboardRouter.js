var express = require('express');
var dashboardRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


dashboardRouter.route('/')
    .get(function(req, res){
        res.json(req.user);
    })





module.exports = dashboardRouter;