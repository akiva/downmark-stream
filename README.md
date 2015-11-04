# marked-stream

[![npm][npm-image]][npm-url]
[![npm version][npm-version-image]][npm-version-url]
[![travis][travis-image]][travis-url]
[![stable][stability-image]][stability-url]

[npm-image]: https://nodei.co/npm/marked-stream.png
[npm-url]: https://www.npmjs.com/package/marked-stream
[npm-version-image]: https://badge.fury.io/js/marked-stream.png
[npm-version-url]: http://badge.fury.io/js/marked-stream
[travis-image]: https://secure.travis-ci.org/akiva/marked-stream.png
[travis-url]: https://travis-ci.org/akiva/marked-stream
[stability-image]: http://badges.github.io/stability-badges/dist/stable.svg
[stability-url]: http://github.com/badges/stability-badges

Transform streaming Markdown to HTML, with `object mode` support for
YAML front-matter object (meta and data) streams.

This module uses the [Marked][1] module for processing Markdown files
and expects the front-matter object returned by the [front-matter][2]
module.

## Installation

```bash
npm install marked-stream
```

## Usage

Markdown processed _without_ front-matter:

```javascript
var fs = require('fs');
var MarkedStream = require('marked-stream');

fs.createReadStream(__dirname + '/foo.md')
  .pipe(MarkedStream())
  .pipe(process.stdout);
```

Markdown processed _with_ front-matter:

```javascript
var fs = require('fs');
var MarkedStream = require('marked-stream');
var fm = require('front-matter');
var through = require('through2');

fs.createReadStream(__dirname + '/foo')
  .pipe(through.obj(function (chunk, enc, callback) {
    var content = fm(chunk.toString());
    this.push(content);
    callback();
  }))
  .pipe(MarkedStream(opts, { objectMode: true }))
  .pipe(through.obj(function (chunk, enc, callback) {
    this.push(JSON.stringify(chunk, null, 2));
    callback();
  }))
  .pipe(process.stdout);
```

For more examples, view the contents of the `example` directory.

## Options

```javascript
MarkedStream(markedOptions, streamOptions)
```

  - `markedOptions` expected in the same format as those provided to the
    [Marked][1] module.

  - `streamOptions` expected as the standard `{ objectMode: true }` for
    _object mode_ streams, or `undefined` or `{ objectMode: false}` for
    the standard `string`/`buffer` mode stream.

## License

MIT, see [LICENSE](LICENSE) for details.

[1]: https://www.npmjs.com/package/marked
[2]: https://www.npmjs.com/package/front-matter
