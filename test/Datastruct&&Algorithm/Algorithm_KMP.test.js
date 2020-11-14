var {
  match,
  getTargetList,
} = require('../../web-developer/Datastruct&&Algorithm/string/Algorithm_KMP');
var expect = require('chai').expect;

describe('KMP算法测试', function () {
  it.skip('getTargetList', function () {
    expect(getTargetList('aaac').join('')).to.be.equal('-1012');
  });
  it('match', function () {
    expect(match('aaadaaac', 'a')).to.be.equal(true);
    expect(match('aaadaaac', 'aa')).to.be.equal(true);
    expect(match('aaadaaac', 'aad')).to.be.equal(true);
    expect(match('aaadaaac', 'ada')).to.be.equal(true);
    expect(match('aaadaaac', 'adaa')).to.be.equal(true);
    expect(match('aaadaaac', 'aaac')).to.be.equal(true);
    expect(match('abcdefg', 'ef')).to.be.equal(true);
    expect(match('wwww.', 'ww.')).to.be.equal(true);
    expect(match('abcdefg', 'ac')).to.be.equal(false);
    expect(match('aaadaaad', 'aaac')).to.be.equal(false);
  });
});
