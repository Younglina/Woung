---
title: flask+vite+docker实现pdf转图片
author: Younglina
date: '2024-04-26'
showAccessNumber: true
categories:
 - 项目
tags:
 - Flask
 - Docker
 - Vue3
---

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71b44f82636444c884f2c933ff85a215~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2022&h=898&s=85860&e=png&b=ffffff)
[在线访问](https://younglina.wang/flask)
[源码地址](https://github.com/Younglina/flask-repo)

实践是学习的快速方法，最近在学python，想通过写一个轻量、可快速构建的项目，于是就有了这个网站，功能很简单，就是jpg和png互转，pdf转jpg、png的功能，后端框架是Flask，前端还是vue3。

实践过程中，学习了以下知识
- 在python中转图片格式的方法、zip的打包、使用PyMuPDF库把pdf转图片，
- 前端的拖拽上传
- docker的部署
## Flask

Flask 是一个用于构建 Web 应用的 Python 框架，适合小型项目和快速原型开发。

[英文官网](https://flask.palletsprojects.com/en/3.0.x/)，版本3.x

[中文官网](https://dormousehole.readthedocs.io/en/latest/)，版本2.x

### 安装

前置要求python的版本需要大于3.8

```
# 创建一个虚拟环境
mkdir flask_repo
cd flask_repo
python3 -m venv .mvenv
source .mvenv/bin/active # 激活环境，deactivate退出环境
pip install Flask
```

### 运行

```
flask --app 文件名 run --debug
```

### 基础使用

`@app.route` 配置路由，对应前端请求路径

```
from flask import Flask
​
@app.route('/')
def index():
    return 'Index Page'
```

请求方法

```
from flask import Flask
​
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
```

```
from flask import Flask
​
@app.get('/login')
def login_get():
    return show_the_login_form()
    
@app.post('/login')
def login_post():
    return do_the_login()
```

### 返回静态文件

如需要访问vue打包以后的文件

```
from flask import Flask
​
# 通过指定static_folder参数来告诉Flask静态文件所在的目录
# 指定template_folder,直接渲染Vue打包后的index.html
# 使用static_url_path参数可以设置静态文件请求的URL前缀，配合vue打包时vite.config.js里指定的base。如果不指定，Flask会使用默认的/static
app = Flask(__name__, static_folder='../static', template_folder='../static', static_url_path='/flask')
​
@app.route("/flask")
def index():  
    return render_template('index.html')
```

### 前端拖拽上传

没了解之前还以为是什么高大上的东西，了解之后发现就是监听了拖拽的两个方法

```
<script setup>
function handleDrop(e) {
  e.preventDefault();
  console.log(e.dataTransfer.files) //文件就在这里
}
​
function handleDragover(e) {
  e.preventDefault();
}
</script>
<template>
  <div @dragover="handleDragover" @drop="handleDrop">
    <p>可拖拽文件上传</p>
  </div>
</template>
```

### docker容器

大概了解一下image和container的概念，知道构建image和运行container，然后多看几个流行项目中的Dockerfile，仿造写一写，基本就会用了。

在项目根目录上新建一个Dockerfile

```
FROM python:3.11 # 指定基础镜像
WORKDIR /app/flask/ # 在Docker容器中设置工作目录
COPY . . # 将当前目录（包括所有文件和子目录）复制到Docker容器的/app/flask/目录中
RUN pip install --no-cache-dir -r requirements.txt # 根据requirements.txt文件安装Python依赖项，不缓存包。
​
EXPOSE 5000 # 公开Docker容器的5000端口，可供外部访问
​
CMD ["flask", "--app", "文件名", "run"] # 指定Docker容器启动时要运行的命令。
```

```
# 然后构建image
docker build -t flask_vite .
# 发布image
docker push user/imagename 
# 到想用的地方拉取
docker pull user/imagename 
# 最后运行docker，前面的5000是服务器的端口可自定义，后面的5000是容器暴露出来的端口，dockerfile中expose后面的
docker run -p 5000:5000 imagename 
​
```
