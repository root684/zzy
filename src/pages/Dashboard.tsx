import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import StatusCard from '../components/dashboard/StatusCard';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import AlarmChart from '../components/dashboard/AlarmChart';
import AbnormalTerminalList from '../components/dashboard/AbnormalTerminalList';
import BatteryStatusChart from '../components/dashboard/BatteryStatusChart';
import SystemEfficiencyChart from '../components/dashboard/SystemEfficiencyChart';
import EnergyConsumptionChart from '../components/dashboard/EnergyConsumptionChart';
import AlarmHistoryChart from '../components/dashboard/AlarmHistoryChart';
import DeviceHealthChart from '../components/dashboard/DeviceHealthChart';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';
import MapChart from '../components/dashboard/MapChart';
import RadarChart from '../components/dashboard/RadarChart';
import SystemEfficiency3DChart from '../components/dashboard/SystemEfficiency3DChart';
import RuntimeTrend3DChart from '../components/dashboard/RuntimeTrend3DChart';
import ResponseTime3DChart from '../components/dashboard/ResponseTime3DChart';
import DataFilter from '../components/dashboard/DataFilter';
import SkillTags from '../components/dashboard/SkillTags';
import {
  generateSystemStatus,
  generateBatteryStatus,
  generateSystemEfficiency,
  generateDeviceHealth,
  generateTemperatureData,
  generateBatteryData,
  generateEfficiencyData,
  generateEnergyConsumptionData,
  generateAlarmHistoryData,
  generateCategoryData,
  generateAbnormalTerminals,
  generateAlarmData
} from '../utils/mockDataGenerator';
import { createDataUpdateManager } from '../utils/dataUpdateManager';
import { debounce, cacheData, getCachedData } from '../utils/performance';

// 筛选选项接口
interface FilterOptions {
  dateRange: [string, string];
  deviceType: string;
  status: string;
  area: string;
  minTemperature: number;
  maxTemperature: number;
}

/**
 * 仪表盘页面
 * 显示系统状态概览、温度趋势、告警分布和异常终端列表
 */
