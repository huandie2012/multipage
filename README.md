# 生成多页模版

## 🗃 特色功能

1. 最新技术栈: React 17 + TypeScript 4 + Webpack 5
2. 以模块开发，根据需求任意搭配数据模块生成多种模版
3. 以多页的形式呈现
4. 支持热更新
5. CSS Encapsulation 作用域隔离 Scoped-SCSS
6. JS/TS/CSS 编码规范检查和 Prettier 统一代码风格化
7. Jest 单元测试框架和 Enzyme 测试库

## 🧑🏻‍💻 基本指令

1. 安装依赖: `npm install`
2. 运行单元测试: `npm test`
3. 启动开发服务: `npm run dev`，并选择要启动的报告模版，如若选择all启动本地服务后可以通过http://localhost:9000/xx.html 的形式访问src/pages目录下的所有测试报告

- 启动后通过 [http://localhost:9000](http://localhost:9000) 访问

4. 构建打包: `npm run build`，并选择要构建打包的报告模版，如若选择all可以对src/pages目录下的所有测试报告进行构建打包

- 构建产物生成在 dist/目录

5. JS/TS/CSS 代码规范检查: `npm run lint`
6. 构建包大小分析: `npm run analyze`。

### 代码结构

```
├── .babelrc.js
├── .gitignore
├── README.md
├── scripts --- 运行项目用的各类脚本
│   ├── utils
│   │   ├── dev.js
│   │   ├── prod.js
│   │   ├── helper.js
│   │   ├── constant.js
│   ├── webpack.base.js
│   ├── webpack.dev.js
│   ├── webpack.prod.js
├── package-lock.json
├── package.json
├── public 
│   ├── index.html --- 插件的模板文件
├── src --- 前端页面组件代码
│   ├── api --- 依赖的外部请求
│   │   ├── index.ts
│   │   └── req.ts
│   ├── component --- 测试报告数据模块组件
│   │   ├── coverage
│   │   │   ├── index.tsx
│   │   │   ├── index.scss
│   ├── images.d.ts
│   ├── def --- 各类定义，比如类型和常量
│   │   ├── constant.ts
│   │   └── type.ts
│   ├── pages --- 下面的每个目录都是一个独立的测试报告页面应用
│   │   ├── app_e2e_test
│   │   │   ├── index.tsx 入口文件
│   │   │   ├── index.scss
│   │   └── fe_e2e_test
│   │   │   ├── index.tsx 入口文件
│   │   │   ├── index.scss
│   ├── asset --- 依赖的静态资源文件
│   │   ├── home-page.png
│   └── util --- 各类工具
│       └── req.ts
├── postcss.config.js
└── tsconfig.json
```
