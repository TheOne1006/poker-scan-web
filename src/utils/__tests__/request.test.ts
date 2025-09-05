import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest'; // 导入Mock类型
import { feedbackPost } from '../request'; // 替换为实际文件路径

import fs from 'fs/promises'; // Node.js文件系统API
import path from 'path';

// 辅助函数：读取本地文件并转换为浏览器File对象
async function getRealFile(filePath: string, fileName: string): Promise<File> {
    // 读取文件内容（Node.js中为Buffer）
    const fileBuffer = await fs.readFile(filePath);
    // 将Buffer转换为浏览器可识别的Uint8Array
    const arrayBuffer = new Uint8Array(fileBuffer);
    // 创建File对象（模拟浏览器环境的文件）
    return new File([arrayBuffer], fileName, {
        type: 'application/octet-stream', // 可根据文件类型修改MIME
    });
}

// 1. 定义更严谨的localStorage模拟（包含所有必要方法）
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    key: vi.fn(),
    length: 0
};

describe('feedbackPost', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        (global.fetch as Mock) = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
                ok: true
            } as Response)
        );

        // 模拟localStorage
        // 关键修复：确保window.localStorage被替换为模拟对象
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true // 允许被修改（避免某些环境下的只读限制）
        });
    });

    

    it('应该正确创建FormData并发送POST请求', async () => {
        // 准备测试数据
        const description = '测试反馈';
        const type = 'bug';
        // 现在MockFile完全实现了File接口，可以安全赋值
        const files: File[] = [];

        // 3. 明确设置token的返回值（在调用函数前设置）
        mockLocalStorage.getItem.mockImplementation((key) => {
            if (key === 'token') return 'test-token';
            return null;
        });

        // 调用函数
        const result = await feedbackPost(description, type, files);

        // 验证结果
        expect(result).toEqual({ success: true });

        // 验证fetch调用
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/feedback', expect.objectContaining({
            method: 'POST',
            headers: {
                'Authorization': 'Bearer test-token'
            }
        }));

        // 验证FormData内容
        const formData = (fetch as Mock).mock.calls[0][1].body;
        expect(formData.get('description')).toBe(description);
        expect(formData.get('type')).toBe(type);
        expect(formData.getAll('files')).toHaveLength(0);
    });

    it('当没有token时应该仍然能发送请求', async () => {
        // 准备测试数据
        const description = '无token测试';
        const type = 'suggestion';
        const files: File[] = [];

        // 不设置token
        mockLocalStorage.getItem.mockReturnValue('');

        // 调用函数
        await feedbackPost(description, type, files);

        // 验证Authorization头
        expect(fetch).toHaveBeenCalledWith('/api/feedback', expect.objectContaining({
            headers: {
                'Authorization': 'Bearer '
            }
        }));
    });

    it('post multiple files', async () => {
        // 1. 准备真实文件路径（请确保这些文件存在）
        const testFilesDir = path.resolve(__dirname); // 测试文件目录
        const file1Path = path.join(testFilesDir, 'test-file-1.txt'); // 第一个真实文件
        const file2Path = path.join(testFilesDir, 'test-file-2.png'); // 第二个真实文件

        // 2. 读取文件并转换为File对象
        const files: File[] = [
            await getRealFile(file1Path, 'test-file-1.txt'),
            await getRealFile(file2Path, 'test-file-2.png')
        ];

        // 3. 调用函数
        await feedbackPost('多真实文件测试', 'feature', files);

        // 4. 验证FormData中的文件
        const formData = (fetch as Mock).mock.calls[0][1].body as FormData;
        const formFiles = formData.getAll('files') as File[];

        // 验证文件数量
        expect(formFiles).toHaveLength(2);
        // 验证文件名（与真实文件一致）
        expect(formFiles[0].name).toBe('test-file-1.txt');
        expect(formFiles[1].name).toBe('test-file-2.png');
        // 验证文件大小（与真实文件一致，可选）
        const file1Stats = await fs.stat(file1Path);
        const file2Stats = await fs.stat(file2Path);
        expect(formFiles[0].size).toBe(file1Stats.size); // 大小匹配真实文件
        expect(formFiles[1].size).toBe(file2Stats.size);
    });

    it('应该正确处理API错误响应', async () => {
        // 模拟错误响应
        const errorResponse = { error: '提交失败' };
        (global.fetch as Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(errorResponse),
            ok: false
        } as Response);

        // 调用函数
        const result = await feedbackPost('错误测试', 'bug', []);

        // 验证是否返回错误信息
        expect(result).toEqual(errorResponse);
    });
});
