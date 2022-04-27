const inquirer = require('inquirer');
const execa = require('execa');
const { entry } = require('./helper');
// 注入多个包环境变量时的分隔符
const separator = '*';

// 获取packages下的所有文件
const packagesList = [...Object.keys(entry)];

// 至少保证一个
if (!packagesList.length) {
  console.log('不合法目录，请检查src/packages/*/main.tsx');
  return;
}

// 同时添加一个全选
const allPackagesList = [...packagesList, 'all'];

// 调用inquirer和用户交互
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '请选择需要启动的项目:',
      name: 'buildLists',
      choices: allPackagesList, // 选项
      // 校验最少选中一个
      validate(value) {
        return !value.length ? new Error('至少选择一个项目进行启动') : true
      },
      // 当选中all选项时候 返回所有packagesList这个数组
      filter(value) {
        if (value.includes('all')) {
          return packagesList
        }
        return value
      },
    },
  ])
  .then(res => {
    const message = `当前选中Package: ${res.buildLists.join(' , ')}`
    // 控制台输入提示用户当前选中的包
    console.log(message);
    runParallel(res.buildLists);
  }).catch(err => {
    console.log('inquirer error',err);
  });
  
// 调用打包命令
function runParallel(packages) {
  // 当前所有入口文件
  const message = `开始启动: ${packages.join('-')}`;
  console.log(message);
  console.log('\nplease waiting some times...');
  build(packages);
}

// 真正打包函数
function build(buildLists) {
  // 将选中的包通过separator分割
  const stringLists = buildLists.join(separator);
  // 调用通过execa调用webapck命令
  // 同时注意路径是相对 执行node命令的cwd的路径 
  // 这里我们最终会在package.json中用node来执行这个脚本
  execa('webpack', ['--config', './scripts/webpack.prod.js'], {
    stdio: 'inherit',
    env: {
      pages: stringLists,
    },
  });
}
