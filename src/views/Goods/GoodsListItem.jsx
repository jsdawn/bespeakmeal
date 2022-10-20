import PropTypes from 'prop-types';
import { useCartStore } from '@/store/cartStore';
import { ProductCard, Tag, Button, Stepper } from 'react-vant';

function GoodsListItem(props) {
  const { item, count = 0 } = props;
  const tags = item.tags ? item.tags.split(',') : [];

  const addCartItem = useCartStore((state) => state.addCartItem);
  const reduceCartItem = useCartStore((state) => state.reduceCartItem);

  return (
    <ProductCard
      price={item.price}
      desc={item.brief}
      title={item.title}
      thumb={item.thumb}
      tags={tags.map((text) => (
        <Tag type='primary' plain key={text}>{text}</Tag>
      ))}
      num={
        <div className="goods__num">
          {count > 0 ? (
            <Stepper
              min={0}
              buttonSize="24px"
              value={count}
              onPlus={() => {
                addCartItem(item);
              }}
              onMinus={() => {
                reduceCartItem(item);
              }}
            />
          ) : (
            <Button
              type="primary"
              size="mini"
              round
              onClick={() => {
                addCartItem(item);
              }}
            >
              选购
            </Button>
          )}
        </div>
      }
    />
  );
}

GoodsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  count: PropTypes.number,
};

export default GoodsListItem;
