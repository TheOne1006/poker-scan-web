import React from 'react';
import { IonCard, IonCardContent, IonText } from '@ionic/react';
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

  const textContent = (
    <div className="image-card-text-content">
      <IonText>
        <h2 className="image-card-title">{title}</h2>
      </IonText>
      {subtitle && (
        <IonText>
          <p className="image-card-subtitle">{subtitle}</p>
        </IonText>
      )}
    </div>
  );

  const imageContent = (
    <div className="image-card-image-container">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="image-card-image"
        loading="lazy"
      />
    </div>
  );

  return (
    <IonCard className={cardClass} onClick={onClick}>
      <IonCardContent className="image-card-content">
        {layout === 'text-top' ? (
          <>
            {textContent}
            {imageContent}
          </>
        ) : (
          <>
            {imageContent}
            {textContent}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default ImageFeatureCard;
