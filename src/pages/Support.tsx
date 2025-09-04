import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonItem,
  IonTextarea,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonActionSheet,
  IonList,
  IonAvatar,
  IonLabel,
  IonImg
} from '@ionic/react';
import { send, camera, image, close } from 'ionicons/icons';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const SupportPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '您好！我是智能客服，很高兴为您服务。请问有什么可以帮助您的吗？',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageContent: string, imageUrl?: string) => {
    if (!messageContent.trim() && !imageUrl) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
      imageUrl
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate API call to customer service
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: imageUrl 
          ? '我已收到您发送的图片，正在为您分析问题。请稍等片刻...'
          : '感谢您的问题。我正在为您查找相关信息，请稍候...',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendClick = () => {
    sendMessage(newMessage);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      sendMessage(newMessage || '发送了一张图片', imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    setIsActionSheetOpen(true);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
    setIsActionSheetOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>智能客服</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList>
          {messages.map((message) => (
            <IonItem
              key={message.id}
              className={`chat-message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              <IonAvatar slot={message.isUser ? 'end' : 'start'}>
                <div className={`avatar ${message.isUser ? 'user-avatar' : 'bot-avatar'}`}>
                  {message.isUser ? 'U' : 'AI'}
                </div>
              </IonAvatar>
              <IonLabel className="ion-text-wrap">
                <div className="message-content">
                  {message.imageUrl && (
                    <IonImg src={message.imageUrl} alt="用户上传的图片" style={{ maxWidth: '200px', marginBottom: '8px' }} />
                  )}
                  <p>{message.content}</p>
                  <small>{message.timestamp.toLocaleTimeString()}</small>
                </div>
              </IonLabel>
            </IonItem>
          ))}
          {isLoading && (
            <IonItem className="chat-message bot-message">
              <IonAvatar slot="start">
                <div className="avatar bot-avatar">AI</div>
              </IonAvatar>
              <IonLabel>
                <div className="message-content">
                  <p>正在输入...</p>
                </div>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
        <div ref={messagesEndRef} />
      </IonContent>

      <div className="message-input-container">
        <IonItem>
          <IonTextarea
            placeholder="请输入您的问题..."
            value={newMessage}
            onIonInput={(e) => setNewMessage(e.detail.value!)}
            autoGrow
            rows={1}
          />
          <IonButton
            fill="clear"
            slot="end"
            onClick={handleSendClick}
            disabled={!newMessage.trim() || isLoading}
          >
            <IonIcon icon={send} />
          </IonButton>
        </IonItem>
      </div>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={handleCameraClick}>
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <IonActionSheet
        isOpen={isActionSheetOpen}
        onDidDismiss={() => setIsActionSheetOpen(false)}
        buttons={[
          {
            text: '选择图片',
            icon: image,
            handler: handleFileSelect
          },
          {
            text: '取消',
            icon: close,
            role: 'cancel'
          }
        ]}
      />
    </IonPage>
  );
};

export default SupportPage;