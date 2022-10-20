/*
 * @Author: jsdawn
 * @Date: 2022-10-19 16:00:40
 * @LastEditTime: 2022-10-20 17:18:47
 * @Description: 模拟订单列表api (实际不需要该store)
 */

import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import dayjs from 'dayjs';

let store = (set, get) => ({
  orderList: [],

  // 新增订单
  addOrder: (data) => {
    let totalPrice = 0;
    let totalCount = 0;
    data.goods_list.forEach((item) => {
      totalPrice += item.price * item.count;
      totalCount += item.count;
    });

    // 订单默认信息
    let order = {
      ...data,
      // 订单接口字段
      no: 'M' + dayjs().format('YYYYMMDDThhmmssSSS'), // M日期T时间SSS
      total_price: totalPrice,
      total_count: totalCount,
      created_at: dayjs().format('YYYY/MM/DD hh:mm:ss'),
      code: '', // 取单号
      // 店铺信息
      shop: {
        id: data.shop_id,
        name: '品茶.盈科智谷分店',
        tel: '226-4735-834',
        addr: '广州天河xx路xx号',
      },
      // 默认支付信息
      pay_status: 'not_pay',
      pay_time: null,
      pay_type: 0,
      payment_price: 0,
    };
    // 订单支付成功更新order
    const random = Math.random(); // 0-1 模拟支付状态
    if (random > 0.4) {
      order = {
        ...order,
        code: 'T0012',
        pay_status: 'success',
        pay_time: dayjs().format('YYYY/MM/DD hh:mm:ss'),
        pay_type: 1,
        payment_price: totalPrice,
      };
    }
    set({ orderList: get().orderList.concat(order) });
    return order;
  },
});

// persist 持久化中间件
store = persist(store, { name: 'ORDER_LIST' });
// subscribeWithSelector 监听中间件
store = subscribeWithSelector(store);
// create store
const useOrderStore = create(store);

export { useOrderStore };
