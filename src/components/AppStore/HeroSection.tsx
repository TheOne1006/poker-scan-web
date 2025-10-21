import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import './HeroSection.css';

interface HeroSectionProps {
  title: string[];
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <section className="hero-section">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="10" sizeLg="8">
            <div className="hero-content ion-text-center">
              <IonText>
                <h1 className="hero-title">
                  {title.map((line, index) => (
                    <span key={index} className="hero-title-line">
                      {line}
                    </span>
                  ))}
                </h1>
              </IonText>
              <IonText color="medium">
                <p className="hero-description">
                  {description}
                </p>
              </IonText>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </section>
  );
};

export default HeroSection;