const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('IsRealString', () => {
  it('Should Reject Non-String value', () => {
    var result = isRealString({"name": "parish"});
    expect(result).toBe(false);
  });

  it('Should Reject String With Only Spaces', () => {
    var result = isRealString("    ");
    expect(result).toBe(false);
  });

  it('Should Allow String With Non-string cheracters', () => {
    var result = isRealString("parish");
    expect(result).toBe(true);
  });
})