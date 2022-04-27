// scripts/webpack.base.js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const { separator } = require('./utils/constant');
const { getEntryTemplate } = require('./utils/helper');
// 注入多个包环境变量时的分隔符
const separator = '*';
const path = require('path');

// 将packages拆分成为数组 ['editor','home']
const pages = process.env.pages.split(separator);
// 调用getEntryTemplate 获得对应的entry和htmlPlugins
const { entry, htmlPlugins } = getEntryTemplate(pages);

module.exports = {
  // 入口文件，这里之后会着重强调
  entry,
  // entry: {
  //   home: path.resolve(__dirname, '../src/pages/home/index.tsx'),
  //   editor: path.resolve(__dirname, '../src/pages/editor/index.tsx'),
  // },
  resolve: {
    // 取消对符号链接位置的解析
    symlinks: false,
    // 复用 tsconfig.json 的 paths 别名设置
    plugins: [new TsconfigPathsPlugin()],
    // 模块后缀解析，尽量只包含使用到的且频率高的放前面
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss'],
    // 指定模块的查找路径，避免逐层查找
    modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            //将CSS提取到单独的文件中
            loader: MiniCssExtractPlugin.loader,
          },
          //解析css文件中的@import/require
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type:'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 同时动态生成对应的htmlPlugins
    ...htmlPlugins,
    // new htmlWebpackPlugin({
    //   filename: 'home.html',
    //   chunks: ['home'],
    //   template: path.resolve(__dirname, '../public/index.html'),
    // }),
    // new htmlWebpackPlugin({
    //   filename: 'editor.html',
    //   chunks: ['editor'],
    //   template: path.resolve(__dirname, '../public/index.html'),
    // }),
  ]
};
