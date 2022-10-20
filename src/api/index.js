/*
 * @Author: jsdawn
 * @Date: 2022-10-20 14:11:53
 * @LastEditTime: 2022-10-20 17:33:05
 * @Description: API 接口
 */

import { useOrderStore } from '@/store/orderStore';

// 获取商品列表
export function listMallGoods() {
  const rows = [
    {
      brief: '爆汁柠檬搭配蜜韵红茶，更酸爽，更维C',
      created: '2022-10-12 09:47:03',
      id: 3,
      price: '21.00',
      status: 1,
      tags: '爆汁柠檬,红茶',
      thumb:
        'http://www.qiudashu.com/uploads/20220131/dce85745842a6bfd5f2219df5adee0d0.jpg',
      title: '爆汁柠檬茶',
      unit: '杯',
      updated: null,
    },
    {
      brief: '激爽气泡注入雨林茉莉柠檬茶，茉香鲜活，心旷神怡',
      created: '2022-10-12 09:47:03',
      id: 4,
      price: '23.00',
      status: 1,
      tags: '现制气泡,0酒精',
      thumb:
        'http://www.qiudashu.com/uploads/20220131/513382e86ae8ea4d76e25783501d7cc7.jpg',
      title: '雨林茉莉香槟',
      unit: '杯',
      updated: null,
    },
  ];
  return new Promise((resolve, reject) => {
    resolve({ rows });
  });
}

// 提交订单
export function postMallOrder(data) {
  const addOrder = useOrderStore.getState().addOrder;
  return new Promise((resolve, reject) => {
    const order = addOrder(data);
    resolve({ data: { no: order.no } });
  });
}

// 获取订单列表
export function listMallOrder(data) {
  const rows = useOrderStore.getState().orderList;
  return new Promise((resolve, reject) => {
    resolve({ rows });
  });
}

// 获取订单详情
export function getMallOrder(orderNo) {
  const rows = useOrderStore.getState().orderList;
  const order = rows.find((v) => v.no == orderNo);
  return new Promise((resolve, reject) => {
    resolve({ data: order });
  });
}
