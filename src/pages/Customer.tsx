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
import type { MessageProps } from '@chatui/core/lib/components/Message';

// 引入组件
import Chat, { Bubble } from '@chatui/core';
// 引入icon 以 js 方式
// 引入样式
import '@chatui/core/dist/index.css';
// import './chatui-dark.css';
import '../resources/icon.js';
import { useCustomer } from './useCustomer';
import { FeedbackForm } from '../components/FeedbackForm/FeedbackForm';
import { FeedbackCard } from '../components/ChatCards/FeedbackCard';


const Customer: React.FC = () => {
  // 消息列表
  const { messages, 
    handleSend,
    sendFeedback, 
    handleQuickReplyClick,
    quickReplies,
   } = useCustomer();

  function renderMessageContent(msg: MessageProps) {
    const { content, type } = msg;

    switch (type) {
      case 'feedback':
        console.log('feedback coontent', content);
        return <FeedbackCard type={content.type} description={content.description} images={content.images} />
      case 'feedbackForm':
        return <div style={{ width: '100%' }}>
          <FeedbackForm onSubmit={sendFeedback} />
        </div>
      default:
        return <Bubble content={content.text} />;
    }
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
            quickReplies={quickReplies}
            onQuickReplyClick={handleQuickReplyClick}
            onSend={handleSend}
            colorScheme="auto"
          />
      </IonContent>
    </IonPage>
  );
};

export default Customer;
