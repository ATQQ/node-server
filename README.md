# node-server

## 简介
适用于中小型web应用,demo演示等等的服务端开发模板

使用了自定义的Web 框架[flash-wolves](https://github.com/ATQQ/flash-wolves)，支持build为js产物

开箱即用，自定义能力强，核心代码很少，diy的不二之选
## 快速食用
1. 克隆仓库到本地
```sh
git clone https://github.com/ATQQ/node-server.git
```

2. 进入目录
```sh
cd node-server
```

包管理工具，推荐使用 [PNPM](https://pnpm.io/zh/) 

3. 安装相关依赖

```sh
pnpm install
```

1. 启动项目
```sh
# -------dev--------
pnpm dev

# -------prod--------
# 先构建
pnpm build
# 再启动
pnpm start
```
---

## 包含的特性
### 通用
* [x] router(路由)
* [x] localStorage(本地存储)
* [x] tokenUtil
* [x] 拦截器
  * [x] 全局拦截
  * [x] 路由拦截
  * [ ] and more
* [x] 单元测试 - vitest
* [x] 数据库方法包装
  * [x] mysql
  * [x] redis
  * [x] mongodb

### 数据库相关
* [x] mysql
* [x] redis
* [x] mongodb
* ...

### 错误处理
* 运行时的错误
  * [x] 同步
  * [x] Promise rejection
  * [x] async await

## 目录简介

```sh
src
├── config            # 配置文件
│   └── index.ts
├── constants         # 常量
│   ├── dbModalParam.ts
│   ├── errorMsg.ts
│   └── index.ts
├── db                # 数据库操作
│   ├── modal
│   │   └── index.ts
│   └── userDb.ts
├── lib               # 自己封装的模块
│   ├── dbConnect     # 链接数据库
│   │   └── mysql.ts  # mysql
│   │   └── redis.ts  # redis
│   │   └── mongodb.ts  # mongodb
│   │ 
├── middleware              # 中间件
│   ├── index.ts
│   ├── routeInterceptor.ts # 路由拦截
│   └── serverInterceptor.ts  # 全局拦截
├── controllers              # 路由
│   ├── index.ts          # 对外统一暴露
│   └── user.ts     # User 相关路由
│ 
├── index.ts           # 入口启动文件
└── utils               # 一些工具方法
```
