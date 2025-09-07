
import {
    ChatLogDto,
} from './chat-log.dto';

export interface ChatDto {
   
    id: string;
     
    logs: ChatLogDto[];

    userId: string;

    logStartAt: Date;
}
