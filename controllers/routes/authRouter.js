var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



    authRouter.route('/signup')
        .post(function(req, res){
            /*bodypraser will transform req into cool json*/
            console.log(req.body);
            res.send('cool');

        })


module.exports = authRouter;