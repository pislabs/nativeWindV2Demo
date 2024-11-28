import './setup';
import {AppRegistry} from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('App', () => App);

const search = window.location.search;
let params = {};
search
  .slice(1)
  .split('&')
  .forEach(item => {
    const arr = item.split('=');
    if (arr[0] && arr[1]) {
      params[arr[0]] = decodeURIComponent(arr[1]);
    }
  });

// 启动 App 组件
AppRegistry.runApplication('App', {
  // 启动时传给 App 组件的属性
  initialProps: params,
  // 渲染 App 的 DOM 容器
  rootTag: document.getElementById('react-root'),
});
