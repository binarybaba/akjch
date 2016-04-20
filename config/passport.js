var util = require('util');
var passport = require('passport');


module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done){ //bundles up the user into the session to store for later. used to trim that down
        done(null,user); //done(err,result) ignoring the err for now
        console.log('serialize user');
        console.log(util.inspect(user, false, null));
    })
    passport.deserializeUser(function(user, done){
        console.log('deserialize user');
        console.log(util.inspect(user, false, null));
        done(null, user);

    })
    /*Refactoring passports strategy to include oAuth strategy in the future maybe*/
    require('./strategies/local.strategy')();
}
