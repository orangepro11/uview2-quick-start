import { getStoreList } from '@/api/erp/store';
import { List } from '@/helpers/erp/types';

export enum StoreStatus {
  '正常' = 1
}

export interface Store {
  id: number; // 数据库主键
  title: string; // 库存名字
  price: number; // 价格
  count: number; // 库存余量
  preview: string; // 库存预览图片
  status: StoreStatus; // 库存状态
}

export function getStores(): Promise<List<Store>> {
  return getStoreList({});
}
