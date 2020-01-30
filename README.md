# node-server

## 简介
适用于中小型web应用,demo演示等等的服务端开发脚手架

基于node实现,不依赖第三方Web服务端框架

## 快速食用
1. 克隆仓库到本地
```git
git clone https://github.com/ATQQ/node-server.git
```

2. 进入目录
```shell
cd node-server
```

3. 安装相关依赖
```npm
npm install
```

4. 启动项目
```npm
npm run dev
```
---

## 自定义实现
* router(路由)
* localStorage(本地存储)
* ...

## 数据库相关
* mysql:完成基本配置与测试用例的编写
* ...

## 目录简介

```text
├── package.json            依赖与npm相关命令
├── package-lock.json
├── README.md               项目简介
├── app.js                  启动入口
├── common                  常用的一些方法
│   ├── controller.js       自动扫描并添加controller目录中的所有controller
│   ├── regExp.js           常用正则
│   └── responseExpand.js   拓展request
├── config                  常用配置文件
│   └── db.config.js        mysql数据库配置文件
├── controller              业务逻辑层
│   ├── appControler.js     应用相关API
│   ├── fileController.js   文件操作相关API
│   └── userController.js   用户相关API
├── db                      数据库操作相关
│   ├── coon.js             生成connection对象
│   ├── testDb.sql          用于测试的数据库sql
│   └── userDb.js           用户表的基本操作
├── test
│   ├── index.html          测试API的页面(待完善)
│   └── userDbTest.js       测试userDb中的所有基础方法
└── utils                   相关工具方法
    ├── logUtil.js          打印路由
    ├── md5.js              md5加密相关
    ├── randUtil.js         生成一些随机值的方法
    ├── storageUtil.js      服务端的本地存储(仅在运行阶段)
    ├── tokenUtil.js        用户令牌相关
    └── urlUtil.js          封装一些url模块的方法
```
