var fsref = require("fs");//fs module is imported and
//loaded into memory.

var str=new String('Simply Easy Learning! ');
str += 'NodeJS fs example';

console.log("Going to write into existing file");

fsref.appendFile('input.txt', str,  function() {
console.log("Wrote " + str.length +
" characters to the file");
});

fsref.rename('input1.txt', 'input1.txt',  function() {
console.log("File renamed");
});
