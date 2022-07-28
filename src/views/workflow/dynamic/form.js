// 自动注册动态组件
const componentDynamic = require.context('./formItem', false, /\.vue$/);
// 将路径数组作为参数给引入模块
const modules = {};
componentDynamic.keys().forEach((item) => {
  // 组件名
  const moduleName = componentDynamic(item).default.name;
  // 组件模块
  modules[moduleName] = componentDynamic(item).default;
});

export default modules;
