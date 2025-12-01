import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';


import {
  // FeedbackDto,
  ChatLogDto,
  ChatDto
} from '../dtos';
import { getToken } from './storage';


// 定义通用响应格式（泛型 T 约束 data 类型）
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量获取基础 URL
  timeout: 10000, // 超时时间 10 秒
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：明确 config 类型，优化 headers 类型处理
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      // 使用 AxiosRequestHeaders 类型更贴合实际
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }

    // 新增：如果是 FormData，不设置 Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('请求拦截器错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器：明确响应数据类型，移除 any
request.interceptors.response.use(
  <T = unknown>(response: AxiosResponse<ApiResponse<T>>) => {
    const { code, data, message } = response.data;
    if (code !== 0) {
      console.error('接口错误：', message);
      return Promise.reject(new Error(message || '接口请求失败'));
    }
    return data; // 此处 data 类型为 T，与 ApiResponse<T> 对应
  },
  (error: AxiosError<ApiResponse>) => {
    // 错误响应的数据类型为 ApiResponse（不含泛型，因为错误数据结构通常固定）
    const errorMsg = error.response?.data?.message || '网络请求失败';
    console.error('响应拦截器错误：', errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);



// 封装 GET 请求：泛型 T 约束返回数据类型
export async function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  // 明确指定响应数据类型为 ApiResponse<T>，与拦截器返回的 T 对应
  return request.get(url, config);
}

// 封装 POST 请求：泛型 T 约束返回数据类型，D 约束请求体类型
export async function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  return request.post(url, data, config);
}


/**
 * 反馈提交
 *
 * @param description 描述
 * @param type 类型
 * @param files 文件
 * @returns
 */
export async function postFeedback (
  description: string,
  type: string,
  files: File[]
): Promise<ChatLogDto[]> {
  const formData = new FormData();
  // 遍历 files 数组，将每个文件添加到 formData 中
  files.forEach(file => {
    formData.append('images', file);
  });
  formData.append('description', description);
  formData.append('type', type);

  return post<ChatLogDto[], FormData>(
    '/feedbacks',
    formData,
    {
      headers: {
        accept: 'application/json',
        // 'Content-Type': undefined, // 关键配置
        // 'Content-Type': 'multipart/form-data'
      },
    }
  );
};


// 客服对话
export async function postChat(message: string) : Promise<ChatLogDto> {
  // const response = await fetch('/api/chats', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     type: 'text',
  //     text: message,
  //   }),
  //   headers: {
  //     'token': `${getToken()}`,
  //     // 指定返回格式为 json
  //     'Accept': 'application/json'
  //   }
  // });
  // const chatLogData = await response.json();

  // return chatLogData as ChatLogDto;

  return post<ChatLogDto, { type: string, text: string }>(
    '/chats',
    { type: 'text', text: message },
  );
}


// 更新对话内容
export async function getChatlog(logId: number): Promise<ChatLogDto> {
  // const response = await fetch(`/api/chats/logs/${logId}`, {
  //   method: 'GET',
  //   headers: {
  //     'token': `${getToken()}`,
  //     // 指定返回格式为 json
  //     'Accept': 'application/json'
  //   }
  // });

  // const chatLogData = await response.json();

  // return chatLogData as ChatLogDto;

  return get<ChatLogDto>(`/chats/logs/${logId}`);
}

// 获取对话列表
export async function getChatLogs(): Promise<ChatLogDto[]> {
  // const response = await fetch('/api/chats/current', {
  //   headers: {
  //     'token': `${getToken()}`,
  //     // 指定返回格式为 json
  //     'Accept': 'application/json'
  //   }
  // });
  // const chatData = await response.json();

  // return chatData['logs'] as ChatLogDto[];
  const chatData = await get<ChatDto>(`/chats/current`);

  return chatData.logs;

}

// 清除对话
export async function clearChatHistory(): Promise<void> {
  // await fetch('/api/chats/clearHistory', {
  //   method: 'POST',
  //   headers: {
  //     'token': `${getToken()}`,
  //     // 指定返回格式为 json
  //     'Accept': 'application/json'
  //   }
  // });
  return post<void, void>(`/chats/clearHistory`);
}







