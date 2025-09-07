

export type FeedbackType = 'bug' | 'feature' | 'suggestion';


export const FEEDBACK_TYPES = [
    { value: 'bug', label: 'Bug反馈', description: 'Bug 反馈' },
    { value: 'feature', label: '新功能', description: '希望新增什么功能' },
    { value: 'suggestion', label: '建议', description: '对产品的建议便于改良' },
];

export function getFeedbackLabel(value: string): string {
    const label = FEEDBACK_TYPES.find(type => type.value === value)?.label;
    return label || value;
}
