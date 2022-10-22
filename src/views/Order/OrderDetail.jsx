import { Card, Cell } from 'react-vant';
import OrderGoodsItem from './OrderGoodsItem';
import FloatingAction from '@/components/FloatingAction';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getMallOrder } from '@/api';

function OrderDetail() {
  const { orderNo } = useParams();
  const [order, setOrder] = useState(() => []);

  const isOk = () => order.pay_status == 'success';

  useEffect(() => {
    // 获取订单详情
    getMallOrder(orderNo).then((res) => {
      setOrder(res.data);
    });
  }, []);

  return (
    <div className="m-container p15 has-ft mall-order-detail">
      <Card className="mb15" round>
        <Card.Body className="flex flex--col flex--middle">
          <h3>{isOk() ? '已完成' : '已取消'}</h3>
          {isOk() && (
            <>
              <b
                className="text-primary"
                style={{ margin: '5px 0', fontSize: 18 }}
              >
                {order.code}
              </b>
              <p className="font-sm">取单号</p>
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="mb15" round>
        <Card.Header>{order.shop?.name}</Card.Header>
        <Card.Body style={{ padding: 0 }}>
          {(order?.goods_list || []).map((item, index) => (
            <OrderGoodsItem item={item} key={index} />
          ))}
        </Card.Body>
        <Card.Footer border>
          合计：<b>¥{order.total_price}</b>
        </Card.Footer>
      </Card>

      <Card className="mb15" round>
        <Card.Header>门店信息</Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Cell.Group>
            <Cell title="门店名称" value={order.shop?.name} />
            <Cell title="门店地址" value={order.shop?.addr} />
            <Cell title="联系方式" value={order.shop?.tel} />
          </Cell.Group>
        </Card.Body>
      </Card>

      <Card className="mb15" round>
        <Card.Header>用餐信息</Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Cell.Group>
            <Cell
              title="取餐方式"
              value={order.meal_type == 1 ? '自提' : '堂食'}
            />
            <Cell
              title="就餐时间"
              value={
                order.meal_time == 0 ? '立即就餐' : `${order.meal_time}分钟后`
              }
            />
            <Cell title="预留手机号" value={order.phone || '-'} />
            <Cell title="取单号" value={order.code || '-'} />
          </Cell.Group>
        </Card.Body>
      </Card>

      <Card round>
        <Card.Header>订单信息</Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Cell.Group>
            <Cell valueClass="font-sm" title="订单编号" value={order.no} />
            <Cell
              valueClass="font-sm"
              title="下单时间"
              value={order.created_at}
            />
            <Cell
              title="支付方式"
              value={order.pay_type == 1 ? '微信支付' : '其他支付'}
            />
            <Cell title="实付金额" value={'¥' + order.payment_price} />
            <Cell title="备注信息" value={order.remark || '无'} />
          </Cell.Group>
        </Card.Body>
      </Card>

      <FloatingAction />
    </div>
  );
}

export default OrderDetail;
