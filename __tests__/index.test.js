const deepSeal = require('../index');


test('deep seal seals object recursively', () => {
    const obj = { x: 2113 };
    const obj2 = {y: obj, a: 321 }

    deepSeal(obj2);

    expect(Object.isSealed(obj)).toBe(true);
    expect(Object.isSealed(obj2)).toBe(true);
});

test('deep seal functions in strict mode', () => {
    'use strict';

    const f = function x () {};
    deepSeal(f);
    
    expect(Object.isSealed(f)).toBe(true);
});