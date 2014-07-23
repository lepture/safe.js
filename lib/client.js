
var safe = require('./');

safe.cache = function(words) {
  safe.words = words;
  if (localStorage) {
    localStorage.safeWords = JSON.stringify(words);
  }
};

// load from local storage
if (localStorage && localStorage.safeWords) {
  safe.words = JSON.parse(localStorage.safeWords);
  safe.wordsLoaded = true;
}

module.exports = safe;
