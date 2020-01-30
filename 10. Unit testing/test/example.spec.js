require('should');

describe('Mocha example', () => {

  it('should not pass', () => {
    throw new Error('it is not passing');
  });

  it('should.js should throw an error', () => {
    // (1).should.be.eql(2);
    const obj = {
      id: 'string',
    };
    obj.should.have.property('id').which.is.a.Number()
  });

});
