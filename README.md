# deep-seal

![TravisCI Build Status](https://api.travis-ci.org/abdulhannanali/deep-seal.svg?branch=master)

Recursively calls Object.seal on Functions and Objects. Based on the substack's
[deep-freeze](https://github.com/substack/deep-freeze) module.

deep-seal has optional added support for checking cyclic dependencies, other modules, I found,
gets into an infinite loop and threw a type error. You can pass `true` in the second parameter 
to detect if your code contains cyclic dependencies before actually sealing.

The algorithm used for detecting cyclic dependencies uses a WeakMap, so it keeps the memory usage
low and let's garbage collection happen.

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


// Detecting Cyclic dependencies within an object
const cyclicObject = {};
cyclicObject.x = cyclicObject;

// Passing true as the second parameter let's us track cyclic dependencies code
// Using private isCyclic function
deepSeal(cyclicObject, true);
```

## methods

```js
const deepSeal = require('deep-seal'); 
```

### deepSeal(o, checkCycle)

Calls `Object.seal` recursively on all unsealed properties that are functions or objects.

#### Parameters
- o `{Function|Object}` Object.seal is going to be applied on)
- checkCycle `{boolean}` Checks if there are cyclic dependencies in the code using icCyclic, throws an error if found

#### Returns 
- o (same object but deeply sealed :smile: )


### LICENSE
License under MIT LICENSE. See [LICENSE](LICENSE) for more details.