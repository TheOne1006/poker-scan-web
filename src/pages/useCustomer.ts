import { useState, useEffect } from 'react';
import { useMessages } from '@chatui/core';

import type { MessageProps, MessageId } from '@chatui/core/lib/components/Message';
import type { QuickReplyItemProps } from '@chatui/core/lib/components/QuickReplies';
import { ChatLogStatus, ChatMessageSender, ChatLogDto } from '../dtos/chat-log.dto';

import { postFeedback, postChat, getChatlog, getChatLogs, clearChatHistory } from '../utils/request';
import { save2ImageCache, getImageFromStorage } from '../utils/storage';


// type Messages = MessageProps[];
type MessageWithoutId = Omit<MessageProps, '_id'> & {
    _id?: MessageId;
};

const defaultQuickReplies: QuickReplyItemProps[] = [
    // {
    //     icon: 'message',
    //     name: '联系人工服务',
    //     code: 'contact_human_service',
        // isHighlight: true,
    // },
    {
        name: '意见反馈',
        code: 'feedback',
        // isHighlight: true,
    },
    {
        name: '清空聊天记录',
        code: 'clearHistory',
        // isHighlight: true,
    },
];

async function log2Message(log: ChatLogDto): Promise<MessageWithoutId> {
    const { text, sender, type } = log;

    const position = sender === ChatMessageSender.USER ? 'right' : 'left';

    switch (type) {
        case 'feedback': {
            const imageNames = log.relation.images || [];
            const images = imageNames.map(async (image: string) => {
                const file = await getImageFromStorage(image);
                return file;
            }).filter((item: File | null) => !!item);
            console.log('images', images);
            return {
                type: 'feedback',
                content: { type: type, description: text, images },
                position: position,
            };
        }
        default:
            return {
                type: 'text',
                content: { text: text },
                position: position,
            };
    }
}

export const useCustomer = () => {
    const { messages, appendMsg, resetList, updateMsg, deleteMsg } = useMessages([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(null);
    const [quickReplies] = useState<QuickReplyItemProps[]>(defaultQuickReplies);


    async function postChatThenWaitForReplay(val: string) {
        const chatLog = await postChat(val);
        let retryCount = 0;

        // left waiting for replay
        const msgId = appendMsg({
            type: 'text',
            position: 'left',
            content: { text: "正在等待回复..." },
            status: 'pending',
        });

        while (chatLog.status === ChatLogStatus.PENDING) {
            // 超出 N 次重试后，放弃等待
            if (retryCount >= 10) {
                updateMsg(msgId, {
                    type: 'text',
                    content: { text: "等待回复超时，请稍后再试." },
                    status: 'fail',
                });
                break;
            }
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, 1000));
            const updatedChatLog = await getChatlog(chatLog.id);
            if (updatedChatLog.status === ChatLogStatus.COMPLETED) {
                updateMsg(msgId, {
                    type: 'text',
                    content: { text: updatedChatLog.text },
                    status: 'sent',
                });
                break;
            };
        }


    }

    useEffect(() => {
        async function initMessages() {
            const chatLogs = await getChatLogs();
            const messages = await Promise.all(chatLogs.map(log2Message));
            resetList(messages);
        }

        initMessages();
    }, [resetList]);

    // 发送发送消息
    function handleSend(type: string, inputVal: string) {
        const val = inputVal.trim();

        switch (type) {
            case 'text':
                appendMsg({
                    type: 'text',
                    content: { text: val },
                    position: 'right',
                });
                postChatThenWaitForReplay(val);

                break;
            default:
                break;
        }
    }


    // 发送意见反馈
    async function sendFeedback(description: string, type: string, images: File[]) {
        try {
            const [feedbackLog, replyLog] = await postFeedback(description, type, images);

            feedbackLog.relation.images.forEach((image: string, index: number) => {
                if (images[index]) {
                    save2ImageCache(images[index], image);
                }
            })

            const feedbackMsg = await log2Message(feedbackLog);
            console.log('feedbackLog', feedbackLog);
            console.log('feedbackMsg', feedbackMsg);
            appendMsg(feedbackMsg);
            const replyMsg = await log2Message(replyLog);
            appendMsg(replyMsg);
        } catch (error) {
            // todo: 提示反馈失败
            console.error(error);
        } finally {
            if (feedbackMessageId) {
                deleteMsg(feedbackMessageId);
            }
            setShowFeedbackModal(false);
        }
    }


    /**
     * 快捷短语点击回调
     * @param item 快捷短语
     */
    async function handleQuickReplyClick(item: QuickReplyItemProps) {
        const code = item.code;
        switch (code) {
            case 'feedback': {
                
                // 如果feedbackMessageId存在，则删除
                if (feedbackMessageId) {
                    deleteMsg(feedbackMessageId);
                }

                const newMsgId = appendMsg({
                    type: "feedbackForm",
                    content: "",
                    position: "right",
                });

                setFeedbackMessageId(newMsgId);
                break;
            }
            case 'clearHistory': { 
                    resetList([]);
                    clearChatHistory();

                    break;
                }
            case 'contact_human_service':
                // 联系人工服务
                break;
            default:
                handleSend("text", item.name);

                break;
        }
    }


    return { messages, handleSend, sendFeedback, showFeedbackModal, handleQuickReplyClick, quickReplies };
};
