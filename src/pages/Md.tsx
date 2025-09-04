import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './Md.css';
import { mdDocs } from '../markdown';

interface MdPageParams {
  type: string;
}

const ErrorComponent: React.FC = () => {
  return (
    <div>
      <h2>加载错误</h2>
    </div>
  )
}

const Md: React.FC = () => {
  const { type } = useParams<MdPageParams>();
  const [pageTitle, setPageTitle] = useState<string>('');
  const [ReactComponent, setReactComponent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (type) {
      // filter 
      const mdDoc = mdDocs.find((md) => md.router === type);

      if (mdDoc) {
        setPageTitle(mdDoc.title);
        setReactComponent(mdDoc.ReactComponent);
      } else {
        setPageTitle("加载 错误");
        setReactComponent(<ErrorComponent key="error" />);
      }
    }
  }, [type]);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="markdown-content">
          {ReactComponent}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Md;
