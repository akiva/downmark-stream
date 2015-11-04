var fs = require('fs');
var MarkedStream = require('..');
var highlight = require('highlight.js');

var options = {
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: true
};

fs.createReadStream(__dirname + '/a.md')
  .pipe(MarkedStream(options))
  .pipe(process.stdout);
