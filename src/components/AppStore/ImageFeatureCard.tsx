import React from 'react';
import { IonCard, IonCardContent, IonText, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import './ImageFeatureCard.css';

export interface ImageFeatureCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  layout?: 'text-top' | 'text-bottom'; // 上文字+下图片 或 下文字+上图片
  className?: string;
  onClick?: () => void;
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
  className = '',
  onClick
}) => {
  const cardClass = `image-feature-card ${layout} ${className}`;


  const headerContent = (
    <IonCardHeader>
      <IonCardTitle className="ion-text-center">{title}</IonCardTitle>
      <IonCardSubtitle className="ion-text-center">{subtitle}</IonCardSubtitle>
    </IonCardHeader>
  )


  const cardBodyContent = (
    <IonCardContent>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="image-card-image"
        loading="lazy"
      />
    </IonCardContent>
  )

  return (
    <IonCard className={cardClass} onClick={onClick}>
      {layout === 'text-top' ? (
        <>
          {headerContent}
          {cardBodyContent}
        </>
      ) : (
        <>
            {cardBodyContent}
            {headerContent}
        </>
      )}
    </IonCard>
  );
};

export default ImageFeatureCard;
