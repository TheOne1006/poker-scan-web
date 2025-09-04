/// <reference types="vite/client" />

// 声明 Markdown 文件模块类型
declare module '*.md' {
    const attributes: {
        title: string;
        description: string;
        updateAt: string;
    };

    const markdown: string
    import React from "react"
    const ReactComponent: React.FC;

    export { attributes, markdown, ReactComponent };
}