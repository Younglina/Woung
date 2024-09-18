---
date: "2024-09-18"
title: 少儿编程Scratch入门项目-打地鼠
author: Younglina
categories:
  - 少儿编程
tags:
  - scratch
---

## 游戏介绍

在设计和游玩“打地鼠”游戏中，可以锻炼孩子的以下一些能力：

1.**逻辑思维能力**：打地鼠游戏的设计涉及到条件语句、循环语句、逻辑与判断、随机数等编程逻辑，孩子在编程过程中需要思考如何安排地鼠的出现、如何检测击打动作、如何计分等。

2.**事件顺序规划**：规划游戏中的事件顺序，如游戏开始时的初始化设置（得分清零、地鼠初始隐藏等），游戏进行中的地鼠随机出现、被击中后的反应，以及游戏结束的判定条件等。这有助于孩子学会按照一定的顺序组织程序中的各个环节，提高逻辑连贯性。

3.**角色设计与创意**：孩子可以根据自己的想象设计地鼠和锤子（打地鼠的工具）的外观。地鼠可以是各种可爱或奇特的形象，锤子也可以有独特的造型，对于游戏场景，孩子能够自由发挥。比如设计一个充满奇幻色彩的草地场景，或者是在地洞里的地鼠世界等。

4.**手眼协调能力**：在玩 “打地鼠” 游戏时，孩子需要眼睛观察地鼠出现的位置，然后控制锤子去击打地鼠。这个过程中，孩子的眼睛看到地鼠的瞬间要快速将信息传递给大脑，大脑再指挥手部进行准确的操作，从而锻炼了手眼协调能力。

## 前期准备

1.需要到 scratch 中社：https://www.scratch-cn.cn/，创建一个账号，qq邮箱就可以。

2.一张打地鼠的背景图，可以自己画，或者网上搜

3.一个锤子的图片，可以自己画，或者网上搜

4.一个地鼠图片，可以自己画，或者网上搜，或者直接使用网站提供的松鼠素材

## 基础使用

使用方法非常简单，就是代码区（积木）的搭建，可以直接拖拽进行，网站内置了很多角色、造型、声音，这些东西也都可以自己上传

![baseuse0](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse0.png)

![image-20240911142433105](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse2.png)

![image-20240911142614447](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse3.png)

![baseuse4](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse4.jpg)

## 游戏设计

### 1.游戏规则

倒计时 30 秒，地鼠会从洞中随机出现，并停留随机时间，当操作锤子击打到地鼠后，得分加 1 同时隐藏地鼠。

### 2.所需角色与变量

**地洞图片**：可以自己画完以后拍照上传，或者直接网上搜

**地鼠**：可以自己画完以后拍照上传，或者直接网上搜，或使用网站提供的松鼠素材

**锤头**：可以自己画完以后拍照上传，或者直接网上搜

**倒计时**：新建一个初始值为 30 的倒计时

**得分**：集中地鼠的次数

### 3.所需知识

#### 随机数

给定一个最小和最大的范围，从中随机选择一个数，如有 10 个小纸条，在纸条上分别写上不同的数字， 1 - 10。把纸条放进一个盒子里，然后抽取纸条，并记录下抽到的数字放回纸条。在这个过程中，观察每次抽到的数字都是不可预测的，每次抽出的数都可能是 1 -10 之间的任何一个数，是随机出现的。

在打地鼠游戏中的使用场景是，地鼠是在一个随机数时出现，然后停留一段随机数的时间。

#### 逻辑与

逻辑与就像是我们平时说的‘并且’，它要求两个条件或事情都同时满足，结果才为真。

比如：“如果你想要去游乐园玩，并且你爸妈也同意带你去，那么你就可以去游乐园了。这里，‘你想要去游乐园玩’和‘你爸妈也同意带你去’就是两个需要同时满足的条件，就像逻辑与一样。

### 4.代码搭建

鼠标移动到页面右下角的“猫头”上，上传你的“地洞图片”

![image-20240918162448799](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918162448799.png)

![baseuse5](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse5.jpg)

到“变量”类型下面，新建两个变量，倒计时和得分

![image-20240918154713517](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918154713517.png)

当游戏开始时，把我们的打地鼠背景图定位到中心位置，并把它移到最后面，防止遮挡住其他角色，然后把“倒计时”变量设为 30，“得分变量”设为 0，随后广播游戏开始

![image-20240918155035195](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155035195.png)

![image-20240918155114120](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155114120.png)

![image-20240918155216105](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155216105.png)

“广播”需要到“事件”类型下面新建我们想广播的如“游戏开始”，“游戏结束”

![image-20240918155410950](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155410950.png)

倒计时的效果就是每隔 1 秒，将我们的“倒计时”变量增加"-1"即减 1，重复执行 30 次

![image-20240918155614720](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155614720.png)

最后广播游戏结束，停止所有脚本

![image-20240918155758219](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918155758219.png)

“地洞图”的相关逻辑就是这些，接下来我们梳理一下“地鼠”的相关逻辑。

当接收到“游戏开始”的广播时，“地鼠”应该是要隐藏的，然后在等待一个随机数以后再出现，随后等待一段时间隐藏。

当整个游戏开始时，如果检测到“地鼠”被击中，则立即隐藏“地鼠”且得分加 1。

首先创建一个“地鼠”角色，然后根据地洞数量，复制多个，这里我直接用了网站提供的一个松鼠作为“地鼠”角色。

右下角移动到页面右下角的“猫头”新建一个角色

![image-20240918162708960](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918162708960.png)

然后右键复制到和地洞数量相同

![image-20240918162830690](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918162830690.png)

![image-20240918160532117](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918160532117.png)

![image-20240918160559140](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918160559140.png)

隐藏的逻辑也是一样，可以自己定义随机数的范围

![image-20240918160633168](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918160633168.png)

如何检测到“地鼠”被攻击呢？我们的“锤子”应该有两种造型，正常情况下是“普通”的造型，在我们点击鼠标后切换到“攻击”的造型，可以很简单到“造型”功能下复制一个造型，然后使用拖拽功能调整一下角度就可以当做“攻击”模式了。

![image-20240918161107379](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161107379.png)

“打地鼠”是一个重复执行的过程，所以我们需要在“重复执行”的控制下判断，如果侦测到“地鼠”碰到“锤子”，并且我们的“锤子造型”需要是“攻击”模式才能算是打中

![image-20240918161439682](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161439682.png)

![image-20240918161506447](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161506447.png)

![image-20240918161546404](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161546404.png)

![image-20240918161704350](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161704350.png)

最后把当前“地鼠”隐藏然后把“得分”变量加 1

![image-20240918161758699](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918161758699.png)

这样我们的“地鼠”角色的逻辑就搭建完成了，一般我们会有多个“地鼠”，只需要把代码块整个移动到其他“地鼠”角色上，就可以实现复制效果了，不用再每个都手动搭建一遍了。可以手动修改每个“地鼠”的出现和隐藏随机数。

![image-20240918162008671](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918162008671.png)

## 总结

游戏核心的设计就在于，设置两个随机数控制地鼠的显示与隐藏。鼠标点击时控制锤头的不同模式，通过逻辑与判断是否得分。

在线体验：https://www.scratch-cn.cn/project/?comid=66ea8d7d4e63470f70029c10
