import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { document, chatbubbles, shield } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
// import ExploreContainer from '. ./components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Poker Scan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Poker Scan</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="ion-padding">
          <IonList>
            <IonItem button onClick={() => history.push('/md/privacy')}>
              <IonIcon icon={shield} slot="start" />
              <IonLabel>
                <h2>隐私政策</h2>
                <p>查看我们的隐私政策和数据处理说明</p>
              </IonLabel>
            </IonItem>
            
            <IonItem button onClick={() => history.push('/md/terms')}>
              <IonIcon icon={document} slot="start" />
              <IonLabel>
                <h2>服务条款</h2>
                <p>了解我们的服务条款和使用协议</p>
              </IonLabel>
            </IonItem>
            
            <IonItem button onClick={() => history.push('/customer')}>
              <IonIcon icon={chatbubbles} slot="start" />
              <IonLabel>
                <h2>智能客服</h2>
                <p>获取帮助和支持，支持图片上传</p>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={() => history.push('/demo')}>
              <IonIcon icon={chatbubbles} slot="start" />
              <IonLabel>
                <h2>Demo</h2>
                <p>查看 Demo 页面</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>

        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
