<script setup>
const data = { bar: 1, foo: 2 }
const bucket = new WeakMap()
let activeEffect
const effectStack = []
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
    return true
  }
})

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  let depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set()
  effects && effects.forEach(fn => {
    if (fn !== activeEffect) {
      effectsToRun.add(fn)
    }
  })
  effectsToRun.forEach(fn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (fn.options.scheduler) { // 新增
      fn.options.scheduler(fn) // 新增
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      fn() // 新增
    }
  })
}

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(activeEffect)
    // 将 fn 的执行结果存储到 res 中
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack.at(-1)
    // 将 res 作为 effectFn 的返回值
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

function computed(getter) {
  // value 用来缓存上一次计算的值
  let value
  // dirty 标志，用来标识是否需要重新计算值，为 true 表示“脏”，需要计算
  let dirty = true
  const effectFn = effect(getter, {
    lazy: true
  })
  const obj = {
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      return value
    }
  }
  return obj
}

const sumRes = computed(() => obj.foo + obj.bar)

console.log(sumRes.value)
</script>
<template></template>
<style scoped lang='scss'></style>