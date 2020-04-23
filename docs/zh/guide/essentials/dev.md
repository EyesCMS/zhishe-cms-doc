# 开发注意事项

## 前端开发

前端项目`zhishe-cms-web` 现在可以独立于后端项目进行开发.

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

   本地开发时，可以创建 feat 分支，开发完成后合并的 dev 分支，再 push 到 github

2. 提交 commit 信息的时候注意一下规范，如：

   ```
   git commit -m "feat(bulletin): add api for bulletin"
   ```

   括号内表示本次提交的作用域，feat 表示新功能，其余参考文档来

3. push 出现冲突时，尽量先用 `git pull --rebase` 命令拉取远程别人的更新，这样分支的不会太凌乱

Git 命令可以参考下 [博客](https://xjliang.github.io/2020/01/16/git-usage/) :laughing: