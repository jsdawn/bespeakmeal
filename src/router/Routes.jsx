import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载组件，与 Suspense 配合
const GoodsList = lazy(() => import('@/views/Goods/GoodsList'));
const OrderConfirm = lazy(() => import('@/views/Order/OrderConfirm'));
const OrderList = lazy(() => import('@/views/Order/OrderList'));
const OrderDetail = lazy(() => import('@/views/Order/OrderDetail'));

// 路由配置
function Routes() {
  const routes = [
    { path: '/', element: <GoodsList /> },
    { path: 'order/confirm', element: <OrderConfirm /> },
    { path: 'order/list', element: <OrderList /> },
    { path: 'order/:orderNo', element: <OrderDetail /> },
    { path: '*', element: 'Not Found' },
  ];
  return useRoutes(routes);
}

export default Routes;
