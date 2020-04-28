require('appmetrics-dash').attach();
var mysql=require('mysql');
var file=require('fs');
var express=require('express');
var speakeasy=require('speakeasy');
var QRCode=require('qrcode');
var expapp=express();

var secret=speakeasy.generateSecret({length:25})
console.log(secret.base32);
console.log(secret.otpauth_url);
QRCode.toDataURL(secret.otpauth_url,function(err,image_data)
{
    console.log(image_data);
    //file.write
});
const mysqlconn=mysql.createConnection({host:'localhost',user:'root',password:'Yacob@123',database:'mysql'});
function testconn(err){
if(err)
console.log("unable to connect to database");
else
console.log("connected sucessfully...................");
}
var req;
var res;
mysqlconn.connect(testconn);
function printEmployees(err,rows){
    res.send(rows);


}
function geAlltEmployee(request,response)
{
    req=request;
    res=response;
    //if (request.params.eid)
    mysqlconn.query('select * from employee',printEmployees);
    //else mysqlconn.query('select * from employee',printEmployees);
}
function getEmployee(request,response)
{
    req=request;
    res=response;
    mysqlconn.query('select * from employee where eid=?',[request.params.eid],printEmployees);
}

function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    qry='select * from employee where eid > ? ' + request.params.empid1 + ' and eid < ?' + 
        request.params.empid2;
    mysqlconn.query(qry, printEmployees); //Static SQL
}

expapp.get('/',geAlltEmployee);
expapp.get('/:eid',getEmployee);

expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.listen(8081);
console.log('server started at 8081');