const Dashboard = () => {
  // 系统状态数据
  const [systemStatus, setSystemStatus] = useState({
    totalTerminals: 200,
    normalTerminals: 196,
    offlineTerminals: 0,
    alarmTerminals: 4,
    maxTemperature: 72.2,
    avgTemperature: 41.9,
    humidity: 0
  });

  // 电池状态数据
  const [batteryStatus, setBatteryStatus] = useState({
    voltage: 52.3,
    current: 15.7,
    soc: 78.5,
    soh: 92.1
  });

  // 系统效率数据
  const [systemEfficiency, setSystemEfficiency] = useState({
    currentEfficiency: 89.5,
    avgEfficiency: 87.2,
    maxEfficiency: 92.8
  });

  // 设备健康状态数据
  const [deviceHealth, setDeviceHealth] = useState({
    healthyDevices: 185,
    warningDevices: 10,
    criticalDevices: 5,
    healthScore: 92.5
  });

  // 设备健康状态占比数据 - 用于饼图
  const deviceHealthPieData = useMemo(() => [
    { value: deviceHealth.healthyDevices, name: '健康设备' },
    { value: deviceHealth.warningDevices, name: '警告设备' },
    { value: deviceHealth.criticalDevices, name: '严重设备' }
  ], [deviceHealth.healthyDevices, deviceHealth.warningDevices, deviceHealth.criticalDevices]);

  // 系统运行时间数据
  const [systemUptime, setSystemUptime] = useState({
    days: 15,
    hours: 8,
    minutes: 32,
    seconds: 45,
    uptimePercentage: 99.9
  });

  // 温度趋势数据 - 增加数据量测试性能
  const [temperatureData, setTemperatureData] = useState(Array(1000).fill(0).map(() => Math.random() * 20 + 30));
  const temperatureLabels = useMemo(() => Array(1000).fill(0).map((_, i) => `${i}:00`), []);

  // 告警类型数据
  const [alarmData, setAlarmData] = useState([
    { value: 120, name: '温度告警', color: '#ef4444' },
    { value: 8, name: '电流告警', color: '#f59e0b' },
    { value: 2, name: '电压告警', color: '#10b981' }
  ]);

  // 异常终端数据 - 增加数据量测试性能
  const [abnormalTerminals, setAbnormalTerminals] = useState(
    Array(100).fill(0).map((_, index) => {
      const temperature = Math.random() * 15 + 60;
      const status = temperature > 70 ? 'danger' : 'warning';
      const areas = ['1-10MWh电池阵列A区', '1-10MWh电池阵列B区', '1-10MWh电池阵列C区', '1-10MWh电池阵列D区'];
      return {
        id: `T${String(index + 1).padStart(3, '0')}`,
        area: areas[index % areas.length],
        temperature: Number(temperature.toFixed(1)),
        status: status as 'warning' | 'danger',
        statusText: status === 'danger' ? '告警' : '预警'
      };
    })
  );

  // 电池状态趋势数据 - 增加数据量测试性能
  const [batteryVoltageData, setBatteryVoltageData] = useState(Array(1000).fill(0).map(() => Math.random() * 5 + 50));
  const [batteryCurrentData, setBatteryCurrentData] = useState(Array(1000).fill(0).map(() => Math.random() * 10 + 10));
  const [batterySocData, setBatterySocData] = useState(Array(1000).fill(0).map(() => Math.random() * 20 + 70));

  // 系统效率数据 - 增加数据量测试性能
  const [efficiencyData, setEfficiencyData] = useState(Array(1000).fill(0).map(() => Math.random() * 10 + 85));

  // 能耗趋势数据 - 增加数据量测试性能
  const [energyConsumptionData, setEnergyConsumptionData] = useState(Array(1000).fill(0).map(() => Math.floor(Math.random() * 100 + 100)));

  // 告警历史数据 - 增加数据量测试性能
  const [alarmHistoryData, setAlarmHistoryData] = useState(Array(1000).fill(0).map(() => Math.floor(Math.random() * 10)));

  // 分类数据对比 - 用于柱状图 - 增加数据量测试性能
  const [categoryData, setCategoryData] = useState(Array(100).fill(0).map(() => Math.floor(Math.random() * 200 + 50)));
  const categoryLabels = useMemo(() => Array(100).fill(0).map((_, i) => `类别${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) + 1}`), []);

  // 运行时间数据 - 用于3D图表
  const [uptimeData, setUptimeData] = useState(Array(1000).fill(0).map(() => Math.floor(Math.random() * 10 + 50)));
  const [downtimeData, setDowntimeData] = useState(Array(1000).fill(0).map(() => Math.floor(Math.random() * 5)));

  // 响应时间数据 - 用于3D图表
  const [responseTimeData, setResponseTimeData] = useState(Array(1000).fill(0).map(() => Math.floor(Math.random() * 100 + 50)));

  // 雷达图数据 - 多维度系统性能指标
  const [radarData, setRadarData] = useState({
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
        value: [92, 85, 78, 95, 90, 88],
        color: '#3b82f6'
      },
      {
        name: '行业平均',
        value: [80, 75, 65, 85, 82, 78],
        color: '#10b981'
      }
    ]
  });

  // 设备性能雷达图数据
  const [devicePerformanceData, setDevicePerformanceData] = useState({
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
  });

  // 技能标签数据
  const [skillTags, setSkillTags] = useState([
    { id: '1', name: '数据监控', color: '#3b82f6', level: 90 },
    { id: '2', name: '故障诊断', color: '#10b981', level: 85 },
    { id: '3', name: '性能优化', color: '#f59e0b', level: 80 },
    { id: '4', name: '安全管理', color: '#ef4444', level: 95 },
    { id: '5', name: '系统集成', color: '#8b5cf6', level: 88 },
    { id: '6', name: '实时分析', color: '#06b6d4', level: 75 },
  ]);

  // 筛选条件
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: [new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]],
    deviceType: 'all',
    status: 'all',
    area: 'all',
    minTemperature: 0,
    maxTemperature: 100
  });

  // 处理筛选条件变化
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // 可以在这里添加筛选逻辑，例如根据筛选条件重新获取数据
    console.log('筛选条件变化:', newFilters);
  };

  // 筛选后的异常终端数据
  const filteredAbnormalTerminals = useMemo(() => {
    return abnormalTerminals.filter(terminal => {
      // 温度范围筛选
      if (terminal.temperature < filters.minTemperature || terminal.temperature > filters.maxTemperature) {
        return false;
      }
      
      // 区域筛选
      if (filters.area !== 'all' && !terminal.area.includes(filters.area)) {
        return false;
      }
      
      // 状态筛选
      if (filters.status !== 'all' && terminal.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  }, [abnormalTerminals, filters]);

  // 计算百分比
  const normalPercentage = useMemo(() => {
    return ((systemStatus.normalTerminals / systemStatus.totalTerminals) * 100).toFixed(1);
  }, [systemStatus.normalTerminals, systemStatus.totalTerminals]);

  const alarmPercentage = useMemo(() => {
    return ((systemStatus.alarmTerminals / systemStatus.totalTerminals) * 100).toFixed(1);
  }, [systemStatus.alarmTerminals, systemStatus.totalTerminals]);

  // 刷新状态
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 成功消息状态
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  // 终端详情模态框
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState<any>(null);
  // 数据更新管理器
  const dataUpdateManager = useRef(createDataUpdateManager({
    interval: 5000, // 5秒更新一次
    enabled: true
  }));

  // 使用useCallback缓存handleRefresh函数
  const handleRefresh = useCallback(debounce(() => {
    setIsRefreshing(true);
    
    // 模拟数据更新延迟
    setTimeout(() => {
      // 生成随机数据
      const newSystemStatus = generateSystemStatus(systemStatus.totalTerminals);
      const newBatteryStatus = generateBatteryStatus();
      const newSystemEfficiency = generateSystemEfficiency();
      const newDeviceHealth = generateDeviceHealth(200);
      const newTemperatureData = generateTemperatureData(temperatureData.length, 40, 5);
      const batteryData = generateBatteryData(batteryVoltageData.length, 52, 15, 78);
      const newEfficiencyData = generateEfficiencyData(efficiencyData.length, 89, 1);
      const newEnergyConsumptionData = generateEnergyConsumptionData(energyConsumptionData.length, 140, 20);
      const newAlarmHistoryData = generateAlarmHistoryData(alarmHistoryData.length, 5, 3);
      const newCategoryData = generateCategoryData(categoryData.length, 100, 50);
      const newAbnormalTerminals = generateAbnormalTerminals(4);
      const newAlarmData = generateAlarmData();
      const newUptimeData = Array(1000).fill(0).map(() => Math.floor(Math.random() * 10 + 50));
      const newDowntimeData = Array(1000).fill(0).map(() => Math.floor(Math.random() * 5));
      const newResponseTimeData = Array(1000).fill(0).map(() => Math.floor(Math.random() * 100 + 50));

      // 缓存数据
      cacheData('systemStatus', newSystemStatus);
      cacheData('batteryStatus', newBatteryStatus);
      cacheData('systemEfficiency', newSystemEfficiency);
      cacheData('deviceHealth', newDeviceHealth);
      cacheData('temperatureData', newTemperatureData);
      cacheData('batteryData', batteryData);
      cacheData('efficiencyData', newEfficiencyData);
      cacheData('energyConsumptionData', newEnergyConsumptionData);
      cacheData('alarmHistoryData', newAlarmHistoryData);
      cacheData('categoryData', newCategoryData);
      cacheData('abnormalTerminals', newAbnormalTerminals);
      cacheData('alarmData', newAlarmData);
      cacheData('uptimeData', newUptimeData);
      cacheData('downtimeData', newDowntimeData);
      cacheData('responseTimeData', newResponseTimeData);

      // 更新状态
      setSystemStatus(newSystemStatus);
      setBatteryStatus(newBatteryStatus);
      setSystemEfficiency(newSystemEfficiency);
      setDeviceHealth(newDeviceHealth);
      setTemperatureData(newTemperatureData);
      setBatteryVoltageData(batteryData.voltage);
      setBatteryCurrentData(batteryData.current);
      setBatterySocData(batteryData.soc);
      setEfficiencyData(newEfficiencyData);
      setEnergyConsumptionData(newEnergyConsumptionData);
      setAlarmHistoryData(newAlarmHistoryData);
      setCategoryData(newCategoryData);
      setAbnormalTerminals(newAbnormalTerminals);
      setAlarmData(newAlarmData);
      setUptimeData(newUptimeData);
      setDowntimeData(newDowntimeData);
      setResponseTimeData(newResponseTimeData);

      console.log('刷新数据');
      setIsRefreshing(false);
      setSuccessMessage('数据刷新成功');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 500); // 减少延迟，提高响应速度
  }, 300), [systemStatus.totalTerminals, temperatureData.length, batteryVoltageData.length, efficiencyData.length, energyConsumptionData.length, alarmHistoryData.length, categoryData.length]);

  // 初始化数据，优先从缓存加载
  useEffect(() => {
    // 从缓存加载数据
    const cachedSystemStatus = getCachedData('systemStatus');
    const cachedBatteryStatus = getCachedData('batteryStatus');
    const cachedSystemEfficiency = getCachedData('systemEfficiency');
    const cachedDeviceHealth = getCachedData('deviceHealth');
    const cachedTemperatureData = getCachedData('temperatureData');
    const cachedBatteryData = getCachedData('batteryData');
    const cachedEfficiencyData = getCachedData('efficiencyData');
    const cachedEnergyConsumptionData = getCachedData('energyConsumptionData');
    const cachedAlarmHistoryData = getCachedData('alarmHistoryData');
    const cachedCategoryData = getCachedData('categoryData');
    const cachedAbnormalTerminals = getCachedData('abnormalTerminals');
    const cachedAlarmData = getCachedData('alarmData');
    const cachedUptimeData = getCachedData('uptimeData');
    const cachedDowntimeData = getCachedData('downtimeData');
    const cachedResponseTimeData = getCachedData('responseTimeData');

    // 如果有缓存数据，使用缓存数据
    if (cachedSystemStatus) setSystemStatus(cachedSystemStatus);
    if (cachedBatteryStatus) setBatteryStatus(cachedBatteryStatus);
    if (cachedSystemEfficiency) setSystemEfficiency(cachedSystemEfficiency);
    if (cachedDeviceHealth) setDeviceHealth(cachedDeviceHealth);
    if (cachedTemperatureData) setTemperatureData(cachedTemperatureData);
    if (cachedBatteryData) {
      setBatteryVoltageData(cachedBatteryData.voltage);
      setBatteryCurrentData(cachedBatteryData.current);
      setBatterySocData(cachedBatteryData.soc);
    }
    if (cachedEfficiencyData) setEfficiencyData(cachedEfficiencyData);
    if (cachedEnergyConsumptionData) setEnergyConsumptionData(cachedEnergyConsumptionData);
    if (cachedAlarmHistoryData) setAlarmHistoryData(cachedAlarmHistoryData);
    if (cachedCategoryData) setCategoryData(cachedCategoryData);
    if (cachedAbnormalTerminals) setAbnormalTerminals(cachedAbnormalTerminals);
    if (cachedAlarmData) setAlarmData(cachedAlarmData);
    if (cachedUptimeData) setUptimeData(cachedUptimeData);
    if (cachedDowntimeData) setDowntimeData(cachedDowntimeData);
    if (cachedResponseTimeData) setResponseTimeData(cachedResponseTimeData);

    // 初始化数据更新管理器
    dataUpdateManager.current.setUpdateCallback(handleRefresh);
    dataUpdateManager.current.start();

    return () => {
      dataUpdateManager.current.stop();
    };
  }, [handleRefresh]);

  const handleExport = () => {
    // 模拟导出操作
    console.log('导出报告');
    setSuccessMessage('报告导出成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleViewTerminal = (id: string) => {
    // 模拟查看终端详情
    console.log('查看终端:', id);
    // 查找终端信息
    const terminal = abnormalTerminals.find(t => t.id === id);
    if (terminal) {
      setSelectedTerminal(terminal);
      setShowTerminalModal(true);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-2xl font-bold">仪表盘</h1>
        <div className="flex items-center space-x-4">
          {/* 成功消息提示 */}
          {showSuccessMessage && (
            <div className="bg-success/20 text-success px-4 py-2 rounded-lg border border-success/40 shadow-lg shadow-success/10 z-50 animate-scaleIn">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>{successMessage}</span>
              </div>
            </div>
          )}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center space-x-2 btn-click"
          >
            <span className={`${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            <span>{isRefreshing ? '刷新中...' : '刷新'}</span>
          </button>
          <button 
            onClick={handleExport}
            className="btn-primary flex items-center space-x-2 btn-click"
          >
            <span>📤</span>
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 数据筛选组件 */}
      <DataFilter 
        onFilterChange={handleFilterChange} 
        currentFilters={filters} 
      />

      {/* 技能标签 */}
      <div className="card hover-glow animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <SkillTags 
          skills={skillTags} 
          onSkillsChange={setSkillTags} 
        />
      </div>

      {/* 核心状态概览 - 突出显示重要信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <StatusCard
          title="总终端数"
          value={systemStatus.totalTerminals}
          status="正常运行中"
          icon="📊"
          color="secondary"
          className="lg:col-span-1"
        />
        
        <StatusCard
          title="正常状态"
          value={systemStatus.normalTerminals}
          status={`${normalPercentage}%`}
          icon="✅"
          color="success"
          className="lg:col-span-1"
        />
        
        <StatusCard
          title="告警终端"
          value={systemStatus.alarmTerminals}
          status={`${alarmPercentage}%`}
          icon="⚠️"
          color="danger"
          className="lg:col-span-2"
        />
      </div>

      {/* 温度状态 - 突出显示温度信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="最高温度"
          value={`${systemStatus.maxTemperature}°C`}
          status="危险"
          icon="🌡️"
          color="danger"
          className="sm:col-span-1"
        />
        
        <StatusCard
          title="平均温度"
          value={`${systemStatus.avgTemperature}°C`}
          status="注意"
          icon="🌡️"
          color="warning"
          className="sm:col-span-1"
        />
      </div>

      {/* 电池和效率状态 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="电池电压"
          value={`${batteryStatus.voltage}V`}
          status="正常"
          icon="🔋"
          color="success"
        />
        
        <StatusCard
          title="SOC"
          value={`${batteryStatus.soc}%`}
          status="良好"
          icon="📈"
          color="secondary"
        />
        
        <StatusCard
          title="当前效率"
          value={`${systemEfficiency.currentEfficiency}%`}
          status="良好"
          icon="⚡"
          color="success"
        />
        
        <StatusCard
          title="健康评分"
          value={`${deviceHealth.healthScore}%`}
          status="优秀"
          icon="🏥"
          color="info"
        />
      </div>

      {/* 设备健康状态 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="健康设备"
          value={deviceHealth.healthyDevices}
          status="正常"
          icon="✅"
          color="success"
        />
        
        <StatusCard
          title="警告设备"
          value={deviceHealth.warningDevices}
          status="注意"
          icon="⚠️"
          color="warning"
        />
        
        <StatusCard
          title="严重设备"
          value={deviceHealth.criticalDevices}
          status="危险"
          icon="🚨"
          color="danger"
        />
      </div>

      {/* 系统运行状态 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="运行天数"
          value={systemUptime.days}
          status="天"
          icon="📅"
          color="secondary"
        />
        
        <StatusCard
          title="运行率"
          value={`${systemUptime.uptimePercentage}%`}
          status="稳定"
          icon="📈"
          color="success"
        />
      </div>

      {/* 图表区域 - 第一行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="card hover-glow">
          <TemperatureChart data={temperatureData} labels={temperatureLabels} />
        </div>
        
        <div className="card hover-glow">
          <BatteryStatusChart 
            voltageData={batteryVoltageData} 
            currentData={batteryCurrentData} 
            socData={batterySocData} 
            labels={temperatureLabels} 
          />
        </div>
      </div>

      {/* 图表区域 - 第二行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="card hover-glow">
          <SystemEfficiencyChart data={efficiencyData} labels={temperatureLabels} />
        </div>
        
        <div className="card hover-glow">
          <EnergyConsumptionChart data={energyConsumptionData} labels={temperatureLabels} />
        </div>
      </div>

      {/* 图表区域 - 第三行 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="card hover-glow">
          <AlarmChart data={alarmData} />
        </div>
        
        <div className="card hover-glow">
          <AlarmHistoryChart data={alarmHistoryData} labels={temperatureLabels} />
        </div>
        
        <div className="card hover-glow">
          <DeviceHealthChart 
            healthyDevices={deviceHealth.healthyDevices}
            warningDevices={deviceHealth.warningDevices}
            criticalDevices={deviceHealth.criticalDevices}
          />
        </div>
      </div>

      {/* 图表区域 - 第四行 - 分类数据对比 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <div className="card hover-glow">
          <BarChart 
            data={categoryData} 
            labels={categoryLabels} 
            title="分类数据对比" 
            yAxisName="数值"
          />
        </div>
        
        <div className="card hover-glow">
          <BarChart 
            data={[50, 120, 80, 200, 150, 90, 180]} 
            labels={['产品A', '产品B', '产品C', '产品D', '产品E', '产品F', '产品G']} 
            title="产品销售对比" 
            yAxisName="销量"
          />
        </div>
      </div>

      {/* 图表区域 - 第五行 - 饼图展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="card hover-glow">
          <PieChart 
            data={deviceHealthPieData} 
            title="设备健康状态占比" 
            radius={['40%', '70%']} 
            showLegend={true}
          />
        </div>
        
        <div className="card hover-glow">
          <PieChart 
            data={[
              { value: systemStatus.normalTerminals, name: '正常终端' },
              { value: systemStatus.alarmTerminals, name: '告警终端' },
              { value: systemStatus.offlineTerminals, name: '离线终端' }
            ]} 
            title="终端状态占比" 
            radius={['40%', '70%']} 
            showLegend={true}
          />
        </div>
      </div>

      {/* 雷达图数据可视化 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
        <div className="card hover-glow">
          <RadarChart 
            data={radarData} 
            title="系统性能多维度分析"
          />
        </div>
        <div className="card hover-glow">
          <RadarChart 
            data={devicePerformanceData} 
            title="设备性能对比"
          />
        </div>
      </div>

      {/* 3D性能指标图表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '1.0s' }}>
        <div className="card hover-glow">
          <div className="p-4">
            <SystemEfficiency3DChart data={efficiencyData} labels={temperatureLabels} />
          </div>
        </div>
        <div className="card hover-glow">
          <div className="p-4">
            <RuntimeTrend3DChart uptimeData={uptimeData} downtimeData={downtimeData} labels={temperatureLabels} />
          </div>
        </div>
        <div className="card hover-glow">
          <div className="p-4">
            <ResponseTime3DChart data={responseTimeData} labels={temperatureLabels} />
          </div>
        </div>
      </div>

      {/* 地图数据可视化 */}
      <div className="grid grid-cols-1 gap-4 md:gap-8 animate-slide-up" style={{ animationDelay: '1.1s' }}>
        <div className="card hover-glow">
          <MapChart />
        </div>
      </div>

      {/* 异常终端列表 */}
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <AbnormalTerminalList 
          terminals={filteredAbnormalTerminals} 
        />
      </div>

      {/* 终端详情模态框 */}
      {showTerminalModal && selectedTerminal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">终端详情</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowTerminalModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    终端ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={selectedTerminal.id}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    所属区域
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={selectedTerminal.area}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    当前温度
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={`${selectedTerminal.temperature}°C`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    状态
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 ${selectedTerminal.status === 'danger' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'} border border-dark-lighter rounded-lg`}
                    value={selectedTerminal.statusText}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  历史温度记录
                </label>
                <div className="bg-dark-light rounded-lg p-4 h-40 flex items-center justify-center">
                  <div className="text-gray-400">温度历史图表</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  告警历史
                </label>
                <div className="bg-dark-light rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">温度预警</span>
                      <span className="text-xs text-gray-400">2026-01-14 15:30:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">温度告警</span>
                      <span className="text-xs text-gray-400">2026-01-14 16:00:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowTerminalModal(false)}
              >
                关闭
              </button>
              <button 
                className="btn-primary btn-click"
                onClick={() => {
                  setShowTerminalModal(false);
                  setSuccessMessage('操作成功');
                  setShowSuccessMessage(true);
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 3000);
                }}
              >
                处理
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;