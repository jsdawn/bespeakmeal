import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-vant';
import OrderGoodsItem from './OrderGoodsItem';

// 订单列表项 Item
function OrderListItem({ item }) {
  const navigate = useNavigate();
  const isOk = item.pay_status == 'success'; // 是否完成支付

  return (
    <Card className="mb15" round onClick={() => navigate('/order/' + item.no)}>
      <Card.Header className="block full-w font-md">
        <span>盈科智谷分店</span>
        <span
          className={'fr font-reg ' + (isOk ? 'text-primary' : 'text-muted')}
        >
          {isOk ? '已完成' : '已取消'}
        </span>
      </Card.Header>

      <Card.Body style={{ padding: 0 }}>
        {item.goods_list.map((item, index) => (
          <OrderGoodsItem item={item} key={index} />
        ))}
      </Card.Body>

      {isOk && (
        <Card.Footer border>
          <span>取单号：</span>
          <b>{item.code}</b>
        </Card.Footer>
      )}
    </Card>
  );
}

OrderListItem.prototype = {
  item: PropTypes.object.isRequired,
};

export default OrderListItem;
