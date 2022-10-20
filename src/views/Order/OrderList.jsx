import { listMallOrder } from '@/api';
import FloatingHome from '@/components/FloatingHome';
import { useEffect } from 'react';
import { useState } from 'react';
import { Divider } from 'react-vant';
import OrderListItem from './OrderListItem';

function OrderList() {
  const [list, setList] = useState(() => []);

  useEffect(() => {
    listMallOrder().then((res) => {
      setList(res.rows);
    });
  }, []);

  return (
    <div className="m-container p15 has-ft mall-order-list">
      {list.map((item) => (
        <OrderListItem item={item} key={item.no} />
      ))}

      {list.length == 0 && <Divider>暂无订单数据</Divider>}

      <FloatingHome />
    </div>
  );
}

export default OrderList;
