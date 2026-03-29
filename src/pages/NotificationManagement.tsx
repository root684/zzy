import { useState } from 'react';

const NotificationManagement = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveSettings = () => {
    // 模拟保存设置操作
    console.log('保存通知设置');
    setSuccessMessage('通知设置保存成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSendNotification = () => {
    // 模拟发送通知操作
    console.log('发送通知');
    setSuccessMessage('通知发送成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleMarkAsRead = (id: string) => {
    // 模拟标记已读操作
    console.log('标记已读:', id);
    setSuccessMessage('标记已读成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleMarkAsUnread = (id: string) => {
    // 模拟标记未读操作
    console.log('标记未读:', id);
    setSuccessMessage('标记未读成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleDeleteNotification = (id: string) => {
    // 模拟删除操作
    console.log('删除通知:', id);
    setSuccessMessage('删除通知成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">通知管理</h1>
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
            className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('settings')}
          >
            通知设置
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            通知历史
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'send' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('send')}
          >
            发送通知
          </button>
        </div>

        {activeTab === 'settings' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">邮件通知设置</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">启用邮件通知</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    接收邮箱
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value="admin@system.com, tech@system.com"
                    placeholder="输入邮箱地址，多个邮箱用逗号分隔"
                  />
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
                    <option value="critical">严重及以上</option>
                    <option value="emergency">仅紧急</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知频率
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="realtime">实时</option>
                    <option value="5min">每5分钟</option>
                    <option value="15min">每15分钟</option>
                    <option value="30min">每30分钟</option>
                    <option value="1hour">每小时</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">短信通知设置</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">启用短信通知</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    接收手机号
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value="138****1234, 139****5678"
                    placeholder="输入手机号，多个手机号用逗号分隔"
                  />
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
                    <option value="critical">严重及以上</option>
                    <option value="emergency" selected>仅紧急</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">系统内通知设置</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">启用系统内通知</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    接收用户
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    multiple
                  >
                    <option value="admin" selected>系统管理员</option>
                    <option value="tech" selected>技术主管</option>
                    <option value="operator">操作员</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    告警级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="all" selected>全部级别</option>
                    <option value="warning">警告及以上</option>
                    <option value="critical">严重及以上</option>
                    <option value="emergency">仅紧急</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                className="btn-primary px-4 py-2 btn-click"
                onClick={handleSaveSettings}
              >
                保存设置
              </button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">通知历史</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">时间</th>
                      <th className="text-left py-3 px-4 text-gray-400">类型</th>
                      <th className="text-left py-3 px-4 text-gray-400">级别</th>
                      <th className="text-left py-3 px-4 text-gray-400">内容</th>
                      <th className="text-left py-3 px-4 text-gray-400">接收人</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 17:03:22</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">邮件</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">紧急</span>
                      </td>
                      <td className="py-3 px-4">母排温度过高告警</td>
                      <td className="py-3 px-4">admin@system.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已发送</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click" onClick={() => handleDeleteNotification('1')}>
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 17:02:15</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">短信</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">紧急</span>
                      </td>
                      <td className="py-3 px-4">母排温度过高告警</td>
                      <td className="py-3 px-4">138****1234</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已发送</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click" onClick={() => handleDeleteNotification('2')}>
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 17:01:08</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">系统内</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">警告</span>
                      </td>
                      <td className="py-3 px-4">温度上升趋势明显</td>
                      <td className="py-3 px-4">admin, tech</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已读</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={() => handleMarkAsUnread('3')}>
                            标记未读
                          </button>
                          <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click" onClick={() => handleDeleteNotification('3')}>
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">2026-01-14 16:59:33</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">系统内</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">信息</span>
                      </td>
                      <td className="py-3 px-4">设备 T001 状态正常</td>
                      <td className="py-3 px-4">admin</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">未读</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-xs px-2 py-1 btn-click" onClick={() => handleMarkAsRead('4')}>
                            标记已读
                          </button>
                          <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click" onClick={() => handleDeleteNotification('4')}>
                            删除
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

        {activeTab === 'send' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">发送通知</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知类型
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="email">邮件</option>
                    <option value="sms">短信</option>
                    <option value="system">系统内</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    接收人
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入接收人，多个接收人用逗号分隔"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知级别
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="info">信息</option>
                    <option value="warning">警告</option>
                    <option value="critical">严重</option>
                    <option value="emergency">紧急</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知主题
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="输入通知主题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    通知内容
                  </label>
                  <textarea
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    rows={4}
                    placeholder="输入通知内容"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  className="btn-primary px-4 py-2 btn-click"
                  onClick={handleSendNotification}
                >
                  发送通知
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManagement;