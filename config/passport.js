
var passport = require('passport');


module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session({}));

    passport.serializeUser(function(user, done){ //bundles up the user in the session
        done(null,user); //done(err,result) ignoring the err for now
    })
    passport.deserializeUser(function(user, done){
        done(null, user);

    })
    /*Refactoring passports strategy to include oAuth strategy in the future maybe*/
    require('./strategies/local.strategy')();
}