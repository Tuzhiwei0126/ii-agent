import { get, post } from "./base";

// 类型定义
type Fetcher<TResponse, TParams> = (params: TParams) => Promise<TResponse>;

interface Role {
  id: string;
  name: string;
  // 添加其他 Role 相关字段
}

interface TeamMember {
  id: string;
  name: string;
  // 添加其他 TeamMember 相关字段
}

interface Team {
  id: string;
  name: string;
  // 添加其他 Team 相关字段
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // 添加其他用户字段
  };
  // 添加其他登录响应字段
}

interface UserProfileOriginResponse {
  data: {
    id: string;
    name: string;
    email: string;
    // 添加其他用户资料字段
  };
}

// 用户相关接口
export const fetchChatPolish: Fetcher<{ data: string }, { url: string }> = ({
  url,
}: { url: string }) => {
  return post(url) as Promise<{ data: string }>;
};

export const fetchPdfLink: Fetcher<
  { data: Role[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: Role[] }>(url, { params });
};

export const fetchHtml: Fetcher<
  LoginResponse,
  { url: string; body: Record<string, string | number> }
> = ({ url, body }: { url: string; body: Record<string, string | number> }) => {
  return post(url, { body }) as Promise<LoginResponse>;
};

export const fetchHtmlLink: Fetcher<
  { data: Role[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: Role[] }>(url, { params });
};

export const fetchTeamsMemberData: Fetcher<
  { data: TeamMember[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: TeamMember[] }>(url, { params });
};

export const fetchRoleData: Fetcher<
  { data: Role[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: Role[] }>(url, { params });
};

export const fetchRoleList: Fetcher<
  { data: Role[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: Role[] }>(url, { params });
};

export const fetchTeamList: Fetcher<
  { data: Team[] },
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return get<{ data: Team[] }>(url, { params });
};

export const fetchUserProfile: Fetcher<
  UserProfileOriginResponse,
  { url: string; params: Record<string, string | number> }
> = ({ url, params }: { url: string; params: Record<string, string | number> }) => {
  return post<UserProfileOriginResponse>(url, { params });
};

export const login: Fetcher<
  LoginResponse,
  { url: string; body: Record<string, string | number> }
> = ({ url, body }: { url: string; body: Record<string, string | number> }) => {
  return post(url, { body }) as Promise<LoginResponse>;
};

export const register: Fetcher<
  LoginResponse,
  { url: string; body: Record<string, string | number> }
> = ({ url, body }: { url: string; body: Record<string, string | number> }) => {
  return post(url, { body }) as Promise<LoginResponse>;
};
