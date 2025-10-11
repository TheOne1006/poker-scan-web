import { useState, useEffect } from 'react';
import { useMessages } from '@chatui/core';
import { useIonToast } from '@ionic/react';

import type { MessageProps, MessageId } from '@chatui/core/lib/components/Message';
import type { QuickReplyItemProps } from '@chatui/core/lib/components/QuickReplies';
import { ChatLogStatus, ChatMessageSender, ChatLogDto, ChatMessageType } from '../dtos/chat-log.dto';

import { postFeedback, postChat, getChatlog, getChatLogs, clearChatHistory } from '../utils/request';
import { save2ImageCache, getImageFromStorage, hasToken } from '../utils/storage';
import { FeedbackType } from '../constants/feedback';


// 新增：等待直到 hasToken 为真或超时
async function waitUntilTokenOrTimeout(timeoutMs = 5000, intervalMs = 200) {

    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            // 兼容 hasToken 返回同步布尔或 Promise 布尔的情况
            const ok = await Promise.resolve(hasToken());
            if (ok) return;
        } catch {
            // 忽略 hasToken 异常，继续轮询
        }
        // 等待 200 ms
        await new Promise((r) => setTimeout(r, intervalMs));
    }
    
  }

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

//  log -> message
async function log2Message(log: ChatLogDto): Promise<MessageWithoutId> {
    const { text, sender, type } = log;

    const position = sender === ChatMessageSender.USER ? 'right' : 'left';

    switch (type) {
        case ChatMessageType.FEEDBACK: {
            const imageNames = log.relation.images || [];
            const contentType = (log.relation.type || 'bug') as FeedbackType;
            const images: File[] = [];

            if (imageNames.length > 0) {
                for (const item of imageNames) {
                    const file = await getImageFromStorage(item);
                    if (file) {
                        images.push(file);
                    }
                }
            }
            return {
                type: ChatMessageType.FEEDBACK,
                content: { type: contentType, description: text, images },
                position: position,
            };
        }
        default:
            return {
                type: ChatMessageType.TEXT,
                content: { text: text },
                position: position,
            };
    }
}

export const useCustomer = () => {
    const { messages, appendMsg, resetList, updateMsg, deleteMsg } = useMessages([]);
    // const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(null);
    const [quickReplies] = useState<QuickReplyItemProps[]>(defaultQuickReplies);

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [present] = useIonToast();


    // showFeekbackSheet 
    const [showFeedbackSheet, setShowFeedbackSheet] = useState<boolean>(false);


    async function postChatThenWaitForReplay(val: string) {
        let chatLog: ChatLogDto | null = null;
        try {
            chatLog = await postChat(val);
        } catch {
            present({
                message: "发送消息失败，请稍后再试.",
                duration: 3000,
                position: 'bottom',
            });
        }

        let retryCount = 0;

        // left waiting for replay
        const msgId = appendMsg({
            type: 'text',
            position: 'left',
            content: { text: "正在等待回复" },
            status: 'pending',
        });

        while (chatLog && chatLog.status === ChatLogStatus.PENDING) {
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
            await new Promise(resolve => setTimeout(resolve, retryCount * 1000));

            try {
                const updatedChatLog = await getChatlog(chatLog.id);

                if (updatedChatLog.status === ChatLogStatus.COMPLETED) {
                    updateMsg(msgId, {
                        type: 'text',
                        content: { text: updatedChatLog.text },
                        status: 'sent',
                    });
                    break;
                };
            } catch {
                present({
                    message: "获取回复失败，请稍后再试.",
                    duration: 3000,
                    position: 'bottom',
                });
            }
        }


    }

    useEffect(() => {
        
        setIsLoading(true)

        async function initMessages() {
            // 等待 5 秒，或者 已存在 token
            await waitUntilTokenOrTimeout(10000);

            try {
                const chatLogs = await getChatLogs();
                const messages = await Promise.all(chatLogs.map(log2Message));
                resetList(messages);
            } catch {
                // console.error(error);
                // console.error('获取聊天记录失败');
                present({
                    message: "获取聊天记录失败，请正确打开页面.",
                    duration: 3000,
                    position: 'middle',
                });
            } finally {
                setIsLoading(false)
            }
        }

        initMessages();
    }, [resetList, present]);

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
        setShowFeedbackSheet(false);
        try {
            const [feedbackLog, replyLog] = await postFeedback(description, type, images);

            await Promise.all(
                feedbackLog.relation?.images?.map(async (imageName: string, index: number) => {
                    if (images[index]) {
                        await save2ImageCache(images[index], imageName);
                    }
                }) || []
            );
            
            // to Promise.all

            const [feedbackMsg, replyMsg] = await Promise.all([
                log2Message(feedbackLog),
                log2Message(replyLog)
            ]);
            
            appendMsg(feedbackMsg);
            appendMsg(replyMsg);
        } catch (error) {
            // todo: 提示反馈失败
            console.error(error);
            present({
                message: "反馈失败，请稍后再试.",
                duration: 3000,
                position: 'top',
            });
        } 
        // finally {
        //     if (feedbackMessageId) {
        //         deleteMsg(feedbackMessageId);
        //     }
        // }
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
                // if (feedbackMessageId) {
                //     deleteMsg(feedbackMessageId);
                // }

                setShowFeedbackSheet(true);

                // const newMsgId = appendMsg({
                //     type: "feedbackForm",
                //     content: "",
                //     position: "right",
                // });
                // setFeedbackMessageId(newMsgId);
                break;
            }
            case 'clearHistory': { 
                try {
                    await clearChatHistory();
                } catch {
                    present({
                        message: "清空聊天记录失败，请稍后再试.",
                        duration: 3000,
                        position: 'top',
                    });
                } finally {
                    resetList([]);
                }

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

    async function closeFeedbackForm() {
        // if (feedbackMessageId) {
        //     deleteMsg(feedbackMessageId);
        // }
        setShowFeedbackSheet(false);
    }

    return { messages, handleSend, sendFeedback, handleQuickReplyClick, quickReplies, closeFeedbackForm, isLoading, showFeedbackSheet };
};
