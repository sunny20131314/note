# Observable
[TOC]

## 设计模式

### 观察者模式 Observer Pattern
将逻辑分为
- 发布者 Publisher（推出数据、产生事件）
  - 在很多观察者模式的文献中，产生事件一般使用 Subject(在Rxjs, 主体)
- 观察者 Observer （消费数据，订阅、响应事件）

#### 优点
分而治之
把复杂分解：
1. 产生事件： 发布者的责任
2. 响应事件： 观察者的责任
3. 哪种发布者关联哪种观察者，-> 何时调用subscribe

### 迭代器模式 Iterator Pattern

迭代器： 可以遍历一个对象（数据集合）； 游标

#### 拉 & 推
pull & push
从数据消费者的角度来描述：  
     主动拿取：拉
不需要主动拿取：推


只要Obserser通过subscribe连接Observable对象之后，就可以接收到消息的推送。（Obserser不需要从Observable拉取数据） -> 迭代器


## Observable = Publisher + Iterator
Observable  是一个 Publisher
Obserser 通过subscribe连接两者



见rxios内的obserser说明
Observable是一个特殊类，接收一个处理 Observer 的函数，等待subscribe被调用；
Obserser就是一个普通对象，必须包含 名为next的函数，用于接收被“推”过来的数据。

### 处理
- 创造
- 跨越时间，可异步
- 永无止境
- 终止态
  - 完结状态
  - 出错状态
    - 如果不处理，那么会向上抛
- 退订


note: Rxjs 的事件，只有Obserser 通过 subscribe 订阅时，才会收到，调用 unsubscribe 就不会再收到

## Observer
形式：
  - 对象 {next, error, complete}
  - 函数入参 (() => 'next', () => 'error', () => 'complete')
    - 不处理error: (() => 'next', null, () => 'complete')