import { useState, useMemo, useEffect } from 'react';
import StatusCard from '../components/dashboard/StatusCard';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import AlarmChart from '../components/dashboard/AlarmChart';
import AbnormalTerminalList from '../components/dashboard/AbnormalTerminalList';
import BatteryStatusChart from '../components/dashboard/BatteryStatusChart';
import SystemEfficiencyChart from '../components/dashboard/SystemEfficiencyChart';
import EnergyConsumptionChart from '../components/dashboard/EnergyConsumptionChart';
import AlarmHistoryChart from '../components/dashboard/AlarmHistoryChart';
import DeviceHealthChart from '../components/dashboard/DeviceHealthChart';

/**
 * 数字孪生变电站监控系统
 * 展示系统整体状态和关键指标
 */
const SystemOverview = () => {
  const [systemStatus] = useState({
    totalTerminals: 200,
    normalTerminals: 196,
    offlineTerminals: 0,
    alarmTerminals: 4,
    maxTemperature: 72.2,
    avgTemperature: 41.9,
    humidity: 0
  });

  // 电池状态数据
  const [batteryStatus] = useState({
    voltage: 52.3,
    current: 15.7,
    soc: 78.5,
    soh: 92.1
  });

  // 系统效率数据
  const [systemEfficiency] = useState({
    currentEfficiency: 89.5,
    avgEfficiency: 87.2,
    maxEfficiency: 92.8
  });

  // 设备健康状态数据
  const [deviceHealth] = useState({
    healthyDevices: 185,
    warningDevices: 10,
    criticalDevices: 5,
    healthScore: 92.5
  });

  // 系统运行时间数据
  const [systemUptime] = useState({
    days: 15,
    hours: 8,
    minutes: 32,
    seconds: 45,
    uptimePercentage: 99.9
  });

  // 温度趋势数据
  const temperatureData = useMemo(() => [38.5, 39.2, 40.1, 42.3, 41.5, 40.8], []);
  const temperatureLabels = useMemo(() => ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], []);

  // 告警类型数据
  const alarmData = useMemo(() => [
    { value: 120, name: '温度告警', color: '#ef4444' },
    { value: 8, name: '电流告警', color: '#f59e0b' },
    { value: 2, name: '电压告警', color: '#10b981' }
  ], []);

  // 异常终端数据
  const abnormalTerminals = useMemo(() => [
    { id: 'T005', area: '1-10MWh电池阵列A区', temperature: 62.1, status: 'warning' as const, statusText: '预警' },
    { id: 'T053', area: '1-10MWh电池阵列B区', temperature: 60.7, status: 'warning' as const, statusText: '预警' },
    { id: 'T182', area: '1-10MWh电池阵列C区', temperature: 72.2, status: 'danger' as const, statusText: '告警' },
    { id: 'T180', area: '1-10MWh电池阵列D区', temperature: 68.9, status: 'warning' as const, statusText: '预警' }
  ], []);

  // 电池状态趋势数据
  const batteryVoltageData = useMemo(() => [52.1, 52.2, 52.3, 52.2, 52.3, 52.4], []);
  const batteryCurrentData = useMemo(() => [15.2, 15.5, 15.7, 15.6, 15.8, 15.7], []);
  const batterySocData = useMemo(() => [78.0, 78.1, 78.3, 78.4, 78.5, 78.5], []);

  // 系统效率数据
  const efficiencyData = useMemo(() => [88.2, 88.5, 89.0, 89.2, 89.5, 89.4], []);

  // 能耗趋势数据
  const energyConsumptionData = useMemo(() => [120, 135, 142, 150, 145, 138], []);

  // 告警历史数据
  const alarmHistoryData = useMemo(() => [5, 3, 7, 4, 6, 4], []);

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

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // 模拟数据更新延迟
    setTimeout(() => {
      // 这里可以添加实际的实时数据更新逻辑
      console.log('刷新数据');
      setIsRefreshing(false);
      setSuccessMessage('数据刷新成功');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1000);
  };

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
    <div className="space-y-6 animate-fade-in">
      <div className="relative flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-2xl font-bold text-neon-blue">数字孪生变电站监控系统</h1>
        <div className="flex space-x-3">
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
            className="btn-accent flex items-center space-x-2 btn-click"
          >
            <span>📤</span>
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <StatusCard
          title="总终端数"
          value={systemStatus.totalTerminals}
          status="正常运行中"
          icon="📊"
          color="secondary"
        />
        
        <StatusCard
          title="正常状态"
          value={systemStatus.normalTerminals}
          status={`${normalPercentage}%`}
          icon="✅"
          color="success"
        />
        
        <StatusCard
          title="离线状态"
          value={systemStatus.offlineTerminals}
          status="0%"
          icon="📴"
          color="gray-400"
        />
        
        <StatusCard
          title="告警终端"
          value={systemStatus.alarmTerminals}
          status={`${alarmPercentage}%`}
          icon="⚠️"
          color="danger"
        />
      </div>

      {/* 温度和电池状态 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="最高温度"
          value={`${systemStatus.maxTemperature}°C`}
          status="危险"
          icon="🌡️"
          color="danger"
        />
        
        <StatusCard
          title="平均温度"
          value={`${systemStatus.avgTemperature}°C`}
          status="注意"
          icon="🌡️"
          color="warning"
        />
        
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
      </div>

      {/* 系统效率 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="当前效率"
          value={`${systemEfficiency.currentEfficiency}%`}
          status="良好"
          icon="⚡"
          color="success"
        />
        
        <StatusCard
          title="平均效率"
          value={`${systemEfficiency.avgEfficiency}%`}
          status="正常"
          icon="⚡"
          color="secondary"
        />
        
        <StatusCard
          title="最高效率"
          value={`${systemEfficiency.maxEfficiency}%`}
          status="优秀"
          icon="⚡"
          color="info"
        />
      </div>

      {/* 设备健康状态 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
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
        
        <StatusCard
          title="健康评分"
          value={`${deviceHealth.healthScore}%`}
          status="优秀"
          icon="🏥"
          color="info"
        />
      </div>

      {/* 系统运行时间 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <StatusCard
          title="运行天数"
          value={systemUptime.days}
          status="天"
          icon="📅"
          color="secondary"
        />
        
        <StatusCard
          title="运行小时"
          value={systemUptime.hours}
          status="小时"
          icon="⏰"
          color="secondary"
        />
        
        <StatusCard
          title="运行分钟"
          value={systemUptime.minutes}
          status="分钟"
          icon="⏱️"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="card-futuristic hover-glow">
          <TemperatureChart data={temperatureData} labels={temperatureLabels} />
        </div>
        
        <div className="card-futuristic hover-glow">
          <BatteryStatusChart 
            voltageData={batteryVoltageData} 
            currentData={batteryCurrentData} 
            socData={batterySocData} 
            labels={temperatureLabels} 
          />
        </div>
      </div>

      {/* 图表区域 - 第二行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="card-futuristic hover-glow">
          <SystemEfficiencyChart data={efficiencyData} labels={temperatureLabels} />
        </div>
        
        <div className="card-futuristic hover-glow">
          <EnergyConsumptionChart data={energyConsumptionData} labels={temperatureLabels} />
        </div>
      </div>

      {/* 图表区域 - 第三行 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="card-futuristic hover-glow">
          <AlarmChart data={alarmData} />
        </div>
        
        <div className="card-futuristic hover-glow">
          <AlarmHistoryChart data={alarmHistoryData} labels={temperatureLabels} />
        </div>
        
        <div className="card-futuristic hover-glow">
          <DeviceHealthChart 
            healthyDevices={deviceHealth.healthyDevices}
            warningDevices={deviceHealth.warningDevices}
            criticalDevices={deviceHealth.criticalDevices}
          />
        </div>
      </div>

      {/* 异常终端列表 */}
      <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <div className="card-futuristic">
          <AbnormalTerminalList 
            terminals={abnormalTerminals} 
          />
        </div>
      </div>

      {/* 终端详情模态框 */}
      {showTerminalModal && selectedTerminal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-dark-light/80 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl border border-secondary/30 shadow-xl shadow-secondary/10 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neon-blue">终端详情</h2>
              <button 
                className="text-gray-400 hover:text-secondary transition-colors"
                onClick={() => setShowTerminalModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary/70 mb-1">
                    终端ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark/80 border border-secondary/30 rounded-lg text-white"
                    value={selectedTerminal.id}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary/70 mb-1">
                    所属区域
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark/80 border border-secondary/30 rounded-lg text-white"
                    value={selectedTerminal.area}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary/70 mb-1">
                    当前温度
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark/80 border border-secondary/30 rounded-lg text-white"
                    value={`${selectedTerminal.temperature}°C`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary/70 mb-1">
                    状态
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 ${selectedTerminal.status === 'danger' ? 'bg-danger/20 text-danger border-danger/30' : 'bg-warning/20 text-warning border-warning/30'} rounded-lg`}
                    value={selectedTerminal.statusText}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary/70 mb-1">
                  历史温度记录
                </label>
                <div className="bg-dark/80 rounded-lg p-4 h-40 flex items-center justify-center border border-secondary/30">
                  <div className="text-secondary/70">温度历史图表</div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary/70 mb-1">
                  告警历史
                </label>
                <div className="bg-dark/80 rounded-lg p-4 border border-secondary/30">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">温度预警</span>
                      <span className="text-xs text-secondary/70">2026-01-14 15:30:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">温度告警</span>
                      <span className="text-xs text-secondary/70">2026-01-14 16:00:00</span>
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
                className="btn-accent btn-click"
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

export default SystemOverview;