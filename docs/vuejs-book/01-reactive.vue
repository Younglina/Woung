<template>
  <div id="demo"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const bucket = new Set()
  const data = { text: 'hello world' }

  const obj = new Proxy(data, {
    get(target, key) {
      bucket.add(effect)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      bucket.forEach(fn => fn())
      return true
    }
  })

  function effect() {
    document.querySelector('#demo').innerText = obj.text
  }

  effect() // 触发读取
  // 修改响应式数据
  setTimeout(() => {
    obj.text = 'hello vue3'
  }, 1000)

})
</script>