# 开发注意事项

## 开发

1. 前端项目`zhishe-cms-web` 现在可以独立于后端项目进行开发.

   你可以通过修改 `.env.development` 文件中的 `VUE_APP_BASE_API` 来切换 mock 环境和本地后端环境

   ```js{5}
   # just a flag
   ENV = 'development'
   
   # base api
   VUE_APP_BASE_API = '/dev-api' # use mock data
   # VUE_APP_BASE_API = 'http://localhost:8888' # use local backend
   ```

   

## GitHub & Git

1. 不要直接再`master` 分支直接直接开发

   每个人都在`dev` 分支上开发；想要合并到 `master`时，可以提交 PR 

2. git 提交信息遵从 `git-messge` 指南