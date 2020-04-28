var mongo=require('mongodb');
var express=require('express');
var RateLimit=require('express-rate-limit');
var session=require('express-session');
var expapp=express();
var myDB;
var req;
var res;
var accessCount=0;
function testconnect(err, client)
{
    
if (err){
    //console.error(err.name);
   // console.error(err.stack);
   console.error("Unable to connect to database..");
}else{
    console.log("Connected to db.....");
    console.log("Client info : " +client);
}

myDB=client.db('employee');
}
//retryWrites. works in a loop until the data modification is successful.
//w - Write. w=majority. It has to perform bulk writing/bulk modification
mongo.MongoClient.connect
('mongodb://localhost:27017/employee?retryWrites=true&w=majority', testconnect);

function querryresult(err, result)
{
    var h='<html><body>';
    console.log('----------' + result.length);

    for(i=0;i<result.length;i++)
    {
        h += '<b>First Name </b>' + result[i].fname + '<BR>';
        h += '<b>Project Name </b>' + result[i].project + '<br><br>';
        //console.log(doc.First_Name + ', ' + doc.Project_Name);

    }
     h += '</body></html>';
    res.send(h);
}
function getEmployees(request, response){
    //request.session.accessCount++;
    //console.log('access count:'+accessCount);
    const cursor=myDB.collection('empinfo').find().sort({project:-1});
    //response.send(cursor);
    //console.log(cursor);
       req=request;
       res=response;
    cursor.toArray(querryresult);
}

function getEmployee(request, response)
    {
    
        const cursor=myDB.collection('empinfo').find({"project": request.params.projectname});
        req=request;
        res=response;
        cursor.toArray(querryresult);
    }
    function insertEmployee(request, response){
        var jsobj={"fname" : request.params.empname, "project" : request.params.projectname,
            "start_date" : request.params.startdate};
        const cursor=myDB.collection('empinfo').insert(jsobj);
            console.log('inserted ' + jsobj + '  document...');
    response.send("<html><body><b>document inserted....</b></body></html>");
        }
//Handling Read operation of CRUD

var rl={windowMs:15*60*1000,max:100,delayMs:0};
var ratelim=new RateLimit(rl);
expapp.use(ratelim);
expapp.use(express.json({limit:'10kb'}));
expapp.get('/', getEmployees);
expapp.get('/getEmployee/:projectname', getEmployee);
expapp.get('/insertEmployee/:empname/:projectname/:startdate', insertEmployee);
expapp.listen(8085);
