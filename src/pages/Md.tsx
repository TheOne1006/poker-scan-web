import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import './Md.css';

interface MdPageParams {
  type: string;
}

const Md: React.FC = () => {
  const { type } = useParams<MdPageParams>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [pageTitle, setPageTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/src/markdown/${type}.md`);
        if (!response.ok) {
          throw new Error('Not found');
        }

        let content = await response.text();
        let pageTitle = '文档'; // 默认标题

        // 1. 定位首行的结束位置（第一个换行符，无换行符则取文本长度）
        const firstLineEnd = content.indexOf('\n');
        const firstLine = firstLineEnd === -1 ? content : content.slice(0, firstLineEnd);

        // 2. 验证首行是否为 Markdown 一级标题（`# 标题` 格式，允许 # 后有多个空格）
        const titleMatch = firstLine.replace('# ', '')
        // 正则解释：^# 匹配行首的 #；\s+ 匹配 1+ 个空格（兼容 `# 标题` `#   标题` 等格式）；(.*) 捕获标题内容

        if (titleMatch) {
          pageTitle = titleMatch; // 提取捕获到的标题内容（不含 # 和空格）
          // 3. 截取“非标题部分”：从首行结束位置+1开始（跳过换行符），避免全量替换
          content = firstLineEnd === -1 ? '' : content.slice(firstLineEnd + 1);
        }

        setPageTitle(pageTitle);
        setMarkdownContent(content);

      } catch {
        setMarkdownContent(`# 加载错误\n\n加载内容时出现错误，请稍后重试。`);
      }
      
      setLoading(false);
    };

    if (type) {
      loadMarkdown();
    }
  }, [type]);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle class="ion-text-center">{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="markdown-content">
          {loading ? (
            <div className="loading-container">
              <p>正在加载...</p>
            </div>
          ) : (
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Md;
