import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
// import { useIonRouter } from '@ionic/react';


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
  // const ionRouter = useIonRouter();
  const { type } = useParams<MdPageParams>();
  const [pageTitle, setPageTitle] = useState<string>('');
  const [ReactComponent, setReactComponent] = useState<React.ReactNode | null>(null);

  // useEffect(() => {
  //   // 注册事件监听
  //   const handleBackButton = (ev: Event) => {
  //     const backEvent = ev as CustomEvent; // 类型断言为 Ionic 自定义事件
  //     backEvent.detail.register(1, () => { // 优先级 1，高于默认导航
  //       if (ionRouter.canGoBack()) {
  //         ionRouter.navigateBack(); // 返回上一个应用视图
  //       } else {
  //         console.log("无更早视图，不处理");
  //       }
  //     });
  //   };

  //   document.addEventListener('ionBackButton', handleBackButton);
  //   // 组件卸载时移除监听，避免内存泄漏
  //   return () => document.removeEventListener('ionBackButton', handleBackButton);
  // }, [ionRouter]);


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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
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
