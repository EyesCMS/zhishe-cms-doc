var EcosystemNav = [
  {
    textEN: 'Repositories',
    textZH: '项目',
    items: [
      {
        text: 'vue-element-admin',
        link: 'https://github.com/PanJiaChen/vue-element-admin'
      },
      {
        text: 'vue-admin-template',
        link: 'https://github.com/PanJiaChen/vue-admin-template'
      }
    ]
  },
  {
    textEN: 'Help',
    textZH: '帮助',
    items: [
      {
        textZH: '常见问题',
        link: '/guide/other/faq.md',
        type: 'ZH'
      },
      {
        text: 'Changelog',
        textZH: '更新记录',
        link: 'https://github.com/PanJiaChen/vue-element-admin/releases'
      }
    ]
  }
]

var ComponentNav = [
  {
    text: 'Component',
    textZH: '组件',
    items: [
      {
        text: 'Rich Text Editor',
        textZH: '富文本',
        link: '/feature/component/rich-editor.md'
      }
    ]
  },
  {
    text: 'Script',
    textZH: '脚本',
    items: [
      {
        text: 'Svgo',
        link: '/feature/script/svgo.md'
      }
    ]
  }
]

module.exports = {
  EcosystemNav,
  ComponentNav
}
