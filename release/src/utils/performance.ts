/**
 * 性能优化工具
 * 提供资源预加载、性能监控等功能
 */

/**
 * 预加载资源
 * @param resources 资源列表，包含url和type
 */
export const preloadResources = (resources: Array<{ url: string; type: string }>) => {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.url;
    } else if (resource.type === 'script') {
      const script = document.createElement('script');
      script.src = resource.url;
      script.async = true;
      document.head.appendChild(script);
    } else if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = resource.url;
      document.head.appendChild(link);
    }
  });
};

/**
 * 预加载关键资源
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    // 这里可以添加关键资源的URL
    // { url: '/path/to/critical/image.jpg', type: 'image' },
    // { url: '/path/to/critical/script.js', type: 'script' },
  ];
  
  preloadResources(criticalResources);
};

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖处理后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * 节流函数
 * @param func 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流处理后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  };
};

/**
 * 性能监控
 * @param name 监控名称
 * @param fn 要执行的函数
 * @returns 函数执行结果
 */
export const measurePerformance = <T>(name: string, fn: () => T): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} 执行时间: ${end - start}ms`);
  return result;
};

/**
 * 懒加载图片
 * @param selector 图片选择器
 */
export const lazyLoadImages = (selector: string = 'img[data-src]') => {
  const images = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

/**
 * 优化滚动性能
 * @param callback 滚动回调函数
 * @returns 优化后的滚动处理函数
 */
export const optimizeScroll = (callback: () => void) => {
  let ticking = false;
  
  const update = () => {
    callback();
    ticking = false;
  };
  
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  
  return handleScroll;
};

/**
 * 数据缓存接口
 */
export interface CachedData {
  data: any;
  timestamp: number;
  expiration?: number; // 过期时间（毫秒）
}

/**
 * 缓存数据
 * @param key 缓存键
 * @param data 缓存数据
 * @param expiration 过期时间（毫秒）
 */
export const cacheData = (key: string, data: any, expiration?: number) => {
  try {
    const cachedData: CachedData = {
      data,
      timestamp: Date.now(),
      expiration
    };
    localStorage.setItem(key, JSON.stringify(cachedData));
  } catch (error) {
    console.error('缓存数据失败:', error);
  }
};

/**
 * 获取缓存数据
 * @param key 缓存键
 * @returns 缓存数据，如果不存在或已过期则返回null
 */
export const getCachedData = (key: string): any => {
  try {
    const cachedString = localStorage.getItem(key);
    if (!cachedString) return null;
    
    const cachedData: CachedData = JSON.parse(cachedString);
    
    // 检查是否过期
    if (cachedData.expiration) {
      if (Date.now() - cachedData.timestamp > cachedData.expiration) {
        localStorage.removeItem(key);
        return null;
      }
    }
    
    return cachedData.data;
  } catch (error) {
    console.error('获取缓存数据失败:', error);
    return null;
  }
};

/**
 * 清除缓存
 * @param key 缓存键，如果不提供则清除所有缓存
 */
export const clearCache = (key?: string) => {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  } catch (error) {
    console.error('清除缓存失败:', error);
  }
};

/**
 * 批量缓存数据
 * @param dataMap 数据映射，键为缓存键，值为缓存数据
 * @param expiration 过期时间（毫秒）
 */
export const batchCacheData = (dataMap: Record<string, any>, expiration?: number) => {
  Object.entries(dataMap).forEach(([key, data]) => {
    cacheData(key, data, expiration);
  });
};

/**
 * 批量获取缓存数据
 * @param keys 缓存键数组
 * @returns 数据映射，键为缓存键，值为缓存数据
 */
export const batchGetCachedData = (keys: string[]): Record<string, any> => {
  const result: Record<string, any> = {};
  keys.forEach(key => {
    result[key] = getCachedData(key);
  });
  return result;
};