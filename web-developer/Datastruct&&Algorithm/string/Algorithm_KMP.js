// 查找主串 sStr, 子串 tStr是否匹配
function match(sStr, tStr) {
  const targetList = getTargetList(tStr);

  const sStrLen = sStr.length;
  const tStrLen = tStr.length;
  let tPos = 0;
  for (let sPos = 0; sPos < sStrLen; ) {
    // 匹配
    if (sStr[sPos] === tStr[tPos]) {
      sPos++;
      tPos++;
      if (tPos === tStrLen) {
        return true;
      }
    } else {
      // 不匹配时, 找到目标位置
      tPos = targetList[tPos];
      if (tPos < 0) {
        sPos++;
        tPos++;
      }
    }
  }

  return false;
}

// 匹配失败时，下一个匹配位置
function getTargetList(tStr) {
  let targetList = [-1, 0];

  const len = tStr.length - 1;

  // todo: 优化：与前相同时，可跳啊~
  for (let k = 2; k <= len; k++) {
    // 开始匹配目标串位置[0, k], 从多开始匹配
    let targetPos = 0;
    for (let pos = k - 1; pos > 0; pos--) {
      const preffixStr = tStr.slice(0, pos);
      const suffixStr = tStr.slice(k - pos, k);
      if (preffixStr === suffixStr) {
        targetPos = preffixStr.length;
        break;
      }
    }
    targetList.push(targetPos);
  }

  return targetList;
}

module.exports = { match, getTargetList };
