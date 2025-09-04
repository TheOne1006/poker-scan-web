import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './Md.css';
import { mdDocs } from '../markdown';

interface MdPageParams {
  type: string;
}

const Md: React.FC = () => {
  const { type } = useParams<MdPageParams>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [pageTitle, setPageTitle] = useState<string>('');
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (type) {
      // filter 
      const mdDoc = mdDocs.find((md) => md.router === type);

      if (mdDoc) {
        setPageTitle(mdDoc.title);
        setMarkdownContent(mdDoc.content);
      } else {
        setPageTitle("加载 错误");
        setMarkdownContent(`# 加载错误\n\n加载内容时出现错误，请稍后重试。`);
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
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Md;
