// 数据更新管理器
// 用于管理实时数据更新的定时器和逻辑

/**
 * 数据更新配置接口
 */
export interface DataUpdateConfig {
  interval: number; // 更新间隔（毫秒）
  enabled: boolean; // 是否启用自动更新
}

/**
 * 数据更新管理器类
 */
export class DataUpdateManager {
  private interval: number;
  private enabled: boolean;
  private timerId: NodeJS.Timeout | null = null;
  private updateCallback: (() => void) | null = null;

  /**
   * 构造函数
   * @param config 数据更新配置
   */
  constructor(config: DataUpdateConfig) {
    this.interval = config.interval;
    this.enabled = config.enabled;
  }

  /**
   * 设置更新回调函数
   * @param callback 更新回调函数
   */
  setUpdateCallback(callback: () => void): void {
    this.updateCallback = callback;
  }

  /**
   * 启动数据更新
   */
  start(): void {
    if (!this.enabled || this.timerId) return;

    this.timerId = setInterval(() => {
      if (this.updateCallback) {
        this.updateCallback();
      }
    }, this.interval);
  }

  /**
   * 停止数据更新
   */
  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * 重启数据更新
   */
  restart(): void {
    this.stop();
    this.start();
  }

  /**
   * 设置更新间隔
   * @param interval 更新间隔（毫秒）
   */
  setInterval(interval: number): void {
    this.interval = interval;
    if (this.enabled && this.timerId) {
      this.restart();
    }
  }

  /**
   * 设置是否启用自动更新
   * @param enabled 是否启用
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (enabled) {
      this.start();
    } else {
      this.stop();
    }
  }

  /**
   * 获取当前更新间隔
   * @returns 更新间隔（毫秒）
   */
  getInterval(): number {
    return this.interval;
  }

  /**
   * 获取是否启用自动更新
   * @returns 是否启用
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * 手动触发一次数据更新
   */
  triggerUpdate(): void {
    if (this.updateCallback) {
      this.updateCallback();
    }
  }
}

/**
 * 创建数据更新管理器实例
 * @param config 数据更新配置
 * @returns 数据更新管理器实例
 */
export const createDataUpdateManager = (config: DataUpdateConfig): DataUpdateManager => {
  return new DataUpdateManager(config);
};
