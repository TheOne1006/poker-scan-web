import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
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
      <IonCardContent className="feature-card-content">
        {icon && (
          <div className="feature-icon">
            <div className={`icon-placeholder icon-placeholder--${iconColor}`}>
              <IonIcon icon={icon} />
            </div>
          </div>
        )}
        
        <div className="feature-text">
          <IonText>
            <h3 className="feature-title">{title}</h3>
          </IonText>
          
          {subtitle && (
            <IonText color="medium">
              <p className="feature-subtitle">{subtitle}</p>
            </IonText>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default FeatureCard;