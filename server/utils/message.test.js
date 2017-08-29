const {generateMessage} = require('./message.js');
const expect = require('expect');

describe('Message', () => {
  it('Should return generate correct message', (done) => {
    var from = 'parish@example.com';
    var text = 'Hey Parish!';

    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
    done();
  })
})