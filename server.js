var network=require('net');
var fsmod=require('fs');
function endConnection(){
    console.log('client disconnected');
    var today=new Date();
    var str='client connected...'+today;
    fsmod.appendFile('Clientlog.log',str,function(err){console.log('data logged');});

}
function createMyServer(connection){
    console.log('client connected');
    var today=new Date();
    var str='client connected...'+today;
    fsmod.appendFile('Clientlog.log',str,function(err){console.log('data logged');});
    connection.on('end',endConnection);
    connection.write('helloo i am fine, h r u');
    connection.end();

}
var server=network.createServer(createMyServer);
server.listen(5300,function(){console.log("server waiting for client");});
