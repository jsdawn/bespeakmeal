import GoodsList from '@/views/Goods/GoodsList';
import OrderConfirm from '@/views/Order/OrderConfirm';
import OrderList from '@/views/Order/OrderList';
import OrderDetail from '@/views/Order/OrderDetail';
import { Outlet } from 'react-router-dom';

const routes = [
  { path: '/', index: true, element: <GoodsList /> },
  {
    path: 'order',
    element: <Outlet />,
    children: [
      { path: 'confirm', element: <OrderConfirm /> },
      { path: 'list', element: <OrderList /> },
      { path: ':orderNo', element: <OrderDetail /> },
    ],
  },
];

export default routes;
