import React, { useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  // IonImg
} from '@ionic/react';
// import { send, camera, image, close } from 'ionicons/icons';
import type { MessageProps } from '@chatui/core/lib/components/Message';
import type { QuickReplyItemProps } from '@chatui/core/lib/components/QuickReplies';
import type { MessageContainerHandle } from '@chatui/core/lib/components/MessageContainer';

// 引入组件
import Chat, { Bubble, Typing } from '@chatui/core';
// 引入icon 以 js 方式
// 引入样式
import '@chatui/core/dist/index.css';
// import './chatui-dark.css';
import '../resources/icon.js';
import { useCustomer } from './useCustomer';
import { FeedbackForm } from '../components/FeedbackForm/FeedbackForm';
import { FeedbackCard } from '../components/ChatCards/FeedbackCard';


const Customer: React.FC = () => {
  const chatRef = useRef<MessageContainerHandle>(null!);
  // 消息列表
  const { messages, 
    handleSend,
    sendFeedback, 
    handleQuickReplyClick,
    quickReplies,
    closeFeedbackForm,
   } = useCustomer();


  // 滚动到最新消息的方法
  const scrollToBottom = () => {
    // 确保Chat组件实例已加载
    if (chatRef.current) {
      // 调用Chat组件的scrollToEnd方法
      setTimeout(() => {
        // 等待300ms后滚动到最新消息
        chatRef.current.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  const handleQuickReplyClickWithScroll = (item: QuickReplyItemProps) => {
    handleQuickReplyClick(item);
    scrollToBottom();
  };

  function renderMessageContent(msg: MessageProps) {
    const { content, type, status } = msg;

    if (status === 'pending') {
      return (<div className="Message-content">
        <Typing text={content.text} />
      </div>)
    }

    switch (type) {
      case 'feedback':
        return (<div style={{ width: '80%' }}>
          <FeedbackCard type={content.type} description={content.description} images={content.images} />
        </div>
        )
      case 'feedbackForm':
        return <div style={{ width: '100%' }}>
          <FeedbackForm onSubmit={sendFeedback} onClose={closeFeedbackForm} />
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
            messagesRef={chatRef}
            // navbar={{ title: '智能助理' }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            quickReplies={quickReplies}
            onQuickReplyClick={handleQuickReplyClickWithScroll}
            onSend={handleSend}
            colorScheme="auto"
          />
      </IonContent>
    </IonPage>
  );
};

export default Customer;
