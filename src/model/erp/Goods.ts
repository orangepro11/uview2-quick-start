import { createGoods, getGoodsInfo, getGoodsList, updateGoods } from '@/api/erp/goods';
import { List as IList } from '@/helpers/erp/types';

export interface Goods {
  id?: number;
  title: string;
  preview: string;
  unit: string;
  code: string;
  price: number;
}

export interface GoodsQuery {
  page: number;
  title: string;
  code: string;
}

export async function List(payload: GoodsQuery): Promise<IList<Goods>> {
  return getGoodsList(payload.page, payload.title, payload.code);
}

export async function Create(goods: Goods) {
  createGoods(goods);
}

export async function Get(id: number): Promise<Goods> {
  return getGoodsInfo(id);
}

export async function Update(payload: GoodsQuery) {
  return updateGoods(payload);
}
