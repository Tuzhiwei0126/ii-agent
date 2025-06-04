import { post } from './base';
import { request } from './base';

export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    // 其他用户信息字段
  };
}

// 登录
export const login = async (params: LoginParams) => {
  const response = await request.post('/api/auth/login', params);
  return response.data;
};

// 登出
export const logout = () => {
  return post('/api/auth/logout');
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return post('/api/auth/me');
};

export const register = async (params: {
  username: string;
  password: string;
  email: string;
}) => {
  const response = await request.post('/api/auth/register', params);
  return response.data;
}; 