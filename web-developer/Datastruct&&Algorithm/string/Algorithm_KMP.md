# KMP
在BF算法的基础上，进行优化，减少不必要的回溯

## 创始人
D.E.knuth   克努特
J.H.Morris  莫里斯
V.R.Pratt   普拉特

## 问题
sStr: 主串 被匹配串
tStr: 子串 匹配串
用子串去匹配主串，知道完全匹配

## 思路
1. 重点在于子串~
  - 计算出每个子串不匹配时，对应的下一步匹配位置
2. 遍历主串，每个字符进行匹配, 直到完全匹配 

