import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  // IonBackButton,
  // IonButtons,
  // IonItem,
  // IonTextarea,
  // IonButton,
  IonIcon,
  // IonFab,
  // IonFabButton,
  // IonActionSheet,
  // IonList,
  // IonAvatar,
  // IonLabel,
  // IonImg
} from '@ionic/react';
// import { send, camera, image, close } from 'ionicons/icons';
// 引入组件
import Chat, { Bubble, useMessages, MessageProps } from '@chatui/core';
// 引入icon 以 js 方式
// 引入样式
import '@chatui/core/dist/index.css';
import './chatui-dark.css';
import '../resources/icon.js';

const initialMessages = [
  {
    type: 'system',
    content: { text: '88VIP专属智能客服小蜜 为您服务' },
  },
  {
    type: 'text',
    content: { text: 'Hi，我是你的专属智能助理小蜜，有问题请随时找我哦~' },
    user: {
      avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg',
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '联系人工服务',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '短语1',
    isNew: true,
  },
  {
    icon: 'keyboard-circle',
    name: '意见反馈',
    isHighlight: true,
  },
];


const SupportPage: React.FC = () => {
  // 消息列表
  const { messages, appendMsg } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      // TODO: 发送请求
      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    console.log(item);
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons> */}
          <IonTitle>智能客服</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
          <Chat
            // navbar={{ title: '智能助理' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            quickReplies={defaultQuickReplies}
            onQuickReplyClick={handleQuickReplyClick}
            onSend={handleSend}
          />
      </IonContent>
    </IonPage>
  );
};

export default SupportPage;