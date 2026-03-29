import { useState } from 'react';

const ReportManagement = () => {
  const [activeTab, setActiveTab] = useState('preset');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerateReport = () => {
    // 模拟生成报表操作
    console.log('生成报表');
    setSuccessMessage('报表生成成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleExportReport = () => {
    // 模拟导出报表操作
    console.log('导出报表');
    setSuccessMessage('报表导出成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSaveReport = () => {
    // 模拟保存报表操作
    console.log('保存报表');
    setSuccessMessage('报表保存成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">报表管理</h1>
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
          <button className="btn-secondary flex items-center space-x-2 btn-click">
            <span>🔄</span>
            <span>刷新</span>
          </button>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'preset' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('preset')}
          >
            预设报表
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'custom' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('custom')}
          >
            自定义报表
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            报表历史
          </button>
        </div>

        {activeTab === 'preset' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-light rounded-lg p-4 cursor-pointer hover:bg-dark-light/80 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">运行状态报表</h3>
                  <span className="text-secondary">📊</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">展示系统运行状态、设备健康状况等关键指标</p>
                <div className="mt-4 flex space-x-2">
                  <button className="btn-primary text-xs px-2 py-1 btn-click" onClick={handleGenerateReport}>
                    生成
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                    导出
                  </button>
                </div>
              </div>
              <div className="bg-dark-light rounded-lg p-4 cursor-pointer hover:bg-dark-light/80 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">能耗分析报表</h3>
                  <span className="text-secondary">⚡</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">分析系统能耗情况、趋势变化和优化建议</p>
                <div className="mt-4 flex space-x-2">
                  <button className="btn-primary text-xs px-2 py-1 btn-click" onClick={handleGenerateReport}>
                    生成
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                    导出
                  </button>
                </div>
              </div>
              <div className="bg-dark-light rounded-lg p-4 cursor-pointer hover:bg-dark-light/80 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">告警统计报表</h3>
                  <span className="text-secondary">⚠️</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">统计系统告警情况、级别分布和处理状态</p>
                <div className="mt-4 flex space-x-2">
                  <button className="btn-primary text-xs px-2 py-1 btn-click" onClick={handleGenerateReport}>
                    生成
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                    导出
                  </button>
                </div>
              </div>
              <div className="bg-dark-light rounded-lg p-4 cursor-pointer hover:bg-dark-light/80 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">设备健康报表</h3>
                  <span className="text-secondary">🔧</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">评估设备健康状态、预测维护需求</p>
                <div className="mt-4 flex space-x-2">
                  <button className="btn-primary text-xs px-2 py-1 btn-click" onClick={handleGenerateReport}>
                    生成
                  </button>
                  <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                    导出
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">自定义报表配置</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    报表名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入报表名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    报表类型
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="table">表格</option>
                    <option value="chart">图表</option>
                    <option value="dashboard">仪表板</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    时间范围
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="选择时间范围"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    选择指标
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" checked />
                      <label className="text-sm">温度</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" checked />
                      <label className="text-sm">电压</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" checked />
                      <label className="text-sm">电流</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                      <label className="text-sm">功率</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                      <label className="text-sm">SOC</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                      <label className="text-sm">告警数量</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    数据可视化设置
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="line">折线图</option>
                    <option value="bar">柱状图</option>
                    <option value="pie">饼图</option>
                    <option value="gauge">仪表盘</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    报表描述
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    rows={3}
                    placeholder="输入报表描述"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="btn-primary px-4 py-2 btn-click" onClick={handleSaveReport}>
                  保存配置
                </button>
                <button className="btn-secondary px-4 py-2 btn-click" onClick={handleGenerateReport}>
                  生成报表
                </button>
                <button className="btn-secondary px-4 py-2 btn-click" onClick={handleExportReport}>
                  导出
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">报表历史</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">报表名称</th>
                      <th className="text-left py-3 px-4 text-gray-400">类型</th>
                      <th className="text-left py-3 px-4 text-gray-400">生成时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">生成人</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">运行状态报表</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">仪表板</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 17:03:22</td>
                      <td className="py-3 px-4">admin</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已完成</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary bg-secondary/10 hover:bg-secondary/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">
                            查看
                          </button>
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                            导出
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">能耗分析报表</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">图表</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 17:02:15</td>
                      <td className="py-3 px-4">tech</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已完成</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary bg-secondary/10 hover:bg-secondary/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">
                            查看
                          </button>
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                            导出
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">告警统计报表</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">表格</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 17:01:08</td>
                      <td className="py-3 px-4">admin</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已完成</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary bg-secondary/10 hover:bg-secondary/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">
                            查看
                          </button>
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                            导出
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">设备健康报表</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">仪表板</span>
                      </td>
                      <td className="py-3 px-4">2026-01-14 16:59:33</td>
                      <td className="py-3 px-4">tech</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已完成</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary bg-secondary/10 hover:bg-secondary/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">
                            查看
                          </button>
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={handleExportReport}>
                            导出
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* 分页 */}
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
      </div>
    </div>
  );
};

export default ReportManagement;