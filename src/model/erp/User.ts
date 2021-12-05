import { getUserInfo } from '@/helpers/erp/hooks';
import { ErpUserInfo } from '@/helpers/erp/types';

export function getUser(): ErpUserInfo {
  return getUserInfo();
}
