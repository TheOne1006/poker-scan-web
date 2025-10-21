import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { HeroSection, FeatureSection, Footer } from "../components/AppStore";

import { heroTitle, heroDescription, appListFeatures, settingFeatures, coreFunctionsFeatures, supportedGamesFeatures, privacyFeatures } from "./ProjectFeaturesConstant";

const Project: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main>
          <HeroSection title={heroTitle} description={heroDescription} />

          <FeatureSection
            title="发现与探索"
            features={appListFeatures}
            backgroundColor="light"
          />

          <FeatureSection
            title="设置与自定义"
            features={settingFeatures}
            backgroundColor="white"
          />

          <FeatureSection
            title="核心功能"
            features={coreFunctionsFeatures}
            backgroundColor="light"
          />

          <FeatureSection
            title="支持游戏"
            features={supportedGamesFeatures}
            backgroundColor="white"
          />

          <FeatureSection
            title="隐私与安全"
            features={privacyFeatures}
            backgroundColor="light"
          />
        </main>
        
        <Footer />

      </IonContent>
    </IonPage>
  );
};

export default Project;
