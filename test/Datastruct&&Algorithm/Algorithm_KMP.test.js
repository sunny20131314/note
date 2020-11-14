var {
  matchKMP,
  getTargetList,
} = require('../../web-developer/Datastruct&&Algorithm/string/Algorithm_KMP');
var expect = require('chai').expect;

describe('字符串匹配KMP算法测试', function () {
  it.skip('getTargetList', function () {
    expect(getTargetList('aaac').join('')).to.be.equal('-1012');
  });
  it('matchKMP', function () {
    expect(matchKMP('aaadaaac', 'a')).to.be.equal(true);
    expect(matchKMP('aaadaaac', 'aa')).to.be.equal(true);
    expect(matchKMP('aaadaaac', 'aad')).to.be.equal(true);
    expect(matchKMP('aaadaaac', 'ada')).to.be.equal(true);
    expect(matchKMP('aaadaaac', 'adaa')).to.be.equal(true);
    expect(matchKMP('aaadaaac', 'aaac')).to.be.equal(true);
    expect(matchKMP('abcdefg', 'ef')).to.be.equal(true);
    expect(matchKMP('wwww.', 'ww.')).to.be.equal(true);
    expect(matchKMP('abcdefg', 'ac')).to.be.equal(false);
    expect(matchKMP('aaadaaad', 'aaac')).to.be.equal(false);
  });
});
