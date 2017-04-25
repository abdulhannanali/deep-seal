/**
 * isCyclic
 * Checks if there are cyclic objects within in the code,
 * which can cause StackErrors within the code.
 * 
 * Code is optimized using WeakMap and is borrowed from 
 * Vjeux's Blogpost http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
 * and the WeakMap idea is borrowed from Douglas Crockford's cycle.js implementation in JSON-js
 * 
 * Quite cool stuff!
 * 
 * @flow
 */
'use strict';

function isCyclic (obj: Object): boolean {
  const seenObjects = new WeakMap();
  
  function detect (obj) {
    let detected = false;

    if (typeof obj === 'object') {
      if (seenObjects.has(obj)) {
        return true;
      }

      seenObjects.set(obj);
      Object.getOwnPropertyNames(obj).some(key => {
        detected = obj.hasOwnProperty(key) && detect(obj[key]);
      });
    }

    return detected;
  }

  return detect(obj);
}

module.exports = isCyclic;