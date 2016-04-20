module.exports = function(){
    var xlsx = require('xlsx'),
        workbook = xlsx.readFile('./stocks.xlsx'),// TODO: replace with stocks.xlsx in production
        sheet = workbook.SheetNames[0],
        worksheet = workbook.Sheets[sheet],
        ref = '!ref',
        cols = worksheet[ref].split(':'),
        nums = cols.toString().match(/(\d+)/g),
        newSheet =[];
    len = nums[1]-nums[0];
    for(var i = 2; i<len;i++){
        newSheet.push({
            "name":worksheet["B"+i].v,
            "ticker":worksheet["A"+i].v,
            "weight":Math.random() * (100 -10) + 10 
        });
    }
    require('./pushtodb.js')(newSheet);
    
    
};



    
            