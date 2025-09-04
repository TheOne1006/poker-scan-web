// 导入当前目录下 .md 文件
import type React from 'react'
import { attributes as termsAttributes, ReactComponent as TermsReactComponent } from './terms.md'
import { attributes as privacyAttributes, ReactComponent as PrivacyReactComponent } from './privacy.md'

const mdList: { router: string, title: string, ReactComponent: React.ReactNode }[] = [ {
    router: 'terms',
    title: termsAttributes.title,
    ReactComponent: <TermsReactComponent key="terms" />,
}, {
    router: 'privacy',
    title: privacyAttributes.title,
    ReactComponent: <PrivacyReactComponent key="privacy" />
} ]

export const mdDocs = mdList;
// export default mdDocs;
