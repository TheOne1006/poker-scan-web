/// <reference types="vite/client" />


// 声明 Markdown 文件模块类型
declare module '*.md' {
    // "unknown" would be more detailed depends on how you structure frontmatter
    const attributes: Record<string, unknown>;

    const markdown: string

    // Modify below per your usage
    export { attributes, markdown };
}