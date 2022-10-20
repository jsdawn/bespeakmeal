import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterConfig from './router/RouterConfig.jsx';
import './styles/index.scss';

// StrictMode 严格模式会 多次执行 useMemo等hooks，以确保正确作用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);
