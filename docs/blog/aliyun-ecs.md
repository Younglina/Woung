---
title: 阿里云服务器
author: Younglina
date: '2023-11-09'
categories:
 - 文档
tags:
 - 服务器
---
# 阿里云服务器
## 安装nodejs
cd /opt
mkdir node
cd node
https://nodejs.org/en/download/
![[Pasted image 20231108151255.png]]
wget https://nodejs.org/dist/v20.9.0/node-v20.9.0-linux-x64.tar.xz
tar -xvf node-v20.9.0-linux-x64.tar.xz
mv node-v20.9.0-linux-x64. nodejs
ln -s /opt/node/nodejs/bin/npm /usr/local/bin/npm
ln -s /opt/node/nodejs/bin/node /usr/local/bin/node
npm i -g pnpm
ln -s /opt/node/nodejs/bin/pnpm /usr/local/bin/pnpm

## 安装mysql
https://blog.csdn.net/weixin_50002038/article/details/132060426

## 安装git
yum install -y git
git config –global user.name
git config –global user.email

## 安装nginx
https://developer.aliyun.com/article/1139808?spm=5176.26934562.main.9.42ff6429F5mNsC