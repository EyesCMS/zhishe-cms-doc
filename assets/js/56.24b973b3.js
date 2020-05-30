(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{237:function(e,t,a){"use strict";a.r(t);var r=a(0),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),a("ol",[e._m(2),e._v(" "),a("li",[a("p",[e._v("前端页面(views) 可以参考 "),a("a",{attrs:{href:"https://panjiachen.github.io/vue-element-admin/#/dashboard",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-element-admin"),a("OutboundLink")],1),e._v("，在本地"),a("a",{attrs:{href:"https://github.com/PanJiaChen/vue-element-admin/",target:"_blank",rel:"noopener noreferrer"}},[e._v("下载"),a("OutboundLink")],1),e._v("一份代码，看到哪个页面不错，可以直接拷到项目，配好路由，就可以查看效果了")])])]),e._v(" "),e._m(3),e._v(" "),a("ol",[a("li",[a("p",[e._v("输入参数校验")]),e._v(" "),a("p",[e._v("使用 "),a("code",[e._v("@Validated")]),e._v(" 注解和 model 类属性加注解的方式，参考 "),a("a",{attrs:{href:"https://github.com/EyesCMS/zhishe-cms/blob/master/cms-demo/src/main/java/edu/fzu/zhishe/demo/dto/CmsClubDTO.java",target:"_blank",rel:"noopener noreferrer"}},[e._v("CmsClubDTO"),a("OutboundLink")],1),e._v(" 和 "),a("a",{attrs:{href:"https://github.com/EyesCMS/zhishe-cms/blob/242661ea8746925f90b1f44e1caa40233f7ed27c/cms-demo/src/main/java/edu/fzu/zhishe/demo/web/DemoController.java#L64",target:"_blank",rel:"noopener noreferrer"}},[e._v("DemoController"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("POJO 间复制属性时，可以用 "),a("code",[e._v("BeanUtils.copyProperties")]),e._v(" 简化，参考 "),a("a",{attrs:{href:"https://github.com/EyesCMS/zhishe-cms/blob/242661ea87/cms-core/src/main/java/edu/fzu/zhishe/core/service/impl/SysUserServiceImpl.java#L87",target:"_blank",rel:"noopener noreferrer"}},[e._v("SysUserServiceImpl"),a("OutboundLink")],1)])]),e._v(" "),e._m(4),e._v(" "),a("li",[a("p",[e._v("service/DAO 方法命名，参考 "),a("a",{attrs:{href:"https://github.com/alibaba/p3c/blob/master/p3c-gitbook/%E7%BC%96%E7%A8%8B%E8%A7%84%E7%BA%A6/%E5%91%BD%E5%90%8D%E9%A3%8E%E6%A0%BC.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("阿里巴巴 Java 开发规范"),a("OutboundLink")],1),e._v("，前缀可以是：")]),e._v(" "),e._m(5)])]),e._v(" "),e._m(6),e._v(" "),e._m(7),e._v(" "),a("p",[e._v("Git 命令可以参考下 "),a("a",{attrs:{href:"https://xjliang.github.io/2020/01/16/git-usage/",target:"_blank",rel:"noopener noreferrer"}},[e._v("博客"),a("OutboundLink")],1),e._v(" 😆")])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"开发注意事项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开发注意事项"}},[this._v("#")]),this._v(" 开发注意事项")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"前端开发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前端开发"}},[this._v("#")]),this._v(" 前端开发")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("p",[e._v("前端项目"),a("code",[e._v("zhishe-cms-web")]),e._v(" 现在可以独立于后端项目进行开发.")]),e._v(" "),a("p",[e._v("你可以通过修改 "),a("code",[e._v(".env.development")]),e._v(" 文件中的 "),a("code",[e._v("VUE_APP_BASE_API")]),e._v(" 来切换 mock 环境和本地后端环境")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("# just a flag\nENV = 'development'\n\n# base api\nVUE_APP_BASE_API = '/dev-api' # use mock data\n# VUE_APP_BASE_API = 'http://localhost:8888' # use local backend\n")])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"后端开发"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#后端开发"}},[this._v("#")]),this._v(" 后端开发")])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("p",[this._v("对于前端不需要的字段，可以加上 "),t("code",[this._v("@jsonignore")]),this._v(" 进行字段屏蔽")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("getXXX")]),e._v(" "),a("li",[e._v("listXXX")]),e._v(" "),a("li",[e._v("countXXX")]),e._v(" "),a("li",[e._v("saveXXX")]),e._v(" "),a("li",[e._v("updateXXX")]),e._v(" "),a("li",[e._v("deleteXXX")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"github-git"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#github-git"}},[this._v("#")]),this._v(" GitHub & Git")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ol",[a("li",[a("p",[e._v("不要直接在"),a("code",[e._v("master")]),e._v(" 分支直接直接开发")]),e._v(" "),a("p",[e._v("每个人都在"),a("code",[e._v("dev")]),e._v(" 分支上开发；想要合并到 "),a("code",[e._v("master")]),e._v("时，可以提交 PR")]),e._v(" "),a("p",[e._v("本地开发时，可以创建 feat 分支，开发完成后合并的 dev 分支，再 push 到 github")])]),e._v(" "),a("li",[a("p",[e._v("提交 commit 信息的时候注意一下规范，如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('git commit -m "feat(bulletin): add api for bulletin"\n')])])]),a("p",[e._v("括号内表示本次提交的作用域，feat 表示新功能，其余参考文档来")])]),e._v(" "),a("li",[a("p",[e._v("push 出现冲突时，尽量先用 "),a("code",[e._v("git pull --rebase")]),e._v(" 命令拉取远程别人的更新，这样分支的不会太凌乱")])])])}],!1,null,null,null);t.default=s.exports}}]);