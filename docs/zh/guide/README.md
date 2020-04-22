---
pageClass: getting-started
---

# Introduction


[![Build Status](https://travis-ci.org/EyesCMS/zhishe-cms-web.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/EyesCMS/zhishe-cms-web.svg)](https://github.com/EyesCMS/zhishe-cms-web/releases)
[![GitHub stars](https://img.shields.io/github/stars/EyesCMS/zhishe-cms-web.svg?style=social&label=Stars)](https://github.com/EyesCMS/zhishe-cms-web)

[zhishe-cms-web](http://eyescms.github.io/zhishe-cms-web) is a production-ready front-end solution for admin interfaces. It based on [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template).

It is a magical vue admin based on the newest development stack of vue, typical templates for enterprise applications, lots of awesome features. It helps you build a large complex Single-Page Applications. I believe whatever your needs are, this project will help you.

:::tip
This project integrates a lot of features that you may not use, it will cause a lot of code redundancy. If your project does not pay attention to this issue, you can also directly develop it based on it.
Otherwise, you can use [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template).

- Integrated Solution: [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- Basic Template: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

​	:::

<br/>

## Features

```
- Login / Logout

- Permission Authentication
  - Page permission
  - Directive permission
  - Permission configuration page
  - Two-step login

- Multi-environment build
  - dev sit stage prod

- Global Features
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb
  - Tags-view (Tab page Support right-click operation)
  - Svg Sprite
  - Mock data
  - Responsive Sidebar

- Editor
  - Markdown Editor

- Error Page
  - 401
  - 404

- Components
  - Avatar Upload
  - Back To Top
  - SplitPane
  - Dropzone

```

<br/>

## Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli) , [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), all request data is simulated using [Mock.js](https://github.com/nuysoft/Mock).
Understanding and learning this knowledge in advance will greatly help the use of this project.

At the same time supporting a series of tutorial articles, how to build a complete background project from zero, suggest that you read these articles and then come to practice this project. But there's no English version yet.

::: tip
**This project does not support low-level browsers (such as ie). If you need to, please add polyfills yourself.**
:::

## Project Structure

This project has built the following templates, and have built a scaffold based on Vue, which should help you prototyping production-ready admin interfaces. It covers almost everything you need.

```bash
├── build                      # build config files
├── mock                       # mock data
├── public                     # pure static assets (directly copied)
│   │── favicon.ico            # favicon
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts,images (processed by webpack)
│   ├── components             # global components
│   ├── directive              # global directive
│   ├── icons                  # svg icons
│   ├── layout                 # global layout
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.js                # app entry file
│   └── permission.js          # permission authentication
├── tests                      # tests
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── .babelrc                   # babel config
├── .travis.yml                # automated CI configuration
├── vue.config.js              # vue-cli config
├── postcss.config.js          # postcss config
└── package.json               # package.json
```

## Getting Started

```bash
# clone the project
git clone https://github.com/EyesCMS/zhishe-cms-web.git

# enter the project directory
cd zhishe-cms-web

# install dependency
npm install

# develop
npm run dev
```

<br/>

This will automatically open [http://localhost:9527](http://localhost:9527).



We have built-in models, standard components, mock data, hot module reloading, state management, i18n, global router, etc. You can continue exploring other documents for more details on those topics.

<br/>

::: tip
**Suggestion：** use `vue-element-admin` as a toolbox or as an integration solution repository, It is recommended to do secondary development on the basis of `vue-admin-template`, if you need any additional feature, you can copy from `vue-element-admin`.
:::

## Contribution

The repository of documentation is [zhishe-cms-doc](https://github.com/EyesCMS/zhishe-cms-doc) based on [vuepress](https://github.com/vuejs/vuepress) development.

There may be some spelling or translation errors in the course of writing this document. It is welcome to point out by issue or pr. After all, English is not my mother tongue.

[zhishe-cms-web](https://github.com/EyesCMS/zhishe-cms-web) is also continuing to iterate, summarize and summarize more features, and summarize the best practices of product templates/components/business scenarios in the middle and back office. This project is also very much looking forward to your participation and [feedback](https://github.com/EyesCMS/zhishe-cms-web/issues).


