import { useState, useMemo } from 'react';
import TemperatureChart from '../components/dashboard/TemperatureChart';
import BatteryStatusChart from '../components/dashboard/BatteryStatusChart';
import SystemEfficiencyChart from '../components/dashboard/SystemEfficiencyChart';
import EnergyConsumptionChart from '../components/dashboard/EnergyConsumptionChart';
import AlarmChart from '../components/dashboard/AlarmChart';
import DeviceHealthChart from '../components/dashboard/DeviceHealthChart';

/**
 * 可视化监控页面
 * 提供设备状态的可视化展示
 */
const VisualizationMonitoring = () => {
  const [activeTab, setActiveTab] = useState('temperature');
  const [timeRange, setTimeRange] = useState('24h');
  
  // 时间标签
  const timeLabels = useMemo(() => {
    if (timeRange === '24h') {
      return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    } else if (timeRange === '7d') {
      return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    } else {
      return ['1月', '2月', '3月', '4月', '5月', '6月'];
    }
  }, [timeRange]);

  // 温度数据
  const temperatureData = useMemo(() => [38.5, 39.2, 40.1, 42.3, 41.5, 40.8], []);
  
  // 电池状态数据
  const batteryVoltageData = useMemo(() => [52.1, 52.2, 52.3, 52.2, 52.3, 52.4], []);
  const batteryCurrentData = useMemo(() => [15.2, 15.5, 15.7, 15.6, 15.8, 15.7], []);
  const batterySocData = useMemo(() => [78.0, 78.1, 78.3, 78.4, 78.5, 78.5], []);
  const batteryTemperatureData = useMemo(() => [25.1, 25.3, 25.5, 25.6, 25.4, 25.3], []);
  const batteryHealthData = useMemo(() => [95.2, 95.1, 95.1, 95.0, 95.0, 94.9], []);
  const batteryCycleData = useMemo(() => [120, 120, 121, 121, 121, 122], []);
  
  // 系统效率数据
  const efficiencyData = useMemo(() => [88.2, 88.5, 89.0, 89.2, 89.5, 89.4], []);
  const efficiencyBreakdownData = useMemo(() => [
    { name: '转换效率', value: 92.5 },
    { name: '传输损耗', value: 4.2 },
    { name: '其他损耗', value: 3.3 }
  ], []);
  const efficiencyOptimizationData = useMemo(() => [
    { name: '设备维护', impact: 3.2 },
    { name: '软件优化', impact: 2.5 },
    { name: '负载均衡', impact: 1.8 },
    { name: '硬件升级', impact: 4.1 }
  ], []);
  
  // 能耗趋势数据
  const energyConsumptionData = useMemo(() => [120, 135, 142, 150, 145, 138], []);
  
  // 告警类型数据
  const alarmData = useMemo(() => [
    { value: 120, name: '温度告警', color: '#ef4444' },
    { value: 8, name: '电流告警', color: '#f59e0b' },
    { value: 2, name: '电压告警', color: '#10b981' }
  ], []);

  // 设备健康状态数据
  const deviceHealth = useMemo(() => ({
    healthyDevices: 185,
    warningDevices: 10,
    criticalDevices: 5,
    healthScore: 92.5
  }), []);

  // 刷新状态
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 成功消息状态
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // 模拟数据更新延迟
    setTimeout(() => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up">
        <h1 className="text-2xl font-bold">可视化监控</h1>
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
          <select
            className="px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="24h">最近24小时</option>
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
          </select>
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

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'temperature' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('temperature')}
          >
            温度监控
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'battery' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('battery')}
          >
            电池状态
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'efficiency' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('efficiency')}
          >
            系统效率
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'energy' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('energy')}
          >
            能耗监控
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'alarm' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('alarm')}
          >
            告警分析
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'health' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('health')}
          >
            设备健康
          </button>
        </div>

        {/* 温度监控 */}
        {activeTab === 'temperature' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card hover-glow">
              <TemperatureChart data={temperatureData} labels={timeLabels} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">最高温度</h3>
                <div className="text-2xl font-bold text-danger">42.3°C</div>
                <div className="text-sm text-gray-400 mt-1">12:00</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">平均温度</h3>
                <div className="text-2xl font-bold text-warning">40.3°C</div>
                <div className="text-sm text-gray-400 mt-1">过去24小时</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">最低温度</h3>
                <div className="text-2xl font-bold text-success">38.5°C</div>
                <div className="text-sm text-gray-400 mt-1">00:00</div>
              </div>
            </div>
          </div>
        )}

        {/* 电池状态 */}
        {activeTab === 'battery' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card hover-glow">
              <BatteryStatusChart 
                voltageData={batteryVoltageData} 
                currentData={batteryCurrentData} 
                socData={batterySocData} 
                labels={timeLabels} 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电池电压</h3>
                <div className="text-2xl font-bold text-secondary">52.3V</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 50-55V</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电池电流</h3>
                <div className="text-2xl font-bold text-secondary">15.7A</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 0-20A</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">SOC</h3>
                <div className="text-2xl font-bold text-success">78.5%</div>
                <div className="text-sm text-gray-400 mt-1">良好状态</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电池温度</h3>
                <div className="text-2xl font-bold text-info">25.5°C</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 20-30°C</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电池健康度</h3>
                <div className="text-2xl font-bold text-success">95.0%</div>
                <div className="text-sm text-gray-400 mt-1">良好状态</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">循环次数</h3>
                <div className="text-2xl font-bold text-secondary">122次</div>
                <div className="text-sm text-gray-400 mt-1">设计寿命: 1000次</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">电池温度趋势</h3>
                <div className="h-64 bg-dark rounded-lg p-4">
                  <div className="flex flex-col h-full">
                    {timeLabels.map((label, index) => (
                      <div key={label} className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">{label}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">{batteryTemperatureData[index]}°C</span>
                          <div className="w-48 h-2 bg-dark-lighter rounded-full">
                            <div 
                              className="bg-info h-2 rounded-full transition-all duration-500 ease-out" 
                              style={{ 
                                width: `${((batteryTemperatureData[index] - 20) / 10) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">电池健康度趋势</h3>
                <div className="h-64 bg-dark rounded-lg p-4">
                  <div className="flex flex-col h-full">
                    {timeLabels.map((label, index) => (
                      <div key={label} className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">{label}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">{batteryHealthData[index]}%</span>
                          <div className="w-48 h-2 bg-dark-lighter rounded-full">
                            <div 
                              className="bg-success h-2 rounded-full transition-all duration-500 ease-out" 
                              style={{ 
                                width: `${batteryHealthData[index]}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark-light rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">电池状态分析</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">电池健康状态</span>
                    <span className="text-sm font-medium text-success">良好</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '95%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">充电状态</span>
                    <span className="text-sm font-medium text-secondary">正常</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">温度状态</span>
                    <span className="text-sm font-medium text-info">正常</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-info h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '55%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">循环寿命</span>
                    <span className="text-sm font-medium text-secondary">12.2%</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '12.2%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 系统效率 */}
        {activeTab === 'efficiency' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card hover-glow">
              <SystemEfficiencyChart data={efficiencyData} labels={timeLabels} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">当前效率</h3>
                <div className="text-2xl font-bold text-success">89.5%</div>
                <div className="text-sm text-gray-400 mt-1">良好状态</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">平均效率</h3>
                <div className="text-2xl font-bold text-secondary">88.8%</div>
                <div className="text-sm text-gray-400 mt-1">过去24小时</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">最高效率</h3>
                <div className="text-2xl font-bold text-info">89.5%</div>
                <div className="text-sm text-gray-400 mt-1">16:00</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">效率分解</h3>
                <div className="h-64 bg-dark rounded-lg p-4">
                  <div className="flex flex-col h-full">
                    {efficiencyBreakdownData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">{item.name}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">{item.value}%</span>
                          <div className="w-48 h-2 bg-dark-lighter rounded-full">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ease-out ${index === 0 ? 'bg-success' : index === 1 ? 'bg-warning' : 'bg-info'}`} 
                              style={{ 
                                width: `${item.value}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">优化建议</h3>
                <div className="h-64 bg-dark rounded-lg p-4">
                  <div className="flex flex-col h-full">
                    {efficiencyOptimizationData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">{item.name}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">+{item.impact}%</span>
                          <div className="w-48 h-2 bg-dark-lighter rounded-full">
                            <div 
                              className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out" 
                              style={{ 
                                width: `${(item.impact / 5) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark-light rounded-lg p-4">
              <h3 className="text-md font-medium mb-4">系统效率分析</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">转换效率</span>
                    <span className="text-sm font-medium text-success">92.5%</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '92.5%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">传输损耗</span>
                    <span className="text-sm font-medium text-warning">4.2%</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '4.2%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">其他损耗</span>
                    <span className="text-sm font-medium text-info">3.3%</span>
                  </div>
                  <div className="w-full bg-dark-lighter rounded-full h-2">
                    <div 
                      className="bg-info h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: '3.3%' }}
                    ></div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">优化建议</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-success mt-1">✓</span>
                      <span>定期维护设备，减少传输损耗</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-success mt-1">✓</span>
                      <span>优化软件算法，提高转换效率</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-success mt-1">✓</span>
                      <span>实施负载均衡，减少峰值损耗</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-success mt-1">✓</span>
                      <span>考虑硬件升级，提高整体效率</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 能耗监控 */}
        {activeTab === 'energy' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card hover-glow">
              <EnergyConsumptionChart data={energyConsumptionData} labels={timeLabels} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">总能耗</h3>
                <div className="text-2xl font-bold text-secondary">830 kWh</div>
                <div className="text-sm text-gray-400 mt-1">过去24小时</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">最高能耗</h3>
                <div className="text-2xl font-bold text-warning">150 kWh</div>
                <div className="text-sm text-gray-400 mt-1">12:00</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">最低能耗</h3>
                <div className="text-2xl font-bold text-success">120 kWh</div>
                <div className="text-sm text-gray-400 mt-1">00:00</div>
              </div>
            </div>
          </div>
        )}

        {/* 告警分析 */}
        {activeTab === 'alarm' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <AlarmChart data={alarmData} />
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">告警趋势</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">温度告警</span>
                      <span className="text-sm font-medium">120</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-danger h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">电流告警</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-warning h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: '6%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">电压告警</span>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: '2%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 设备健康 */}
        {activeTab === 'health' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <DeviceHealthChart 
                  healthyDevices={deviceHealth.healthyDevices}
                  warningDevices={deviceHealth.warningDevices}
                  criticalDevices={deviceHealth.criticalDevices}
                />
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-4">设备健康评分</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl font-bold text-info">{deviceHealth.healthScore}%</div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400">整体健康状态</span>
                    <span className="text-sm font-medium text-success">优秀</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">健康设备</span>
                      <span className="text-sm font-medium">{deviceHealth.healthyDevices}台</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(deviceHealth.healthyDevices / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">警告设备</span>
                      <span className="text-sm font-medium">{deviceHealth.warningDevices}台</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-warning h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(deviceHealth.warningDevices / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">严重设备</span>
                      <span className="text-sm font-medium">{deviceHealth.criticalDevices}台</span>
                    </div>
                    <div className="w-full bg-dark-lighter rounded-full h-2">
                      <div 
                        className="bg-danger h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(deviceHealth.criticalDevices / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationMonitoring;