
export enum ChatMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SUPPORT = 'support',
  // 命令行
  COMMAND = 'command',
}

export enum ChatMessageSender {
  USER = 'user',
  // 人工客服
  HUMAN_CUSTOMER = 'human_customer',
  // 系统回复
  SYSTEM = 'system',
  // 自动回复
  AUTO_REPLY = 'auto_reply',
  // AI 客服
  AI_CUSTOMER = 'ai_customer',
  // 命令
  COMMAND = 'command',
}

export enum ChatLogStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}



export interface ChatLogDto {  
  text: string;

  type: string;

  status: ChatLogStatus;
 
  sender: ChatMessageSender;

 
  supportId: string;

  relation: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  userId: string;

  id: string;
}
