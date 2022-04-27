module.exports = {
  plugins: [
    require('autoprefixer'),//添加浏览器厂商前缀
    require('cssnano')({//压缩css代码
      preset: 'default',
    }),
  ],
};
