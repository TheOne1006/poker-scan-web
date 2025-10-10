

const storagePrefix = 'poker-scan-';

const imageCachePrefix = 'poker-scan-image-cache-item-';
const imageCacheMaxCount = 20;
const imageCacheListKey = 'poker-scan-image-cache-list';


export function getStorageItem(key: string) {
  return localStorage.getItem(storagePrefix + key);
}

export function setStorage(key: string, value: string) {
  localStorage.setItem(storagePrefix + key, value);
}


export function removeStorageItem(key: string) {
  localStorage.removeItem(storagePrefix + key);
}

export function setToken(token: string) {
  setStorage('token', token);
}

export function getToken(): string {
  return getStorageItem('token') || '';
}

export function hasToken(): boolean {
  return !!getToken()
}


/**
 * ================================================
 *            Image Cache 
 * 将图片转换成 base64 存储到 localStorage
 * 1. imageCacheListKey 为 list 类型，存储 [{name: filename, time: timestamp}]
 * 2. 具体图片的单独存储 为一个独立的 key, 进存储图片的 base64，避免解析 json.parse 的性能损耗
 * 3. 每次 get 图片时，如果图片不在 cache list 中, 则返回空
 * 4. 每次 push 时, 将 File 转换成 base64 对应的 cahce之后，再更新 cache list
 * 5. 每次 push 时, 如果 cache list 超过 imageCacheMaxCount，则删除最早的图片
 * ================================================
 */

/**
 * 获取图片缓存列表
 * @returns {name: string, time: number}[]
 */
function getImageCacheList(): {name: string, time: number}[] {
  const listStr = getStorageItem(imageCacheListKey);
  try {
    return JSON.parse(listStr || '[]');
  } catch {
    return [];
  }
}

/**
 * 获取图片缓存 key
 * @param name 
 * @returns 
 */
function getImageCacheKey(name: string) {
  return imageCachePrefix + name;
}

/**
 * 将图片名称添加到缓存列表
 * @param name 
 */
function appendImageName2CacheList(fileName: string) {
  const list = getImageCacheList();
  list.push({name: fileName, time: Date.now()});
  if (list.length > imageCacheMaxCount) {
    // 移除最早的图片
    const removedList = list.splice(0, list.length - imageCacheMaxCount);
    // 移除对应的图片缓存
    removedList.forEach((item: {name: string}) => {
      removeStorageItem(getImageCacheKey(item.name));
    });
  }
  setStorage(imageCacheListKey, JSON.stringify(list));
}

// Convert File to base64 string
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Convert base64 string to File object
function base64ToFile(base64: string, filename: string): File {
  // 解析Base64字符串，分离MIME类型和数据
  const arr = base64.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);

  // 如果没有指定MIME类型，默认使用application/octet-stream
  const mime = (mimeMatch && mimeMatch[1]) || 'application/octet-stream';

  // 解码Base64数据
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // 转换为Uint8Array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // 创建File对象
  return new File([u8arr], filename, { type: mime });
}

export async function save2ImageCache(file: File, fileName: string) {
  const base64 = await fileToBase64(file);
  setStorage(getImageCacheKey(fileName), base64);
  appendImageName2CacheList(fileName);
}

// 从localStorage获取图片
export async function getImageFromStorage(fileName: string): Promise<File | null> {

  const base64 = getStorageItem(getImageCacheKey(fileName));
  if (!base64) {
    return null;
  }
  
  // Convert base64 to File object
  try {
    const file = base64ToFile(base64, fileName);
    return file;
  } catch (error) {
    console.error('Error converting base64 to File:', error);
    return null;
  }
}
