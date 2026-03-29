// 数据整合服务
// 负责处理不同模块间的数据交互和格式统一

// 数据类型定义
export interface SmartTrafficData {
  videoMonitoring: {
    cameras: Array<{
      id: string;
      name: string;
      status: string;
      location: string;
      streamUrl: string;
    }>;
    alerts: Array<{
      id: string;
      level: string;
      message: string;
      location: string;
      timestamp: string;
    }>;
  };
  substationData: {
    equipmentCount: number;
    operationalStatus: Array<{
      id: string;
      name: string;
      status: string;
      lastChecked: string;
    }>;
  };
  powerData: {
    powerOutput: number;
    loadPercentage: number;
    incidents: Array<{
      id: string;
      type: string;
      location: string;
      status: string;
      timestamp: string;
    }>;
  };
}

export interface SmartWeatherData {
  pressure: {
    relative: number;
    absolute: number;
  };
  temperature: {
    indoor: number;
    outdoor: number;
    historical: Array<{
      date: string;
      min: number;
      max: number;
    }>;
  };
  humidity: {
    indoor: number;
    outdoor: number;
    historical: Array<{
      date: string;
      value: number;
    }>;
  };
  wind: {
    speed: number;
    gust: number;
    direction: string;
  };
  rainfall: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  observationPoints: Array<{
    name: string;
    location: [number, number];
  }>;
}

export interface SmartIOTData {
  devices: {
    dtuCount: number;
    plcCount: number;
    onlineCount: number;
    offlineCount: number;
  };
  factories: Array<{
    id: string;
    company: string;
    dtuCnt: number;
    plcCnt: number;
    dataCnt: number;
    alarm: number;
  }>;
  alarms: {
    alarm: number;
    fault: number;
    recentAlarms: Array<{
      id: string;
      msg: string;
      timestamp: string;
    }>;
  };
  industryDistribution: Array<{
    type: string;
    count: number;
  }>;
  dataRecords: Array<{
    date: string;
    value: number;
  }>;
}

// 统一数据模型
export interface SmartScreenData {
  traffic: SmartTrafficData;
  weather: SmartWeatherData;
  iot: SmartIOTData;
  lastUpdated: string;
}

// 数据整合服务类
class DataIntegrationService {
  private static instance: DataIntegrationService;
  private data: SmartScreenData;
  private listeners: Array<() => void> = [];

  private constructor() {
    // 初始化默认数据
    this.data = {
      traffic: {
        videoMonitoring: {
          cameras: [],
          alerts: []
        },
        substationData: {
          equipmentCount: 0,
          operationalStatus: []
        },
        powerData: {
          powerOutput: 0,
          loadPercentage: 0,
          incidents: []
        }
      },
      weather: {
        pressure: {
          relative: 0,
          absolute: 0
        },
        temperature: {
          indoor: 0,
          outdoor: 0,
          historical: []
        },
        humidity: {
          indoor: 0,
          outdoor: 0,
          historical: []
        },
        wind: {
          speed: 0,
          gust: 0,
          direction: ''
        },
        rainfall: {
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0
        },
        observationPoints: []
      },
      iot: {
        devices: {
          dtuCount: 0,
          plcCount: 0,
          onlineCount: 0,
          offlineCount: 0
        },
        factories: [],
        alarms: {
          alarm: 0,
          fault: 0,
          recentAlarms: []
        },
        industryDistribution: [],
        dataRecords: []
      },
      lastUpdated: new Date().toISOString()
    };
  }

  public static getInstance(): DataIntegrationService {
    if (!DataIntegrationService.instance) {
      DataIntegrationService.instance = new DataIntegrationService();
    }
    return DataIntegrationService.instance;
  }

  // 更新交通数据
  public updateTrafficData(data: Partial<SmartTrafficData>): void {
    this.data.traffic = {
      ...this.data.traffic,
      ...data
    };
    this.data.lastUpdated = new Date().toISOString();
    this.notifyListeners();
  }

  // 更新气象数据
  public updateWeatherData(data: Partial<SmartWeatherData>): void {
    this.data.weather = {
      ...this.data.weather,
      ...data
    };
    this.data.lastUpdated = new Date().toISOString();
    this.notifyListeners();
  }

  // 更新物联数据
  public updateIOTData(data: Partial<SmartIOTData>): void {
    this.data.iot = {
      ...this.data.iot,
      ...data
    };
    this.data.lastUpdated = new Date().toISOString();
    this.notifyListeners();
  }

