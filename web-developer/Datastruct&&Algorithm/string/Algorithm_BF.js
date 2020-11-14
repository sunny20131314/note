// 暴力匹配法
// 运用了回溯法

function matchBF(sStr, tStr) {
  const sStrLen = sStr.length;
  const tStrLen = tStr.length;

  for (let sPos = 0; sPos < sStrLen; sPos++) {
    let tPos = 0;
    let initSPos = sPos;
    while (tPos < tStrLen) {
      // 匹配
      if (sStr[initSPos] === tStr[tPos]) {
        initSPos++;
        tPos++;
      } else {
        break;
      }
    }

    // 找到
    if (tPos === tStrLen) {
      return true;
    }
  }

  return false;
}

module.exports = {
  matchBF,
};
