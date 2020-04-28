---
sidebar: auto
---

# 知社 API 文档

本项目前后端接口规范和接口文档。

[![Build Status](https://travis-ci.com/EyesCMS/zhishe-cms-doc.svg?branch=master)](https://travis-ci.com/EyesCMS/zhishe-cms-doc)

> 本文的正在持续更新中~

[TOC]

## 1 前后端接口规范

### 1.1 请求格式

采用 RESTful 风格的接口

#### 1.1.1 HTTP 动词（HTTP verbs）

|   Verb   |        Description         |
| :------: | :------------------------: |
|  `HEAD`  |     获取 HTTP 头部信息     |
|  `GET`   |          获取资源          |
|  `POST`  |          创建资源          |
| `PATCH`  | 更新部分 JSON 内容，不常用 |
|  `PUT`   |          更新资源          |
| `DELETE` |          删除资源          |

#### 1.1.2 分页（Pagination）

API 自动对请求的元素分页，不同的 API 有不同的默认值，可以指定查询的最大长度，但对某些资源不起作用。**请求后端数组数据时，统一传递四个分页参数**。

**Parameters**

| 参数    | 含义                                |
| ------- | ----------------------------------- |
| `page`  | 请求页码                            |
| `limit` | 每页的元素数量                      |
| `sort`  | 排序字段，例如 "add_time" 或者 "id" |
| `order` | 升序降序，只能是 "desc" 或者 "asc"  |

这里四个参数是可选的，后端应该设置默认参数，因此即使前端不设置， 后端也会自动返回合适的对象数组响应数据。

Example

```
GET /goods/list?page=1&limit=10
```

Response

```http
HTTP/1.1 200 OK

{
  "total_count": 2525,
  "items": [
  ...
  ]
}
```

**返回参数说明**

响应体里面 `total_count` 表示总数量，`items` 是数组，里面是要查询的元素。

### 1.2 响应格式

```json
Content-Type: application/json;charset=UTF-8

{
  body
}
```

响应成功，body 直接返回 JSON 格式的内容（返回列表时按  1.1.2 分页）：

```json
{
  age: 12,
  name: "zhangsan"
}
```

#### 1.2.1 失败异常

错误响应，`errors` 字段可选（一般是参数验证错误）

```json
{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ]
}
```

**客户端错误（Client errors）**

接收请求 body 的 API 调用上可能存在三种类型的客户端错误：

1. 发送无效的 JSON 会导致 `400 Bad Request` 的响应

   ```http
   HTTP/1.1 400 Bad Request
   Content-Length: 35

   {"message":"Problems parsing JSON"}
   ```

2. 发送错误类型的 JSON 值将导致 `400 Bad Request` 的响应

   ```http
   HTTP/1.1 400 Bad Request
   Content-Length: 40

   {"message":"Body should be a JSON object"}
   ```

3. 发送无效字段将导致 `422 Unprocessable Entity` 的响应

   ```http
   HTTP/1.1 422 Unprocessable Entity
   Content-Length: 149

   {
     "message": "Validation Failed",
     "errors": [
       {
         "resource": "Issue",
         "field": "title",
         "code": "missing_field"
       }
     ]
   }
   ```

   所有错误对象都具有资源和字段属性，以便你的客户端可以知道问题所在。还有一个错误代码，让你知道该字段出了什么问题。下面这些是可能的验证错误代码：

   |    Error Name    |          Description           |
   | :--------------: | :----------------------------: |
   |    `missing`     |           资源不存在           |
   | `missing_field`  |    资源上的必填字段尚未设置    |
   |    `invalid`     |          字段格式无效          |
   | `already_exists` | 另一个资源与此字段具有相同的值 |

   资源也可能发送自定义验证错误（其中 `code` 是自定义的）。自定义错误将始终具有一个描述错误的 `message` 字段，并且大多数错误还将包括指向一些可能有助于您解决该错误的内容的 `documentation_url`字段。

**登录失败**

- 认证失败

```http
HTTP/1.1 401 Unauthorized

{
  "message": "Full authentication is required to access this resource"
}
```

- 没有权限

```http
HTTP/1.1 403 Forbidden

{
  "message": "Access is denied"
}
```

### 1.3 状态码（Status code）

| code | message               | description                                                                      |
| ---- | --------------------- | -------------------------------------------------------------------------------- |
| 200  | OK                    | 请求成功                                                                         |
| 201  | Created               | 创建了新资源，通常是 POST 请求                                                   |
| 400  | Bad Request           | 由于语法无效，服务器无法理解请求（错误的 JSON 格式）                             |
| 401  | Unauthorized          | 未认证错误                                                                       |
| 403  | Forbidden             | 客户端没有访问内容的权限                                                         |
| 404  | Not Found             | 找不到请求的资源；服务器也可以发送此响应而不是 403，以隐藏来自未授权客户端的资源 |
| 405  | Method not Allowed    | 一般是请求方法使用错误，eg. `POST` vs `GET`                                      |
| 429  | Too Many Requests     | 在给定的时间内发送了太多请求(速率限制)                                           |
| 500  | Internal Server Error | 服务器遇到了不知道如何处理的情况                                                 |
| 503  | Service Unavailable   | 服务器尚未准备好处理请求，常见原因是服务器因维护而停机或过载                     |

参考 [MDC web docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### 1.4 认证方式（Authentication）

前后端采用 token 来验证访问权限。

#### 1.4.1 Header & Token

前后端 Token 交换流程如下：

1. 前端访问系统登录 API
2. 成功以后，前端会接收后端响应的一个 token，保存在本地
3. 请求受保护 API ，则采用自定义头部携带此 token
4. 后端检验 Token，成功则返回受保护的数据

#### 1.4.2 自定义 Header

访问受保护 API 采用自定义 `Authorization` 头部

1. 前端访问后端登录 API`/auth/login`

   ```json
   POST /user/login

   {
       "username": "admin",
       "password": "123456"
   }
   ```

2. 成功以后，前端会接收后端响应的一个 token

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTU3MzI2ODUwLCJ1c2VySWQiOjEsImlhdCI6MTU1NzMxOTY1MH0.XP0TuhupV_ttQsCr1KTaPZVlTbVzVOcnq_K0kXdbri0",
     "tokenHead": "Bearer"
   }
   ```

3. 请求受保护 API 则，则采用自定义头部携带此 token

   ```json
   GET http://localhost:8080/users
   Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNTU3MzM2ODU0LCJ1c2VySWQiOjIsImlhdCI6MTU1NzMyOTY1NH0.JY1-cqOnmi-CVjFohZMqK2iAdAH4O6CKj0Cqd5tMF3M
   ```

#### 1.4.3 双重权限验证 :warning:

我们不仅要在接口上用注解控制访问权限，还可能要在业务逻辑中判断某个角色是不是对应改组织的角色。

举个例子：假如一个 A 社长在浏览器登录后，直接在浏览器地址栏输入删除 B 社团活动的链接，后端收到请求后，角色验证通过，但是 A 社长实际上不能操作其它社团的内容！

### 1.5 跨域资源共享（Cross origin resource sharing）

API 支持来自任何来源的 AJAX 请求的跨来源资源共享（CORS）

参考 [https://www.w3.org/TR/cors/](https://www.w3.org/TR/cors/)

### 1.6 API 格式

xx 接口简单描述

```

```

#### Input/Parameters

| Name | Type | Description |
| :--- | :--- | ----------- |
|      |      |             |

#### Response

```json

```



## 2 用户服务 :hear_no_evil:

### 2.1 登录

用户登录接口

```
POST /auth/login
```

#### Input

| Name       | Type     | Description |
| :--------- | :------- | ----------- |
| `username` | `string` | 用户名      |
| `password` | `string` | 密码        |

#### Response

```json
{
  "token": "your secret token"
}
```

### 2.2 拉取用户信息

使用 token 拉取用户详细信息

> token 放在请求头

```
GET /auth/info
```

#### Response

```json
{
    "userid": 10088,
    "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    "username": "test",
    "nickname": "Bob",
    "major": "software",
    "email": "bob@gmail.com",
    "slogan": "good good study, day day up",
    "phone": "12345678901",
    "roles": [
        "normal"
    ]
}
```

### 2.3 注册

用户注册接口

```
POST /auth/register
```

#### Input

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `username` | `string` | 用户名      |
| `password` | `string` | 密码        |
| `slogan`   | `string` | 个性签名    |
| `major`    | `string` | 专业        |
| `phone`    | `string` | 联系方式    |
| `address`  | `string` | 宿舍地址    |

#### Response

```json
Status: 201 Created
```

### 2.4 通过密保问题找回密码

根据用户 ID 获取密保问题

```
GET /users/:uid/question
```

#### Response

```json
Status: 200 OK

{
  "login_problem": "what is your name?"
}
```

### 2.5 校验密保问题

校验密保问题回答是否正确

```
POST /users/:uid/anwser
```

#### Input

| Name     | Type     | Description    |
| -------- | -------- | -------------- |
| `uid`    | `string` | 用户 ID        |
| `anwser` | `string` | 待校验密保答案 |

#### Response if answer is correct

```json
Status: 204 No Content
```

#### Response if answer is wrong

```json
Status: 403 Forbidden
```

### 2.6 修改个人信息

用户修改个人信息

```
PUT /user/info
```

#### Input

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `password` | `string` | 密码        |
| `nickname` | `string` | 昵称        |
| `major`    | `string` | 专业        |
| `phone`    | `string` | 联系方式    |
| `address`  | `string` | 地址        |
| `slogan`   | `string` | 个人标语    |
| `email`    | `string` | 邮箱        |

#### Example

```json
{
  "password": "zxfdsds",
  "nickname": "jack",
  "major": "software",
  "phone": "12345678901",
  "address": "fujian"
}
```

#### Response

```json
Status: 204 No Content
```



### 2.7 切换角色

用户点击某个社团后，传递当前社团 ID 给后端，后端根据社团 ID 设置当前用户角色

```
POST /roles/swtich
```

#### Input

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `clubId` | `integer` | 社团 ID     |

#### Response

```json
Status: 204 No Content
```



## 3 社团管理 :two_men_holding_hands:

### 3.1 社团推荐列表

获取系统推荐的社团列表

```
GET /clubs/recommended
```

#### Response

```json
Status: 200 OK

[
  {
    "cid": 1,
    "name": "篮球社",
    "chief_id": 2,
    "chief_name": "微微笑",
    "avatar_url": "xxxx.png"
  }
]
```

### 3.2 查看社团列表

列出所有社团

```
GET /clubs
```

#### Response

```json
Status: 200 OK

[
  {
    "cid": 1,
    "name": "篮球社",
    "chief_id": 2,
    "chief_name": "微微笑",
    "avatar_url": "http://xx/xxxx.png"
  }
]
total: 100
```

### 3.2 查看学生已加入的社团列表

列出学生加入的所有社团

```
GET /clubs/users/:userid
```

#### Response

```json
Status: 200 OK

[
  {
    "cid": 1,
    "name": "篮球社",
    "chief_id": 2,
    "chief_name": "微微笑",
    "avatar_url": "http://xx/xxxx.png"
  }
]
total: 100
```
### 3.2 查看学生管理的社团列表

列出学生管理的所有社团，即作为社长的社团列表

```
GET /clubs/manager/:userid
```

#### Response

```json
Status: 200 OK

[
  {
    "cid": 1,
    "name": "篮球社",
    "chief_id": 2,
    "chief_name": "微微笑",
    "avatar_url": "http://xx/xxxx.png"
  }
]
total: 100
```

### 3.3 按名称关键字查找社团

根据名称关键字查找社团（模糊匹配）

```
GET /clubs
```

### **Parameters**

| 参数    | 含义                   |
| ------- | ---------------------- |
| keyword | 关键词，用名称模糊查找 |



#### Response

```json
Status: 200 OK

[
  {
    "cid": 1,
    "name": "篮球社",
    "chief_id": 2,
    "chief_name": "微微笑",
    "avatar_url": "http://xx/xxxx.png"
  }
]
```

### 3.4 查看某个社团详情

根据社团 ID 查找社团

```
GET /clubs/:id
```

#### Response

```json
Status: 200 OK

{
  "cid": 2,
  "name": "篮球社",
  "chief_id": 2,
  "chief_name": "微微笑",
  "avatar_url": "http://xx/xxxx.png",
  "slogan": "XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团"，
  "member_count": 500,
  "qq_group": "312512512"
}
```

### 3.4 查看学生加入社团申请

根据学生用户 ID 查找加入社团申请信息

```
GET /clubs/join/:id
```

#### Response

```json
Status: 200 OK

{
  "user_id": 221701XXX,
  "club_id": 1,
  "club_name": 篮球社,
  "reason": "这是申请原因申请原因申请原因",
  "state": "pending"
}
```

### 3.4 查看学生创建社团申请

根据学生用户 ID 查找社团申请信息

```
GET /clubs/creations/:id
```

#### Response

```json
Status: 200 OK

{
    "club_name": "羽毛球社",
    "create_at": "2018-04-19 18:14:12",
    "applicant": "张三",
    "reason": "交朋友",
    "accessory_url": "http://xxx/xxx/xx.doc",
    "state": "pending"
}
```

### 3.2 社团成员列表

列出所有社团成员

```
GET /clubs/:club/members
```

#### Response

```json
Status: 200 OK

[
  {
    "userid": "20012"
    "username": "221701300",
    "nickname": "张三",
    "honor": "龙王",
    "role": "社长",
    "credit": "100",
    "avatar_url": "https://xxx.com/images/xxxx.png"
  }
]
```

#### Response if requester is not an club member(TODO)

```
Status: 302 Found
```

### 3.3 社团成员详细信息

查看某个社团成员信息

```
GET /clubs/:club/members/:userid
```

#### Response

```json
Status: 200 OK

{
  "username": "221701300",
  "nickname": "张三",
  "honor": "龙王",
  "role": "社长",
  "credit": "100",
  "avatar_url": "https://xxx.com/images/xxxx.png"
}
```

#### Response if requester is not an club member(TODO)

```
Status: 302 Found
```

### 3.4 添加社团成员

添加社团成员需要学生[手动提交申请](#4.7 学生提交入社申请)，由社长审核后自动加入社团。

### 3.5 删除社团成员

为了删除用户在社团中的成员身份，经过身份验证的用户必须是社团所有者（社长）。

```
DELETE /clubs/:club/members/:userid
```

#### Response

```
Status: 204 No Content
```

## 4 申请与审核 :page_with_curl:

这里先统一定义一下申请状态（state）：

注意：**后端只返回申请状态码，前端需要自行映射！**

| 申请状态码 | 描述                 |
| ---------- | -------------------- |
| 0          | pending，未审核      |
| 1          | active，审核通过     |
| 2          | rejected，审核被拒绝 |

### 4.1 提交创建社团申请表单
普通学生提交社团创建申请表单
```
POST /clubs/creations
```
#### Input
| Name            | Type      | Description                               |
| --------------- | --------- | ----------------------------------------  |
| `clubName`     | `string`  | 社团名称                                   |
| `applicant`     | `string`  | 申请人                                     |
| `reason`        | `string`  | 申请原因                                   |
| `type`          | `string`  | 社团类型                                   |
| `officialState`| `boolean` | 社团官方状态，0 -> 小团体，1 -> 官方认证社团 |
| `accessoryUrl` | `string`  | 附件                                       |
#### Example
```json
{
  "id":1,
  "clubName": "test",
  "applicant": "张三",
  "reason": "make friends",
  "type": "运动类",
  "officialState":true,
  "accessoryUrl": "https://xxx/xxx/xx.doc"
}
```
#### Response
```json
Status: 201 Created
```
### 4.2 社团创建申请列表
管理员可查看社团创建申请列表，以进行进一步的审核
```
GET /clubs/creations
```
#### Response
```json
Status: 200 OK
[
  {
    "club_name": "羽毛球社",
    "create_at": "2018-04-19 18:14:12",
    "applicant": "张三",
    "reason": "交朋友",
    "accessory_url": "http://xxx/xxx/xx.doc",
    "state": "pending"
  },
  {
    "club_name": "篮球社",
    "create_at": "2018-04-19 18:14:12",
    "applicant": "李四",
    "reason": "约球",
    "accessory_url": "http://xxx/xxx/xx.doc",
    "state": "active"
  },
   {
    "club_name": "篮球社",
    "create_at": "2018-04-19 18:14:12",
    "applicant": "李四",
    "reason": "约球",
    "accessory_url": "http://xxx/xxx/xx.doc",
    "state": "rejected"
  }
]
```
### 4.3 审核创建社团申请
管理员审核某个社团创建申请
```
PUT /clubs/creations/audit
```
#### Input
| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |
#### Example
```json
{
  "id": 1,
  "state": 1
}
```
#### Response
```json
Status: 204 No Content
```

### 4.3 学生撤销创建社团申请
管理员审核某个社团创建申请
```
PUT /clubs/creations/revocation
```
#### Input
| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |
#### Example
```json
{
  "id": 1,
  "state": 1
}
```
#### Response
```json
Status: 204 No Content
```

### 4.4 提交解散社团申请
社长提交解散社团申请表单
```
POST /clubs/dissolution
```
#### Input
| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| `clubId`       | `integer` | 社团 ID     |
| `applicant`    | `string`  | 申请人      |
| `reason`       | `string`  | 申请原因    |
| `accessoryUrl` | `string`  | 附件链接    |
#### Example

```json
{
  "id":1,
  "clubId": 10001,
  "applicant": "张三",
  "reason": "没为什么",
  "accessoryUrl": "https://xxx/xxx/xx.doc"
}
```
#### Response
```json
Status: 201 Created
```
### 4.5 社团解散申请列表
管理员可查看社团解散申请列表，以进行进一步的审核
```
GET /clubs/dissolution
```
#### Response
```json
Status: 200 OK
[
  {
    "club_name": "羽毛球社",
    "createAt": "2018-04-19 18:14:12",
    "applicant": "张三",
    "reason": "本社团没有存在意义",
    "state": "pending"
  },
  {
    "club_name": "足球社",
    "createAt": "2018-04-19 18:14:12",
    "applicant": "张三",
    "reason": "好无聊啊",
    "state": "active"
  },
  {
    "club_name": "羽毛球社",
    "createAt": "2018-04-19 18:14:12",
    "applicant": "张三",
    "reason": "无",
    "state": "rejected"
  }
]
```
### 4.6 审核社团解散申请
管理员审核某个社团解散申请
```
PUT /clubs/dissolution/audit
```
#### Input
| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |
#### Example
```json
{
  "id": 1,
  "state": 1
}
```
#### Response
```json
Status: 204 No Content
```
### 4.7 学生提交入社申请
普通学生提交加入社团申请表单
```
POST /clubs/join
```
#### Input

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `clubId` | `integer` | 社团 ID     |
| `reason` | `string`  | 申请原因    |

#### Example

```json
{
  "clubId": 5000,
  "reason": "没为什么"
}
```
#### Response
```json
Status: 201 Created
```

### 4.8 加入社团申请列表

社长可查看加入社团申请列表，以进行进一步的审核

```
GET /clubs/:club/joins
```

#### Response

```json
Status: 200 OK

{
  "total_count": 50,
  "items":[
    {
      "id": 1,
      "applicant": "wangs",
      "reason": "锻炼自己",
      "createAt": "2018-04-19 18:14:12",
      "state": 0
    },
    {
      "id": 2,
      "applicant": "li",
      "reason": "锻炼自己",
      "createAt": "2018-04-19 18:14:12",
      "state": 1
    },
    {
      "id": 3,
      "applicant": "zhao",
      "reason": "锻炼自己",
      "createAt": "2018-04-19 18:14:12",
      "state": 2
    }
  ]
}
```

### 4.9 审核入社申请

社长审核某个学生入社申请

```
PUT /clubs/joins/audit
```

#### Input

| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |

#### Response

```json
Status: 204 No Content
```

### 4.10 社员提交退社表单

社员提交退出社团表单

```
POST /clubs/quit
```

#### Input

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `clubId` | `integer` | 社团 ID     |
| `reason` | `string`  | 申请原因    |

#### Response

```json
Status: 201 Created
```

### 4.11 退社通知列表

社长可查看成员退出社团通知列表

```
GET /clubs/:club/quit
```

#### Response

```json
Status: 200 OK

[
  {
    "applicant": "wangs",
    "reason": "want to go",
    "createAt": "2018-04-19 18:14:12"
  },
  {
    "applicant": "li",
    "reason": "want to go",
    "createAt": "2018-04-19 18:14:12"
  },
  {
    "applicant": "zhao",
    "reason": "want to go",
    "createAt": "2018-04-19 18:14:12"
  }
]
```

### 4.12 社长提交换届申请

社长提交换届申请表单

```
POST /clubs/leader/change
```

#### Input

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| `clubId`    | `integer` | 社团 ID     |
| `oldChiefId` | `integer` | 旧社长 ID   |
| `newChiefName` | `string` | 新社长姓名   |
| `reason`     | `string`  | 申请原因    |

#### Response

```json
Status: 201 Created
```

### 4.13 社长换届申请列表

管理员查看社长换届申请列表

```
GET /clubs/leader/changes
```

#### Response

```json
Status: 200 OK

[
  {
    "id":1,
    "club_name": "wangs",
    "oldChiefName": "want",
    "newChiefName": "zhang",
    "create_at": "2018-04-19 18:14:12",
    "state": "pending"
  },
  {
    "id":2,
    "clubName": "wangs",
    "oldChiefName": "want",
    "newChiefName": "zhang",
    "createAt": "2018-04-19 18:14:12",
    "state": "rejected"
  }
]
```

### 4.14 换届申请审核

管理员可审核某个换届申请

```
PUT /clubs/leader/changes
```

#### Input

| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |

#### Response

```json
Status: 204 No Content
```

### 4.15 社团认证申请

社长提交社团认证申请表单

```
POST /clubs/certifications
```

#### Input

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| `clubId`       | `integer` | 社团 ID     |
| `applicant`    | `string`  | 申请人      |
| `accessoryUrl` | `string`  | 附件        |

#### Example

```json
{
  "clubId": 1,
  "applicant": "wangping",
  "accessoryUrl": "htttps://xxx/xxx.doc"
}
```

#### Response

```json
Status: 201 Created
```

### 4.16 社团认证申请列表

管理员查看社长换届申请列表

```
GET /clubs/certifications
```

#### Response

```json
Status: 200 OK

[
  {
    "id":1,
    "clubName": "羽毛球社",
    "applicant": "张三",
    "accessoryUrl": "http://xxx/xxx/xx.doc",
    "createAt": "2018-04-19 18:14:12",
    "state": "pending"
  },
  {
    "id":2,
    "clubName": "羽毛球社",
    "applicant": "张三",
    "accessoryUrl": "http://xxx/xxx/xx.doc",
    "createAt": "2018-04-19 18:14:12",
    "state": "rejected"
  }
]
```

### 4.17 社团认证申请审核

管理员可查看审核某个换届申请

```
PUT /clubs/certifications
```

#### Input

| Name    | Type      | Description  |
| ------- | --------- | ------------ |
| `id`    | `integer` | 申请 ID      |
| `state` | `integer` | 新的申请状态 |

#### Response

```json
Status: 204 No Content
```

## 5 公告

### 5.1 发布公告

社长发布一条公告

```
POST /clubs/:club/bulletins
```

#### Input

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `title`   | `string` | 公告标题    |
| `content` | `string` | 公告内容    |
| `img_url` | `string` | 公告图片    |

#### Example

```json
{
  "title": "this is a bulletin",
  "content": "3 days later"
}
```

#### Response

```json
Status: 201 Created
```

### 5.2 查看公告列表

```
GET /clubs/:club/bulletins
```

#### Response

```json
Status: 200 OK

[
  {
    "id": 2,
    "title": "公告1",
    "content": "这是内容",
    "createAt": "2018-04-19 18:14:12",
    "updateAt": "2018-04-19 19:14:12"
  }
]
total: 100
```

### 5.3 查看公告详情

```
GET /clubs/:club/bulletins/:bulletin_id
```

#### Response

```json
Status: 200 OK

{
  "title": "公告1",
  "content": "这是内容",
  "createAt": "2018-04-19 18:14:12",
  "updateAt": "2018-04-19 19:14:12"
}
```

### 5.4 修改公告内容

```
PUT /clubs/:club/bulletins/:bulletin_id
```

#### Input

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `title`   | `string` | 公告标题    |
| `content` | `string` | 公告内容    |

#### Example

```json
{
  "content": "更新后的内容"
}
```

#### Response

```json
Status: 204 No Content
```

### 5.5 删除某一条公告

根据公告 ID 删除某一条公告

```
DELETE /clubs/bulletins/:bulletin_id
```

#### Response

```json
Status: 204 No Content
```

## 6 活动

活动状态: 0 -> “未审核”; 1 -> "审核通过"; 2 -> "已发布"; 3 -> "审核未通过"; 4 -> "已结束"

### 6.1 申请活动

```
POST /clubs/activities
```

#### Input

| Name           | Type       | Description |
| -------------- | ---------- | ----------- |
| `clubId`       | `int`      | 社团编号    |
| `name`         | `string`   | 活动名称    |
| `title`        | `string`   | 活动标题    |
| `content`      | `string`   | 活动内容    |
| `startDate`    | `datetime` | 开始时间    |
| `endDate`      | `datetime` | 结束时间    |
| `location`     | `string`   | 地点        |
| `imgUrl`     | `string`   | 图片        |
| `accessoryUrl` | `string`   | 附件        |

#### Example

```json
{
  "clubId": 1,
  "name": "act",
  "title": "this is a title",
  "content": "what content",
  "startDate": "2018-04-19",
  "endDate": "2018-04-22",
  "location": "三区",
  "imgUrl": "https://xxx/xxx/a.png"
  "accessoryUrl": "https://xxx/xxx/a.png"
}
```

#### Response

```json
Status: 201 Created
```

### 6.2 活动申请审核

管理员审核某个社团活动申请

```
PUT /clubs/activities/audit
```

#### Input

| Name       | Type      | Description       |
| ---------- | --------- | ----------------- |
| `id`       | `integer` | 申请 ID，不可修改 |
| `state_id` | `integer` | 活动状态 ID       |

#### Response

```json
Status: 204 No Content
```

### 6.3 修改社团活动状态

社长修改社团活动

```
PUT /clubs/activities/state
```

#### Input

| Name       | Type      | Description       |
| ---------- | --------- | ----------------- |
| `id`       | `integer` | 申请 ID，不可修改 |
| `state_id` | `integer` | 活动状态 ID       |

#### Response

```json
Status: 204 No Content
```

### 6.3 修改社团活动

社长修改社团活动

```
PUT /clubs/activities/:id
```

#### Input

| Name       | Type       | Description |
| ---------- | ---------- | ----------- |
| `name`     | `string`   | 活动名称    |
| `title`    | `string`   | 活动标题    |
| `content`  | `string`   | 活动内容    |
| `starDate` | `datetime` | 开始时间    |
| `endDate`  | `datetime` | 结束时间    |
| `location` | `string`   | 地点        |

#### Response

```json
Status: 204 No Content
```

### 6.4 删除某一活动

根据活动 ID 删除某一条活动，后端需要获取请求发送方的用户 id，判断他是否拥有待删除活动的权限

```
DELETE /clubs/activities/:id
```

#### Response

```json
Status: 204 No Content
```

### 6.5 获取活动申请列表
社长可以获取自己社团申请的活动列表
```
GET /clubs/:clubId/activities
```

#### Response

```json
Status: 200 OK

total_count: 50
items: [
  {
    "id": 1,
    "name": "活动1",
    "location": "青春广场",
    "content": "社团团聚",
    "member_count": "55",
    "start_date": "2018-04-19 18:14:12",
    "end_date": "2018-04-19 18:14:12",
    "state": 0
  }，
  {
    "id": 1,
    "name": "活动1",
    "location": "青春广场",
    "content": "社团团聚",
    "member_count": "55",
    "start_date": "2018-04-19 18:14:12",
    "end_date": "2018-04-19 18:14:12",
    "state": 1
  }，
  {
    "id": 1,
    "name": "活动1",
    "location": "青春广场",
    "content": "社团团聚",
    "member_count": "55",
    "start_date": "2018-04-19 18:14:12",
    "end_date": "2018-04-19 18:14:12",
    "state": 2
  }，
  {
    "id": 1,
    "name": "活动1",
    "location": "青春广场",
    "content": "社团团聚",
    "member_count": "55",
    "start_date": "2018-04-19 18:14:12",
    "end_date": "2018-04-19 18:14:12",
    "state": 3
  }，
  {
    "id": 1,
    "name": "活动1",
    "location": "青春广场",
    "content": "社团团聚",
    "member_count": "55",
    "start_date": "2018-04-19 18:14:12",
    "end_date": "2018-04-19 18:14:12",
    "state": 4
  }
]
```

## 7 活动论坛

### 7.1 帖子列表

```
GET /forum/posts
```

#### Response

```json
Status: 200 OK

[
  {
    "id": 1,
    "title": "活动1",
    "content": "这是内容",
    "clubName": "文学社",
    "createAt": "2018-04-19 18:14:12",
    "imgUrl": "131231241241.jpg",
    "avatorUrl": "e312312312312.jpg"
  }
]
total: 100
```

### 7.2 查看某一帖子

```
GET /forum/posts/:id
```

#### Response

```json
Status: 200 OK

{
   items:
   {
      "id": 1,
      "title": "活动1",
      "content": "这是内容",
      "clubName": XX社,
      "createAt": "2018-04-19 18:14:12",
      "imgUrl": "1231231231.jpg",
      "avatorUrl": "avator_url"
    }
}
```

### 7.3 删除一条帖子

只能删除自己发的帖子（逻辑删除，把活动的状态改为 "finished"）

```
DELETE /forum/posts/:id
```

#### Response

```json
Status: 204 No Content
```

### 7.4 修改帖子

# TODO

### 7.5 获取某一社团的帖子列表

```
GET /forum/:clubId/posts
```

#### Response

```json
Status: 200 OK

{
  total_count: 50,
  items:[
    {
      "id": 1,
      "title": "活动1",
      "content": "这是内容",
      "clubName": 'XX社',
      "createAt": "2018-04-19 18:14:12",
      "imgUrl": "123125412.jpg",
      "avatarUrl": "12312312.jpg"
    }
  }
}
```

## 8 活动评论

### 8.1 发表评论

对某一活动帖子发表评论

```
POST /forum/posts/:id/remarks
```

#### Input

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `uid`     | `integer` | 用户 ID     |
| `pid`     | `integer` | 帖子 ID     |
| `content` | `string`  | 评论内容    |

#### Example

```json
{
  "uid": 1,
  "pid": 33,
  "content": "3 days later"
}
```

#### Response

```json
Status: 201 Created
```

### 8.2 某帖子的评论列表

```
GET /activity/:actId/remarks
```

#### Response

```json
Status: 200 OK

{
  items: [
    {
      "useId": 1,
      "nickname": "活动1",
      "content": "这是内容",
      "createAt": "2018-04-19 18:14:12",
      "avatorUrl": "e312312312312.jpg"
    }
  ],
  total_count: 100
}
```

### 更新用户活跃度（后台自动）

### 更新用户头衔（后台自动）
