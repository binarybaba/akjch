var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});

app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});