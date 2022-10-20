import PropTypes from 'prop-types';
import { ProductCard } from 'react-vant';

function OrderGoodsItem(props) {
  const { item } = props;

  return (
    <ProductCard
      className="order-goods-item"
      price={item.price}
      desc={item.brief}
      title={item.title}
      thumb={item.thumb}
      num={item.count}
      style={{ '--rv-product-card-thumb-size': '60px' }}
    />
  );
}

OrderGoodsItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderGoodsItem;
