

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
async function base64ToFile(base64: string, filename: string): Promise<File> {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
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
    const file = await base64ToFile(base64, fileName);
    return file;
  } catch (error) {
    console.error('Error converting base64 to File:', error);
    return null;
  }
}
