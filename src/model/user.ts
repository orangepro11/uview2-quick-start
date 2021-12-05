import {getUser} from '@/api';

export interface User {
	id: number; // 数据库主键
	name: string; // 姓名/昵称
	username: string;// 用户名
	user_icon: string; // 头像
}

// 标记返回类型为 User,方便代码提示
export async function user_get():Promise<User> {
	return getUser();
}