const deepSeal = require('../src/index');

test('deep seal seals object recursively', function () {
    const obj = { x: 2113 };
    const obj2 = {y: obj, a: 321 }

    deepSeal(obj2);
    expect(Object.isSealed(obj)).toBe(true);
    expect(Object.isSealed(obj2)).toBe(true);


    expect(() => obj.a = "Hello World").toThrow(TypeError);
    expect(() => delete obj.x).toThrow(TypeError);
    expect(() => delete obj2.y).toThrow(TypeError);

    expect(obj.a).toBeUndefined();
    expect(obj.tee).toBeUndefined();
    
    expect(obj.x).toBe(2113)
    expect(obj2.y).toEqual(obj);
});

test('deep seal functions in strict mode', function () {
    'use strict';
    
    const f = function x () {};
    deepSeal(f);
    expect(Object.isSealed(f)).toBe(true);
});


test('deep seal cyclic objects throws error', () => {
    const x = {};
    x.x = x;
    expect(() => deepSeal(x, true)).toThrow(TypeError);
});