var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var twitterStrategy = require('passport-twitter').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var xlsx = require('xlsx');
var workbook = xlsx.readFile('./stocks2.xlsx');
var sheet = workbook.SheetNames[0];
var worksheet = workbook.Sheets[sheet];
//console.log(worksheet);
var dashboardRouter = require('./controllers/routes/dashboardRouter');
var authRouter = require('./controllers/routes/authRouter');

// TODO: add twitter oAuth, on success, store user in mongo and redirect to dashboard.ejs
//TODO: require xlsx in dashboard controller, load and wire up angular to filter to select the list of portfolios
//TODO: and post to dashboard to render highstock

/*console.log(workbook);*/


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
    /*res.json(worksheet) <- testing*/
});




/*Setting up routes*/
app.use('/dashboard', dashboardRouter);


app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});