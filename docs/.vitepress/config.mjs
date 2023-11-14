import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Woung",
  description: "woung vitepress blog",
  base: '/Woung', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  head: [['link', { rel: 'icon', href: '/Woung.svg' }]],
  themeConfig: {
    logo: { src: '/Woung.svg', width: 24, height: 24 },
    outline: {
      level: [2,4],
      label: ' '
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: '记录', link: '/blog/aliyun-ecs', activeMatch: '/blog/' },
      { text: '项目', link: '/projects/vue3-jdz', activeMatch: '/projects/' },
    ],

    sidebar: {
      '/blog/': {
        base: '/blog/',
        items: [{
          text: '记录',
          items: [
            { text: '阿里云服务器', link: 'aliyun-ecs' },
            { text: 'github pages', link: 'github-pages' },
            { text: '配置git相关别名', link: 'alias' },
            { text: 'LRU缓存', link: 'LRUCache' },
            { text: 'vitepress配置gitalk', link: 'vitepress-gitalk' },
            { text: 'github pages', link: 'github-pages' },
          ]
        }
        ]
      },
      '/projects/': {
        base: '/projects/',
        items: [
          {
            text: '项目',
            items: [
              { text: '景德镇本地特色', link: 'vue3-jdz' },
            ]
          }
        ]
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Younglina' },
      { icon: {svg:'<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/></svg>'}, link: 'https://juejin.cn/user/817692381290190'}
    ]
  }
})
