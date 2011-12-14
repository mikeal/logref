var logging = require('./main')
  , assert = require('assert')
  , f = logging.formatter()
  ;

assert.equal(f('%start with', {start:'starts'}), 'starts with')
assert.equal(f('in %the middle', {the:'the'}), 'in the middle')
assert.equal(f('at %end', {end:'end'}), 'at end')
assert.equal(f('%has %many %reps', {has:'has',many:'many',reps:'reps'}), 'has many reps')


process.logging = logging
logging.stdout()

process.stdout.write = function (chunk) {
  assert.equal(chunk.toString(), '[test] a test line\n')
}
var log = logging('test')
log('a test line')