<script setup>
import { data as posts } from './docs.data.js'
import VPFeatures from './VPFeatures.vue'
const features = posts.map(item=>{
  return {
    ...item.frontmatter,
    link: '/Woung'+item.url,
  }
}).filter(item=>item.title)
</script>
<template>
  <VPFeatures :features="features"/>
</template>
<style scoped lang='scss'></style>