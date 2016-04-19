**AKJ Dev Challenge Solution**
===================
-----------------------------------------------------------
A lightweight web app based on the MEAN to compare stock portfolios

The app uses [Barchart's](http://www.barchart.com/) API to get historical data of stocks. All your portfolios get saved to Mongo.

________

**Setting it up**
-------------

Use the excel file to extract and populate the database (follow the format in stocks.xlsx if you're planning to put your own file). Head over to [Barchart's free market data api](http://www.barchartondemand.com/freemarketdataapi.php) and create an account. They'll send you the API key in your email.

For development environment, goto `gulpfile.js` and put the key in the respected field-

    gulp.task('serve', ['inject'], function () {
        var options = {
            script: 'server.js',
            delayTime: 1,
            env: {
                'PORT': 5000,
                'BARCHARTKEY': 'your-key-here'
            },
            watch: jsFiles
        };

----------

**And you're done!**
----------------

Now, fire up the terminal. 
``` 
$ sudo mongod
$ gulp serve
```
Listens at 5000 by default.


**Thank you**
------------------

 [highcharts-ng](http://github.com/pablojim/highcharts-ng)


**License**
=========
The MIT License (MIT)
Copyright (c) 2016 copyright Amin Mohamed Ajani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
