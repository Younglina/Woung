---
layout: home

title: "Woung"
titleTemplate: "零散记录"

hero:
  name: "Woung"
  text: "零散记录"
  tagline: 记录一下零散的技术文档
  actions:
    - theme: brand
      text: 开始
      link: /projects/vue3-jdz
    - theme: alt
      text: 源码
      link: https://github.com/Younglina/Woung
  image:
    src: /Woung.svg
    alt: Woung

# features:
#   - icon: 📝
#     title: 技术文档
#     details: 记录一些技术相关的
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 00%, #47caff 100%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
