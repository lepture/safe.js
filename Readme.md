# safe.js

Is your password safe? This is a JavaScript fork of [safe](https://github.com/lepture/safe).

## Installation

Install with npm:

    $ npm install safe.js --save

Install with [component(1)](http://component.io):

    $ component install lepture/safe.js

You can also grab the standalone file:

    $ curl https://github.com/lepture/safe.js/blob/master/safe.js

## API

```js
var safe = require('safe.js');
```

### safe(password)

Check the safety strength of the password:

```js
safe('password')

// {valid: false, strength: 'simple', message: 'password is too common'}
```

### safe.min

Set the minimal length of the password, default is 4.

```js
safe.min = 6
```


### safe.words

Words hash map which are commonly used. Many thanks to Mark Burnett for
the great work on [10000 Top Passwords](https://xato.net/passwords/more-top-worst-passwords/).

In Node.js environment, **safe.words** is loaded with the default data.
In browsers, you need to load data yourself.


## Browser

Here are the tips for browser integration. If you are using the standalone
version of safe.js, you need to download the [words.json](https://github.com/lepture/safe.js/blob/master/lib/words.json) yourself. If you are using component, it is included in the component.json.

Load words data with an AJAX request:

```js
if (!safe.wordsLoaded) {
  // only load data when words not loaded
  request('path/to/words.json', function(words) {
    safe.cache(words);
  });
}
```

### safe.cache(words)

Cache the words in browser's local storage. **Words** should be a map/dict object.

### safe.wordsLoaded

Safe.js will load data from local storage automatically. If data is loaded, this property will be true.

## License

BSD
