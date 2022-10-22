import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';

/**
  StrictMode 严格模式不能自动检测到你的副作用，但它可以帮助你发现它们，使它们更具确定性。
  通过故意重复调用以下函数来实现的该操作：

class 组件的 constructor，render 以及 shouldComponentUpdate 方法
class 组件的生命周期方法 getDerivedStateFromProps
函数组件体
状态更新函数 (即 setState 的第一个参数）
函数组件通过使用 useState，useMemo 或者 useReducer 
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
