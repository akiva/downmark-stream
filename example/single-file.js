var fs = require('fs');
var MarkedStream = require('..');

fs.createReadStream(__dirname + '/a.md')
  .pipe(MarkedStream())
  .pipe(process.stdout);