  // 获取完整数据
  public getData(): SmartScreenData {
    return { ...this.data };
  }

  // 注册数据变化监听器
  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // 模拟数据更新（用于开发和测试）
  public simulateDataUpdate(): void {
    // 模拟变电站数据更新
    this.updateTrafficData({
      videoMonitoring: {
        cameras: [
          { id: '1', name: '变电站摄像头1', status: '正常', location: '变电站A区', streamUrl: 'video1.mp4' },
          { id: '2', name: '变电站摄像头2', status: '正常', location: '变电站B区', streamUrl: 'video2.mp4' },
          { id: '3', name: '变电站摄像头3', status: '异常', location: '变电站C区', streamUrl: 'video3.mp4' },
        ],
        alerts: [
          { id: '1', level: '一级', message: '设备温度异常', location: '变电站A区', timestamp: new Date().toISOString() },
          { id: '2', level: '二级', message: '电压波动', location: '变电站B区', timestamp: new Date().toISOString() },
        ]
      },
      substationData: {
        equipmentCount: 150,
        operationalStatus: [
          { id: '1', name: '变压器1', status: '正常', lastChecked: new Date().toISOString() },
          { id: '2', name: '断路器1', status: '正常', lastChecked: new Date().toISOString() },
          { id: '3', name: '隔离开关1', status: '异常', lastChecked: new Date().toISOString() },
        ]
      },
      powerData: {
        powerOutput: 5200,
        loadPercentage: 65,
        incidents: [
          { id: '1', type: '设备故障', location: '变电站A区', status: '处理中', timestamp: new Date().toISOString() },
          { id: '2', type: '线路检修', location: '变电站B区', status: '已处理', timestamp: new Date().toISOString() },
        ]
      }
    });

    // 模拟气象数据更新
    this.updateWeatherData({
      pressure: {
        relative: 1013,
        absolute: 1015
      },
      temperature: {
        indoor: 22,
        outdoor: 33,
        historical: [
          { date: '2023/1/24', min: 23, max: 28 },
          { date: '2023/1/25', min: 21, max: 24 },
          { date: '2023/1/26', min: 24, max: 28 },
        ]
      },
      humidity: {
        indoor: 45,
        outdoor: 60,
        historical: [
          { date: '2023/1/24', value: 65 },
          { date: '2023/1/25', value: 60 },
          { date: '2023/1/26', value: 55 },
        ]
      },
      wind: {
        speed: 12.2,
        gust: 15.3,
        direction: '东北风'
      },
      rainfall: {
        daily: 0,
        weekly: 5,
        monthly: 25,
        yearly: 350
      },
      observationPoints: [
        { name: '成都', location: [103.9526, 30.7617] },
        { name: '上海', location: [121.4648, 31.2891] },
        { name: '北京', location: [116.4074, 39.9042] },
      ]
    });

    // 模拟物联数据更新
    this.updateIOTData({
      devices: {
        dtuCount: 150,
        plcCount: 85,
        onlineCount: 210,
        offlineCount: 25
      },
      factories: [
        { id: '1', company: '工厂1', dtuCnt: 20, plcCnt: 15, dataCnt: 1200, alarm: 5 },
        { id: '2', company: '工厂2', dtuCnt: 15, plcCnt: 10, dataCnt: 900, alarm: 3 },
        { id: '3', company: '工厂3', dtuCnt: 25, plcCnt: 20, dataCnt: 1500, alarm: 8 },
      ],
      alarms: {
        alarm: 25,
        fault: 12,
        recentAlarms: [
          { id: '1', msg: '设备离线', timestamp: new Date().toISOString() },
          { id: '2', msg: '数据异常', timestamp: new Date().toISOString() },
          { id: '3', msg: '阈值告警', timestamp: new Date().toISOString() },
        ]
      },
      industryDistribution: [
        { type: '制造业', count: 45 },
        { type: '能源业', count: 30 },
        { type: '交通业', count: 25 },
        { type: '其他', count: 15 },
      ],
      dataRecords: [
        { date: '2023/1/20', value: 1200 },
        { date: '2023/1/21', value: 1350 },
        { date: '2023/1/22', value: 1100 },
        { date: '2023/1/23', value: 1400 },
        { date: '2023/1/24', value: 1250 },
      ]
    });
  }
}

export default DataIntegrationService.getInstance();
