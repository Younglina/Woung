<template>
  <fieldset>
    <legend>结果演示</legend>
    <div id="demo2"></div>
  </fieldset>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const bucket = new Set()
  const data = { text: 'hello world' }
  let activeEffect // [!code ++]

  const obj = new Proxy(data, {
    get(target, key) {
      if (activeEffect) { // [!code ++]
        bucket.add(activeEffect) // [!code ++]
      } // [!code ++]
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      bucket.forEach(fn => fn())
      return true
    }
  })

  function effect(fn) {
    activeEffect = fn
    fn()
  }

  effect(() => {
    // 输出两次
    console.log('effect run')
    document.querySelector('#demo2').innerText = obj.text
  }) // 触发读取
  // 修改响应式数据
  setTimeout(() => {
    // obj.text = 'hello vue3' // [!code --]
    // 设置不存在的属性
    obj.notExist = 'hello vue3' // [!code ++]
  }, 1000)

})
</script>