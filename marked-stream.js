var TransformStream = require('stream').Transform || require('readable-stream').Transform;
var marked = require('marked');
var util = require('util');

module.exports = MarkedStream;

function MarkedStream(markedOptions, streamOptions) {
  if (!(this instanceof MarkedStream))
    return new MarkedStream(markedOptions, streamOptions);
  TransformStream.call(this, streamOptions);
  if (markedOptions) marked = marked.setOptions(markedOptions);
}

util.inherits(MarkedStream, TransformStream);

MarkedStream.prototype._transform = function (chunk, enc, done) {
  if (this._readableState.objectMode) chunk.body = marked(chunk.body);
  else chunk = marked(chunk.toString());
  this.push(chunk);
  done();
};
