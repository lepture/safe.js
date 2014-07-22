# safe.js

Is your password safe? This is a JavaScript fork of [safe](https://github.com/lepture/safe).

## Installation

Install with npm:

    $ npm install safe.js --save

Install with [component(1)](http://component.io):

    $ component install lepture/safe.js

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


### safe.words

Words hash map which are commonly used. Default data from [10000 Top Passwords](https://xato.net/passwords/more-top-worst-passwords/).


## Client Side


## License

BSD
