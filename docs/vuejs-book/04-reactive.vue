<template>
  <fieldset>
    <legend>结果演示</legend>
    <div id="demo4"></div>
  </fieldset>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 使用WeakMap 代替 Set 作为桶的数据结构
  const bucket = new WeakMap()
  const data = { text: 'hello world', ok: true }
  let activeEffect

  const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
      // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
      track(target, key)
      // 返回属性值
      return target[key]
    },
    // 拦截设置操作
    set(target, key, newVal) {
      // 设置属性值
      target[key] = newVal
      // 把副作用函数从桶里取出并执行
      trigger(target, key)
      return true
    }
  })

  function track(target, key) {
    // 没有 activeEffect，直接 return
    if (!activeEffect) return
    // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
    let depsMap = bucket.get(target)
    // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()))
    }
    // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
    // 里面存储着所有与当前 key 相关联的副作用函数：effects
    let deps = depsMap.get(key)
    // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    // 最后将当前激活的副作用函数添加到“桶”里
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
  }

  function trigger(target, key) {
    // 根据 target 从桶中取得 depsMap，它是 key --> effects
    const depsMap = bucket.get(target)
    if (!depsMap) return
    // 根据 key 取得所有副作用函数 effects
    const effects = depsMap.get(key)
    // 执行副作用函数
    // effects && effects.forEach(fn => fn()) // [!code --]
    const effectsToRun = new Set(effects) // [!code ++]
    effectsToRun.forEach(fn => fn()) // [!code ++]
  }

  function effect(fn) {
    const effectFn = () => {
      cleanup(effectFn)
      activeEffect = effectFn
      fn()
    }
    effectFn.deps = []
    effectFn()
  }

  function cleanup(effectFn) {
    for (let i = 0; i < effectFn.deps.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }
    effectFn.deps.length = 0
  }

  effect(() => {
    console.log('effect run4')
    document.querySelector('#demo4').innerText = obj.ok ? obj.text : 'not'
  }) // 触发读取
  // 修改响应式数据
  setTimeout(() => {
    obj.ok = false
  }, 1000)
  setTimeout(() => {
  }, 1000)

})
</script>