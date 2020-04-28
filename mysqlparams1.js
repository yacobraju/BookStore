var mysql=require('mysql');
var express=require('express');
var expapp=express();
const mysqlconn=mysql.createConnection({host:'localhost',user:'root',password:'Yacob@123',database:'mysql'});
function testconn(err){
if(err)
console.log("unable to connect to database");
else
console.log("connected sucessfully");
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
    mysqlconn.query('select * from employee',printEmployees);
}
function getEmployee(request,response)
    {
        req=request;
        res=response;

        mysqlconn.query('select * from employee where eid=?',[request.params.empid],printEmployees);
    }
    function getFewEmployee(request, response) //Call back function
    {
        req=request;
        res=response;
        qry='select * from employee where eid>' + request.params.empid1 + ' and eid <' + 
            request.params.empid2;
        mysqlconn.query(qry, printEmployees); //Static SQL
    }
    function errorCheck(err){
        if(err)
        console.error('error in procedure call');
        else
        console.log('procedure excuted sucessfully')


    }
    function UpdateEmploye(request,response)

    {  
        req=request;
        res=response;
        
        mysqlconn.query('CALL Employee(?,?)',[request.params.empid,request.params.mobno],errorCheck());
        response.send("<html><body><b>updated</b></body></html>");


    }
    expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.get('/',geAlltEmployee);
expapp.get('/:empid',getEmployee);
expapp.get('/UpdateEmploye/:empid/:mobno',UpdateEmploye);
expapp.listen(8081);
console.log('server started at 8081');