var express = require('express');
var dashboardRouter = express.Router();

dashboardRouter.route('/')
    .get(function(req, res){
        res.render('./pages/dashboard');
    })
module.exports = dashboardRouter;