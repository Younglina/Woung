<script setup>

defineProps({
  title: String,
  date: String,
  tags: Array,
  link: String,
})
</script>

<template>
  <a
    class="VPFeature VPLink"
    :href="link"
  >
    <article class="box">
      <h2 class="title" :title="title">{{ title }}</h2>
      <p class="date">{{ date }}</p>
      <div class="tags">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
        <span>{{ tags.join(' ') }}</span>
      </div>
    </article>
  </a>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.date {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tags {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tag{
  background-color: var(--vp-c-bg-soft);
}
.title,.details{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>