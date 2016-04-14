var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:'username', // id/name of the field in the view
        passwordField:'password' //id/name of the field in the view
    }, function(username, password, done){
        //goto dbase and check username and stuff
        var user = {
            username:username,
            password:password
        };
        done(null, user);//done with no errors and the result
    }))
}
