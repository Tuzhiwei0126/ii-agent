import { post } from './base';

interface LoginParams {
  username: string;
  password: string;
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
export const login = (params: LoginParams) => {
  return post<LoginResponse>('/api/auth/login', params);
};

// 登出
export const logout = () => {
  return post('/api/auth/logout');
};

// 获取当前用户信息
export const getCurrentUser = () => {
  return post('/api/auth/me');
}; 