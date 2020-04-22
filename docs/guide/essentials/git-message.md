### Git message specification

```
<type>(<scope>): <subject><BLANK LINE><body><BLANK LINE><footer>
```

我们通过 git commit 命令带出的 vim 界面填写的最终结果应该类似如上这个结构，大致分为三个部分 (使用空行分割):

标题行：必填，描述主要修改类型和内容
主题内容：描述为什么修改，做了什么样的修改，以及开发的思路等等
页脚注释：放 Breaking Changes 或 Closed Issues

- type: commit 的类型
  - feat: 新特性
  - fix: 修改问题
  - refactor: 代码重构
  - docs: 文档修改
  - style: 代码格式修改，注意不是 css 修改
  - test: 测试用例修改
  - chore: 其他修改，比如构建流程，依赖管理.
- scope: commit 影响的范围，比如: route, component, utils, build…
- subject: commit 的概述，建议符合 50/72 formatting
- body: commit 具体修改内容，可以分为多行，建议符合 50/72 formatting
- footer: 一些备注，通常是 BREAKING CHANGE 或修复的 bug 的链接.

#### Example

![img](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016010602.png)

------

feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:

- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)

------

fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not…
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead

------

feat(directive): ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected

New directives for proper binding these attributes in older browsers (IE).
Added coresponding description, live examples and e2e tests.