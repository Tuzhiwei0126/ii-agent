// 基础请求配置类型
interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

// 基础响应类型
interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 基础 URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// 处理 URL 参数
const handleUrlParams = (url: string, params?: Record<string, string>): string => {
  if (!params) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return `${url}?${searchParams.toString()}`;
};

// 处理请求错误
const handleError = (error: any): never => {
  console.error('Request Error:', error);
  throw error;
};

// 基础请求函数
const request = async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
  const { params, ...restConfig } = config;
  const finalUrl = handleUrlParams(`${BASE_URL}${url}`, params);

  try {
    const response = await fetch(finalUrl, {
      ...restConfig,
      headers: {
        'Content-Type': 'application/json',
        // 添加 token 到请求头
        'Authorization': token.get() ? `Bearer ${token.get()}` : '',
        ...restConfig.headers,
      },
    });

    if (!response.ok) {
      // 如果是 401 未授权,清除 token 并跳转到登录页
      if (response.status === 401) {
        token.remove();
        window.location.href = '/login';
        throw new Error('未授权,请重新登录');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BaseResponse<T> = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.message || '请求失败');
    }

    return data.data;
  } catch (error) {
    return handleError(error);
  }
};

// GET 请求
export const get = <T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'GET' });
};

// POST 请求
export const post = <T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>) => {
  return request<T>(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// PUT 请求
export const put = <T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>) => {
  return request<T>(url, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// DELETE 请求
export const del = <T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'DELETE' });
};

// 文件上传
export const upload = <T>(url: string, file: File, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  const formData = new FormData();
  formData.append('file', file);

  return request<T>(url, {
    ...config,
    method: 'POST',
    body: formData,
    headers: {
      ...config?.headers,
      // 删除 Content-Type，让浏览器自动设置
      'Content-Type': undefined,
    },
  });
};
