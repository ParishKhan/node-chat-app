const {generateMessage, generateLocationMessage} = require('./message.js');
const expect = require('expect');

describe('generateMessage', () => {
  it('Should return generate correct message', (done) => {
    var from = 'parish@example.com';
    var text = 'Hey Parish!';

    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('string');
    done();
  })
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object', () => {
    var from = 'Admin', lat = 1, lon = 1;

    var locationdata = generateLocationMessage(from, lat, lon);

    expect(locationdata.from).toBe(from);
    expect(locationdata.url).toBe("https://www.google.com/maps?q=1,1");
    expect(locationdata.createdAt).toBeA('string');
  })
})