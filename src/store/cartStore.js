/*
 * @Author: jsdawn
 * @Date: 2022-10-17 19:40:46
 * @LastEditTime: 2022-10-20 17:15:13
 * @Description: 购物车 store
 */

import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

let store = (set, get) => ({
  cartList: [],

  cartTotalAmount: () => {
    let total = 0;
    get().cartList.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  },

  cartTotalCount: () => {
    let total = 0;
    get().cartList.forEach((item) => {
      total += item.count;
    });
    return total;
  },

  cartCountMap: () => {
    let countMap = {};
    get().cartList.forEach((item) => {
      if (countMap[item.id] == undefined) {
        countMap[item.id] = 0;
      }
      countMap[item.id] += item.count;
    });
    return countMap;
  },

  /**
   * @description: 加入购物车
   * @param {*} goods 加入购物车的商品
   * @param {*} count 加入购物车的数量
   * @return {*}
   */
  addCartItem: (goods, count = 1) => {
    if (!goods) return;
    let cartItems = [...get().cartList]; // 备份当前cartList
    const idx = cartItems.findIndex((v) => v.id == goods.id);
    if (idx > -1) {
      cartItems[idx].count += parseInt(count);
    } else {
      cartItems.push({
        id: goods.id,
        title: goods.title,
        thumb: goods.thumb,
        tags: goods.tags,
        price: goods.price,
        count: count,
      });
    }
    // 更新cartList
    set({ cartList: cartItems });
  },

  /**
   * @description: 减少购物车数量
   * @param {*} goods 减少的商品
   * @param {*} count 减少的数量
   * @return {*}
   */
  reduceCartItem: (goods, count = 1) => {
    if (!goods) return;
    let cartItems = [...get().cartList]; // 备份当前cartList
    const idx = cartItems.findIndex((v) => v.id == goods.id);
    if (idx > -1) {
      cartItems[idx].count -= count;
      // count 小于1 =》移除
      if (cartItems[idx].count < 1) {
        cartItems.splice(idx, 1);
      }
    }
    // 更新cartList
    set({ cartList: cartItems });
  },

  /**
   * @description: 移除购物车项
   * @param {*} goods 减少的商品
   * @param {*} count 减少的数量
   * @return {*}
   */
  removeCartItem: (goods) => {
    if (!goods) return;
    let cartItems = [...get().cartList]; // 备份当前cartList
    const idx = cartItems.findIndex((v) => v.id == goods.id);
    if (idx > -1) {
      cartItems.splice(idx, 1);
    }
    // 更新cartList
    set({ cartList: cartItems });
  },

  /**
   * @description: 清空购物车
   * @return {*}
   */
  clearCart: () => {
    set({ cartList: [] });
  },
});

// persist 持久化中间件
store = persist(store, { name: 'CART_LIST' });
// subscribeWithSelector 监听中间件
store = subscribeWithSelector(store);
// create store
const useCartStore = create(store);

export { useCartStore };
