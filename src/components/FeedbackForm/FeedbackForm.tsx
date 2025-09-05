import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast,
  IonProgressBar
} from '@ionic/react';
import {
  camera,
  image,
  close,
  send,
  add,
  checkmark
} from 'ionicons/icons';

interface FeedbackFormProps {
  onSubmit?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  type: string;
  message: string;
  images: string[];
}

type FeedbackType = 'bug' | 'feature' | 'suggestion';

const FEEDBACK_TYPES = [
  { value: 'bug', label: 'Bug反馈', description: 'Bug 反馈' },
  { value: 'feature', label: '新功能', description: '希望新增什么功能' },
  { value: 'suggestion', label: '建议', description: '对产品的建议便于改良' },
];

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      setToastMessage('图片最多5张');
      setShowToast(true);
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setToastMessage('图片大小不能超过5MB');
        setShowToast(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {

    if (!description.trim()) {
      setToastMessage('请输入反馈内容');
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const feedbackData: FeedbackData = {
            type: feedbackType,
            message: description.trim(),
            images
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit?.(feedbackData);
      
      setToastMessage('反馈成功');
      setShowToast(true);
      
      setFeedbackType('bug');
      setDescription('');
      setImages([]);
    } catch (error) {
      setToastMessage('反馈失败');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = feedbackType && description.trim() && !isSubmitting;

  return (
    <div className="feedback-form">
      <IonCard>
        {/* <IonCardContent> */}
          {/* 反馈类型选择 - 紧凑显示 */}
          <div style={{  display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '5px' }}>
            <IonLabel>
              <strong>反馈类型</strong>
            </IonLabel>
            {/* space */}

            <IonSelect
              style={{ width: 'auto' }}   
              interface="action-sheet"
              placeholder="请选择反馈类型"
              value={feedbackType}
              onIonChange={(e) => setFeedbackType(e.detail.value)}
            >
              {FEEDBACK_TYPES.map(type => (
                <IonSelectOption key={type.value} value={type.value}>
                  {type.label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          {/* 图片区域 - 包含加号框 */}
          <div style={{ marginBottom: '5px' }}>
            <IonLabel>
              <strong>图片 ({images.length}/5)</strong>
            </IonLabel>
            <IonGrid style={{ marginTop: '6px' }}>
              <IonRow>
                {images.map((image, index) => (
                  <IonCol size="4" key={index}>
                    <div style={{ position: 'relative' }}>
                      <IonImg
                        src={image}
                        alt={`图片 ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <IonButton
                        fill="clear"
                        size="small"
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          '--border-radius': '50%',
                          '--background': 'rgba(0,0,0,0.6)',
                          width: '32px',
                          height: '32px'
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <IonIcon icon={close} style={{ color: 'white' }} />
                      </IonButton>
                    </div>
                  </IonCol>
                ))}
                
                {/* 添加图片的加号框 */}
                {images.length < 5 && (
                  <IonCol size="4">
                    <div
                      onClick={() => document.getElementById('image-upload')?.click()}
                      style={{
                        width: '100%',
                        height: '100px',
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      <IonIcon
                        icon={add}
                        style={{
                          fontSize: '32px',
                          color: '#999'
                        }}
                      />
                    </div>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>
          </div>

          {/* 反馈内容输入 */}
          <IonItem>
            <IonLabel position="stacked">
              <strong>反馈内容</strong>
            </IonLabel>
            <IonTextarea
              placeholder="请输入反馈内容"
              value={description}
              onIonInput={(e) => setDescription(e.detail.value!)}
              rows={3}
              maxlength={500}
              counter={true}
              fill="outline"
            />
          </IonItem>

          {/* 隐藏的文件上传输入 */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
            disabled={images.length >= 5}
          />

          {/* 提交按钮 */}
          <div style={{ marginTop: '10px' }}>
            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <>
                  <IonProgressBar type="indeterminate" style={{ marginRight: '8px' }} />
                  提交中...
                </>
              ) : (
                <>
                  <IonIcon icon={send} slot="start" />
                  提交
                </>
              )}
            </IonButton>
          </div>
        {/* </IonCardContent> */}
      </IonCard>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="top"
      />
    </div>
  );
};

export { FeedbackForm };