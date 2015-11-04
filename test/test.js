var test = require('tape');
var fs = require('fs');
var DownmarkStream = require('..');
var fm = require('front-matter');
var through = require('through2');

test('DownmarkStream()', function (t) {
  var html = fs.readFileSync(__dirname + '/01.html', 'utf8');

  fs.createReadStream(__dirname + '/01.md')
    .pipe(DownmarkStream())
    .on('data', function (data) {
      t.equal(data.toString().trim(), html.trim());
    })
    .on('end', function () {
      t.end();
    });
});

test('DownmarkStream(options)', function (t) {
  var html = fs.readFileSync(__dirname + '/02.html', 'utf8');
  var options = {
    gfm: true,
    breaks: true
  };

  fs.createReadStream(__dirname + '/02.md')
    .pipe(DownmarkStream(options))
    .on('data', function (data) {
      t.equal(data.toString().trim(), html.trim());
    })
    .on('end', function () {
      t.end();
    });
});

test('DownmarkStream(options, { objectMode: true })', function (t) {
  var html = fs.readFileSync(__dirname + '/01.html', 'utf8');
  var options = {
    gfm: true,
    breaks: true
  };

  fs.createReadStream(__dirname + '/03.md')
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
    .on('data', function (data) {
      t.equal(JSON.parse(data).body.trim(), html.trim());
      t.equal(JSON.parse(data).attributes.author, 'Akiva Levy');
    })
    .on('end', function () {
      t.end();
    });
});
