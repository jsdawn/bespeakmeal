import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import GoodsList from '@/views/Goods/GoodsList';
import OrderConfirm from '@/views/Order/OrderConfirm';
import OrderList from '@/views/Order/OrderList';
import OrderDetail from '@/views/Order/OrderDetail';

export default function RouterConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="goods" element={<GoodsList />} />
          <Route path="order/confirm" element={<OrderConfirm />} />
          <Route path="order/list" element={<OrderList />} />
          <Route path="order/:orderNo" element={<OrderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return 'Home';
}
