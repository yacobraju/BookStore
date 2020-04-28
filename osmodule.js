var osmodule=require('os');
console.log('cpu architecture: '+osmodule.arch());
console.log('free memory: '+osmodule.freemem());
console.log('total memory: '+osmodule.totalmem());
console.log('network interfaces: '+osmodule.networkInterfaces());
console.log('temporary directory: '+osmodule.tmpdir());
console.log('host/machine name: '+osmodule.hostname());
console.log('os type: '+osmodule.type());
console.log('os platform: '+osmodule.platform());
console.log('os version: '+osmodule.release());
function diskinfo(err,info)
{
    console.log('free space: '+ info.free);
    console.log('free space: '+ info.total);
}
disk.check('/',diskinfo);