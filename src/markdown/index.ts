// 导入当前目录下 .md 文件
import { markdown as termsText } from './terms.md'
import { markdown as privacyText } from './privacy.md'

const mdList: { router: string, content: string }[] = [ {
    router: 'terms',
    content: termsText
}, {
    router: 'privacy',
    content: privacyText
} ]

const formattedMdList = mdList.map((mdObject) => {
    const router = mdObject.router
    let content = mdObject.content
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
    
    return {
        router: router,
        title: pageTitle,
        content: content
    }
})

export const mdDocs = formattedMdList;
// export default mdDocs;
