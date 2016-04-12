var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var xlsx = require('xlsx');
var workbook = xlsx.readFile('./stocks2.xlsx');
var sheet = workbook.SheetNames[0];
var worksheet = workbook.Sheets[sheet];
console.log(worksheet);




/*console.log(workbook);*/


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    /*res.render('index');*/
    res.json(worksheet)
});

app.listen(PORT, function () {
    console.log('Listening at port ' + PORT);
});