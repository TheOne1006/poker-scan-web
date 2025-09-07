import React from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    // IonCardSubtitle,
    IonCardContent,
    // IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
} from '@ionic/react';
import { FeedbackType, getFeedbackLabel } from '../../constants/feedback';


type FeedbackCardProps = {
    type: FeedbackType;
    description: string;
    images?: File[];
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({ type, description, images }) => {

    return (
        <div className="feedback-form">
            <IonCard color="warning">
                <IonCardHeader>
                    <IonCardTitle>{getFeedbackLabel(type)}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
            
                {/* 图片区域 - 包含加号框 */}
                {images && images.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
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
                                        </div>
                                    </IonCol>
                                ))}

                            </IonRow>
                        </IonGrid>
                    </div>
                )}

                {/* 反馈内容输入 */}
                <div style={{ marginTop: '10px' }}>
                    {description}
                </div>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export { FeedbackCard };
