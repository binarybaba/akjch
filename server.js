var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'), //passport will need this to store the cookie
    session = require('express-session'),
    passport = require('passport');
/*Setup the stocks in model*/
require('./config/stockdb.js')();

/*Requiring Custom Routes*/
var dashboardRouter = require('./controllers/routes/dashboardRouter'),
    authRouter = require('./controllers/routes/authRouter');

/*TODO: In Dashboard get the list of user's portfolios. if !portfolios then ask to make portfolio by sending list of portfolios from db or xlsx (omg deal with weights too). */
/*TODO: Wire up angular to deal with the filter and let user add the list to his custom portfolio -> save -> express -> model -> mongo*/
/*TODO: compare portfolio button -> send to Highstock. Figure out a way to add a directive to angular or do it vanilla if there's no time*/

/*Wiring up middlewares*/
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:"akjdeveloperchallenge",
    saveUninitialized: false,
    resave: true
}));

/*Refactoring all passport stuff and pulling it in from the config*/
require('./config/passport')(app);

/*Setting views and engine*/
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

/*Setting up custom routes*/
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRouter);

app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});