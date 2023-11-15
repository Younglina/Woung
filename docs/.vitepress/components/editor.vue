<script setup>
import { ref, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';


function customUpload(file, callback) {
  console.log(file)
  const formData = new FormData();
  formData.append('file', file[0]);
  formData.append('filename', Date.now() + '_' + file[0].name);
  // fetch('http://localhost:3001/web/upload', {
    fetch('http://121.40.220.158:3001/web/upload', {
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
      callback(res.data.map(item => item.url))
    })
    .catch(error => {
      // 处理捕获的错误
      console.error(error);
    });
}
const username = ref('')
const password = ref('')
const loginLoading = ref(false)
const isLogin = ref(0)
const handleLogin = () => {
  loginLoading.value = true
  // fetch('http://localhost:3001/api/login', {
    fetch('http://121.40.220.158:3001/api/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
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
      isLogin.value = 1
      loginLoading.value = false
    })
    .catch(error => {
      // 处理捕获的错误
      isLogin.value = 2
      loginLoading.value = false
      console.error(error);
    });
}

const content = ref('# Hello Editor');
const text = ref('')
const link = ref('')
const handleSave = () => {
  // fetch('http://localhost:3001/web/blog', {
    fetch('http://121.40.220.158:3001/web/blog', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content.value,
      text: text.value,
      link: link.value
    })
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
      console.log(res)
    })
    .catch(error => {
      // 处理捕获的错误
      console.error(error);
    });
  }
</script>
<template>
  <div class="editor">
    <div class="login">
      <input type="text" placeholder="用户名" v-model="username">
      <input type="password" placeholder="密码" v-model="password">
      <button @click="handleLogin">登录</button>
      <svg v-if="loginLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"/></svg>
      <svg v-if="isLogin==1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896z"/><path fill="currentColor" d="M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"/></svg>
      <svg v-if="isLogin==2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="currentColor" d="m466.752 512l-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"/><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896z"/></svg>
    </div>
    <div>
      <input type="text" placeholder="标题" v-model="text">
      <input type="text" placeholder="link" v-model="link">
    </div>
    <MdEditor v-model="content" @onUploadImg="customUpload" />
    <button @click="handleSave">保存</button>
  </div>
</template>
<style scoped>
.login {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.editor input {
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  height: 26px;
  line-height: 26px;
  outline: none;
  padding: 0 15px;
  margin-right: 6px;
  width: 180px;
}

.editor button {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 6px 15px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 6px;
}
</style>
