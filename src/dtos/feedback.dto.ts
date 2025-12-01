
// 1. 定义枚举
// export enum FeedbackType {
//   BUG = 'bug',
//   SUGGESTION = 'suggestion',
//   FEATURE = 'feature',
// }

import { FeedbackType } from '../constants/feedback';


interface FeedbackBaseDto {
  description: string;
  images?: string[];
  type: FeedbackType;
}

export interface FeedbackDto extends FeedbackBaseDto {
  id: number;
  uid: string;
}

export interface FeedbackCreateDto extends FeedbackBaseDto {
  description: string;
  images?: string[];
}

export interface FeedbackCreateDtoWithRSA extends FeedbackCreateDto {
  rsaData: string;
}
