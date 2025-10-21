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
import './Footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const handleiOSDownload = () => {
    // 这里可以添加实际的iOS下载链接
    window.open('https://apps.apple.com/app/xxxx', '_blank');
  };

  const handleContactUs = () => {
    // 这里可以添加联系我们的逻辑，比如打开邮件客户端
    window.location.href = 'mailto:297190869@qq.com';
  };

  const handleFAQ = () => {
    // 这里可以导航到常见问题页面
    window.location.href = '/md/faq';
  };

  return (
    <footer className={`app-footer ${className}`}>
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
                <p className="download-desc">支持 iOS 16.0 及以上版本</p>
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
                <IonItem button onClick={handleContactUs} lines="none" className="footer-link-item">
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
                <IonText color="medium">
                  <p>
                    <IonIcon icon={mailOutline} className="contact-icon" />
                    邮箱：contact@yourapp.com
                  </p>
                </IonText>
                <IonText color="medium">
                  <p>
                    <IonIcon icon={phonePortraitOutline} className="contact-icon" />
                    客服时间：9:00-18:00
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
                <p>© 2025 AI记牌助手</p>
                <p>
                  <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                    京ICP备xxxxxxxx号-1
                  </a>
                </p>
                <p>
                  <a href="/md/privacy" onClick={(e) => { e.preventDefault(); /* 添加隐私政策链接 */ }}>
                    隐私政策
                  </a>
                  {' | '}
                  <a href="/md/terms" onClick={(e) => { e.preventDefault(); /* 添加服务条款链接 */ }}>
                    服务条款
                  </a>
                </p>
              </IonText>
            </div>
          </IonCol>
        </IonRow>

        {/* 底部版权信息 */}
        <IonRow className="footer-bottom">
          <IonCol size="12">
            <IonText color="medium" className="copyright">
              <p>本产品仅供娱乐学习使用，请遵守当地法律法规</p>
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </footer>
  );
};

export default Footer;
