// 模拟数据生成器
// 用于生成各种类型的模拟数据，支持实时数据更新

/**
 * 生成指定范围的随机数
 * @param min 最小值
 * @param max 最大值
 * @param decimal 小数位数
 * @returns 随机数
 */
export const generateRandomNumber = (min: number, max: number, decimal: number = 1): number => {
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(decimal));
};

/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export const generateRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 基于现有值生成波动数据
 * @param currentValue 当前值
 * @param fluctuation 波动范围
 * @param decimal 小数位数
 * @returns 新值
 */
export const generateFluctuatingValue = (currentValue: number, fluctuation: number, decimal: number = 1): number => {
  const change = (Math.random() * fluctuation * 2 - fluctuation);
  const newValue = currentValue + change;
  return Number(newValue.toFixed(decimal));
};

/**
 * 生成温度数据
 * @param length 数据长度
 * @param baseValue 基础值
 * @param fluctuation 波动范围
 * @returns 温度数据数组
 */
export const generateTemperatureData = (length: number, baseValue: number = 40, fluctuation: number = 5): number[] => {
  return Array.from({ length }, () => generateFluctuatingValue(baseValue, fluctuation));
};

/**
 * 生成电池状态数据
 * @param length 数据长度
 * @param baseVoltage 基础电压
 * @param baseCurrent 基础电流
 * @param baseSoc 基础SOC
 * @returns 电池状态数据对象
 */
export const generateBatteryData = (length: number, baseVoltage: number = 52, baseCurrent: number = 15, baseSoc: number = 78): { voltage: number[], current: number[], soc: number[] } => {
  return {
    voltage: Array.from({ length }, () => generateFluctuatingValue(baseVoltage, 0.5)),
    current: Array.from({ length }, () => generateFluctuatingValue(baseCurrent, 1)),
    soc: Array.from({ length }, () => generateFluctuatingValue(baseSoc, 1))
  };
};

/**
 * 生成系统效率数据
 * @param length 数据长度
 * @param baseValue 基础值
 * @param fluctuation 波动范围
 * @returns 系统效率数据数组
 */
export const generateEfficiencyData = (length: number, baseValue: number = 89, fluctuation: number = 1): number[] => {
  return Array.from({ length }, () => generateFluctuatingValue(baseValue, fluctuation));
};

/**
 * 生成能耗数据
 * @param length 数据长度
 * @param baseValue 基础值
 * @param fluctuation 波动范围
 * @returns 能耗数据数组
 */
export const generateEnergyConsumptionData = (length: number, baseValue: number = 140, fluctuation: number = 20): number[] => {
  return Array.from({ length }, () => Math.round(generateFluctuatingValue(baseValue, fluctuation, 0)));
};

/**
 * 生成告警历史数据
 * @param length 数据长度
 * @param baseValue 基础值
 * @param fluctuation 波动范围
 * @returns 告警历史数据数组
 */
export const generateAlarmHistoryData = (length: number, baseValue: number = 5, fluctuation: number = 3): number[] => {
  return Array.from({ length }, () => Math.max(0, Math.round(generateFluctuatingValue(baseValue, fluctuation, 0))));
};

/**
 * 生成分类数据
 * @param length 数据长度
 * @param baseValue 基础值
 * @param fluctuation 波动范围
 * @returns 分类数据数组
 */
export const generateCategoryData = (length: number, baseValue: number = 100, fluctuation: number = 50): number[] => {
  return Array.from({ length }, () => Math.max(0, Math.round(generateFluctuatingValue(baseValue, fluctuation, 0))));
};

/**
 * 生成异常终端数据
 * @param count 终端数量
 * @returns 异常终端数据数组
 */
export const generateAbnormalTerminals = (count: number = 4): Array<{ id: string, area: string, temperature: number, status: 'warning' | 'danger', statusText: string }> => {
  const areas = ['1-10MWh电池阵列A区', '1-10MWh电池阵列B区', '1-10MWh电池阵列C区', '1-10MWh电池阵列D区'];
  return Array.from({ length: count }, (_, index) => {
    const temperature = generateRandomNumber(60, 75);
    const status = temperature > 70 ? 'danger' : 'warning';
    return {
      id: `T${String(index + 1).padStart(3, '0')}`,
      area: areas[index % areas.length],
      temperature,
      status,
      statusText: status === 'danger' ? '告警' : '预警'
    };
  });
};

/**
 * 生成系统状态数据
 * @param totalTerminals 总终端数
 * @returns 系统状态数据对象
 */
