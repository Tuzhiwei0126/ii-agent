// 在文件顶部添加 token 相关的导入
import { token } from '../utils/token';  // 假设 token 工具在这个位置

// 基础请求配置类型
interface RequestConfig extends RequestInit {
  params?: Record<string, string | number>;
}

// 基础响应类型 - 更新以匹配实际响应格式
interface BaseResponse<T = unknown> {
  code: number;           // 业务状态码
  status_code?: number;   // HTTP状态码 (可选,因为可能不总是存在)
  data: T;
  message: string;
  total?: number;         // 分页总数 (可选)
}

// 定义成功的业务状态码
const SUCCESS_CODES = [0, 10001]; // 可以根据业务需求扩展

// 判断响应是否成功
const isResponseSuccess = (code: number): boolean => {
  return SUCCESS_CODES.includes(code);
};

// 基础 URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// 处理 URL 参数
const handleUrlParams = (url: string, params?: Record<string, string | number>): string => {
  if (!params) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value)); // 将number转换为string
  });
  return `${url}?${searchParams.toString()}`;
};

// 处理请求错误
const handleError = (error: unknown): never => {
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
        'Authorization': token.get() ? `Bearer ${token.get()}` : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk3ODU1OTksInN1YiI6IjFlY2JhODIwLWYyYjItNDBmYy04OGRkLTJmYTg4ZDY0NDQzMiJ9.XZTlgJAzfCYGfo-DzPvgywaNMVlJjMJgE6kkpfbjBFM',
        ...restConfig.headers,
      },
    });

    if (!response.ok) {
      // 如果是 401 未授权,清除 token 并跳转到登录页
      if (response.status === 401) {
        token.remove();
        // window.location.href = '/login';
        throw new Error('未授权,请重新登录');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: BaseResponse<T> = await response.json();
    
    // 优化后的成功判断逻辑
    if (!isResponseSuccess(responseData.code)) {
      // 如果有具体的错误信息,使用具体信息;否则使用通用信息
      const errorMessage = responseData.message || `请求失败，错误码: ${responseData.code}`;
      console.warn('API Business Error:', {
        code: responseData.code,
        message: responseData.message,
        url: finalUrl
      });
      throw new Error(errorMessage);
    }

    // 成功时返回数据,如果是分页数据可以同时返回total信息
    return responseData.data;
  } catch (error) {
    return handleError(error);
  }
};

// GET 请求
export const get = <T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'GET' });
};

// POST 请求
export const post = <T>(url: string, data?: unknown, config?: Omit<RequestConfig, 'method'>) => {
  return request<T>(url, {
    ...config,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// PUT 请求
export const put = <T>(url: string, data?: unknown, config?: Omit<RequestConfig, 'method'>) => {
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
      'Content-Type': null as unknown as string,  // 使用类型断言解决类型错误
    },
  });
};

// 扩展：返回完整响应数据的请求函数（包含total等信息）
const requestWithFullResponse = async <T>(url: string, config: RequestConfig = {}): Promise<BaseResponse<T>> => {
  const { params, ...restConfig } = config;
  const finalUrl = handleUrlParams(`${BASE_URL}${url}`, params);

  try {
    const response = await fetch(finalUrl, {
      ...restConfig,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token.get() ? `Bearer ${token.get()}` : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk3ODU1OTksInN1YiI6IjFlY2JhODIwLWYyYjItNDBmYy04OGRkLTJmYTg4ZDY0NDQzMiJ9.XZTlgJAzfCYGfo-DzPvgywaNMVlJjMJgE6kkpfbjBFM',
        ...restConfig.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        token.remove();
        throw new Error('未授权,请重新登录');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: BaseResponse<T> = await response.json();
    
    if (!isResponseSuccess(responseData.code)) {
      const errorMessage = responseData.message || `请求失败，错误码: ${responseData.code}`;
      console.warn('API Business Error:', {
        code: responseData.code,
        message: responseData.message,
        url: finalUrl
      });
      throw new Error(errorMessage);
    }

    // 返回完整的响应数据
    return responseData;
  } catch (error) {
    return handleError(error);
  }
};

// 用于需要分页信息的 GET 请求
export const getWithPagination = <T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return requestWithFullResponse<T>(url, { ...config, method: 'GET' });
};
