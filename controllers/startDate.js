var dt = new Date();
var startDate = (dt.getFullYear() - 1).toString() + 0 + (dt.getMonth() + 1).toString();
if(dt.getUTCDate() >= 10 ){
    startDate= startDate+ dt.getUTCDate().toString() + '000000';
}
else{
    startDate= startDate+ '0' + dt.getUTCDate().toString() + '000000';
}
module.exports = startDate;