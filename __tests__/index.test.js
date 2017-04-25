const deepSeal = require('../src/index');

test('deep seal seals object recursively', function () {
    const obj = { x: 2113 };
    const obj2 = {y: obj, a: 321 }

    deepSeal(obj2);
    expect(Object.isSealed(obj)).toBe(true);
    expect(Object.isSealed(obj2)).toBe(true);

    try {
      obj.a = 'Hello World';
    } catch (error) {
      expect(error instanceof TypeError).toBeTruthy();      
    }

    delete obj.x
    delete obj2.y

    expect(obj.a).toBeUndefined();
    expect(obj.tee).toBeUndefined();
    
    expect(obj.x).toBe(2113)
    expect(obj2.y).toEqual(obj);
});

test('deep seal functions in strict mode', function () {
    const f = function x () {};
    
    deepSeal(f);
    
    expect(Object.isSealed(f)).toBe(true);
});


test('deep seal cyclic objects throws error', () => {
    const x = {};
    x.x = x;

    try {
      deepSeal(x, {
          cycleCheck: true
      });
    } catch (error) {
      expect(error instanceof TypeError).toBe(true);
      expect(error.message).toMatch(/Cyclic references will result in an infinite loop/i);
    }
});