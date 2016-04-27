## less 使用技巧


1. 使用rem 值时如何获取三位小数,其他以此类推

  ```less
  /*@{attr} 这个是属性,属性值或者参数则不用写{}*/
.px2rem (@attr, @v) {
  @{attr}: unit(@v/@base, rem);
  //这样就可以获得三位小数了,而且是留有一定空间,以免布局被改变,移到到一行
  @{attr}: unit( floor(@v/@base * 1000) / 1000, rem);
  //或者使用这个: round(1.67, 1),但是有可能会导致,呵呵,万一计算机算出错,刚好大那么一点点,不能排除这种情况,布局...
  @{attr}: unit( round(@v/@base, 3) , rem);
}
  ```
2. 使用rem值设置属性值，如果需要小数结合上面获取小数使用。
   
   ```less
   .attr (@attr, @v1, @v2) {
    @{attr}: unit(@v1/@base, rem) unit(@v2/@base, rem);
    }
    
    // 设置四个值
    .attr4 (@attr, @v1, @v2, @v3, @v4) {
     @{attr}: unit(@v1/@base, rem) unit(@v2/@base, rem) unit(@v2/@base, rem)
     unit(@v2/@base, rem);
     }
   ```
3. 
