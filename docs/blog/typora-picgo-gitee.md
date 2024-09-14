---
date: "2024-09-14"
title: Typora+PicGo搭建Gitee图床
author: Younglina
categories:
  - 记录
tags:
  - 图床
---

在日常使用 `Typora` 写文档时，难免会碰到需要插入图片的情况，如果图片是本地的，那么在网站上发布时可能会因为转存失败而无法显示，为了解决这个问题，我们可以使用 `PicGo` 配合 `Typora` 搭建 `Gitee` 图床，在插入图片时自动将图片上传到 Gitee，并将图片的 URL 链接插入到 Markdown 文档中。以下是详细的搭建步骤。

## 所需配置

**1.Typora**：我用的是免费版的，版本号是 1.8.10，配置图片方面应该没有什么差别

**2.PicGo**：我用的 2.4.0-beta.8，可以去[github](https://github.com/Molunerfinn/picgo/releases)自行下载

**3.gitee**：一个 gitee 的账号，和一个存放图片的仓库

## 配置 gitee

在 `gitee` 创建一个仓库，名字随意，注意创建完成以后去管理里面把仓库设置为开源即可。

![image-20240914150555733](https://gitee.com/Younglina/imags/raw/master/blog/image-20240914150555733.png)

然后去设置里面生成新令牌

![image-20240914150959847](https://gitee.com/Younglina/imags/raw/master/blog/image-20240914150959847.png)

生成好以后，保存好，后面在 PicGo 里面需要用到

![image-20240914151103482](https://gitee.com/Younglina/imags/raw/master/blog/image-20240914151103482.png)

## 配置 PicGo

在 `PicGo` 的插件设置中搜索 `gitee` 并安装对应插件

![image-20240914150128706](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914150128706.png)

安装完成以后，图床设置下面就会多出一个 `Gitee图床` ，配置以后就可以使用了

![image-20240914151537355](https://gitee.com/Younglina/imags/raw/master/scratch/image-20240914151537355.png)

## 配置 Typora

`Typora` 的配置就比较简单了，在设置中的图像类型下面配置如下两个地方就行

![image-20240914151800224](https://gitee.com/Younglina/imags/raw/master/blog/image-20240914151800224.png)

现在直接复制图片到 `Typora` 的时候，它会自动打开 `PicGo` 进行图片上传，然后把上传后的链接插入到文档中了。

![image-20240914152115746](https://gitee.com/Younglina/imags/raw/master/blog/image-20240914152115746.png)

## 总结

整个流程的配置就是这样，为了后期图片方便管理，可以创建多个 `Gitee图床` 对应不同的目录，上传图片之前，修改好图片名
