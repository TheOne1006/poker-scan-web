import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { HeroSection, FeatureSection } from "../components/AppStore";
import {
  bookOutline,
  searchOutline,
  shieldCheckmarkOutline,
  lockClosedOutline,
  eyeOffOutline,
  documentTextOutline,
  warningOutline,
  cardOutline,
  phonePortraitOutline,
  analyticsOutline,
  eyeOutline,
  gameControllerOutline,
  ribbonOutline,
} from "ionicons/icons";

const Project: React.FC = () => {
  // Hero Section 数据
  const heroTitle = ["AI 记牌助手"];

  const heroDescription =
    "一款专为扑克牌爱好者打造的智能辅助工具，依托先进的目标识别算法与十万级别的真实场景数据训练，能够精准捕捉牌局信息，为用户提供高效、可靠的记牌支持，彻底告别手动记牌的繁琐，让牌局决策更轻松、更精准。";

  // Discovery Section 数据
  const coreFunctionsFeatures = [
    {
      id: "remaining-cards",
      icon: analyticsOutline,
      iconColor: "content",
      title: "轻松掌握剩牌数，精准把控牌局",
      subtitle:
        "通过智能算法实时统计场上剩余牌张数量，无需用户手动记忆，即可清晰了解剩余牌型分布，帮助用户提前规划出牌策略，有效提升获胜概率，轻松掌握牌局主动权。",
      colSize: { xs: "12", md: "6" },
    },
    {
      id: "play-history",
      icon: eyeOutline,
      iconColor: "purchase",
      title: "各家出牌一览无余",
      subtitle:
        "自动记录每一轮各家出牌情况，以直观的形式呈现出牌历史，用户可随时回溯查看，避免因遗漏出牌信息导致决策失误，让牌局进程透明化，提升游戏体验。",
      colSize: { xs: "12", md: "6" },
    },
    {
      id: "vip-trial",
      icon: ribbonOutline,
      iconColor: "unlock",
      title: "7 天免费 VIP 试用",
      subtitle:
        "为让用户充分体验产品核心优势，现推出 7 天免费 VIP 试用权益，试用期间可解锁全部高级功能，无限制享受智能记牌服务。",
      colSize: { xs: "12", md: "12" },
    },
  ];

  const supportedGamesFeatures = [
    {
      id: "games-list",
      icon: gameControllerOutline,
      iconColor: "guidelines",
      title: "支持游戏类型",
      subtitle:
        "当前已全面适配多款热门棋牌游戏，如斗地主、跑得快、510K、掼蛋等，后续将持续迭代更新，支持更多游戏品类。",
      colSize: { xs: "12", md: "12", lg: "8" },
    },
    // 更多游戏
    {
      id: "more-games",
      icon: gameControllerOutline,
      iconColor: "guidelines",
      title: "支持更多游戏",
      subtitle: "如果你希望更多游戏可以联系 开发者 QQ 297190869",
      colSize: { xs: "12", md: "12", lg: "4" },
    },
  ];

  // 隐私
  const privacyFeatures = [
    {
      id: "security",
      icon: shieldCheckmarkOutline,
      iconColor: "security",
      title: "致力于安全",
      colSize: { xs: "12", md: "6", lg: "4" },
    },
    {
      id: "data",
      icon: lockClosedOutline,
      iconColor: "data",
      title: "您选择要共享的数据，以及与谁共享。",
      colSize: { xs: "12", md: "6", lg: "4" },
    },
    {
      id: "isolation",
      icon: eyeOffOutline,
      iconColor: "isolation",
      title: "应用无法从其他应用中提取您的数据。",
      colSize: { xs: "12", md: "6", lg: "4" },
    },
  ];

  // Hardware Section 数据

  return (
    <IonPage>
      <IonContent fullscreen>
        <main>
          <HeroSection title={heroTitle} description={heroDescription} />

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
      </IonContent>
    </IonPage>
  );
};

export default Project;
