import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Woung",
  description: "my blog",
  base: '/Woung', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  themeConfig: {
    logo: { src: '/Woung.svg', width: 24, height: 24 },
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
