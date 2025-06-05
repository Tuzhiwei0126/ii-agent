import { get, post } from "./base";
import type { App, UserProfile } from "@/models/explore";

// 基础响应类型
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

// 角色详情类型
interface RoleDetail {
  id: string;
  name: string;
  title: string;
  description: string;
  level: number;
  abilities: Array<{ id: string; name: string; score?: number }>;
  documents: Array<{ id: string; title: string }>;
  tools: Array<{ id: string; name: string }>;
  avatar_url?: string;
}

// 团队成员数据类型
interface TeamMemberData {
  characters: Array<{
    id: string;
    name: string;
    title: string;
    level: number;
    description: string;
    abilities?: Array<{ id: string; name: string }>;
    documents?: Array<{ id: string; title: string }>;
    tools?: Array<{ id: string; name: string }>;
    avatar_small_url?: string;
  }>;
}

// SWR fetcher 类型定义
interface FetcherParams {
  url: string;
  params?: Record<string, string | number>;
}

// 通用的SWR fetcher函数
export const fetcher = async <T>({ url, params }: FetcherParams): Promise<T> => {
  try {
    const response = await get<T>(url, { params });
    return response;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
};

// 角色列表fetcher
export const fetchRoleList = async ({ url, params }: FetcherParams): Promise<App[]> => {
  return fetcher<App[]>({ url, params });
};

// 团队列表fetcher
export const fetchTeamList = async ({ url, params }: FetcherParams): Promise<App[]> => {
  return fetcher<App[]>({ url, params });
};


// 用户资料V1 fetcher
export const fetchUserProfile = async ({ url, params }: FetcherParams): Promise<UserProfile> => {
  try {
    const response = await post<UserProfile>(url, params);
    return response;
  } catch (error) {
    console.error(`Failed to fetch user profile from ${url}:`, error);
    throw error;
  }
};

// 角色详情fetcher
export const fetchRoleData = async ({ url, params }: FetcherParams): Promise<RoleDetail> => {
  return fetcher<RoleDetail>({ url, params });
};

// 团队成员数据fetcher
export const fetchTeamsMemberData = async ({ url, params }: FetcherParams): Promise<{ data: TeamMemberData }> => {
  const data = await fetcher<TeamMemberData>({ url, params });
  return { data };
};

// 简化的API调用函数
export const getRoleList = async (): Promise<App[]> => {
  try {
    const response = await get<App[]>("/roles");
    return response;
  } catch (error) {
    console.error("Failed to fetch role list:", error);
    throw error;
  }
};

export const getTeamList = async (): Promise<App[]> => {
  try {
    const response = await get<App[]>("/teams");
    return response;
  } catch (error) {
    console.error("Failed to fetch team list:", error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await get<UserProfile>("/user/profile");
    return response;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};

// 角色详情
export const getRoleDetail = async (roleId: string): Promise<App> => {
  try {
    const response = await get<App>(`/roles/${roleId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch role detail:", error);
    throw error;
  }
};

// 团队详情
export const getTeamDetail = async (teamId: string): Promise<App> => {
  try {
    const response = await get<App>(`/teams/${teamId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch team detail:", error);
    throw error;
  }
};

// 搜索角色
export const searchRoles = async (keyword: string): Promise<App[]> => {
  try {
    const response = await get<App[]>("/roles/search", {
      params: { keyword },
    });
    return response;
  } catch (error) {
    console.error("Failed to search roles:", error);
    throw error;
  }
};

// 搜索团队
export const searchTeams = async (keyword: string): Promise<App[]> => {
  try {
    const response = await get<App[]>("/teams/search", {
      params: { keyword },
    });
    return response;
  } catch (error) {
    console.error("Failed to search teams:", error);
    throw error;
  }
};

// 登录
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

// 注册
export const register = async (
  username: string,
  password: string,
  email: string
): Promise<LoginResponse> => {
  try {
    const response = await post<LoginResponse>("/auth/register", {
      username,
      password,
      email,
    });
    return response;
  } catch (error) {
    console.error("Failed to register:", error);
    throw error;
  }
};
