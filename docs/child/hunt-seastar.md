---
date: "2024-09-20"
title: 少儿编程Scratch入门项目-抓海星
author: Younglina
categories:
  - 少儿编程
tags:
  - scratch
---

## 游戏介绍

在设计和游玩“抓海星”的游戏中，可以锻炼孩子的以下一些能力：

1.**逻辑思维能力**：“抓海星”游戏的设计涉及到条件语句、循环语句、逻辑与判断等编程逻辑。

2.**数学技能**：理解坐标系、随机数的数学概念。

3.**手眼协调能力**：在玩 “抓海星” 游戏时，在控制章鱼角色通过键盘上下左右移动时，孩子需要具备良好的空间感知和方向感，以准确地将章鱼移动到目标位置，这有助于提升他们的手眼协调能力和空间认知能力。

## 前期准备

1.需要到 scratch 中社：https://www.scratch-cn.cn/，创建一个账号，qq邮箱就可以。

## 基础使用

使用方法非常简单，就是代码区（积木）的搭建，可以直接拖拽进行，网站内置了很多角色、造型、声音，这些东西也都可以自己上传

![baseuse0](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse0.png)

![image-20240911142433105](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse2.png)

![image-20240911142614447](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse3.png)

![baseuse4](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse4.jpg)

![baseuse5](https://gitee.com/Younglina/imags/raw/master/scratch/baseuse5.jpg)

## 游戏设计

### 1.游戏规则

游戏很简单，只需要使用键盘的上下左右键操作“章鱼”角色移动到“海星”角色的位置就行。

### 2.所需角色

**章鱼**：使用网站自带素材

**海星**：使用网站自带素材

**小鱼**：使用网站自带素材

### 3.所需知识

#### 坐标系

舞台区是一个以中心(0, 0)为原点的二维坐标系，一般以 `x` 命名横坐标，`y` 命名纵坐标，当我们设置 `x坐标增加1` 时，就是往右(→)平移 1，`x坐标增加-1` 既 `x-1` 就是往左(←)平移 1，`y坐标` 同理，`增加1` 往上(↑)平移 1，`增加-1` 往下(↓)平移 1。

如下一个点，初始位置为(1,3)，当设置 `x坐标增加1` 时，往右(→)移动，位置就到了(2,3)

![坐标1](https://gitee.com/Younglina/imags/raw/master/scratch/坐标1.jpg)

![坐标2](https://gitee.com/Younglina/imags/raw/master/scratch/坐标2.jpg)

#### 随机数

给定一个最小和最大的范围，从中随机选择一个数，如有 10 个小纸条，在纸条上分别写上不同的数字， 1 - 10。把纸条放进一个盒子里，然后抽取纸条，并记录下抽到的数字放回纸条。在这个过程中，观察每次抽到的数字都是不可预测的，每次抽出的数都可能是 1 -10 之间的任何一个数，是随机出现的。

在抓海星游戏中的使用场景是，小鱼在一个随机数时移动到随机位置。

### 4.代码搭建

创建一个海底世界的背景，鼠标移动到页面右下角的“相册”上，可以上传你自己想要的图片或者直接在网站的素材中选择，这里我们直接选择一个。

![image-20240920145641749](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920145641749.png)

![image-20240920145702212](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920145702212.png)

然后添加我们所需要的角色，鼠标移动到页面右下角的“猫头”上，可以上传你自己想要的图片或者直接在网站的素材中选择，这里我们直接选，找到“Octopus”章鱼，“Fish”小鱼，“Starfish”海星

![image-20240918162448799](https://gitee.com/Younglina/imags/raw/master/WhackMole/image-20240918162448799.png)

![image-20240920144527538](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920144527538.png)

![image-20240920144542565](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920144542565.png)

![image-20240920144555516](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920144555516.png)

添加好角色以后，可以在造型模块下看到每个角色都有不止一个造型，这里我们选择章鱼的 a,b 造型，删除掉其他造型。

选中要删除的造型，点击右上角的“垃圾桶”图标就能删除

![image-20240920144820238](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920144820238.png)

保留海星角色的两个造型，一个当做正常时候的样子，一个当做被章鱼抓住的惊恐的样子。

小鱼角色我们可以看到有 4 个完全不一样的造型，这里我们可以复制多个小鱼，然后只留下一种造型当做一种小鱼。

先右键复制多个，然后删除其他造型，就可以得到多种小鱼角色

![image-20240920145152381](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920145152381.png)

![image-20240920145311336](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920145311336.png)

最后随便移动一下位置和调整好它们的大小适配一下

![image-20240920145435253](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920145435253.png)

基本配置搭建好以后，接下来我们开始搭建代码块，首先搭建“章鱼”角色的代码，理一下它的逻辑。

“章鱼”角色需要上下左右移动，所以我们要侦测如果按下方向键，那么根据上面所学习的坐标系知识，修改对应操作的 x,y 轴数值使其移动，移动时我们可以修改它的造型增加互动性，由于这是一个重复执行的操作，所以这些代码块都需要包裹在一个“重复执行”的控制类下面。

![image-20240920150558809](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920150558809.png)

这里我们侦测如果“按下 → 键”，那么我们需要让“章鱼”角色往 → 移动，根据所学的坐标系知识，我们需要把 x 坐标增加一个数值

![image-20240920150714321](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920150714321.png)

![image-20240920150753581](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920150753581.png)

为了更有互动性，我们可以在移动以后修改”章鱼“角色造型，随后在等待 0.1 秒后，恢复原来的造型，就能达到一个简单的动态运动效果

![image-20240920151138531](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920151138531.png)

![image-20240920151213626](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920151213626.png)

往 → 移动的代码块我们就搭建好了，其他 3 个方向基本类似，就是侦测其他的方向键，修改对应的坐标轴数值即可。

![image-20240920151503604](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920151503604.png)

现在你能点击”绿旗“按钮开始，操作方向键移动”章鱼“角色看看效果了。

接下来我们开始搭建”海星“角色的代码，首先我们搭建它本身移动的代码。

当点击”绿旗“按钮开始游戏时，保持一个正面的方向，在 1 秒内让它移动到一个随机的位置，碰到边缘的话就反弹，等待 4 秒以后重复执行所有代码。

![image-20240920152752593](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920152752593.png)

![image-20240920152814026](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920152814026.png)

然后搭建被”章鱼“角色抓到的代码，如果侦测到”碰到章鱼角色“，那么我们切换它的造型为惊恐的状态，随后移动到随机位置逃离，等待 1 秒后，恢复正常造型，重复执行所有操作

![image-20240920153057549](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920153057549.png)

![image-20240920153130149](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920153130149.png)

”海星“角色的代码就搭建完成了，现在你可以操作”章鱼“角色去抓它看看效果了。

为了让游戏更生动，我们可以让之前添加的几个”小鱼“角色在海底游动，代码十分简单，就是重复执行在随机数内移动到随机位置的操作。

![image-20240920153540760](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920153540760.png)

![image-20240920153604032](https://gitee.com/Younglina/imags/raw/master/CatchStarfish/image-20240920153604032.png)

其他的小鱼代码都是一样，我们只需要拖动整个代码块到其他”小鱼“角色上就可以完成复制的操作了。

## 总结

游戏核心的设计就在于，设置控制”章鱼“角色在舞台区的坐标系中移动，侦测到抓到”海星“角色时，”海星“角色的随机移动。
