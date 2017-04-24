const deepSeal = require('../index');


test('deep seal seals object recursively', () => {
    const obj = { x: 2113 };
    const obj2 = {y: obj, a: 321 }
    const f = function x () {};
    f.prototype.ok = 'google';


    deepSeal(obj2);
    deepSeal(f);

    expect(Object.isSealed(obj)).toBe(true);
    expect(Object.isSealed(obj2)).toBe(true);

    obj.a = 'Hello World'
    obj.tee = 'shirt'
    
    delete obj.x
    delete obj2.y

    expect(obj.a).toBeUndefined();
    expect(obj.tee).toBeUndefined();
    
    expect(obj.x).toBe(2113)
    expect(obj2.y).toEqual(obj);


    f.prototype.yo = 'seal'
    f.a = 'no'

    delete f.prototype.ok

    expect(f.prototype.yo).toBeUndefined();
    expect(f.a).toBeUndefined();
    expect(f.prototype.ok).toEqual('google');
});

test('deep seal functions in strict mode', () => {
    'use strict';

    const f = function x () {};
    
    deepSeal(f);
    
    expect(Object.isSealed(f)).toBe(true);
});