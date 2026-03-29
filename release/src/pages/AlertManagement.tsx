import { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';

const AlertManagement = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [searchParams, setSearchParams] = useState({
    startTime: '2025-01-13',
    endTime: '2026-01-14',
    level: '全部级别',
    status: '全部状态'
  });
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlertProcessModal, setShowAlertProcessModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      time: '2026-01-14 17:03:22',
      level: '紧急',
      content: '母排温度过高',
      area: '1-10MWh电池阵列A区',
      terminalId: 'T182',
      status: '未处理'
    },
    {
      id: '2',
      time: '2026-01-14 17:02:15',
      level: '严重',
      content: '电池温度异常',
      area: '1-10MWh电池阵列B区',
      terminalId: 'T006',
      status: '未处理'
    },
    {
      id: '3',
      time: '2026-01-14 17:01:08',
      level: '警告',
      content: '温度上升趋势明显',
      area: '户外动力区',
      terminalId: 'T005',
      status: '未处理'
    },
    {
      id: '4',
      time: '2026-01-14 16:59:33',
      level: '信息',
      content: '设备状态正常',
      area: '1-10MWh电池阵列C区',
      terminalId: 'T003',
      status: '已处理'
    }
  ]);

  // 图表实例引用
  const chartInstances = useRef<{ [key: string]: echarts.ECharts | null }>({});
  const resizeHandlers = useRef<{ [key: string]: () => void }>({});

  // 初始化图表的通用函数
  const initChart = (chartId: string, options: echarts.EChartsOption) => {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) return;

    // 检查是否已经存在图表实例，如果存在则先销毁
    const existingInstance = echarts.getInstanceByDom(chartDom);
    if (existingInstance) {
      existingInstance.dispose();
    }

    const chart = echarts.init(chartDom);
    chartInstances.current[chartId] = chart;
    chart.setOption(options);

    const handleResize = () => {
      chart.resize();
    };

    resizeHandlers.current[chartId] = handleResize;
    window.addEventListener('resize', handleResize);
  };

  useEffect(() => {
    // 当activeTab变化时初始化图表
    if (activeTab === 'current') {
      initAlertStatsChart();
    } else if (activeTab === 'statistics') {
      initAlertTrendChart();
      initAlertLevelChart();
      initAlertSourceChart();
      initProcessingTimeChart();
    }

    return () => {
      // 清理图表实例和事件监听器
      Object.entries(chartInstances.current).forEach(([key, instance]) => {
        if (instance) {
          instance.dispose();
        }
        if (resizeHandlers.current[key]) {
          window.removeEventListener('resize', resizeHandlers.current[key]);
        }
      });
      chartInstances.current = {};
      resizeHandlers.current = {};
    };
  }, [activeTab]);

  const initAlertStatsChart = () => {
    const options: echarts.EChartsOption = {
      title: {
        text: '告警统计',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#94a3b8'
        }
      },
      series: [
        {
          name: '告警级别',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 120, name: '信息', itemStyle: { color: '#6366f1' } },
            { value: 30, name: '警告', itemStyle: { color: '#f59e0b' } },
            { value: 15, name: '严重', itemStyle: { color: '#ef4444' } },
            { value: 8, name: '紧急', itemStyle: { color: '#f43f5e' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#1e293b',
            borderWidth: 2
          },
          label: {
            color: '#94a3b8'
          }
        }
      ]
    };

    initChart('alertStatsChart', options);
  };

  const initAlertTrendChart = () => {
    const options: echarts.EChartsOption = {
      title: {
        text: '',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['信息', '警告', '严重', '紧急'],
        textStyle: {
          color: '#94a3b8'
        }
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLabel: {
          color: '#94a3b8'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#94a3b8'
        }
      },
      series: [
        {
          name: '信息',
          type: 'line',
          data: [20, 30, 25, 35, 40, 30],
          itemStyle: { color: '#6366f1' },
          lineStyle: { width: 2 }
        },
        {
          name: '警告',
          type: 'line',
          data: [5, 8, 10, 7, 12, 9],
          itemStyle: { color: '#f59e0b' },
          lineStyle: { width: 2 }
        },
        {
          name: '严重',
          type: 'line',
          data: [3, 5, 4, 6, 3, 5],
          itemStyle: { color: '#ef4444' },
          lineStyle: { width: 2 }
        },
        {
          name: '紧急',
          type: 'line',
          data: [1, 2, 1, 3, 2, 1],
          itemStyle: { color: '#f43f5e' },
          lineStyle: { width: 2 }
        }
      ]
    };

    initChart('alertTrendChart', options);
  };

  const initAlertLevelChart = () => {
    const options: echarts.EChartsOption = {
      title: {
        text: '',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#94a3b8'
        }
      },
      series: [
        {
          name: '告警级别',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 120, name: '信息', itemStyle: { color: '#6366f1' } },
            { value: 30, name: '警告', itemStyle: { color: '#f59e0b' } },
            { value: 15, name: '严重', itemStyle: { color: '#ef4444' } },
            { value: 8, name: '紧急', itemStyle: { color: '#f43f5e' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#1e293b',
            borderWidth: 2
          },
          label: {
            color: '#94a3b8'
          }
        }
      ]
    };

    initChart('alertLevelChart', options);
  };

  const initAlertSourceChart = () => {
    const options: echarts.EChartsOption = {
      title: {
        text: '',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['温度传感器', '电流传感器', '电压传感器', '湿度传感器', '其他'],
        axisLabel: {
          color: '#94a3b8'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#94a3b8'
        }
      },
      series: [
        {
          name: '告警数量',
          type: 'bar',
          data: [65, 45, 30, 20, 15],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#1890ff' },
              { offset: 1, color: '#40a9ff' }
            ])
          }
        }
      ]
    };

    initChart('alertSourceChart', options);
  };

  const initProcessingTimeChart = () => {
    const options: echarts.EChartsOption = {
      title: {
        text: '',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['信息', '警告', '严重', '紧急'],
        axisLabel: {
          color: '#94a3b8'
        }
      },
      yAxis: {
        type: 'value',
        name: '处理时间 (分钟)',
        axisLabel: {
          color: '#94a3b8'
        }
      },
      series: [
        {
          name: '平均处理时间',
          type: 'bar',
          data: [5, 10, 20, 30],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#52c41a' },
              { offset: 1, color: '#73d13d' }
            ])
          }
        }
      ]
    };

    initChart('processingTimeChart', options);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('搜索参数:', searchParams);
    setSuccessMessage('搜索完成');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleAlertProcess = (alertId: string) => {
    const alertInfo = alerts.find(alert => alert.id === alertId);
    if (alertInfo) {
      setSelectedAlert(alertInfo);
      setShowAlertProcessModal(true);
    }
  };

  const handleAddRule = () => {
    setShowRuleModal(true);
  };

  const handleAddNotification = () => {
    setShowNotificationModal(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
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
    console.log('导出告警数据');
    setSuccessMessage('导出成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">告警管理</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center space-x-2 btn-click transition-all duration-300 hover:bg-secondary/20 hover:shadow-lg hover:shadow-secondary/10 hover:scale-105"
          >
            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
            <span>{isRefreshing ? '刷新中...' : '刷新'}</span>
          </button>
          <button 
            onClick={handleExport}
            className="btn-secondary flex items-center space-x-2 btn-click transition-all duration-300 hover:bg-secondary/20 hover:shadow-lg hover:shadow-secondary/10 hover:scale-105"
          >
            <span>📤</span>
            <span>导出</span>
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-success/20 text-success px-4 py-2 rounded-lg border border-success/40 shadow-lg z-50 animate-scaleIn">
          <div className="flex items-center space-x-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex border-b border-dark-lighter overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'current' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('current')}
          >
            当前告警
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'history' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            历史告警
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'rules' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('rules')}
          >
            告警规则
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'notifications' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('notifications')}
          >
            通知设置
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'process' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('process')}
          >
            处理流程
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'correlation' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('correlation')}
          >
            关联分析
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'suppression' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('suppression')}
          >
            抑制规则
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${activeTab === 'statistics' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('statistics')}
          >
            统计分析
          </button>
        </div>

        {activeTab === 'current' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div className="bg-dark rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark/80 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-white">173</div>
                  <div className="text-gray-400 text-sm">总告警</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark/80 hover:shadow-lg hover:shadow-info/10 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-info">120</div>
                  <div className="text-gray-400 text-sm">信息</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark/80 hover:shadow-lg hover:shadow-warning/10 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-warning">30</div>
                  <div className="text-gray-400 text-sm">警告</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark/80 hover:shadow-lg hover:shadow-danger/10 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-danger">15</div>
                  <div className="text-gray-400 text-sm">严重</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark/80 hover:shadow-lg hover:shadow-error/10 hover:-translate-y-1">
                  <div className="text-2xl font-bold text-error">8</div>
                  <div className="text-gray-400 text-sm">紧急</div>
                </div>
              </div>
              <div id="alertStatsChart" className="w-full h-80"></div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">当前告警列表</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">告警时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">告警级别</th>
                      <th className="text-left py-3 px-4 text-gray-400">告警内容</th>
                      <th className="text-left py-3 px-4 text-gray-400">区域</th>
                      <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert) => {
                      let levelClass = '';
                      if (alert.level === '紧急') {
                        levelClass = 'bg-error/20 text-error';
                      } else if (alert.level === '严重') {
                        levelClass = 'bg-danger/20 text-danger';
                      } else if (alert.level === '警告') {
                        levelClass = 'bg-warning/20 text-warning';
                      } else {
                        levelClass = 'bg-info/20 text-info';
                      }

                      let statusClass = '';
                      if (alert.status === '未处理') {
                        statusClass = 'bg-warning/20 text-warning';
                      } else {
                        statusClass = 'bg-success/20 text-success';
                      }

                      return (
                        <tr key={alert.id} className="border-b border-dark-lighter transition-all duration-200 hover:bg-dark/50">
                          <td className="py-3 px-4">{alert.time}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 ${levelClass} rounded-full text-xs`}>{alert.level}</span>
                          </td>
                          <td className="py-3 px-4">{alert.content}</td>
                          <td className="py-3 px-4">{alert.area}</td>
                          <td className="py-3 px-4">{alert.terminalId}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 ${statusClass} rounded-full text-xs`}>{alert.status}</span>
                          </td>
                          <td className="py-3 px-4">
                            <button 
                              className="btn-secondary text-xs px-2 py-1 btn-click transition-all duration-200 hover:scale-105"
                              onClick={() => handleAlertProcess(alert.id)}
                            >
                              {alert.status === '未处理' ? '处理' : '查看'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'rules' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">告警规则管理</h2>
                <button 
                  className="btn-primary flex items-center space-x-2 btn-click"
                  onClick={handleAddRule}
                >
                  <span>➕</span>
                  <span>添加规则</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">温度告警规则</div>
                      <div className="text-xs text-gray-400">适用于所有温度传感器</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">信息阈值</div>
                      <div>45°C - 55°C</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">警告阈值</div>
                      <div>55°C - 65°C</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">严重阈值</div>
                      <div>65°C - 75°C</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">紧急阈值</div>
                      <div>75°C 以上</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">检测频率</div>
                      <div>5秒</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">电流告警规则</div>
                      <div className="text-xs text-gray-400">适用于所有电流传感器</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">信息阈值</div>
                      <div>10A - 15A</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">警告阈值</div>
                      <div>15A - 20A</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">严重阈值</div>
                      <div>20A - 25A</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">紧急阈值</div>
                      <div>25A 以上</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">检测频率</div>
                      <div>5秒</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">电压告警规则</div>
                      <div className="text-xs text-gray-400">适用于所有电压传感器</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">信息阈值</div>
                      <div>48V - 52V</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">警告阈值</div>
                      <div>52V - 55V</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">严重阈值</div>
                      <div>55V - 58V</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">紧急阈值</div>
                      <div>58V 以上</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">检测频率</div>
                      <div>5秒</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'notifications' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">告警通知设置</h2>
                <button 
                  className="btn-primary flex items-center space-x-2 btn-click"
                  onClick={handleAddNotification}
                >
                  <span>➕</span>
                  <span>添加通知</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">邮件通知</div>
                      <div className="text-xs text-gray-400">发送告警邮件到指定邮箱</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">接收邮箱</div>
                      <div>admin@system.com, tech@system.com</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">告警级别</div>
                      <div>严重, 紧急</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">通知频率</div>
                      <div>实时</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">短信通知</div>
                      <div className="text-xs text-gray-400">发送告警短信到指定手机号</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">接收手机号</div>
                      <div>138****1234, 139****5678</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">告警级别</div>
                      <div>紧急</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">通知频率</div>
                      <div>实时</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">系统内通知</div>
                      <div className="text-xs text-gray-400">在系统内显示告警通知</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">接收用户</div>
                      <div>系统管理员, 技术主管</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">告警级别</div>
                      <div>全部</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">通知频率</div>
                      <div>实时</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'process' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">告警处理流程</h2>
              <div className="bg-dark rounded-lg p-6 border border-dark-lighter">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-info flex items-center justify-center mb-2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">告警触发</div>
                      <div className="text-xs text-gray-400">系统检测到异常</div>
                    </div>
                  </div>
                  <div className="hidden md:block w-16 h-1 bg-gray-600"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center mb-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">通知发送</div>
                      <div className="text-xs text-gray-400">发送告警通知给相关人员</div>
                    </div>
                  </div>
                  <div className="hidden md:block w-16 h-1 bg-gray-600"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-danger flex items-center justify-center mb-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">告警处理</div>
                      <div className="text-xs text-gray-400">相关人员处理告警</div>
                    </div>
                  </div>
                  <div className="hidden md:block w-16 h-1 bg-gray-600"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center mb-2">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">告警关闭</div>
                      <div className="text-xs text-gray-400">处理完成后关闭告警</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-md font-medium mb-4">处理流程详情</h3>
                  <div className="space-y-4">
                    <div className="bg-dark-light rounded-lg p-4">
                      <div className="font-medium mb-2">信息级别告警</div>
                      <div className="text-sm text-gray-300">系统自动记录，无需人工处理</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4">
                      <div className="font-medium mb-2">警告级别告警</div>
                      <div className="text-sm text-gray-300">系统发送通知，技术人员关注并评估</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4">
                      <div className="font-medium mb-2">严重级别告警</div>
                      <div className="text-sm text-gray-300">系统发送通知，技术人员必须处理，2小时内完成</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4">
                      <div className="font-medium mb-2">紧急级别告警</div>
                      <div className="text-sm text-gray-300">系统发送通知，技术人员立即处理，30分钟内完成</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'correlation' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">告警关联分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-3">关联分析设置</h3>
                  <div className="bg-dark rounded-lg p-4 border border-dark-lighter space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        分析时间范围
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      >
                        <option value="24h">最近24小时</option>
                        <option value="7d">最近7天</option>
                        <option value="30d">最近30天</option>
                        <option value="custom">自定义</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        告警级别
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      >
                        <option value="all">全部级别</option>
                        <option value="warning">警告及以上</option>
                        <option value="critical">严重及以上</option>
                        <option value="emergency">仅紧急</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        关联阈值
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value="70"
                        className="w-full h-2 bg-dark-lighter rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>低</span>
                        <span>70%</span>
                        <span>高</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="btn-primary px-4 py-2 btn-click">
                        分析
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-3">关联分析结果</h3>
                  <div className="bg-dark rounded-lg p-4 border border-dark-lighter space-y-4">
                    <div className="h-64 bg-dark-light rounded-lg flex items-center justify-center">
                      <div className="text-gray-400">关联分析图表</div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-dark-light rounded-lg p-3">
                        <div className="font-medium mb-1">关联组 1</div>
                        <div className="text-sm text-gray-300">温度告警与电流告警关联度: 85%</div>
                        <div className="text-xs text-gray-400 mt-1">涉及设备: T001, T002, T182</div>
                      </div>
                      <div className="bg-dark-light rounded-lg p-3">
                        <div className="font-medium mb-1">关联组 2</div>
                        <div className="text-sm text-gray-300">电压告警与温度告警关联度: 72%</div>
                        <div className="text-xs text-gray-400 mt-1">涉及设备: T005, T006, T190</div>
                      </div>
                      <div className="bg-dark-light rounded-lg p-3">
                        <div className="font-medium mb-1">关联组 3</div>
                        <div className="text-sm text-gray-300">湿度告警与温度告警关联度: 65%</div>
                        <div className="text-xs text-gray-400 mt-1">涉及设备: T010, T011, T012</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'suppression' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">告警抑制规则</h2>
                <button className="btn-primary flex items-center space-x-2 btn-click">
                  <span>➕</span>
                  <span>添加规则</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">温度告警抑制</div>
                      <div className="text-xs text-gray-400">当电流告警触发时，抑制温度告警</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">触发条件</div>
                      <div>电流告警 (严重级别)</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">抑制对象</div>
                      <div>温度告警 (警告级别)</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">持续时间</div>
                      <div>30分钟</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">电压告警抑制</div>
                      <div className="text-xs text-gray-400">当系统维护时，抑制电压告警</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">触发条件</div>
                      <div>系统维护状态</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">抑制对象</div>
                      <div>电压告警 (信息级别)</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">持续时间</div>
                      <div>维护期间</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">重复告警抑制</div>
                      <div className="text-xs text-gray-400">相同告警在短时间内重复触发时抑制</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">触发条件</div>
                      <div>相同告警 5分钟内重复</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">抑制对象</div>
                      <div>重复的相同告警</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">持续时间</div>
                      <div>5分钟</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">状态</div>
                      <div className="text-success">启用</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'history' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">历史告警</h2>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    开始日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.startTime}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    结束日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.endTime}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    告警级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.level}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, level: e.target.value }))}
                  >
                    <option value="全部级别">全部级别</option>
                    <option value="信息">信息</option>
                    <option value="警告">警告</option>
                    <option value="严重">严重</option>
                    <option value="紧急">紧急</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    处理状态
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.status}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="全部状态">全部状态</option>
                    <option value="未处理">未处理</option>
                    <option value="处理中">处理中</option>
                    <option value="已处理">已处理</option>
                  </select>
                </div>
              </form>
              <div className="bg-dark-light rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">历史告警列表</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-lighter">
                        <th className="text-left py-3 px-4 text-gray-400">告警时间</th>
                        <th className="text-left py-3 px-4 text-gray-400">告警级别</th>
                        <th className="text-left py-3 px-4 text-gray-400">告警内容</th>
                        <th className="text-left py-3 px-4 text-gray-400">区域</th>
                        <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
                        <th className="text-left py-3 px-4 text-gray-400">状态</th>
                        <th className="text-left py-3 px-4 text-gray-400">处理时间</th>
                        <th className="text-left py-3 px-4 text-gray-400">处理人</th>
                        <th className="text-left py-3 px-4 text-gray-400">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-dark-lighter">
                        <td className="py-3 px-4">2026-01-14 16:30:45</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">警告</span>
                        </td>
                        <td className="py-3 px-4">温度偏高</td>
                        <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                        <td className="py-3 px-4">T001</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                        </td>
                        <td className="py-3 px-4">2026-01-14 16:45:22</td>
                        <td className="py-3 px-4">张伟</td>
                        <td className="py-3 px-4">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click">查看</button>
                        </td>
                      </tr>
                      <tr className="border-b border-dark-lighter">
                        <td className="py-3 px-4">2026-01-14 15:20:18</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">严重</span>
                        </td>
                        <td className="py-3 px-4">电池温度异常</td>
                        <td className="py-3 px-4">1-10MWh电池阵列B区</td>
                        <td className="py-3 px-4">T002</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                        </td>
                        <td className="py-3 px-4">2026-01-14 15:35:06</td>
                        <td className="py-3 px-4">王强</td>
                        <td className="py-3 px-4">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click">查看</button>
                        </td>
                      </tr>
                      <tr className="border-b border-dark-lighter">
                        <td className="py-3 px-4">2026-01-14 14:15:33</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">信息</span>
                        </td>
                        <td className="py-3 px-4">温度波动较大</td>
                        <td className="py-3 px-4">户外动力区</td>
                        <td className="py-3 px-4">T003</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                        </td>
                        <td className="py-3 px-4">2026-01-14 14:25:10</td>
                        <td className="py-3 px-4">李娜</td>
                        <td className="py-3 px-4">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click">查看</button>
                        </td>
                      </tr>
                      <tr className="border-b border-dark-lighter">
                        <td className="py-3 px-4">2026-01-14 13:45:22</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-error/20 text-error rounded-full text-xs">紧急</span>
                        </td>
                        <td className="py-3 px-4">母排温度过高</td>
                        <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                        <td className="py-3 px-4">T182</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                        </td>
                        <td className="py-3 px-4">2026-01-14 14:00:15</td>
                        <td className="py-3 px-4">张伟</td>
                        <td className="py-3 px-4">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click">查看</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
                      上一页
                    </button>
                    <button className="px-3 py-1 bg-secondary rounded-lg">1</button>
                    <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">2</button>
                    <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">3</button>
                    <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
                      下一页
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'statistics' ? (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">告警统计分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <h3 className="text-md font-medium mb-3"></h3>
                  <div id="alertTrendChart" className="h-72 bg-dark-light rounded-lg transition-all duration-500 opacity-0 animate-fadeIn"></div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <h3 className="text-md font-medium mb-3"></h3>
                  <div id="alertLevelChart" className="h-72 bg-dark-light rounded-lg transition-all duration-500 opacity-0 animate-fadeIn" style={{ animationDelay: '100ms' }}></div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <h3 className="text-md font-medium mb-3"></h3>
                  <div id="alertSourceChart" className="h-72 bg-dark-light rounded-lg transition-all duration-500 opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}></div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <h3 className="text-md font-medium mb-3"></h3>
                  <div id="processingTimeChart" className="h-72 bg-dark-light rounded-lg transition-all duration-500 opacity-0 animate-fadeIn" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
              <div className="mt-6 bg-dark rounded-lg p-4 border border-dark-lighter">
                <h3 className="text-md font-medium mb-3">统计摘要</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-dark-light rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-white">1250</div>
                    <div className="text-gray-400 text-sm">总告警数</div>
                  </div>
                  <div className="bg-dark-light rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark hover:shadow-lg hover:shadow-success/10 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-success">98.5%</div>
                    <div className="text-gray-400 text-sm">处理率</div>
                  </div>
                  <div className="bg-dark-light rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark hover:shadow-lg hover:shadow-warning/10 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-warning">15分钟</div>
                    <div className="text-gray-400 text-sm">平均处理时间</div>
                  </div>
                  <div className="bg-dark-light rounded-lg p-4 text-center transition-all duration-300 hover:bg-dark hover:shadow-lg hover:shadow-info/10 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-info">8</div>
                    <div className="text-gray-400 text-sm">未处理告警</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="btn-secondary flex items-center space-x-2 btn-click">
                    <span>📤</span>
                    <span>导出统计报告</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">筛选条件</h2>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    开始日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.startTime}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    结束日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.endTime}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    告警级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.level}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, level: e.target.value }))}
                  >
                    <option value="全部级别">全部级别</option>
                    <option value="信息">信息</option>
                    <option value="警告">警告</option>
                    <option value="严重">严重</option>
                    <option value="紧急">紧急</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    处理状态
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.status}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="全部状态">全部状态</option>
                    <option value="未处理">未处理</option>
                    <option value="处理中">处理中</option>
                    <option value="已处理">已处理</option>
                  </select>
                </div>
                <div className="md:col-span-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="btn-secondary btn-click"
                  >
                    重置
                  </button>
                  <button
                    type="submit"
                    className="btn-primary btn-click"
                  >
                    搜索
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">历史告警记录</h2>
                <span className="text-gray-400">1250条记录</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">告警时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">告警级别</th>
                      <th className="text-left py-3 px-4 text-gray-400">告警内容</th>
                      <th className="text-left py-3 px-4 text-gray-400">区域</th>
                      <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">处理状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">处理时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">处理人</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 16:30:45</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">预警</span>
                      </td>
                      <td className="py-3 px-4">温度偏高</td>
                      <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                      <td className="py-3 px-4">T001</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 16:45:22</td>
                      <td className="py-3 px-4">张伟</td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 15:20:18</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">报警</span>
                      </td>
                      <td className="py-3 px-4">电池温度异常</td>
                      <td className="py-3 px-4">1-10MWh电池阵列B区</td>
                      <td className="py-3 px-4">T002</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 15:35:06</td>
                      <td className="py-3 px-4">王强</td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 14:15:33</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">关注</span>
                      </td>
                      <td className="py-3 px-4">温度波动较大</td>
                      <td className="py-3 px-4">户外动力区</td>
                      <td className="py-3 px-4">T003</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已处理</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 14:25:10</td>
                      <td className="py-3 px-4">李娜</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
                    上一页
                  </button>
                  <button className="px-3 py-1 bg-secondary rounded-lg">1</button>
                  <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">2</button>
                  <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">3</button>
                  <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showRuleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">添加告警规则</h2>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowRuleModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    规则名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入规则名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    适用设备类型
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="温度传感器">温度传感器</option>
                    <option value="电流传感器">电流传感器</option>
                    <option value="电压传感器">电压传感器</option>
                    <option value="湿度传感器">湿度传感器</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    信息阈值
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最小值"
                    />
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最大值"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    警告阈值
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最小值"
                    />
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最大值"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    严重阈值
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最小值"
                    />
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="最大值"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    紧急阈值
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="最小值"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    检测频率 (秒)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入检测频率"
                    defaultValue={5}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  className="btn-secondary btn-click"
                  onClick={() => setShowRuleModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary btn-click"
                  onClick={() => {
                    setShowRuleModal(false);
                    setSuccessMessage('告警规则添加成功');
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 3000);
                  }}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotificationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">添加通知设置</h2>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowNotificationModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知类型
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="email">邮件通知</option>
                    <option value="sms">短信通知</option>
                    <option value="system">系统内通知</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    接收地址
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入邮箱或手机号"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    告警级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    multiple
                  >
                    <option value="信息">信息</option>
                    <option value="警告">警告</option>
                    <option value="严重">严重</option>
                    <option value="紧急">紧急</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知频率
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="realtime">实时</option>
                    <option value="5min">每5分钟</option>
                    <option value="15min">每15分钟</option>
                    <option value="30min">每30分钟</option>
                    <option value="1hour">每小时</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-300">启用通知</span>
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  className="btn-secondary btn-click"
                  onClick={() => setShowNotificationModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary btn-click"
                  onClick={() => {
                    setShowNotificationModal(false);
                    setSuccessMessage('通知设置添加成功');
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 3000);
                  }}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {showAlertProcessModal && selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">处理告警</h2>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowAlertProcessModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      告警时间
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                      value={selectedAlert.time}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      告警级别
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-error/20 text-error border border-dark-lighter rounded-lg"
                      value={selectedAlert.level}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      告警内容
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                      value={selectedAlert.content}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      区域
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                      value={selectedAlert.area}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      终端ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                      value={selectedAlert.terminalId}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      当前状态
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-warning/20 text-warning border border-dark-lighter rounded-lg"
                      value={selectedAlert.status}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    处理措施
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="check">检查设备</option>
                    <option value="restart">重启设备</option>
                    <option value="replace">更换设备</option>
                    <option value="adjust">调整参数</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    处理备注
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    rows={4}
                    placeholder="输入处理备注"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  className="btn-secondary btn-click"
                  onClick={() => setShowAlertProcessModal(false)}
                >
                  取消
                </button>
                <button 
                  className="btn-primary btn-click"
                  onClick={() => {
                    setAlerts(prevAlerts => prevAlerts.map(alert => 
                      alert.id === selectedAlert.id 
                        ? { ...alert, status: '已处理' } 
                        : alert
                    ));
                    setShowAlertProcessModal(false);
                    setSuccessMessage('告警处理成功');
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 3000);
                  }}
                >
                  确认处理
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AlertManagement;   