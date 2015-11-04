var fs = require('fs');
var MarkedStream = require('..');
var highlight = require('highlight.js');
var gs = require('glob-stream');

var options = {
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: true
};

var stream = gs.create([__dirname + '/*.md', '!' + __dirname + '/fm.md']);

stream.on('data', function (file) {
  fs.createReadStream(file.path)
    .pipe(MarkedStream(options))
    .pipe(process.stdout);
});
