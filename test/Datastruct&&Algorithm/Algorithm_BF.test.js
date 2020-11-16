var { matchBF } = require('../../web-developer/Datastruct&&Algorithm/string/Algorithm_BF');
var expect = require('chai').expect;

describe('字符串匹配BF算法测试', function () {
  it('matchBF', function () {
    expect(matchBF('aaadaaac', 'a')).to.be.equal(true);
    expect(matchBF('aaadaaac', 'aa')).to.be.equal(true);
    expect(matchBF('aaadaaac', 'aad')).to.be.equal(true);
    expect(matchBF('aaadaaac', 'ada')).to.be.equal(true);
    expect(matchBF('aaadaaac', 'adaa')).to.be.equal(true);
    expect(matchBF('aaadaaac', 'aaac')).to.be.equal(true);
    expect(matchBF('abcdefg', 'ef')).to.be.equal(true);
    expect(matchBF('wwww.', 'ww.')).to.be.equal(true);
    expect(matchBF('abcdefg', 'ac')).to.be.equal(false);
    expect(matchBF('aaadaaad', 'aaac')).to.be.equal(false);
  });
});
