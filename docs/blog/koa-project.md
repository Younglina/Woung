---
title: 相对完整的Koa项目配置
author: Younglina
date: '2023-12-27'
categories:
- 文档
tags:
- 记录
---
一个相对完整的Koa项目结构通常包括以下文件夹和文件：

`config`：存放配置文件，如数据库连接信息、日志配置等。  
`controllers`：存放控制器文件，处理业务逻辑。  
`middlewares`：存放中间件文件，用于处理请求、错误处理、日志记录等。  
`models`：存放数据模型文件，用于定义数据结构和数据库交互。  
`routes`：存放路由文件，定义API端点和路由处理逻辑。  
`services`：存放服务文件，封装业务逻辑和数据访问。  
`utils`：存放工具函数和通用功能的文件。  
`logs`：存放日志文件，用于记录应用程序的运行日志。  
`app.js`：应用程序的入口文件，用于创建Koa实例、加载中间件和路由等。  
`package.json`：管理项目的依赖和脚本。  
`.env`：存放环境变量配置。  

```
project/
├── config/
│   ├── db.js
│   ├── logger.js
│   └── ...
├── controllers/
│   ├── authController.js
│   └── ...
├── middlewares/
│   ├── errorHandler.js
│   ├── logger.js
│   └── ...
├── models/
│   ├── user.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   └── ...
├── services/
│   ├── authService.js
│   └── ...
├── utils/
│   ├── validation.js
│   └── ...
├── logs/
│   ├── error.log
│   ├── info.log
│   └── ...
├── app.js
├── package.json
├── .env
```

## 跨域配置
```javascript
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的请求方法
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
    // 对于预检请求（OPTIONS请求），直接返回200状态码
  if (ctx.method === 'OPTIONS') {
    ctx.status=204;
    ctx.body=""
  } else {
    await next();
  }
});
```

## 中间件

### koa-onerror
捕获由下游中间件抛出的错误，并通过发送适当的错误响应来处理它们
```javascript
const onerror = require('koa-onerror')
onerror(app)
```

### koa-bodyparser
解析请求体并将其存储在ctx.request.body属性中
```javascript
const onerror = require('koa-bodyparser')
onerror(app)
```

### koa-json-error
将响应体转换为JSON格式，并设置适当的Content-Type头
```javascript
const onerror = require('koa-json-error')
app.use(onerror({
  format: (err) => { // 返回错误的格式
    return { code: err.status, message: err.message, result: err.stack }
  },
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
}))
```

### log4js
日志记录
```javascript
const log4js = require('log4js');
log4js.configure({
  // 定义日志的输出位置，可以包括控制台输出和文件输出。可以根据日志级别分别配置不同的文件输出
  appenders: {
    consoleOut: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
      },
    },
    fileOut: {
      type: 'file',
      filename: `./logs/logger`,
      pattern: 'yyyy-MM-dd.log',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
      },
      alwaysIncludePattern: true,
    },
    errorOut: {
      type: 'file',
      filename: `./logs/error`,
      pattern: 'yyyy-MM-dd.log',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
      },
      alwaysIncludePattern: true,
    },
  },
  // categories定义日志的策略，可以根据日志级别选择不同的输出方式。
  categories: {
    default: {
      appenders: ['consoleOut', 'fileOut'],
      level: 'info',
    },
    error: {
      appenders: ['consoleOut', 'errorOut'],
      level: 'error',
    },
  },
});

module.exports = {
  info: (content) => {
    let logger = log4js.getLogger('info')
    logger.info(content);
  },
  error: (content) => {
    let logger = log4js.getLogger('error')
    logger.error(content);
  }
};
```

### better-sqlite3
数据库 https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md
```javascript
const Database = require('better-sqlite3');
app.use(async (ctx, next) => {
  ctx.database = new Database('./database/data.db', { verbose: console.log }); // 将db挂在ctx上下文对象的database属性上
  await next();
});
```

### jsonwebtoken
鉴权 https://www.npmjs.com/package/jsonwebtoken  
我把用户名存入了token并放入cookie中，后续客户端请求设置携带cookie请求，既能鉴权也可直接获取用户信息

封装jwt验证中间件
```javascript
const jwt = require('jsonwebtoken');
const jwtMiddleware = async (ctx, next) => {
  // 从 Cookie 中获取 JWT
  const token = ctx.cookies.get('token');
  
  if (token) {
    try {
      // 验证 JWT
      const decoded = jwt.verify(token, 'secritykey');

      // 将解码后的用户信息添加到请求上下文中
      ctx.state.user = decoded;
    } catch (error) {
      // JWT 验证失败
      ctx.status = 401;
      ctx.body = { code: '-1', message: '未登录' };
      return;
    }
  } else {
    // Cookie 中没有 JWT
    ctx.status = 401;
    ctx.body = { code: '-1', message: '未登录' };
    return;
  }

  await next();
};

module.exports = jwtMiddleware
```

```javascript
const jwt = require('jsonwebtoken')

router.get('/login', async (ctx) => {
  const { name } = ctx.request.query
  const token = jwt.sign({ name }, 'secritykey', { algorithm: 'RS256', expiresIn: '1h' }); // 生成JWT令牌，有效期为1小时
  // 将JWT令牌设置为Cookie
  ctx.cookies.set('token', token, { httpOnly: true });
  ctx.body = { data: '1' }
})

router.get('/', async (ctx) => {
  const user = ctx.state.user || {}
  console.log(user);
})
```

