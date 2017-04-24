# deep-seal

![TravisCI Build Status](https://api.travis-ci.org/abdulhannanali/deep-seal.svg?branch=master)

Recursively calls Object.seal on Functions and Objects. Based on the substack's
[deep-freeze](https://github.com/substack/deep-freeze) module.

## Installation

```
npm install deep-seal`
```

Or if you are a yarn user like me

```
yarn add deep-seal
```

## Example usage

```js
const deepSeal = require('deep-seal');
const x = {a: 'hello', b: 'world'}

delete x.a
console.log(x.a) // hello

x.c = 'afkslj'
console.log(x.c) // undefined

// Does not all the extension of object and 
// does not let you delete the properties already present
```

## methods

```js
const deepSeal = require('deep-seal'); 
```

### deepSeal(o)

Calls `Object.seal` recursively on all unsealed properties that are functions or objects.

#### Parameters
- o (function or object, Object.seal is going to be applied on)

#### Returns 
- o (same object but deeply sealed :smile: )



### LICENSE
License under MIT LICENSE. See [LICENSE](LICENSE) for more details.