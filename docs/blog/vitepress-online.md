---
title: vitepress中实现在线编写
author: Younglina
date:  2023-11-15
categories:
- 文档
tags:
- 记录
---
# vitepress中实现在线编写
最近又在倒腾vitepress，想着能不能在线编写文档，然后直接上传，然后就有了这篇文档（这就是用在线编写功能写的）。
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700029032017_blog.jpg)

顺便把[之前的网站](https://younglina.top/)精简一下，因为有些方法，官方已经提供了，就不用自己写了，然后又新加了一些功能。

初始化项目的步奏看看[官网](https://vitepress.dev/guide/getting-started#setup-wizard)，重点说一下如何实现在线编写的，该功能只是我自己的一个想法，如果大佬们有更好的方法，欢迎提供一下。

## MarkDown编辑器
编辑器我选用的是[md-editor-v3](https://github.com/imzbf/md-editor-v3/blob/develop/README-CN.md)，使用简单，功能完善。
### 安装
```javascript
pnpm i md-editor-v3
```
### 用法
```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');
</script>
```
## vitepress中使用
vitepress是可以直接在md文件中写vue3的，所以这里可以直接新建一个md文件，然后引入组件。
```vue
// editor.md
<script setup>
import editor from '../.vitepress/components/editor.vue'
</script>
<editor />
```

```vue
<!-- editor.vue -->
<script setup>
import { ref, computed } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useData } from 'vitepress';

const content = ref('# Hello Editor');
const theme = computed(()=>useData().isDark.value ? 'dark' : 'light')

const handleSave = () => {
  // 请求保存接口
  ...
}
</script>
<template>
  <MdEditor v-model="content" :theme="theme"/>
  <button class="save-btn" @click="handleSave">保存</button>
</template>
<style>
.save-btn{
  float: right;
  margin-top: 10px;
}
</style>
```
### 保存
说一下我的整个想法，我是在前端请求保存以后，后端(nodejs)直接把传过来的数据保存到vitepress对应的文件夹下，整个的数据格式就是一个markdown形式的字符串，然后切换到vitepress目录下运行npm run build。
### 关键代码
获取数据，拼接处理
```javascript
  // 前端传过来的 text: 文档标题，link：文件名(vitepress用于跳转)，content：文档内容
  const params = ctx.request.body
  const dates = dayjs(new Date).format('YYYY-MM-DD')
  const fileName = `${params.link}.md`
  // vitepress对应的文件夹
  const toFilePath = path.resolve(__dirname, '../../../Woung/docs/blog');
  // 需要保存的当前文件路径
  const filePath = path.join(toFilePath, fileName)
  let msg = ''
  // 拼接文档frontmatter
  let markdown = `---
title: ${params.text}
author: Younglina
date:  ${dates}
categories:
- 文档
tags:
- 记录
---
${params.content}
`
```

保存数据，重新打包
```javascript
fs.writeFile(filePath, markdown, 'utf-8', (err) => {
  if (err) {
    ctx.body = {
      "code": 200,
      "message": err
    }
  }

  // 处理vitepress的sidebar，我的vitepress是把sidebar抽离出了一个json文件
  const sidebarPath = path.resolve(__dirname, '../../../Woung/docs/.vitepress/sidebar.json');
  // 读取文件内容
  fs.readFile(sidebarPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const sidebar = JSON.parse(data)
    const blogs = sidebar['/blog/'].items[0].items
    // 把当前文件信息存储到sidebar中，并覆盖原文件
    blogs.push({ text: params.text, link: params.link })
    fs.writeFile(sidebarPath, JSON.stringify(sidebar), 'utf-8', (err) => {
      if (err) {
        console.error(err)
      }
    })
  });

  // 最后使用nodejs的child_process，切换到vitepress根目录，执行build
  const buildPath = path.resolve(__dirname, '../../../Woung');
  const command = `cd ${buildPath} && npm run build`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing command:', error);
      return;
    }

    console.log('Command executed successfully:', stdout);
  });
})
```

### 效果
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700031349347_image.png)
觉得编写的地方小，编辑器有全屏的功能
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700031442699_image.png)
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700031223433_image.png)
