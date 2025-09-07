import { 
  // FeedbackDto, 
  ChatLogDto,
  // ChatDto 
} from '../dtos';
import { getStorageItem } from './storage';


function getToken(): string {
  return getStorageItem('token') || '';
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
    formData.append('files', file);
  });
  formData.append('description', description);
  formData.append('type', type);

  const response = await fetch('/api/feedback', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `token ${getToken()}`
    }
  });
  const chatLogs = await response.json();

  return chatLogs as ChatLogDto[];
};


// 客服对话
export async function postChat(message: string) : Promise<ChatLogDto> {
  const response = await fetch('/api/chats', {
    method: 'POST',
    body: JSON.stringify({
      type: 'text',
      text: message,
    }),
    headers: {
      'Authorization': `token ${getToken()}`
    }
  });
  const chatLogData = await response.json();

  return chatLogData as ChatLogDto;
}


// 更新对话内容
export async function getChatlog(logId: string): Promise<ChatLogDto> {
  const response = await fetch(`/api/chats/logs/${logId}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${getToken()}`
    }
  });

  const chatLogData = await response.json();

  return chatLogData as ChatLogDto;
}

// 获取对话列表
export async function getChatLogs(): Promise<ChatLogDto[]> {
  const response = await fetch('/api/chats/current', {
    headers: {
      'Authorization': `token ${getToken()}`
    }
  });
  const chatData = await response.json();

  return chatData['logs'] as ChatLogDto[];
}

// 清除对话
export async function clearChatHistory(): Promise<void> {
  await fetch('/api/chats/clearHistory', {
    method: 'POST',
    headers: {
      'Authorization': `token ${getToken()}`
    }
  });
}







