var s = require("http");
var otp = Math.floor(1000 + Math.random() * 9000);

function processRequest(request, response) {
  if (request.method == "POST") {
    body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    }); //chunk will be in json format.
    request.on("end", () => {
      console.log("Data : " + body);
      var p = body.split("=");

      if (otp == p[1]) {
        var resstr =
          "<html><body><b>Welcome you are successfully authenticated</B>";
        resstr += "<BR><B>Today = " + new Date() + "</b></body></html>";
      } else {
        var resstr = "<html><body><b>Invalid otp</b><br>";
        resstr +=
          "<b><a href='http://localhost:8083'>please authenticate again</a></b>";
        resstr += "</body></html>";
      }
      response.end(resstr);

      response.end("OK");
    });
    /* var u=pairs[0].split('=');
        var p=pairs[1].split('=');

        if((uname == u[1]) && (pwd== p[1]))
        {
            var resstr='<html><body><b>Welcome Mr./Ms.' + uname + '</B>';
            resstr='<BR><B>Today = ' +  new Date() + '</b></body></html>';
            }else
            {
                var resstr='<html><body><b>Invalid username/password</b><br>';
                resstr += '<b><a href=\'http://localhost:8083\'>Login again</a></b>';
                resstr+='</body></html>';
            }
            response.end(resstr);*/
  } else {
    var str = "<HTML><center><body>";
    str += "<B>OTP CHECKER</B><br>";
    str += "<form method='POST' action='http://localhost:8083'>";
    str += "<input type='text' placeholder='Enter OTP' name='eotp'/><BR>";

    str += "<input type='submit' value='CHECK' /> </BODY></center></HTML>";
    console.log("otp is " + otp);
    response.end(str);
  }
}
var server = s.createServer(processRequest);
server.listen(8083);
console.log("Started server at 8083");


