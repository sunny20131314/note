// 查找主串 sStr, 子串 tStr是否匹配
function matchKMP(sStr, tStr) {
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
  const end = tStr.length - 1;

  // note: 最初版 version: 0，可优化
  // 时间复杂度 O(n*n)
  // let targetList = [-1, 0];
  // for (let k = 2; k <= end; k++) {
  //   // 开始匹配目标串位置[0, k], 从多开始匹配
  //   let targetPos = 0;
  //   for (let pos = k - 1; pos > 0; pos--) {
  //     const preffixStr = tStr.slice(0, pos);
  //     const suffixStr = tStr.slice(k - pos, k);
  //     if (preffixStr === suffixStr) {
  //       targetPos = preffixStr.length;
  //       break;
  //     }
  //   }
  //   targetList.push(targetPos);
  // }

  // 可优化处：当前匹配处与回溯处值相同时，可直接不用对比啦
  // note: 改良版 version: 1，可优化
  // note: 优化，与查找子串类似，回溯位置~
  // 关键点: 最大子串是在之前已匹配的子串的基础上，要么匹配：则在之前已匹配的位置 + 1，或不匹配，回溯到上一个匹配字符串or最初位置
  // 思路: 在字符串为tstr[0, preffix-1]，找到前缀为tstr[0, x]，后缀tstr[preffix-1-x, preffix-1]完全的匹配位置(即找到x), 决定了当前位置不匹配时回溯的位置
  let targetList = [-1];
  // 前缀是固定的，后缀是相对的
  let preffix = 0;
  let suffix = -1;
  while (preffix < end) {
    // 回到最初位置 or 相同时
    if (suffix < 0 || tStr[preffix] === tStr[suffix]) {
      preffix++;
      suffix++;
      // note: 设置的是匹配失败时，回溯的位置
      targetList[preffix] = suffix;
    } else {
      suffix = targetList[suffix];
    }
  }

  return targetList;
}

module.exports = { matchKMP, getTargetList };
