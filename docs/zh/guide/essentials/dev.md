# 开发注意事项

## 前端开发

1. 前端项目`zhishe-cms-web` 现在可以独立于后端项目进行开发.

   你可以通过修改 `.env.development` 文件中的 `VUE_APP_BASE_API` 来切换 mock 环境和本地后端环境

   ```
   # just a flag
   ENV = 'development'
   
   # base api
   VUE_APP_BASE_API = '/dev-api' # use mock data
   # VUE_APP_BASE_API = 'http://localhost:8888' # use local backend
   ```

2. 前端页面(views) 可以参考 [vue-element-admin](https://panjiachen.github.io/vue-element-admin/#/dashboard)，在本地[下载](https://github.com/PanJiaChen/vue-element-admin/)一份代码，看到哪个页面不错，可以直接拷到项目，配好路由，就可以查看效果了



## 后端开发

1. 输入参数校验

   使用 `@Validated` 注解和 model 类属性加注解的方式，参考 [CmsClubDTO](https://github.com/EyesCMS/zhishe-cms/blob/master/cms-demo/src/main/java/edu/fzu/zhishe/demo/dto/CmsClubDTO.java) 和 [DemoController](https://github.com/EyesCMS/zhishe-cms/blob/242661ea8746925f90b1f44e1caa40233f7ed27c/cms-demo/src/main/java/edu/fzu/zhishe/demo/web/DemoController.java#L64)

2. POJO 间复制属性时，可以用 `BeanUtils.copyProperties` 简化，参考 [SysUserServiceImpl]( https://github.com/EyesCMS/zhishe-cms/blob/242661ea87/cms-core/src/main/java/edu/fzu/zhishe/core/service/impl/SysUserServiceImpl.java#L87)

3. 对于前端不需要的字段，可以加上 `@jsonignore` 进行字段屏蔽

4. service/DAO 方法命名，参考 [阿里巴巴 Java 开发规范](https://github.com/alibaba/p3c/blob/master/p3c-gitbook/%E7%BC%96%E7%A8%8B%E8%A7%84%E7%BA%A6/%E5%91%BD%E5%90%8D%E9%A3%8E%E6%A0%BC.md)，前缀可以是：
   - getXXX
   - listXXX
   - countXXX
   - saveXXX
   - updateXXX
   - deleteXXX



## GitHub & Git

1. 不要直接在`master` 分支直接直接开发

   每个人都在`dev` 分支上开发；想要合并到 `master`时，可以提交 PR 

   本地开发时，可以创建 feat 分支，开发完成后合并的 dev 分支，再 push 到 github

2. 提交 commit 信息的时候注意一下规范，如：

   ```
   git commit -m "feat(bulletin): add api for bulletin"
   ```

   括号内表示本次提交的作用域，feat 表示新功能，其余参考文档来

3. push 出现冲突时，尽量先用 `git pull --rebase` 命令拉取远程别人的更新，这样分支的不会太凌乱

Git 命令可以参考下 [博客](https://xjliang.github.io/2020/01/16/git-usage/) :laughing: