import React from 'react';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import { 
  HeroSection, 
  FeatureSection 
} from '../components/AppStore';
import { 
  bookOutline,
  searchOutline,
  shieldCheckmarkOutline,
  lockClosedOutline,
  eyeOffOutline,
  documentTextOutline,
  warningOutline,
  cardOutline,
  phonePortraitOutline
} from 'ionicons/icons';

const Project: React.FC = () => {
  // Hero Section 数据
  const heroTitle = [
    "The apps you love.",
    "From a place you can trust."
  ];
  
  const heroDescription = "For over a decade, the App Store has proved to be a safe and trusted place to discover and download apps. But the App Store is more than just a storefront — it's an innovative destination focused on bringing you amazing experiences. And a big part of those experiences is ensuring that the apps we offer are held to the highest standards for privacy, security, and content. All designed to help you discover your next favorite app with confidence.";

  // Discovery Section 数据
  const discoveryFeatures = [
    {
      id: 'stories',
      icon: bookOutline,
      iconColor: 'stories',
      title: 'Stories and collections that inform, help, and inspire. Updated daily.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'stats1',
      title: 'Over 40K stories and counting.',
      variant: 'stats' as const,
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'curated',
      icon: bookOutline,
      iconColor: 'curated',
      title: 'Curated by experts. Handpicked for you.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'events',
      icon: bookOutline,
      iconColor: 'events',
      title: 'Stream Jungle Cruise Today on Disney+*',
      subtitle: 'Explore in-app events like movie premieres, gaming competitions, and livestreams.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'search',
      icon: searchOutline,
      iconColor: 'search',
      title: 'Discover amazing apps with a rich search experience.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'stats2',
      title: 'Nearly 2M apps available worldwide. 175 storefronts in over 40 languages. Over 120 expert editors worldwide.',
      variant: 'stats' as const,
      colSize: { xs: '12', md: '12', lg: '4' }
    },
    {
      id: 'details',
      icon: documentTextOutline,
      iconColor: 'details',
      title: 'Get the details on every app.',
      colSize: { xs: '12', md: '6', lg: '4' }
    }
  ];

  // Privacy Section 数据
  const privacyFeatures = [
    {
      id: 'security',
      icon: shieldCheckmarkOutline,
      iconColor: 'security',
      title: 'Committed to security.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'privacy-stats',
      title: '100% of apps are automatically screened for known malware. Over 28K apps use Apple health technologies like HealthKit, CareKit, and ResearchKit, designed to protect patient privacy.',
      variant: 'stats' as const,
      colSize: { xs: '12', md: '12', lg: '8' }
    },
    {
      id: 'data',
      icon: lockClosedOutline,
      iconColor: 'data',
      title: 'You choose what data to share. And with whom.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'isolation',
      icon: eyeOffOutline,
      iconColor: 'isolation',
      title: 'Apps can\'t pull your data from other apps.',
      colSize: { xs: '12', md: '6', lg: '4' }
    }
  ];

  // Trust Section 数据
  const trustFeatures = [
    {
      id: 'guidelines',
      icon: documentTextOutline,
      iconColor: 'guidelines',
      title: 'Apps must adhere to our guidelines.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'trust-stats',
      title: 'Every week, nearly 500 dedicated experts around the world review over 130K apps. In 2024, more than 1.9M app submissions were rejected for reasons that include privacy violations and fraudulent activity.',
      variant: 'stats' as const,
      colSize: { xs: '12', md: '12', lg: '8' }
    },
    {
      id: 'content',
      icon: warningOutline,
      iconColor: 'content',
      title: 'Stopping inappropriate content is a top priority.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'purchase',
      icon: cardOutline,
      iconColor: 'purchase',
      title: 'No surprise purchases.',
      colSize: { xs: '12', md: '6', lg: '4' }
    },
    {
      id: 'additional-stats',
      title: 'Apple moderators regularly review worldwide App Store charts for inappropriate content. In 2024, we removed over 1.9M user reviews that were considered spam.',
      variant: 'stats' as const,
      colSize: { xs: '12', md: '12', lg: '12' }
    }
  ];

  // Hardware Section 数据
  const hardwareFeatures = [
    {
      id: 'unlock',
      icon: phonePortraitOutline,
      iconColor: 'unlock',
      title: 'Apps help unlock the full potential of your devices.',
      colSize: { xs: '12', md: '8', lg: '6' }
    }
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <main>
          <HeroSection 
            title={heroTitle}
            description={heroDescription}
          />

          <FeatureSection
            title="Designed for discovery."
            features={discoveryFeatures}
            backgroundColor="light"
          />

          <FeatureSection
            title="Privacy and security. Built into everything we do."
            features={privacyFeatures}
            backgroundColor="white"
          />

          <FeatureSection
            title="Dedicated to trust and safety."
            features={trustFeatures}
            backgroundColor="light"
          />

          <FeatureSection
            title="Hardware and software. Powering amazing experiences together by design."
            features={hardwareFeatures}
            backgroundColor="white"
          />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Project;