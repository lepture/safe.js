describe('safe', function() {
  var safe = require('./');

  function assert(a, b) {
    if (a !== b) {
      throw new Error(a + ' not equal ' + b);
    }
  }

  it('should be a terrible password', function() {
    var ret = safe('1');
    assert(ret.valid, false);
    assert(ret.strength, 'terrible');
  });

  it('should be a simple password', function() {
    var ret = safe('asdfghjkl');
    assert(ret.valid, false);
    assert(ret.strength, 'simple');

    ret = safe('abcdefg');
    assert(ret.valid, false);
    assert(ret.strength, 'simple');

    ret = safe('password');
    assert(ret.valid, false);
    assert(ret.strength, 'simple');

    // valid simple password
    ret = safe('yhnolku');
    assert(ret.valid, true);
    assert(ret.strength, 'simple');
  });

  it('should be a medium password', function() {
    var ret = safe('yhnolkuT');
    assert(ret.valid, true);
    assert(ret.strength, 'medium');
  });

  it('should be a strong password', function() {
    var ret = safe('yhnolkuT.');
    assert(ret.valid, true);
    assert(ret.strength, 'strong');
  });
});
