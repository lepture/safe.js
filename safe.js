(function(root) {
/**
 * Safe
 *
 * Check if a password is strong enough.
 *
 * Copyright (c) 2014 by Hsiaoming Yang.
 */

/**
 * If the password is alphabet step by step.
 */
function byStep(raw) {
  // e.g. 123456, abcde
  var delta = raw.charCodeAt(1) - raw.charCodeAt(0);
  for (var i = 0; i < raw.length-1; i++) {
    if (raw.charCodeAt(i+1) - raw.charCodeAt(i) !== delta) {
      return false;
    }
  }
  return true;
}

var ASDF = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/**
 * If the password is in the order on keyboard.
 */
function isAsdf(raw) {
  var reverse = raw.split('').reverse().join('');
  var asdf = ASDF.join('');
  if (~asdf.indexOf(raw) || ~asdf.indexOf(reverse)) {
    return true;
  }
  asdf = ASDF.reverse().join('');
  if (~asdf.indexOf(raw) || ~asdf.indexOf(reverse)) {
    return true;
  }
  return false;
}

function strength(raw) {
  if (raw.length < 6) {
    return 'simple';
  }

  var types = 0;

  // lower case
  if (/[a-z]/.test(raw)) types += 1;

  // upper case
  if (/[A-Z]/.test(raw)) types += 1;

  // number
  if (/[0-9]/.test(raw)) types += 1;

  // marks
  if (/[^0-9a-zA-Z]/.test(raw)) types += 1;

  if (raw.length < 8 && types === 1) {
    return 'simple';
  }

  return types > 2 ? 'strong': 'medium';
}

/**
 * Export interface.
 */
function safe(raw, cb) {
  var ret;
  if (raw.length < safe.min) {
    ret = {
      valid: false,
      strength: 'terrible',
      message: 'password is too short'
    };
  } else if (byStep(raw) || isAsdf(raw)) {
    ret = {
      valid: false,
      strength: 'simple',
      message: 'password has a pattern'
    };
  } else if (safe.words[raw]) {
    ret = {
      valid: false,
      strength: 'simple',
      message: 'password is too common'
    };
  } else {
    var s = strength(raw);
    ret = {
      valid: true,
      strength: s
    };
    if (s === 'simple') {
      ret.message = 'password is too simple';
    } else if (s === 'medium') {
      ret.message = 'password is good enough';
    } else {
      ret.message = 'password is perfect';
    }
  }
  cb && cb(ret);
  return ret;
}

// min length of the password
safe.min = 4;
// password can't be these words
safe.words = {};

// = safe;

// = require('./');

safe.cache = function(words) {
  safe.words = words;
  if (localStorage) {
    localStorage.safeWords = JSON.stringify(words);
  }
};

// load from local storage
if (localStorage && localStorage.safeWords) {
  safe.words = JSON.parse(localStorage.safeWords);
}

// = safe;
root.safe = safe;
})(this);
