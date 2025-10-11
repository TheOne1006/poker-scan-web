import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  // IonItem,
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
  // IonFab,
  // IonFabButton,
  // IonAlert,
  IonToast,
  IonProgressBar
} from '@ionic/react';
import {
  // camera,
  // image,
  close,
  send,
  add,
} from 'ionicons/icons';
import { FeedbackType, FEEDBACK_TYPES } from '../../constants/feedback';
import './FeedbackForm.css'

type FeedbackFormProps = {
  onSubmit: (description: string, type: string, images: File[]) => Promise<void>;
  onClose: () => void;
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      reader.onload = () => {
        setImages(prev => [...prev, file]);
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
      await onSubmit(description.trim(), feedbackType, images);
      
      setToastMessage('反馈成功');
      setShowToast(true);

      // todo: image to cache
      
      setFeedbackType('bug');
      setDescription('');
      setImages([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <IonCardContent>
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
          <div style={{ marginBottom: '10px' }}>
            <IonLabel>
              <strong>图片 ({images.length}/5)</strong>
            </IonLabel>
            <IonGrid style={{ marginTop: '6px' }}>
              <IonRow>
                {images.map((image, index) => (
                  <IonCol size="4" key={index}>
                    <div style={{ position: 'relative' }}>
                      <IonImg
                        src={URL.createObjectURL(image)}
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
          <div style={{ marginTop: '10px' }}>
            <IonLabel>
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
              autoGrow={true}
              // onIonFocus={(e) => {
              //   // 将输入框滚动到视口中间，避免被键盘遮挡
              //   // currentTarget 是 IonTextarea 元素（宿主），滚动它足够把控件露出来
              //   e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // }}
            />
          </div>

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
          <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
            <IonButton
              expand="block"
              onClick={onClose}
              disabled={isSubmitting}
              fill="outline"
            >
              关闭
            </IonButton>
            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              fill={isSubmitting ? "outline" : "solid"}
              style={{ flex: 1 }}
              // fill={"outline"}
            >
              {isSubmitting ? (
                <IonProgressBar type="indeterminate" style={{ marginRight: '8px' }} />
              ) : (
                <>
                  <IonIcon icon={send} slot="start" />
                  提交
                </>
              )}
            </IonButton>
          </div>
        </IonCardContent>
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
