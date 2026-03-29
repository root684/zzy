import { useState, useMemo, useEffect } from 'react';

const LogManagement = () => {
  const [activeTab, setActiveTab] = useState('query');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [showLogDetailModal, setShowLogDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // 模拟日志数据
  const logs = useMemo(() => [
    { id: '1', time: '2026-01-14 17:03:22', type: 'system', level: 'critical', module: '温度监控', content: '母排温度过高告警', details: '母排温度达到72.2°C，超过阈值65°C，触发严重告警' },
    { id: '2', time: '2026-01-14 17:02:15', type: 'application', level: 'warning', module: '设备管理', content: '设备 T001 连接超时', details: '设备T001在尝试连接时超时，可能存在网络问题或设备故障' },
    { id: '3', time: '2026-01-14 17:01:08', type: 'security', level: 'info', module: '用户管理', content: '用户 admin 登录成功', details: '用户admin从IP 192.168.1.100登录系统' },
    { id: '4', time: '2026-01-14 16:59:33', type: 'device', level: 'info', module: '设备管理', content: '设备 T002 状态正常', details: '设备T002各项指标正常，运行状态良好' },
    { id: '5', time: '2026-01-14 16:58:45', type: 'system', level: 'error', module: '系统服务', content: '数据库连接失败', details: '尝试连接主数据库失败，已切换到备用数据库' },
    { id: '6', time: '2026-01-14 16:57:30', type: 'application', level: 'info', module: '报表管理', content: '报表生成成功', details: '每日能耗报表生成成功，已发送至管理员邮箱' },
  ], []);

  // 基于实际日志数据的分析
  const analysisData = useMemo(() => {
    // 1. 日志级别分布统计
    const levelDistribution = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 2. 日志类型分布分析
    const typeDistribution = logs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 3. 异常日志分析（严重、错误、警告）
    const abnormalLogs = logs.filter(log => ['critical', 'error', 'warning'].includes(log.level));
    const abnormalAnalysis = abnormalLogs.reduce((acc, log) => {
      const module = log.module;
      acc[module] = (acc[module] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 4. 生成24小时日志趋势数据
    // 初始化24小时数据为0
    const hourlyTrend = Array(24).fill(0);
    
    // 根据日志时间分布到对应小时
    logs.forEach(log => {
      const time = new Date(log.time);
      const hour = time.getHours();
      hourlyTrend[hour]++;
    });

    return {
      levelDistribution: {
        critical: levelDistribution.critical || 0,
        error: levelDistribution.error || 0,
        warning: levelDistribution.warning || 0,
        info: levelDistribution.info || 0
      },
      typeDistribution: {
        system: typeDistribution.system || 0,
        application: typeDistribution.application || 0,
        security: typeDistribution.security || 0,
        device: typeDistribution.device || 0
      },
      hourlyTrend,
      abnormalAnalysis
    };
  }, [logs]);

  const handleExportLogs = () => {
    // 模拟导出日志操作
    console.log('导出日志');
    setSuccessMessage('日志导出成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleArchiveLogs = () => {
    // 模拟归档日志操作
    console.log('归档日志');
    setSuccessMessage('日志归档成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleDeleteLogs = () => {
    // 模拟删除日志操作
    console.log('删除日志');
    setSuccessMessage('日志删除成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSaveSettings = () => {
    // 模拟保存设置操作
    console.log('保存设置');
    setSuccessMessage('设置保存成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleViewLogDetail = (logId: string) => {
    const log = logs.find(l => l.id === logId);
    if (log) {
      setSelectedLog(log);
      setShowLogDetailModal(true);
    }
  };

  const handleToggleLogSelection = (logId: string) => {
    setSelectedLogs(prev => {
      if (prev.includes(logId)) {
        return prev.filter(id => id !== logId);
      } else {
        return [...prev, logId];
      }
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedLogs.length === logs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(logs.map(log => log.id));
    }
  };

  const handleRefresh = () => {
    // 模拟刷新日志数据
    console.log('刷新日志数据');
    // 这里可以添加实际的日志数据刷新逻辑
  };

  // 10秒自动刷新功能
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('自动刷新日志数据');
      // 这里可以添加实际的日志数据刷新逻辑
      handleRefresh();
    }, 10000); // 10秒

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">日志管理</h1>
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
            <button className="btn-secondary flex items-center space-x-2 btn-click" onClick={handleRefresh}>
              <span>🔄</span>
              <span>刷新</span>
            </button>
          </div>
        </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'query' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('query')}
          >
            日志查询
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'analysis' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('analysis')}
          >
            日志分析
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('settings')}
          >
            日志设置
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'realtime' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('realtime')}
          >
            实时日志
          </button>
        </div>

        {activeTab === 'query' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">日志查询</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    时间范围
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value="2026-01-14 00:00:00 - 2026-01-14 23:59:59"
                    placeholder="选择时间范围"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志类型
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="all">全部类型</option>
                    <option value="system">系统日志</option>
                    <option value="application">应用日志</option>
                    <option value="security">安全日志</option>
                    <option value="device">设备日志</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="all">全部级别</option>
                    <option value="info">信息</option>
                    <option value="warning">警告</option>
                    <option value="error">错误</option>
                    <option value="critical">严重</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入设备ID"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  关键词搜索
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入关键词"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                    🔍
                  </button>
                </div>
              </div>
              <div className="mt-4 flex space-x-3">
                <button className="btn-primary px-4 py-2 btn-click">
                  查询
                </button>
                <button className="btn-secondary px-4 py-2 btn-click">
                  重置
                </button>
                <button className="btn-secondary px-4 py-2 btn-click">
                  高级搜索
                </button>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">日志列表</h2>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportLogs}>
                    导出
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleArchiveLogs}>
                    归档
                  </button>
                  <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click" onClick={handleDeleteLogs}>
                    删除
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">
                        <input
                          type="checkbox"
                          className="rounded border-dark-lighter bg-dark text-secondary focus:ring-secondary"
                          checked={selectedLogs.length === logs.length && logs.length > 0}
                          onChange={handleToggleSelectAll}
                        />
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400">时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">类型</th>
                      <th className="text-left py-3 px-4 text-gray-400">级别</th>
                      <th className="text-left py-3 px-4 text-gray-400">模块</th>
                      <th className="text-left py-3 px-4 text-gray-400">内容</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id} className="border-b border-dark-lighter">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            className="rounded border-dark-lighter bg-dark text-secondary focus:ring-secondary"
                            checked={selectedLogs.includes(log.id)}
                            onChange={() => handleToggleLogSelection(log.id)}
                          />
                        </td>
                        <td className="py-3 px-4">{log.time}</td>
                        <td className="py-3 px-4">
                          {(() => {
                            let className = 'px-2 py-1 rounded-full text-xs';
                            let text = '设备';
                            
                            if (log.type === 'system') {
                              className += ' bg-info/20 text-info';
                              text = '系统';
                            } else if (log.type === 'application') {
                              className += ' bg-warning/20 text-warning';
                              text = '应用';
                            } else if (log.type === 'security') {
                              className += ' bg-secondary/20 text-secondary';
                              text = '安全';
                            } else {
                              className += ' bg-info/20 text-info';
                            }
                            
                            return <span className={className}>{text}</span>;
                          })()}
                        </td>
                        <td className="py-3 px-4">
                          {(() => {
                            let className = 'px-2 py-1 rounded-full text-xs';
                            let text = '信息';
                            
                            if (log.level === 'critical' || log.level === 'error') {
                              className += ' bg-danger/20 text-danger';
                              text = log.level === 'critical' ? '严重' : '错误';
                            } else if (log.level === 'warning') {
                              className += ' bg-warning/20 text-warning';
                              text = '警告';
                            } else {
                              className += ' bg-info/20 text-info';
                            }
                            
                            return <span className={className}>{text}</span>;
                          })()}
                        </td>
                        <td className="py-3 px-4">{log.module}</td>
                        <td className="py-3 px-4">{log.content}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              className="text-secondary bg-secondary/10 hover:bg-secondary/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click"
                              onClick={() => handleViewLogDetail(log.id)}
                            >
                              查看
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* 分页 */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  共 {logs.length} 条记录
                </div>
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

        {activeTab === 'analysis' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">日志分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-dark rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">日志级别分布</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8 w-full">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-danger">{analysisData.levelDistribution.critical}</div>
                        <div className="text-sm text-gray-400 mt-2">严重</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-warning">{analysisData.levelDistribution.warning}</div>
                        <div className="text-sm text-gray-400 mt-2">警告</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-info">{analysisData.levelDistribution.info}</div>
                        <div className="text-sm text-gray-400 mt-2">信息</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">日志类型分布</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-8 w-full">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-secondary">{analysisData.typeDistribution.system}</div>
                        <div className="text-sm text-gray-400 mt-2">系统</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-warning">{analysisData.typeDistribution.application}</div>
                        <div className="text-sm text-gray-400 mt-2">应用</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-info">{analysisData.typeDistribution.device}</div>
                        <div className="text-sm text-gray-400 mt-2">设备</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-info">{analysisData.typeDistribution.security}</div>
                        <div className="text-sm text-gray-400 mt-2">安全</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-dark rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">最近24小时日志趋势</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full h-full flex items-end">
                    {analysisData.hourlyTrend.map((value, index) => (
                      <div key={index} className="flex-1 mx-1 relative">
                        <div 
                          className="bg-secondary/50 rounded-t transition-all duration-500 hover:bg-secondary/80"
                          style={{ height: `${(value / Math.max(...analysisData.hourlyTrend)) * 100}%` }}
                        ></div>
                        {/* 每4小时显示一个坐标，使坐标更收敛 */}
                        {index % 4 === 0 && (
                          <div className="text-xs text-center mt-1 text-gray-400">{index.toString().padStart(2, '0')}:00</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-dark rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">异常日志分析</h3>
                <div className="space-y-3">
                  {Object.entries(analysisData.abnormalAnalysis).length > 0 ? (
                    Object.entries(analysisData.abnormalAnalysis).map(([module, count]) => (
                      <div key={module} className="flex justify-between items-center">
                        <span className="text-sm">{module}异常</span>
                        <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">{count}次</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 text-sm py-4">
                      暂无异常日志
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">日志设置</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">启用异常日志告警</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    告警级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="all">全部级别</option>
                    <option value="warning">警告及以上</option>
                    <option value="error">错误及以上</option>
                    <option value="critical" selected>仅严重</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志保留时间
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="7">7天</option>
                    <option value="30" selected>30天</option>
                    <option value="90">90天</option>
                    <option value="180">180天</option>
                    <option value="365">365天</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志归档策略
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="daily">每日归档</option>
                    <option value="weekly" selected>每周归档</option>
                    <option value="monthly">每月归档</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志存储路径
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value="/var/log/yixiaopai/"
                    placeholder="输入日志存储路径"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">启用日志压缩</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志轮转策略
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="size">按大小轮转</option>
                    <option value="time" selected>按时间轮转</option>
                    <option value="both">按大小和时间轮转</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    日志备份策略
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="none">不备份</option>
                    <option value="local" selected>本地备份</option>
                    <option value="remote">远程备份</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="btn-primary px-4 py-2 btn-click" onClick={handleSaveSettings}>
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realtime' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">实时日志</h2>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-xs px-2 py-1 btn-click">
                    暂停
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click">
                    清空
                  </button>
                </div>
              </div>
              <div className="bg-dark rounded-lg p-4 h-96 overflow-y-auto">
                <div className="space-y-3">
                  {[...Array(20)].map((_, index) => {
                    const timestamp = new Date();
                    timestamp.setSeconds(timestamp.getSeconds() - (20 - index));
                    const timeString = timestamp.toLocaleTimeString();
                    
                    const logTypes = ['system', 'application', 'security', 'device'];
                    const logLevels = ['info', 'warning', 'error', 'critical'];
                    const modules = ['温度监控', '设备管理', '用户管理', '系统服务', '报表管理'];
                    const contents = [
                      '母排温度过高告警',
                      '设备 T001 连接超时',
                      '用户 admin 登录成功',
                      '设备 T002 状态正常',
                      '数据库连接失败',
                      '报表生成成功'
                    ];
                    
                    const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
                    const randomLevel = logLevels[Math.floor(Math.random() * logLevels.length)];
                    const randomModule = modules[Math.floor(Math.random() * modules.length)];
                    const randomContent = contents[Math.floor(Math.random() * contents.length)];
                    
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="text-sm text-gray-400 whitespace-nowrap">{timeString}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            {(() => {
                              let className = 'px-2 py-0.5 rounded-full text-xs';
                              let text = '设备';
                              
                              if (randomType === 'system') {
                                className += ' bg-info/20 text-info';
                                text = '系统';
                              } else if (randomType === 'application') {
                                className += ' bg-warning/20 text-warning';
                                text = '应用';
                              } else if (randomType === 'security') {
                                className += ' bg-secondary/20 text-secondary';
                                text = '安全';
                              } else {
                                className += ' bg-info/20 text-info';
                              }
                              
                              return <span className={className}>{text}</span>;
                            })()}
                            {(() => {
                              let className = 'px-2 py-0.5 rounded-full text-xs';
                              let text = '信息';
                              
                              if (randomLevel === 'critical' || randomLevel === 'error') {
                                className += ' bg-danger/20 text-danger';
                                text = randomLevel === 'critical' ? '严重' : '错误';
                              } else if (randomLevel === 'warning') {
                                className += ' bg-warning/20 text-warning';
                                text = '警告';
                              } else {
                                className += ' bg-info/20 text-info';
                              }
                              
                              return <span className={className}>{text}</span>;
                            })()}
                            <span className="text-sm font-medium">{randomModule}</span>
                          </div>
                          <div className="text-sm mt-1">{randomContent}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">日志级别筛选:</span>
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-success/20 text-success rounded text-xs">信息</button>
                    <button className="px-2 py-1 bg-warning/20 text-warning rounded text-xs">警告</button>
                    <button className="px-2 py-1 bg-danger/20 text-danger rounded text-xs">错误</button>
                    <button className="px-2 py-1 bg-danger/20 text-danger rounded text-xs">严重</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 日志详情模态框 */}
      {showLogDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">日志详情</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowLogDetailModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    时间
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={selectedLog.time}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    类型
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={selectedLog.type === 'system' ? '系统' : selectedLog.type === 'application' ? '应用' : selectedLog.type === 'security' ? '安全' : '设备'}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    级别
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 ${selectedLog.level === 'critical' ? 'bg-danger/20 text-danger' : selectedLog.level === 'error' ? 'bg-danger/20 text-danger' : selectedLog.level === 'warning' ? 'bg-warning/20 text-warning' : 'bg-info/20 text-info'} border border-dark-lighter rounded-lg`}
                    value={selectedLog.level === 'critical' ? '严重' : selectedLog.level === 'error' ? '错误' : selectedLog.level === 'warning' ? '警告' : '信息'}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    模块
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                    value={selectedLog.module}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  内容
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  value={selectedLog.content}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  详细信息
                </label>
                <textarea
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg h-32"
                  value={selectedLog.details}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="btn-secondary px-4 py-2 btn-click"
                onClick={() => setShowLogDetailModal(false)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogManagement;