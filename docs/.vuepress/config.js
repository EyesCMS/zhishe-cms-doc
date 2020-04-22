var nav = require('./nav.js')
var { EcosystemNav, ComponentNav } = nav

var utils = require('./utils.js')
var { genNav, getComponentSidebar, deepClone } = utils

module.exports = {
  title: 'zhishe-cms-web',
  description: 'A magical cms web',
  base: '/zhishe-cms-doc/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    repo: 'EyesCMS/zhishe-cms-web',
    docsRepo: 'EyesCMS/zhishe-cms-doc',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 3,
    algolia: {
      apiKey: 'ffce0083d0830de5f562c045a481410b',
      indexName: 'zhishe_cms_web'
    },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Api',
            link: '/api/'
          },
          {
            text: 'Features',
            items: genNav(deepClone(ComponentNav), 'EN')
          }
          //{
          //  text: 'Ecosystem',
          //  items: genNav(deepClone(EcosystemNav), 'EN')
          //},
          //{
          //  text: '中文站点(gitee)',
          //  link: 'xxx/zh/'
          //}
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Essentials',
              collapsable: false,
              children: genEssentialsSidebar()
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: genAdvancedSidebar()
            },
            {
              title: 'Other',
              collapsable: false,
              children: [
                '/guide/other/gitter.md',
                '/guide/other/release-notes.md'
              ]
            }
          ],
          '/feature/component/': getComponentSidebar(
            deepClone(ComponentNav),
            'EN'
          ),
          '/feature/script/': ['/feature/script/svgo.md']
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: '指南',
            link: '/zh/guide/'
          },
          {
            text: '接口',
            link: '/zh/api/'
          },
          {
            text: '功能',
            items: genNav(deepClone(ComponentNav), 'ZH')
          }
          //{
          //  text: '生态系统',
          //  items: genNav(deepClone(EcosystemNav), 'ZH')
          //},
          //{
          //  text: '中文站点(gitee)',
          //  link: 'xxx/zh/'
          //}
        ],
        sidebar: {
          '/zh/guide/': [
            {
              title: '基础',
              collapsable: false,
              children: genEssentialsSidebar('/zh')
            },
            {
              title: '进阶',
              collapsable: false,
              children: genAdvancedSidebar('/zh')
            },
            {
              title: '其它',
              collapsable: false,
              children: [
                '/zh/guide/other/faq.md',
                '/zh/guide/other/release-notes.md'
              ]
            }
          ],
          '/zh/feature/component/': getComponentSidebar(
            deepClone(ComponentNav),
            'ZH'
          ),
          '/zh/feature/script/': ['/zh/feature/script/svgo.md']
        }
      }
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      description: 'A magical cms admin'
    },
    '/zh/': {
      lang: 'zh-CN',
      description: 'A magical cms admin'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  },
  ga: 'UA-xxx-1'
}

function genEssentialsSidebar(type = '') {
  const mapArr = [
    '/guide/',
    '/guide/essentials/git-message.md'
  ]
  return mapArr.map(i => {
    return type + i
  })
}

function genAdvancedSidebar(type = '') {
  const mapArr = ['/guide/advanced/cors.md', '/guide/advanced/error.md']
  return mapArr.map(i => {
    return type + i
  })
}
