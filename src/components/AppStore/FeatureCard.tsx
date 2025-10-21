import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';
import './FeatureCard.css';

interface FeatureCardProps {
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  variant?: 'default' | 'stats';
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconColor = 'primary',
  title,
  subtitle,
  variant = 'default',
  className = ''
}) => {
  if (variant === 'stats') {
    return (
      <IonCard className={`feature-card stats-card ${className}`}>
        <IonCardContent>
          <IonText>
            <p className="stats-text">{title}</p>
          </IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard className={`feature-card feature-card--${variant} ${className}`}>
      <IonCardHeader>
        <IonCardTitle className="ion-text-center">
          {icon && (
            <div className="feature-icon">
              <div className={`icon-placeholder icon-placeholder--${iconColor}`}>
                <IonIcon icon={icon} />
              </div>
            </div>
          )}
          {title}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {subtitle}
      </IonCardContent>
    </IonCard>
  );
};

export default FeatureCard;
