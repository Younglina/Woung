<script setup>
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor from '@toast-ui/editor';
import { ref, onMounted } from 'vue';

const editor = ref('')

onMounted(()=>{
  editor.value = new Editor({
  el: document.querySelector('#editor'),
  height: '500px',
  initialEditType: 'markdown',
  previewStyle: 'vertical',
  hooks: {
    addImageBlobHook: customUpload
  }
});

editor.value.getMarkdown();

})

function customUpload(file, callback) {
  console.log(file)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('filename', Date.now() + '_' + file.name);
  // fetch('http://localhost:3001/api/upload', {
  fetch('http://121.40.220.158:3001/api/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  }).then(response => {
    // 检查响应的状态码
    if (response.ok) {
      // 解析响应的JSON数据
      return response.json();
    } else {
      // 处理错误状态码
      throw new Error('Request failed with status ' + response.status);
    }
  })
    .then(res => {
      // 处理解析后的数据
      res.data.map(item => {
        callback(item.url)
      })
    })
    .catch(error => {
      // 处理捕获的错误
      console.error(error);
    });
}
const username = ref('')
const password = ref('')
const handleLogin = () => {
  // fetch('http://localhost:3001/api/login', {
    fetch('http://121.40.220.158:3001/api/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }).then(function (res) {
    console.log(res)
  })
}
</script>
<template>
  <div>
    <input type="text" placeholder="用户名" v-model="username">
    <input type="password" placeholder="密码" v-model="password">
    <button @click="handleLogin">登录</button>
  </div>
  <div id="editor"></div>
</template>
<style scoped lang='scss'></style>