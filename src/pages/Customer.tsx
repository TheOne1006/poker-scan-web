import React, { useRef, useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonText,
  IonModal,
  IonButtons,
  IonButton,
  // IonImg
} from '@ionic/react';
// import { send, camera, image, close } from 'ionicons/icons';
import type { MessageProps } from '@chatui/core/lib/components/Message';
import type { QuickReplyItemProps } from '@chatui/core/lib/components/QuickReplies';
import type { MessageContainerHandle } from '@chatui/core/lib/components/MessageContainer';
import { useLocation } from 'react-router-dom';

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
  // 查看 url 参数 如果 有showHeader 则显示头部
  const { search } = useLocation();
  const showHeader = new URLSearchParams(search).has('showHeader');

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const chatRef = useRef<MessageContainerHandle>(null!);
  // 消息列表
  const { messages, 
    handleSend,
    sendFeedback, 
    handleQuickReplyClick,
    quickReplies,
    closeFeedbackForm,
    isLoading,
    showFeedbackSheet,
   } = useCustomer();


  function dismiss() {
    closeFeedbackForm();
    modal.current?.dismiss();
  }

  async function canDismiss() {
    closeFeedbackForm();
    return true
  }





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
      // case 'feedbackForm':
      //   return <div style={{ width: '100%' }}>
      //     <FeedbackForm onSubmit={sendFeedback} onClose={closeFeedbackForm} />
      //   </div>
      default:
        return <Bubble content={content.text} />;
    }
  }

  return (
    <IonPage ref={page}>
      {showHeader && (
        <IonHeader>
          <IonToolbar>
            <IonTitle>智能客服</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen>
      {
          isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '24px 0' }}>
              <IonSpinner name="crescent" color="primary" />
              <IonText color="medium">加载中...</IonText>
            </div>
          ) :
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
      }

        <IonModal mode="ios" ref={modal} trigger="open-modal" canDismiss={canDismiss} presentingElement={presentingElement!} isOpen={showFeedbackSheet}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                建议反馈
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>取消</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <FeedbackForm onSubmit={sendFeedback} onClose={closeFeedbackForm} />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Customer;
