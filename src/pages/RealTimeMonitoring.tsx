import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import TimeSeriesChart from '../components/dashboard/TimeSeriesChart';
import CameraMonitoring from '../components/dashboard/CameraMonitoring';

// 动态导入数据库函数
const importDatabaseFunctions = async () => {
  const databaseModule = await import('../utils/database');
  return {
    getAreaTemperatures: databaseModule.getAreaTemperatures,
    getTerminals: databaseModule.getTerminals,
    getCameras: databaseModule.getCameras,
    getAlerts: databaseModule.getAlerts,
    getRecordings: databaseModule.getRecordings,
    getSystemParameters: databaseModule.getSystemParameters
  };
};

const RealTimeMonitoring = () => {
  // 状态管理
  const [temperatureData, setTemperatureData] = useState({ areas: [] });
  const [cameraData, setCameraData] = useState({ cameras: [], alerts: [], recordings: [] });
  const [abnormalTerminals, setAbnormalTerminals] = useState([]);
  const [systemParameters, setSystemParameters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 从数据库获取数据
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // 动态导入数据库函数
      const db = await importDatabaseFunctions();
      
      // 获取区域温度数据
      const areas = await db.getAreaTemperatures();
      setTemperatureData({ areas: areas.map((area: any) => ({
        name: area.name,
        avgTemp: area.avgTemp,
        maxTemp: area.maxTemp,
        status: area.status
      })) });

      // 获取摄像头数据
      const cameras = await db.getCameras();
      const alerts = await db.getAlerts();
      const recordings = await db.getRecordings();
      setCameraData({ 
        cameras: cameras.map((camera: any) => ({
          id: camera.id,
          name: camera.name,
          status: camera.status,
          location: camera.location,
          streamUrl: camera.streamUrl,
          hasInfrared: camera.hasInfrared === 1,
          infraredStatus: camera.infraredStatus
        })),
        alerts: alerts.map((alert: any) => ({
          id: alert.id,
          level: alert.level,
          message: alert.message,
          location: alert.location,
          timestamp: alert.timestamp
        })),
        recordings: recordings.map((recording: any) => ({
          id: recording.id,
          cameraId: recording.cameraId,
          cameraName: recording.cameraName,
          startTime: recording.startTime,
          endTime: recording.endTime,
          duration: recording.duration,
          fileSize: recording.fileSize
        }))
      });

      // 获取异常终端数据
      const terminals = await db.getTerminals();
      setAbnormalTerminals(terminals);

      // 获取系统参数
      const params = await db.getSystemParameters();
      const paramsMap: any = {};
      params.forEach((param: any) => {
        paramsMap[param.parameter] = { value: param.value, unit: param.unit };
      });
      setSystemParameters(paramsMap);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchData();
    
    // 每5秒更新一次数据
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // 生成初始时间序列数据
  const generateInitialData = (count: number, base: number, range: number) => {
    return Array.from({ length: count }, (_, i) => {
      const now = new Date();
      now.setMinutes(now.getMinutes() - (count - i));
      return {
        time: now.toLocaleTimeString(),
        value: base + Math.random() * range
      };
    });
  };

  // 时间序列数据状态
  const [timeSeriesData, setTimeSeriesData] = useState({
    temperature: [],
    power: []
  });

  // 初始化时间序列数据
  useEffect(() => {
    setTimeSeriesData({
      temperature: generateInitialData(20, 35, 10),
      power: generateInitialData(20, 30, 20)
    });
  }, []);

  // 存储ECharts实例
  let thermalChart: echarts.ECharts | null = null;

  const initThermalMap = () => {
    const chartDom = document.getElementById('thermalMap');
    if (!chartDom) return;
    
    // 销毁已存在的实例
    if (thermalChart) {
      thermalChart.dispose();
    }
    
    thermalChart = echarts.init(chartDom);
    
    // 模拟温度场数据
    const data = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        // 生成模拟温度数据，中心区域温度较高
        const distance = Math.sqrt(Math.pow(i - 10, 2) + Math.pow(j - 10, 2));
        let temp = 35 + (20 - distance) * 1.5;
        // 添加一些随机波动
        temp += Math.random() * 2 - 1;
        data.push([j, i, temp]);
      }
    }
    
    thermalChart.setOption({
      title: {
        text: '母排温度场分布',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        position: 'top',
        formatter: function (params: { value: number[] }) {
          return `位置: (${params.value[0]}, ${params.value[1]})<br/>温度: ${params.value[2].toFixed(1)}°C`;
        }
      },
      grid: {
        height: '60%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 20 }, (_, i) => i.toString()),
        splitArea: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#475569'
          }
        },
        axisLabel: {
          color: '#94a3b8'
        }
      },
      yAxis: {
        type: 'category',
        data: Array.from({ length: 20 }, (_, i) => i.toString()),
        splitArea: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#475569'
          }
        },
        axisLabel: {
          color: '#94a3b8'
        }
      },
      visualMap: {
        min: 30,
        max: 60,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        inRange: {
          color: ['#10b981', '#f59e0b', '#ef4444']
        }
      },
      series: [{
        name: '温度',
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });

    // 响应式调整
    const resizeHandler = () => {
      thermalChart?.resize();
    };
    window.addEventListener('resize', resizeHandler);
    
    // 返回清理函数
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (thermalChart) {
        thermalChart.dispose();
        thermalChart = null;
      }
    };
  };

  useEffect(() => {
    // 初始化温度场热力图
    const cleanup = initThermalMap();
    
    // 组件卸载时清理
    return cleanup;
  }, []);

  // 实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(prev => {
        const now = new Date().toLocaleTimeString();
        
        // 更新温度数据
        const newTemperatureData = [...prev.temperature.slice(1), {
          time: now,
          value: 35 + Math.random() * 10
        }];
        
        // 更新功率数据
        const newPowerData = [...prev.power.slice(1), {
          time: now,
          value: 30 + Math.random() * 20
        }];
        
        return {
          temperature: newTemperatureData,
          power: newPowerData
        };
      });
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">实时监控</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
            刷新
          </button>
          <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
            导出数据
          </button>
        </div>
      </div>

      {/* 区域状态分布 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {temperatureData.areas.map((area, index) => (
          <div key={index} className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className="font-medium">{area.name}</h3>
              <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${area.status === 'normal' ? 'bg-success/20 text-success' : area.status === 'warning' ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'}`}>
                {area.status === 'normal' ? '正常' : area.status === 'warning' ? '预警' : '告警'}
              </span>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="text-gray-400 text-sm">平均温度</div>
                <div className="text-lg font-bold">{area.avgTemp}°C</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">最高温度</div>
                <div className="text-lg font-bold">{area.maxTemp}°C</div>
              </div>
            </div>
            <div className="mt-3 md:mt-4 h-2 bg-dark-light rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${area.maxTemp < 45 ? 'bg-success' : area.maxTemp < 55 ? 'bg-warning' : 'bg-danger'}`}
                style={{ width: `${(area.maxTemp / 70) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* 温度场热力图 */}
      <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
        <div id="thermalMap" className="w-full h-64 md:h-96"></div>
      </div>

      {/* 运行参数仪表盘 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
          <h2 className="text-lg font-semibold mb-4 md:mb-6">电气参数</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">电压 (V)</div>
              <div className="text-2xl font-bold">{systemParameters['电压']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">电流 (A)</div>
              <div className="text-2xl font-bold">{systemParameters['电流']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">功率 (kW)</div>
              <div className="text-2xl font-bold">{systemParameters['功率']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">功率因数</div>
              <div className="text-2xl font-bold">{systemParameters['功率因数']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
          </div>
        </div>

        <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
          <h2 className="text-lg font-semibold mb-4 md:mb-6">环境参数</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">环境温度 (°C)</div>
              <div className="text-2xl font-bold">{systemParameters['环境温度']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">湿度 (%)</div>
              <div className="text-2xl font-bold">{systemParameters['湿度']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">气压 (hPa)</div>
              <div className="text-2xl font-bold">{systemParameters['气压']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="text-gray-400 text-sm">烟雾浓度</div>
              <div className="text-2xl font-bold">{systemParameters['烟雾浓度']?.value || '0'}</div>
              <div className="text-success text-sm">正常</div>
            </div>
          </div>
        </div>
      </div>

      {/* 时间序列数据图表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
          <TimeSeriesChart 
            data={timeSeriesData.temperature} 
            title="温度变化趋势" 
            yAxisName="温度 (°C)" 
          />
        </div>
        <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
          <TimeSeriesChart 
            data={timeSeriesData.power} 
            title="功率变化趋势" 
            yAxisName="功率 (kW)" 
          />
        </div>
      </div>

      {/* 摄像头监控 */}
      <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
        <h2 className="text-lg font-semibold mb-4 md:mb-6">变电站摄像头监控</h2>
        <CameraMonitoring data={cameraData} />
      </div>

      {/* 异常终端列表 */}
      <div className="bg-dark rounded-lg p-4 md:p-6 border border-dark-lighter">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg font-semibold">异常终端列表</h2>
          <span className="text-danger font-medium">{abnormalTerminals.length}个</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-lighter">
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">终端ID</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">区域</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">温度 (°C)</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">状态</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">时间</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              {abnormalTerminals.map((terminal: any) => (
                <tr key={terminal.id} className="border-b border-dark-lighter">
                  <td className="py-3 md:py-4 px-4 md:px-6">{terminal.id}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6">{terminal.area}</td>
                  <td className={`py-3 md:py-4 px-4 md:px-6 ${terminal.status === 'danger' ? 'text-danger' : 'text-warning'}`}>
                    {terminal.temperature}
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    <span className={`px-2 md:px-3 py-1 ${terminal.status === 'danger' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'} rounded-full text-xs`}>
                      {terminal.statusText}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    {new Date(terminal.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    <button className="text-secondary hover:underline">查看</button>
                  </td>
                </tr>
              ))}
              {abnormalTerminals.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    暂无异常终端
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;