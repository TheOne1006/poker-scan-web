


function getToken() {
  return localStorage.getItem('token') || '';
}

/**
 * 反馈提交
 * 
 * @param description 描述
 * @param type 类型
 * @param files 文件
 * @returns 
 */
export const feedbackPost = async (
  description: string,
  type: string,
  files: File[],
) => {
  const formData = new FormData();
  // 遍历 files 数组，将每个文件添加到 formData 中
  files.forEach(file => {
    formData.append('files', file);
  });
  formData.append('description', description);
  formData.append('type', type);

  const response = await fetch('/api/feedback', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });

  return response.json();
};


