var express = require("express");
var app = express();
app.use(express.json());
var mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yacob@123",
  database: "mysql",
});
con.connect((err) => {
  if (err) console.log(err);
  else {
    console.log("connected successfully");
  }
});
var r,str;
function Display(err, rows) {
  
 
  if (rows[0] == null||err)
  {
    return r.status(404).send("no details found");
      }
  console.log(rows);
  str = "<table border='1' width='100%'><tr>";
  for (i in rows[0])
    str += "<td><label>" + i + "</label></td>";
  str += "</tr>";
  for (i in rows)
  {
    str += "<tr>";
    for (j in rows[i])
    {
      str += "<td>" + rows[i][j] + "</td>";
    }
    str += "</tr>";
    }
  str += "</tr></table>";
  r.send(str);
}


function getdata(req, res) {
  r = res;
  con.query("select * from employee", Display);

}
function welcome(req, res) {
  res.send("<center><h1>Welcome to Employee Website</h1></center>");
}

app.get("/getAllEmployees", getdata);
app.get("/getAllEmployees/project-name", (req, res) => {
  r = res;
  con.query('select e.empid,p.name from employee e,projects p where e.empid=p.empid', Display)

});
app.get("/updateEmployees/:sal", (req, res) => {
  r = res;
  con.query('update employee set salary=' + req.params.sal);
  con.query("select * from employee", Display);

});
app.get("/deleteEmployee/:eid", (req, res) => {
  r = res;
  con.query('delete from  employee where eid=' + req.params.eid);
  con.query("select * from employee", Display);

});

app.get("/getAllEmployees/:col", (req,res) => { 
  r = res;
  console.log('select id,' + req.params.col + ' from employee');
  con.query('select eid,'+req.params.col+' from employee',Display)

});

app.get("/getEmployee/:id", (req, res) => {
  r = res;
  con.query('select * from employee where eid='+req.params.id, Display)

});
app.get("/", welcome);
app.listen(8080);
console.log("listening port 8080");
