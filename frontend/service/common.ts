import { get, post, put, del, upload } from './base';

// 用户相关接口
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

// 获取用户信息
export const getUserInfo = () => {
  return get<User>('/api/user/info');
};

// 更新用户信息
export const updateUserInfo = (data: Partial<User>) => {
  return put<User>('/api/user/info', data);
};

// 聊天相关接口
export interface ChatMessage {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

// 发送聊天消息
export const sendChatMessage = (content: string) => {
  return post<ChatMessage>('/api/chat/message', { content });
};

// 获取聊天历史
export const getChatHistory = (params: { page: number; pageSize: number }) => {
  return get<ChatMessage[]>('/api/chat/history', { params: { 
    page: params.page.toString(), 
    pageSize: params.pageSize.toString() 
  }});
};

// 文件相关接口
export interface FileUploadResponse {
  url: string;
  filename: string;
}

// 上传文件
export const uploadFile = (file: File) => {
  return upload<FileUploadResponse>('/api/upload', file);
};

// 删除文件
export const deleteFile = (fileId: string) => {
  return del<void>(`/api/files/${fileId}`);
};

// 系统相关接口
export interface SystemStatus {
  version: string;
  status: 'running' | 'maintenance';
  lastUpdate: string;
}

// 获取系统状态
export const getSystemStatus = () => {
  return get<SystemStatus>('/api/system/status');
};
