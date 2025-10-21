import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,
  IonItem,
  IonLabel
} from '@ionic/react';
import { logoApple, helpCircleOutline, mailOutline, phonePortraitOutline } from 'ionicons/icons';
import {
  ICP_NUMBER,
  ICP_URL,
  CONTACT_EMAIL,
  SUPPORT_EMAIL,
  IOS_APP_STORE_URL,
  IOS_MIN_VERSION,
  CUSTOMER_SERVICE_HOURS,
  COMPANY_NAME,
  COPYRIGHT_YEAR,
  FAQ_PATH,
  PRIVACY_PATH,
  TERMS_PATH
} from '../../constants/website';

import './Footer.css';

const Footer: React.FC = () => {
  const handleiOSDownload = () => {
    // 这里可以添加实际的iOS下载链接
    window.open(IOS_APP_STORE_URL, '_blank');
  };

  const handleContactUs = () => {
    // 这里可以添加联系我们的逻辑，比如打开邮件客户端
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };

  const handleFAQ = () => {
    // 这里可以导航到常见问题页面
    window.location.href = FAQ_PATH;
  };

  return (
    <footer className="app-footer">
      <IonGrid>
        <IonRow className="footer-content">
          {/* iOS下载按钮区域 */}
          <IonCol size="12" sizeMd="6" sizeLg="3" className="download-section">
            <div className="download-content">
              <IonText>
                <h3>立即下载</h3>
              </IonText>
              <IonButton
                fill="solid"
                color="dark"
                className="ios-download-btn"
                onClick={handleiOSDownload}
              >
                <IonIcon icon={logoApple} slot="start" />
                App Store 下载
              </IonButton>
              <IonText color="medium">
                <p className="download-desc">支持 {IOS_MIN_VERSION}</p>
              </IonText>
            </div>
          </IonCol>

          {/* 快速链接区域 */}
          <IonCol size="12" sizeMd="6" sizeLg="3" className="links-section">
            <div className="links-content">
              <IonText>
                <h3>快速链接</h3>
              </IonText>
              <div className="footer-links">
                <IonItem button onClick={handleFAQ} lines="none" className="footer-link-item">
                  <IonIcon icon={helpCircleOutline} slot="start" />
                  <IonLabel>常见问题</IonLabel>
                </IonItem>
                <IonItem button lines="none" className="footer-link-item">
                  <IonIcon icon={mailOutline} slot="start" />
                  <IonLabel>联系我们</IonLabel>
                </IonItem>
              </div>
            </div>
          </IonCol>

          {/* 联系信息区域 */}
          <IonCol size="12" sizeMd="6" sizeLg="3" className="contact-section">
            <div className="contact-content">
              <IonText>
                <h3>联系信息</h3>
              </IonText>
              <div className="contact-info">
                <IonText color="medium" onClick={handleContactUs}>
                  <p>
                    <IonIcon icon={mailOutline} className="contact-icon" />
                    邮箱：{SUPPORT_EMAIL}
                  </p>
                </IonText>
                <IonText color="medium">
                  <p>
                    <IonIcon icon={phonePortraitOutline} className="contact-icon" />
                    客服时间：{CUSTOMER_SERVICE_HOURS}
                  </p>
                </IonText>
              </div>
            </div>
          </IonCol>

          {/* 备案信息区域 */}
          <IonCol size="12" sizeMd="6" sizeLg="3" className="legal-section">
            <div className="legal-content">
              <IonText>
                <h3>法律信息</h3>
              </IonText>
              <IonText color="medium" className="legal-info">
                <p>© {COPYRIGHT_YEAR} {COMPANY_NAME}</p>
                <p>
                  <a href={ICP_URL} target="_blank" rel="noopener noreferrer">
                    {ICP_NUMBER}
                  </a>
                </p>
                <p>
                  <a href={PRIVACY_PATH}>
                    隐私政策
                  </a>
                  {' | '}
                  <a href={TERMS_PATH}>
                    服务条款
                  </a>
                </p>
              </IonText>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </footer>
  );
};

export default Footer;
