var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:'uname', // id/name of the field in the view
        passwordField:'pass' //id/name of the field in the view
    }, function(username, password, done){
        //this function determines validation. goto dbase and check username and stuff
        var user = {
            username:username,
            password:password
        };
        done(null, user);//done with no errors and the result
    }))
}
