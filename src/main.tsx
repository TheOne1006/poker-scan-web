import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react'; // 引入配置工具
import App from './App';

// 定义Ionic配置
setupIonicReact({
  experimentalCloseWatcher: true,
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);