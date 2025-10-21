import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import FeatureCard from './FeatureCard';
import ImageFeatureCard from './ImageFeatureCard';
import './FeatureSection.css';

interface Feature {
  id: string;
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  variant?: 'default' | 'stats';
  colSize?: {
    xs?: string;
    md?: string;
    lg?: string;
  };
  // 新增图片卡片相关属性
  type?: 'feature' | 'image';
  imageUrl?: string;
  imageAlt?: string;
  layout?: 'text-top' | 'text-bottom';
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
  backgroundColor?: 'light' | 'white';
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  features, 
  backgroundColor = 'light',
  className = ''
}) => {
  return (
    <section className={`feature-section feature-section--${backgroundColor} ${className}`}>
      <div className="section-content">
        <IonText>
          <h2 className="section-title">{title}</h2>
        </IonText>
        
        <IonGrid>
          <IonRow>
            {features.map((feature) => (
              <IonCol 
                key={feature.id}
                size={feature.colSize?.xs || "12"} 
                sizeMd={feature.colSize?.md || "6"} 
                sizeLg={feature.colSize?.lg || "4"}
              >
                {feature.type === 'image' ? (
                  <ImageFeatureCard
                    title={feature.title}
                    subtitle={feature.subtitle}
                    imageUrl={feature.imageUrl || ''}
                    imageAlt={feature.imageAlt}
                    layout={feature.layout}
                  />
                ) : (
                  <FeatureCard
                    icon={feature.icon}
                    iconColor={feature.iconColor}
                    title={feature.title}
                    subtitle={feature.subtitle}
                    variant={feature.variant}
                  />
                )}
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    </section>
  );
};

export default FeatureSection;