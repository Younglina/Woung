---
date: "2024-09-14"
title: 少儿编程Scratch入门项目-迷宫寻宝
author: Younglina
categories:
  - 少儿编程
tags:
  - scratch
---

## 游戏介绍

在“迷宫寻宝”游戏中，我们可以自己上传孩子日常生活中喜欢的东西，或者直接使用网站中自带的素材，操控我们的主角色在迷宫中去寻找我们设置好的“宝藏”，可以指定寻宝的先后顺序，或者自由寻找，通过设计和游玩该游戏可以锻炼孩子的以下一些能力：

1.**逻辑思维能力**：孩子需要根据迷宫的布局来思考如何获取“宝藏”，这有助于他们学习分析问题并找出解决问题的方法。

2.**空间认知能力**：在解决迷宫问题时，孩子们会自然而然地增强对空间关系的理解，这对于他们的空间想象力是非常有益的。

3.**耐心与毅力**：完成一个复杂的迷宫可能需要一段时间，这能够帮助孩子学会坚持并克服挫折感。

4.**决策能力**：在面对多个路径选择时，孩子须做出决定，怎么走路劲最短，这是培养决策能力的好方法。

5.**注意力集中**：迷宫游戏要求高度集中的注意力，以避免走错路。

## 前期准备

1.需要到[scratch 中社](https://www.scratch-cn.cn/)创建一个账号，qq 邮箱就可以。

2.一张迷宫地图

3.想要找的宝藏可自己上传图片，或者直接使用网站提供的素材

## 基础使用

使用方法非常简单，就是代码区（积木）的搭建，可以直接拖拽进行，网站内置了很多角色、造型、声音，这些东西也都可以自己上传

![baseuse0](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse0.png)

![image-20240911142433105](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse2.png)

![image-20240911142614447](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse3.png)

![baseuse4](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse4.jpg)

## 游戏设计

### 1.游戏规则

操作主角色，使用键盘的 ↑↓←→ 四个方向进行移动，碰到墙壁时返回上一步，直到找到所有“宝藏”

### 2.所需角色

**地图**：可以自己用笔画完以后拍照上传，或者直接网上搜

**主角色**：主角色可自己上传孩子图片，或使用网站提供的素材

**宝藏**：可上传孩子日常中喜欢的玩具、食物等，或使用网站提供的素材

### 3.所需知识

舞台区是一个以中心(0, 0)为原点的二维坐标系，一般以 `x` 命名横坐标，`y` 命名纵坐标，当我们设置 `x坐标增加1` 时，就是往右(→)平移 1，`x坐标增加-1` 既 `x-1` 就是往左(←)平移 1，`y坐标` 同理，`增加1` 往上(↑)平移 1，`增加-1` 往下(↓)平移 1。

如下一个点，初始位置为(1,3)，当设置 `x坐标增加1` 时，往右(→)移动，位置就到了(2,3)

![坐标1](https://gitee.com/Younglina/imags/raw/master/scratch/坐标1.jpg)

![坐标2](https://gitee.com/Younglina/imags/raw/master/scratch/坐标2.jpg)

### 4.代码搭建

上传一张地图角色，作为游戏背景，当游戏开始时，将它放到最底层，以防挡住我们的其他角色

![image-20240913165405454](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913165405454.png)

![image-20240913165634962](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913165634962.png)

鼠标移到页面右下角的“猫头”上，上传自己想要的或者直接在素材库中选取一个当做主角色，并调整好角色的大小和初始位置

![image-20240913170359104](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913170359104.png)

主角色创建好以后，就可以设置我们的“宝藏”角色了，同样的可以自己上传或者素材库中选取，这里我直接从素材库中，选了几个，然后手动在舞台区把它们拖动到了迷宫的几个地方

![image-20240913170716405](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913170716405.png)

整体的游戏画面现在已经搭建好了，接下来就是代码的逻辑了，既然是要在迷宫中寻找宝藏，那就需要控制主角色(小猫)的移动，在每次移动完成以后，记录下当前移动的位置，即坐标，为的是在碰到墙壁以后返回上一步的位置，所以这里我们需要设置**两个变量**来存储小猫对应的**x 轴坐标**，**y 轴坐标**

<img src="https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913171428182.png" alt="image-20240913171428182" style="zoom:50%;" />y 轴坐标同样步骤创建一个。

因为游戏是一个持续的过程，不是在操作一步以后就停止了，所以我们需要加上一个“重复执行”的控制代码

![image-20240913171719738](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913171719738.png)

然后把我们自己的 x,y 轴坐标变量设为舞台区对应的 x,y 轴坐标

![image-20240913172142990](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913172142990.png)

舞台区的 x,y 轴坐标在运动类型下面

![image-20240913171849421](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240913171849421.png)

接下来就是操作四个方向的逻辑搭建了，整体代码是一样的，通过控制键盘按下的方向键和设置 x,y 轴的变量数值。

以按右(→)方向键为例，控制逻辑就是"如果按下 → 键那么"就"将 x 坐标增加 5"，这里增加的数值可以自行控制，然后我们还可以给它加上一个音效，使其更有互动性。

在“控制”类型下找到“如果<>那么”

![image-20240914091634858](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914091634858.png)

在“侦测”类型下找到“按下 → 键”

![image-20240914091839800](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914091839800.png)

注意是选择“增加”，不要用到“设为”

![image-20240914091944325](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914091944325.png)

然后去搜索一个"Boing"的声音，可自行选择其他声音

![image-20240914092132801](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914092132801.png)

注意这里选择的是“等待播完”，为的是防止上一次移动完声音还没播放完，下一次移动又开始播放声音形成噪音，这样也能变相的稍微减慢移动的速度

![image-20240914092209425](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914092209425.png)

其他方向的流程都是如此，就是注意“左右”方向对应的是“x 坐标”的“减加”，“下上”方向对应的是“y 坐标”的“减加”

![image-20240914092602912](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914092602912.png)

最后就是当碰到墙壁时，我们需要返回上一步，这里就是单独设置两个变量要用到的地方，然后给添加一个声音来增加互动性。

这里需要用到“侦测”类型下的“碰到颜色<>?”，它可以直接从角色中提取颜色，这里我们提取墙壁对应的颜色

![image-20240914093044735](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914093044735.png)

如果碰到墙壁对应的颜色，我们就移动到我们添加的'x,y'变量位置

![image-20240914093254542](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914093254542.png)

![image-20240914093322306](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914093322306.png)

这样我们的主角色代码逻辑就完成了，接下来就是我们的“宝藏”角色对应的逻辑，它们的逻辑都是一样的，游戏开始时，我们把它显示出来，在“碰到”我们的主角色以后，播放一个声音，把它隐藏就好了。

![image-20240914093833657](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914093833657.png)

然后我们拖动苹果对应的整个代码块到其他角色上，就可以完成复制的效果，不用每个角色单独再搭建一次

![image-20240914094127882](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914094127882.png)

![image-20240914094226558](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914094226558.png)

## 总结

游戏核心的设计就在于，认识舞台区是一个以(0,0)为中心原点的直角坐标系，通过操作键盘的上下左右四个方向，控制主角色对应的"x,y"坐标的值完成移动，在碰到墙壁时返回上一步。

在线体验：https://www.scratch-cn.cn/project/?comid=66e4eaf14e63470f70023495
