<script setup>
import { data as posts } from './docs.data.js'
import { VPHomeFeatures } from 'vitepress/theme'
console.log(posts)
const features = posts.map(item=>{
  return {
    title: item.frontmatter.title,
    details: item.frontmatter.date,
    link: item.url
  }
})
</script>
<template>
  <VPHomeFeatures :features="features"/>
</template>
<style scoped lang='scss'></style>