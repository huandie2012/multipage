module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        // 自动导入 JSX 转换而来的函数
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    // CSS 作用域 Scoped CSS
    'babel-plugin-react-scoped-css',
  ],
};
