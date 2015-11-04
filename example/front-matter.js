var fs = require('fs');
var DownmarkStream = require('..');
var highlight = require('highlight.js');
var fm = require('front-matter');
var through = require('through2');

var options = {
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: true
};

fs.createReadStream(__dirname + '/fm.md')
  .pipe(through.obj(function (chunk, enc, callback) {
    var content = fm(chunk.toString());
    this.push(content);
    callback();
  }))
  .pipe(DownmarkStream(options, { objectMode: true }))
  .pipe(through.obj(function (chunk, enc, callback) {
    this.push(JSON.stringify(chunk, null, 2));
    callback();
  }))
  .pipe(process.stdout);
