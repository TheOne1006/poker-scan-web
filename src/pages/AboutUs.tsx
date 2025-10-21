import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAvatar,
  IonText,
  IonList,
} from '@ionic/react';
import {
  mailOutline,
  chatbubbleOutline,
  timeOutline,
  phonePortraitOutline,
  businessOutline,
  documentTextOutline,
  logoApple,
  copyOutline,
} from 'ionicons/icons';
import {
  COMPANY_NAME,
  COPYRIGHT_YEAR,
  CONTACT_EMAIL,
  CONTACT_QQ,
  CUSTOMER_SERVICE_HOURS,
  IOS_APP_STORE_URL,
  IOS_MIN_VERSION,
  ICP_NUMBER,
  ICP_URL,
} from '../constants/website';

const AboutUs: React.FC = () => {
  const handleCopyQQ = () => {
    navigator.clipboard.writeText(CONTACT_QQ);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>关于我们</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">关于我们</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="8" offsetMd="2">
              {/* 公司介绍卡片 */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="primary">
                    <IonIcon icon={businessOutline} style={{ marginRight: '8px' }} />
                    {COMPANY_NAME}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <p>
                      {COMPANY_NAME} 是一款专业的扑克记牌助手应用，致力于为扑克爱好者提供智能化的记牌工具和策略分析。
                      我们的目标是通过先进的AI技术，帮助用户提升扑克技巧，享受更好的游戏体验。
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>

              {/* 联系方式卡片 - 突出显示QQ */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="secondary">
                    <IonIcon icon={chatbubbleOutline} style={{ marginRight: '8px' }} />
                    联系我们
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {/* QQ联系方式 - 突出显示 */}
                    <IonItem button onClick={handleCopyQQ}>
                      <IonAvatar slot="start" style={{ backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IonIcon icon={chatbubbleOutline} style={{ color: 'white', fontSize: '24px' }} />
                      </IonAvatar>
                      <IonLabel>
                        <h2 style={{ color: '#1976d2', fontWeight: 'bold' }}>QQ客服</h2>
                        <p style={{ fontSize: '18px', fontWeight: '600' }}>{CONTACT_QQ}</p>
                        <p style={{ color: '#666', fontSize: '14px' }}>点击复制QQ号码</p>
                      </IonLabel>
                      <IonChip color="primary" slot="end">
                        <IonIcon icon={copyOutline} />
                        <IonLabel>复制</IonLabel>
                      </IonChip>
                    </IonItem>

                    {/* 邮箱联系方式 */}
                    <IonItem button onClick={handleCopyEmail}>
                      <IonIcon icon={mailOutline} slot="start" color="medium" />
                      <IonLabel>
                        <h3>邮箱联系</h3>
                        <p>{CONTACT_EMAIL}</p>
                      </IonLabel>
                      <IonIcon icon={copyOutline} slot="end" color="medium" />
                    </IonItem>

                    {/* 客服时间 */}
                    <IonItem>
                      <IonIcon icon={timeOutline} slot="start" color="medium" />
                      <IonLabel>
                        <h3>客服时间</h3>
                        <p>{CUSTOMER_SERVICE_HOURS}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              {/* 应用下载卡片 */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="tertiary">
                    <IonIcon icon={phonePortraitOutline} style={{ marginRight: '8px' }} />
                    应用下载
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonIcon icon={logoApple} slot="start" color="dark" />
                    <IonLabel>
                      <h3>iOS 版本</h3>
                      <p>系统要求：{IOS_MIN_VERSION}</p>
                    </IonLabel>
                    <IonButton
                      fill="outline"
                      slot="end"
                      onClick={() => window.open(IOS_APP_STORE_URL, '_blank')}
                    >
                      下载
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>

              {/* 法律信息卡片 */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle color="dark">
                    <IonIcon icon={documentTextOutline} style={{ marginRight: '8px' }} />
                    法律信息
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem button onClick={() => window.open(ICP_URL, '_blank')}>
                      <IonIcon icon={documentTextOutline} slot="start" color="medium" />
                      <IonLabel>
                        <h3>ICP备案</h3>
                        <p>{ICP_NUMBER}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>

                  <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px' }}>
                    <IonText color="medium">
                      <p style={{ fontSize: '14px' }}>
                        © {COPYRIGHT_YEAR} {COMPANY_NAME}
                      </p>
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
