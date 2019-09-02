#HybridFencing

node环境  v9.8.0

安装依赖：
```
npm i
```

运行测试客户端：
```
ionic serve
```

mock工具 <a href="https://github.com/typicode/json-server" target="_blank">json-server</a>

运行测试server端:
```
json-server --watch test.json
```

src目录结构
```
[ '|-- HybridFencing',
  '    |-- app',
  '    |   |-- MSErrorHandler.ts',
  '    |   |-- app.component.ts', -- 框架入口js
  '    |   |-- app.html',
  '    |   |-- app.module.ts',
  '    |   |-- app.scss',
  '    |   |-- http.provider.ts',
  '    |   |-- litelist.service.ts',
  '    |   |-- main.ts',
  '    |-- assets', -- 资源
  '    |-- components', -- 公共组件
  '    |-- directives', -- 指令
  '    |-- logic', -- 工具类
  '    |-- model', -- model
  '    |-- native', -- 原生插件
  '    |-- pages', -- 业务逻辑页面
  '    |-- pipes', -- 管道
  '    |-- theme',
  '        |-- variables.scss', -- 定制ionic主题样式
  '' ]
```