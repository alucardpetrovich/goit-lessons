const { assert } = require('chai');

function sum(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error();
    }
    return num1 + num2;
}

describe('Unit tests architecture sample', () => {
    before(() => {
        console.log('before block');
    });

    beforeEach(() => {
        console.log('beforeEach block');
    });
    
    afterEach(() => {
        console.log('afterEach block');
    });

    after(() => {
        console.log('after block');
    });

    it('should return sum', () => {
        const sumResult = sum(1, 3);
        const expectedResult = 4;
        assert.strictEqual(sumResult, expectedResult);
    });

    it('should fail if one of the args is not number', () => {
        assert.throw(() => sum(1, '1'));
    });
});
