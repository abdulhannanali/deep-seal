/**
 * deep-seal
 * 
 * Based on the deep-freeze module provided by the substack.
 * Seals the object using Object.seal recursively, battle tested
 * code to include within your repository.
 */
'use strict';

// Prevents Error in Strict Mode
const FUNCTION_PROPERTY_EXCEPTIONS = ['arguments', 'callee', 'caller'];

/**
 * Recursively calls Object.seal on the Function and Objects and all their 
 * references
 * 
 * @param {Object|Function} o Value to be sealed deeply
 * @param {Object} options 
 * @return {Object|Function} Sealed value
 */
function deepSeal (o, options) {
  const typeO = typeof o;
  Object.seal(o);

  Object.getOwnPropertyNames(o).forEach(name => {
    const prop = o[name];

    if (o.hasOwnProperty(name)
    && prop !== null
    && typeO === 'object' || typeO === 'function'
    && !isException(prop, typeO)
    && !Object.isSealed(prop)) {
      deepSeal(prop);
    }
  });

  return o;
}

/**
 * Helper method to determine if the property is an exception
 * and shouldn't be deeply sealed
 * 
 * @param {string} name property name to be check for exception case
 * @param {string} type type of the parent object/function
 * 
 * @return {Boolean} true if it's an exception
 */
const isException = ((prop, type) => (
  type === 'function'
  ? FUNCTION_PROPERTY_EXCEPTIONS.indexOf(prop) !== -1
  : false
));

module.exports = deepSeal;