var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb');





module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:'uname', // id/name of the field in the view
        passwordField:'pass' //id/name of the field in the view
    }, function(username, password, done){
        var url = 'mongodb://localhost:27017/akjch';
        mongodb.connect(url, function(err, db){
            var Users = db.collection('users');
            Users.findOne({
                "username":username,
                "password":password
            }, function(err, results){
                if(err){
                    return done(err);
                }
                if(!results){
                    return done(null,false, {message:'That user doesnt exist'});
                }
                if(!results.password === password){
                    return done(null, false, {message:'Incorrect Password'});
                }
                return done(null, results);

                /*if(results.password === password){
                    var user = results;
                    done(null, user);
                }else{
                    done(null, false, {message:'Bad Password'});
                }*/


            });
        });



        //this function determines validation. goto dbase and check username and stuff


        /*var user = {
            username:username,
            password:password
        };
        done(null, user);//done with no errors and the result*/
    }))
}
