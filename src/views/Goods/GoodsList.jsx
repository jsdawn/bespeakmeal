import { listMallGoods } from '@/api';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SubmitBar, Badge, Button } from 'react-vant';
import GoodsListItem from './GoodsListItem';

function GoodsList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  // 购物车列表
  const cartList = useCartStore((state) => state.cartList);
  const cartTotalCount = useCartStore(
    useCallback((state) => state.cartTotalCount(), [cartList])
  );
  const cartTotalAmount = useCartStore(
    useCallback((state) => state.cartTotalAmount(), [cartList])
  );
  const countMap = useCartStore(
    useCallback((state) => state.cartCountMap(), [cartList])
  );

  // 获取商品列表
  useEffect(() => {
    listMallGoods().then((res) => {
      setList(res.rows);
    });
  }, []);

  return (
    <div className="m-container light has-ft mall-goods">
      <ul className="goods-list">
        {list.map((item) => (
          <GoodsListItem item={item} count={countMap[item.id]} key={item.id} />
        ))}
      </ul>

      <SubmitBar
        price={cartTotalAmount * 100}
        button={
          <Badge content={cartTotalCount || null}>
            <Button
              className="rv-submit-bar__button"
              round
              type="primary"
              disabled={!cartTotalCount}
              onClick={() => {
                navigate('/order/confirm');
              }}
            >
              去结算
            </Button>
          </Badge>
        }
      >
        <Link to="/order/list">订单列表</Link>
      </SubmitBar>
    </div>
  );
}

export default GoodsList;
