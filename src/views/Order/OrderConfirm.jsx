import { useCartStore } from '@/store/cartStore';
import { Card, Cell, SubmitBar, Button, Input, Radio, hooks } from 'react-vant';
import { Link, useNavigate } from 'react-router-dom';
import OrderGoodsItem from './OrderGoodsItem';
import { postMallOrder } from '@/api';

function OrderConfirm() {
  const navigate = useNavigate();
  const cartList = useCartStore((state) => state.cartList);
  const cartTotalAmount = useCartStore((state) => state.cartTotalAmount);
  const cartTotalCount = useCartStore((state) => state.cartTotalCount);
  const clearCart = useCartStore((state) => state.clearCart);

  // 填写表单信息
  const [form, updateForm] = hooks.useSetState({
    phone: '',
    meal_time: 0,
    meal_type: 0,
    remark: '',
  });

  // 提交订单
  const submitOrder = () => {
    // 提交确认信息
    const data = {
      ...form,
      goods_list: cartList, // 购物列表
      shop_id: 1, // 店铺id
    };
    postMallOrder(data).then((res) => {
      clearCart();
      const orderNo = res.data.no;
      // 跳转订单详情
      navigate('/order/' + orderNo, { replace: true });
    });
  };

  return (
    <div className="m-container p15 has-ft mall-order-confirm">
      <Card className="mb15" round>
        <Card.Header>盈科智谷分店</Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Cell.Group>
            <Cell
              title="预留电话"
              value={
                <Input
                  className="text-rt"
                  type="tel"
                  value={form.phone}
                  onChange={(phone) => updateForm({ phone })}
                  placeholder="选填：预留手机号"
                />
              }
            />
            <Cell title="就餐时间" value="立即取餐" />
            <Cell
              title="享用方式"
              value={
                <Radio.Group
                  className="flex--right"
                  direction="horizontal"
                  value={form.meal_type}
                  onChange={(meal_type) => updateForm({ meal_type })}
                >
                  <Radio name={0}>堂食</Radio>
                  <Radio name={1}>自提</Radio>
                </Radio.Group>
              }
            />
          </Cell.Group>
        </Card.Body>
      </Card>

      <Card className="mb15" round>
        <Card.Body style={{ padding: 0 }}>
          {cartList.map((item, index) => (
            <OrderGoodsItem item={item} key={index} />
          ))}
        </Card.Body>
        <Card.Footer border>小计：¥{cartTotalAmount()}</Card.Footer>
      </Card>

      <Card round>
        <Card.Body style={{ padding: 0 }}>
          <Cell.Group>
            <Cell
              title={<b>备注</b>}
              label={
                <Input.TextArea
                  placeholder="口味、偏好等要求..."
                  maxLength={50}
                  value={form.remark}
                  onChange={(remark) => updateForm({ remark })}
                />
              }
            />
          </Cell.Group>
        </Card.Body>
      </Card>

      <SubmitBar
        price={cartTotalAmount() * 100}
        button={
          <Button
            className="rv-submit-bar__button"
            round
            type="primary"
            disabled={!cartTotalCount()}
            onClick={submitOrder}
          >
            提交支付
          </Button>
        }
      >
        <Link onClick={() => navigate(-1)}>返回</Link>
      </SubmitBar>
    </div>
  );
}

export default OrderConfirm;