export const generateSystemStatus = (totalTerminals: number = 200): {
  totalTerminals: number;
  normalTerminals: number;
  offlineTerminals: number;
  alarmTerminals: number;
  maxTemperature: number;
  avgTemperature: number;
  humidity: number;
} => {
  const alarmTerminals = generateRandomInt(0, 10);
  const offlineTerminals = generateRandomInt(0, 5);
  const normalTerminals = Math.max(0, totalTerminals - alarmTerminals - offlineTerminals);
  
  return {
    totalTerminals,
    normalTerminals,
    offlineTerminals,
    alarmTerminals,
    maxTemperature: generateRandomNumber(65, 75),
    avgTemperature: generateRandomNumber(35, 45),
    humidity: generateRandomNumber(30, 60)
  };
};

/**
 * 生成电池状态数据
 * @returns 电池状态数据对象
 */
export const generateBatteryStatus = (): {
  voltage: number;
  current: number;
  soc: number;
  soh: number;
} => {
  return {
    voltage: generateRandomNumber(50, 55),
    current: generateRandomNumber(10, 20),
    soc: generateRandomNumber(70, 90),
    soh: generateRandomNumber(85, 95)
  };
};

/**
 * 生成系统效率数据
 * @returns 系统效率数据对象
 */
export const generateSystemEfficiency = (): {
  currentEfficiency: number;
  avgEfficiency: number;
  maxEfficiency: number;
} => {
  return {
    currentEfficiency: generateRandomNumber(85, 95),
    avgEfficiency: generateRandomNumber(80, 90),
    maxEfficiency: generateRandomNumber(90, 98)
  };
};

/**
 * 生成设备健康状态数据
 * @param totalDevices 总设备数
 * @returns 设备健康状态数据对象
 */
export const generateDeviceHealth = (totalDevices: number = 200): {
  healthyDevices: number;
  warningDevices: number;
  criticalDevices: number;
  healthScore: number;
} => {
  const criticalDevices = generateRandomInt(0, 10);
  const warningDevices = generateRandomInt(0, 20);
  const healthyDevices = Math.max(0, totalDevices - criticalDevices - warningDevices);
  
  return {
    healthyDevices,
    warningDevices,
    criticalDevices,
    healthScore: generateRandomNumber(85, 95)
  };
};

/**
 * 生成系统运行时间数据
 * @returns 系统运行时间数据对象
 */
export const generateSystemUptime = (): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  uptimePercentage: number;
} => {
  return {
    days: generateRandomInt(1, 30),
    hours: generateRandomInt(0, 23),
    minutes: generateRandomInt(0, 59),
    seconds: generateRandomInt(0, 59),
    uptimePercentage: generateRandomNumber(99, 100, 2)
  };
};

/**
 * 生成雷达图数据
 * @returns 雷达图数据对象
 */
export const generateRadarData = (): {
  indicator: Array<{ name: string, max: number }>;
  series: Array<{ name: string, value: number[], color: string }>;
} => {
  return {
    indicator: [
      { name: '系统稳定性', max: 100 },
      { name: '响应速度', max: 100 },
      { name: '资源利用率', max: 100 },
      { name: '安全性', max: 100 },
      { name: '可靠性', max: 100 },
      { name: '可扩展性', max: 100 }
    ],
    series: [
      {
        name: '当前系统',
        value: [85, 75, 80, 90, 88, 82],
        color: '#3b82f6'
      },
      {
        name: '行业平均',
        value: [75, 65, 70, 80, 78, 72],
        color: '#10b981'
      }
    ]
  };
};

/**
 * 生成设备性能雷达图数据
 * @returns 设备性能雷达图数据对象
 */
export const generateDevicePerformanceData = (): {
  indicator: Array<{ name: string, max: number }>;
  series: Array<{ name: string, value: number[], color: string }>;
} => {
  return {
    indicator: [
      { name: 'CPU使用率', max: 100 },
      { name: '内存使用率', max: 100 },
      { name: '磁盘使用率', max: 100 },
      { name: '网络带宽', max: 100 },
      { name: '响应时间', max: 100 },
      { name: '并发处理', max: 100 }
    ],
    series: [
      {
        name: '设备A',
        value: [65, 72, 80, 75, 85, 90],
        color: '#f59e0b'
      },
      {
        name: '设备B',
        value: [78, 65, 70, 85, 72, 88],
        color: '#ef4444'
      },
      {
        name: '设备C',
        value: [82, 88, 75, 65, 80, 72],
        color: '#8b5cf6'
      }
    ]
  };
};

/**
 * 生成告警类型数据
 * @returns 告警类型数据数组
 */
export const generateAlarmData = (): Array<{ value: number, name: string, color: string }> => {
  return [
    { value: generateRandomInt(100, 150), name: '温度告警', color: '#ef4444' },
    { value: generateRandomInt(5, 15), name: '电流告警', color: '#f59e0b' },
    { value: generateRandomInt(0, 5), name: '电压告警', color: '#10b981' }
  ];
};
