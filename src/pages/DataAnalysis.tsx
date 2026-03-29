import { useState, useMemo } from 'react';
import * as echarts from 'echarts';

/**
 * 数据分析页面
 * 提供数据统计和分析功能
 */
const DataAnalysis = () => {
  const [analysisType, setAnalysisType] = useState('performance');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedDevice, setSelectedDevice] = useState('all');
  
  // 性能分析数据
  const performanceData = useMemo(() => ({
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    efficiency: [85.2, 86.5, 87.8, 88.5, 89.2, 89.5],
    uptime: [99.5, 99.6, 99.7, 99.8, 99.9, 99.9],
    responseTime: [120, 115, 110, 105, 100, 95]
  }), []);

  // 能耗分析数据
  const energyData = useMemo(() => ({
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    consumption: [12000, 12500, 13000, 13500, 14000, 14500],
    cost: [12000, 12500, 13000, 13500, 14000, 14500],
    efficiency: [80, 82, 84, 86, 88, 89]
  }), []);

  // 告警分析数据
  const alarmData = useMemo(() => ({
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    highPriority: [5, 4, 6, 3, 4, 5],
    mediumPriority: [10, 12, 8, 11, 9, 10],
    lowPriority: [100, 110, 95, 105, 115, 120]
  }), []);

  // 设备分析数据
  const deviceData = useMemo(() => ({
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    onlineRate: [98, 98.5, 99, 99.2, 99.5, 99.6],
    healthScore: [85, 87, 89, 90, 91, 92.5],
    maintenanceCount: [5, 4, 3, 2, 3, 2]
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

  const handleRunAnalysis = () => {
    // 模拟分析操作
    console.log('运行分析');
    setSuccessMessage('分析完成');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up">
        <h1 className="text-2xl font-bold">数据分析</h1>
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
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="1y">最近1年</option>
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

      {/* 分析类型选择 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${analysisType === 'performance' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAnalysisType('performance')}
          >
            性能分析
          </button>
          <button
            className={`px-4 py-2 ${analysisType === 'energy' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAnalysisType('energy')}
          >
            能耗分析
          </button>
          <button
            className={`px-4 py-2 ${analysisType === 'alarm' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAnalysisType('alarm')}
          >
            告警分析
          </button>
          <button
            className={`px-4 py-2 ${analysisType === 'device' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setAnalysisType('device')}
          >
            设备分析
          </button>
        </div>

        {/* 性能分析 */}
        {analysisType === 'performance' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">系统效率</h3>
                <div className="text-2xl font-bold text-success">89.5%</div>
                <div className="text-sm text-gray-400 mt-1">较上月提升 0.3%</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">运行时间</h3>
                <div className="text-2xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-gray-400 mt-1">较上月提升 0.1%</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">响应时间</h3>
                <div className="text-2xl font-bold text-info">95ms</div>
                <div className="text-sm text-gray-400 mt-1">较上月减少 5ms</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">系统效率趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c}%'
                          },
                          xAxis: {
                            type: 'category',
                            data: performanceData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '效率 (%)',
                            min: 80,
                            max: 95,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '系统效率',
                              type: 'bar',
                              data: performanceData.efficiency,
                              itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  { offset: 0, color: '#ff4d4f' },
                                  { offset: 1, color: '#ff7a45' }
                                ]),
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(255, 77, 79, 0.5)'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">运行时间趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c}%'
                          },
                          xAxis: {
                            type: 'category',
                            data: performanceData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '运行时间 (%)',
                            min: 99,
                            max: 100,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '运行时间',
                              type: 'bar',
                              data: performanceData.uptime,
                              itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  { offset: 0, color: '#52c41a' },
                                  { offset: 1, color: '#73d13d' }
                                ]),
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(82, 196, 26, 0.5)'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card hover-glow">
              <div className="p-4">
                <h3 className="text-md font-medium mb-4">响应时间趋势</h3>
                <div className="h-64">
                  <div ref={(ref) => {
                    if (ref) {
                      const chart = echarts.init(ref);
                      const option = {
                        tooltip: {
                          trigger: 'axis',
                          formatter: '{b}: {c}ms'
                        },
                        xAxis: {
                          type: 'category',
                          data: performanceData.labels,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        yAxis: {
                          type: 'value',
                          name: '响应时间 (ms)',
                          min: 90,
                          max: 130,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        series: [
                          {
                            name: '响应时间',
                            type: 'line',
                            data: performanceData.responseTime,
                            lineStyle: {
                              width: 4,
                              color: '#1890ff',
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 5,
                              shadowColor: 'rgba(24, 144, 255, 0.5)'
                            },
                            itemStyle: {
                              color: '#1890ff'
                            }
                          }
                        ]
                      };
                      chart.setOption(option);
                      window.addEventListener('resize', () => chart.resize());
                    }
                  }} className="w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 能耗分析 */}
        {analysisType === 'energy' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">总能耗</h3>
                <div className="text-2xl font-bold text-secondary">14500 kWh</div>
                <div className="text-sm text-gray-400 mt-1">较上月增加 500 kWh</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">能耗成本</h3>
                <div className="text-2xl font-bold text-warning">¥14500</div>
                <div className="text-sm text-gray-400 mt-1">较上月增加 ¥500</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">能耗效率</h3>
                <div className="text-2xl font-bold text-success">89%</div>
                <div className="text-sm text-gray-400 mt-1">较上月提升 1%</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">能耗趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c} kWh'
                          },
                          xAxis: {
                            type: 'category',
                            data: energyData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '能耗 (kWh)',
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '能耗',
                              type: 'bar',
                              data: energyData.consumption,
                              itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  { offset: 0, color: '#1890ff' },
                                  { offset: 1, color: '#40a9ff' }
                                ]),
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(24, 144, 255, 0.5)'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">能耗成本趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: ¥{c}'
                          },
                          xAxis: {
                            type: 'category',
                            data: energyData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '成本 (¥)',
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '能耗成本',
                              type: 'bar',
                              data: energyData.cost,
                              itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  { offset: 0, color: '#faad14' },
                                  { offset: 1, color: '#ffd591' }
                                ]),
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(250, 173, 20, 0.5)'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card hover-glow">
              <div className="p-4">
                <h3 className="text-md font-medium mb-4">能耗效率趋势</h3>
                <div className="h-64">
                  <div ref={(ref) => {
                    if (ref) {
                      const chart = echarts.init(ref);
                      const option = {
                        tooltip: {
                          trigger: 'axis',
                          formatter: '{b}: {c}%'
                        },
                        xAxis: {
                          type: 'category',
                          data: energyData.labels,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        yAxis: {
                          type: 'value',
                          name: '效率 (%)',
                          min: 75,
                          max: 95,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        series: [
                          {
                            name: '能耗效率',
                            type: 'line',
                            data: energyData.efficiency,
                            lineStyle: {
                              width: 4,
                              color: '#52c41a',
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 5,
                              shadowColor: 'rgba(82, 196, 26, 0.5)'
                            },
                            itemStyle: {
                              color: '#52c41a'
                            }
                          }
                        ]
                      };
                      chart.setOption(option);
                      window.addEventListener('resize', () => chart.resize());
                    }
                  }} className="w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 告警分析 */}
        {analysisType === 'alarm' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">高优先级告警</h3>
                <div className="text-2xl font-bold text-danger">5</div>
                <div className="text-sm text-gray-400 mt-1">较上月增加 1</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">中优先级告警</h3>
                <div className="text-2xl font-bold text-warning">10</div>
                <div className="text-sm text-gray-400 mt-1">较上月减少 1</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">低优先级告警</h3>
                <div className="text-2xl font-bold text-info">120</div>
                <div className="text-sm text-gray-400 mt-1">较上月增加 5</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">告警趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis'
                          },
                          legend: {
                            data: ['高优先级', '中优先级', '低优先级'],
                            textStyle: {
                              color: '#ffffff'
                            }
                          },
                          xAxis: {
                            type: 'category',
                            data: alarmData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '告警数量',
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '高优先级',
                              type: 'bar',
                              data: alarmData.highPriority,
                              itemStyle: {
                                color: '#ff4d4f'
                              }
                            },
                            {
                              name: '中优先级',
                              type: 'bar',
                              data: alarmData.mediumPriority,
                              itemStyle: {
                                color: '#faad14'
                              }
                            },
                            {
                              name: '低优先级',
                              type: 'bar',
                              data: alarmData.lowPriority,
                              itemStyle: {
                                color: '#1890ff'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">告警类型分布</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                          },
                          legend: {
                            orient: 'vertical',
                            left: 'left',
                            textStyle: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '告警类型',
                              type: 'pie',
                              radius: '60%',
                              center: ['50%', '50%'],
                              data: [
                                { value: 5, name: '高优先级' },
                                { value: 10, name: '中优先级' },
                                { value: 120, name: '低优先级' }
                              ],
                              itemStyle: {
                                color: function(params: any) {
                                  const colors = ['#ff4d4f', '#faad14', '#1890ff'];
                                  return colors[params.dataIndex];
                                }
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card hover-glow">
              <div className="p-4">
                <h3 className="text-md font-medium mb-4">告警处理效率</h3>
                <div className="h-64">
                  <div ref={(ref) => {
                    if (ref) {
                      const chart = echarts.init(ref);
                      const option = {
                        tooltip: {
                          trigger: 'axis',
                          formatter: '{b}: {c}%'
                        },
                        xAxis: {
                          type: 'category',
                          data: alarmData.labels,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        yAxis: {
                          type: 'value',
                          name: '处理效率 (%)',
                          min: 80,
                          max: 100,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        series: [
                          {
                            name: '处理效率',
                            type: 'line',
                            data: [85, 88, 90, 92, 94, 95],
                            lineStyle: {
                              width: 4,
                              color: '#722ed1',
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 5,
                              shadowColor: 'rgba(114, 46, 209, 0.5)'
                            },
                            itemStyle: {
                              color: '#722ed1'
                            }
                          }
                        ]
                      };
                      chart.setOption(option);
                      window.addEventListener('resize', () => chart.resize());
                    }
                  }} className="w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 设备分析 */}
        {analysisType === 'device' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">设备在线率</h3>
                <div className="text-2xl font-bold text-success">99.6%</div>
                <div className="text-sm text-gray-400 mt-1">较上月提升 0.1%</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">设备健康评分</h3>
                <div className="text-2xl font-bold text-info">92.5%</div>
                <div className="text-sm text-gray-400 mt-1">较上月提升 1.5%</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">维护次数</h3>
                <div className="text-2xl font-bold text-secondary">2</div>
                <div className="text-sm text-gray-400 mt-1">较上月减少 1</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">设备在线率趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c}%'
                          },
                          xAxis: {
                            type: 'category',
                            data: deviceData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '在线率 (%)',
                            min: 97,
                            max: 100,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '设备在线率',
                              type: 'line',
                              data: deviceData.onlineRate,
                              lineStyle: {
                                width: 4,
                                color: '#13c2c2',
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(19, 194, 194, 0.5)'
                              },
                              itemStyle: {
                                color: '#13c2c2'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
              <div className="card hover-glow">
                <div className="p-4">
                  <h3 className="text-md font-medium mb-4">设备健康评分趋势</h3>
                  <div className="h-64">
                    <div ref={(ref) => {
                      if (ref) {
                        const chart = echarts.init(ref);
                        const option = {
                          tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c}%'
                          },
                          xAxis: {
                            type: 'category',
                            data: deviceData.labels,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          yAxis: {
                            type: 'value',
                            name: '健康评分 (%)',
                            min: 80,
                            max: 95,
                            axisLabel: {
                              color: '#ffffff'
                            }
                          },
                          series: [
                            {
                              name: '健康评分',
                              type: 'line',
                              data: deviceData.healthScore,
                              lineStyle: {
                                width: 4,
                                color: '#52c41a',
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(82, 196, 26, 0.5)'
                              },
                              itemStyle: {
                                color: '#52c41a'
                              }
                            }
                          ]
                        };
                        chart.setOption(option);
                        window.addEventListener('resize', () => chart.resize());
                      }
                    }} className="w-full h-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card hover-glow">
              <div className="p-4">
                <h3 className="text-md font-medium mb-4">维护次数趋势</h3>
                <div className="h-64">
                  <div ref={(ref) => {
                    if (ref) {
                      const chart = echarts.init(ref);
                      const option = {
                        tooltip: {
                          trigger: 'axis',
                          formatter: '{b}: {c}次'
                        },
                        xAxis: {
                          type: 'category',
                          data: deviceData.labels,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        yAxis: {
                          type: 'value',
                          name: '维护次数',
                          min: 0,
                          max: 6,
                          axisLabel: {
                            color: '#ffffff'
                          }
                        },
                        series: [
                          {
                            name: '维护次数',
                            type: 'bar',
                            data: deviceData.maintenanceCount,
                            itemStyle: {
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#722ed1' },
                                { offset: 1, color: '#9254de' }
                              ]),
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowOffsetY: 5,
                              shadowColor: 'rgba(114, 46, 209, 0.5)'
                            }
                          }
                        ]
                      };
                      chart.setOption(option);
                      window.addEventListener('resize', () => chart.resize());
                    }
                  }} className="w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 分析操作 */}
        <div className="mt-6 flex justify-end space-x-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={handleRunAnalysis}
            className="btn-primary flex items-center space-x-2 btn-click"
          >
            <span>📊</span>
            <span>运行分析</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;