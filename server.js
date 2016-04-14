var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); //passport will need this to store the cookie
var session = require('express-session');
var passport = require('passport');



var xlsx = require('xlsx');
var workbook = xlsx.readFile('./stocks2.xlsx');
var sheet = workbook.SheetNames[0];
var worksheet = workbook.Sheets[sheet];
//console.log(worksheet);
var dashboardRouter = require('./controllers/routes/dashboardRouter');
var authRouter = require('./controllers/routes/authRouter');

/*TODO: add passport local strategy for sign up and sign in and on success, redirect to dashboard.ejs*/
/*TODO: In Dashboard get the list of user's portfolios. if !portfolios then ask to make portfolio by sending list of portfolios from db or xlsx (omg deal with weights too). */
/*TODO: try require xlsx and load data to mongo master portfolio for better access rather than reading xlsx file every time*/
/*TODO: Wire up angular to deal with the filter and let user add the list to his custom portfolio -> save -> express -> model -> mongo*/
/*TODO: compare portfolio button -> send to Highstock. Figure out a way to add a directive to angular or do it vanilla if there's no time*/


/*console.log(workbook);*/

/*Middlewares*/
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(cookieParser());
app.use(session({
    secret:"akjdeveloperchallenge",
    saveUninitialized: false,
    resave: true
}));

/*Refactoring all passport stuff and pulling it in from the config*/
require('./config/passport')(app);


app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
    /*res.json(worksheet) <- testing*/
});




/*Setting up routes*/
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRouter);



app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});