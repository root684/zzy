import { useState } from 'react';

const DeviceManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchParams, setSearchParams] = useState({
    deviceId: '',
    status: '全部状态',
    type: '全部类型',
    area: '全部区域',
    group: '全部分组'
  });
  const [selectedDevice, setSelectedDevice] = useState('');
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showEditDeviceModal, setShowEditDeviceModal] = useState(false);
  const [showDeleteDeviceModal, setShowDeleteDeviceModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  // 分页状态
  const [devicePage, setDevicePage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟搜索操作
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        { id: 'T001', type: '温度传感器', area: '1-10MWh电池阵列A区', status: '在线', ip: '192.168.1.101', lastOnline: '2026-01-14 17:00:33' },
        { id: 'T002', type: '电流传感器', area: '1-10MWh电池阵列B区', status: '在线', ip: '192.168.1.102', lastOnline: '2026-01-14 16:59:45' }
      ]);
      setIsSearching(false);
    }, 1000);
  };

  const handleDeviceConfig = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowConfigModal(true);
  };

  const handleDeviceDiagnostic = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowDiagnosticModal(true);
  };

  const handleAddDevice = () => {
    setShowAddDeviceModal(true);
  };

  const handleEditDevice = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowEditDeviceModal(true);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setShowDeleteDeviceModal(true);
  };

  const handleSave = () => {
    // 模拟保存操作
    setSuccessMessage('保存成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleDiagnose = () => {
    // 模拟诊断操作
    setSuccessMessage('诊断完成');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // 设备列表分页处理
  const handleDevicePageChange = (page: number) => {
    setDevicePage(page);
  };

  const handleDevicePrevPage = () => {
    if (devicePage > 1) {
      setDevicePage(prev => prev - 1);
    }
  };

  const handleDeviceNextPage = () => {
    if (devicePage < 3) {
      setDevicePage(prev => prev + 1);
    }
  };

  // 状态历史分页处理
  const handleHistoryPageChange = (page: number) => {
    setHistoryPage(page);
  };

  const handleHistoryPrevPage = () => {
    if (historyPage > 1) {
      setHistoryPage(prev => prev - 1);
    }
  };

  const handleHistoryNextPage = () => {
    if (historyPage < 3) {
      setHistoryPage(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">设备管理</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2 btn-click">
            <span>🔄</span>
            <span>刷新</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2 btn-click">
            <span>📤</span>
            <span>导出</span>
          </button>
          <button 
            className="btn-primary flex items-center space-x-2 btn-click"
            onClick={handleAddDevice}
          >
            <span>➕</span>
            <span>添加设备</span>
          </button>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'list' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('list')}
          >
            设备列表
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'config' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('config')}
          >
            设备配置
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'diagnostic' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('diagnostic')}
          >
            故障诊断
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'group' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('group')}
          >
            设备分组
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'history' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            状态历史
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'maintenance' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('maintenance')}
          >
            维护计划
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'firmware' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('firmware')}
          >
            固件管理
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'remote' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('remote')}
          >
            远程控制
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'performance' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('performance')}
          >
            性能评估
          </button>
        </div>

        {activeTab === 'list' && (
          <div className="mt-6 space-y-6">
            {/* 搜索条件 */}
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">筛选条件</h2>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备ID
                  </label>
                  <input
                    type="text"
                    id="deviceId"
                    name="deviceId"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    placeholder="搜索设备ID"
                    value={searchParams.deviceId}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, deviceId: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    状态
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.status}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="全部状态">全部状态</option>
                    <option value="在线">在线</option>
                    <option value="离线">离线</option>
                    <option value="故障">故障</option>
                    <option value="维护">维护</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备类型
                  </label>
                  <select
                    id="deviceType"
                    name="deviceType"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.type}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="全部类型">全部类型</option>
                    <option value="温度传感器">温度传感器</option>
                    <option value="电流传感器">电流传感器</option>
                    <option value="电压传感器">电压传感器</option>
                    <option value="湿度传感器">湿度传感器</option>
                    <option value="控制器">控制器</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    区域
                  </label>
                  <select
                    id="area"
                    name="area"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.area}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, area: e.target.value }))}
                  >
                    <option value="全部区域">全部区域</option>
                    <option value="1-10MWh电池阵列A区">1-10MWh电池阵列A区</option>
                    <option value="1-10MWh电池阵列B区">1-10MWh电池阵列B区</option>
                    <option value="1-10MWh电池阵列C区">1-10MWh电池阵列C区</option>
                    <option value="户外动力区">户外动力区</option>
                    <option value="集装箱高压配电区">集装箱高压配电区</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    分组
                  </label>
                  <select
                    id="group"
                    name="group"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={searchParams.group}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, group: e.target.value }))}
                  >
                    <option value="全部分组">全部分组</option>
                    <option value="核心设备">核心设备</option>
                    <option value="辅助设备">辅助设备</option>
                    <option value="传感器">传感器</option>
                    <option value="控制器">控制器</option>
                  </select>
                </div>
                <div className="md:col-span-5 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="btn-secondary flex items-center space-x-2 btn-click"
                  >
                    <span>重置</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2 btn-click"
                  >
                    <span>搜索</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 设备状态概览 */}
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备状态概览</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-dark rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">200</div>
                  <div className="text-gray-400 text-sm">总设备数</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success">196</div>
                  <div className="text-gray-400 text-sm">在线设备</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-danger">2</div>
                  <div className="text-gray-400 text-sm">故障设备</div>
                </div>
                <div className="bg-dark rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-warning">2</div>
                  <div className="text-gray-400 text-sm">维护中设备</div>
                </div>
              </div>
            </div>

            {/* 设备列表 */}
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">设备列表</h2>
                <span className="text-gray-400">200台设备</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">设备ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">设备类型</th>
                      <th className="text-left py-3 px-4 text-gray-400">区域</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">IP地址</th>
                      <th className="text-left py-3 px-4 text-gray-400">上次在线</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">T001</td>
                      <td className="py-3 px-4">温度传感器</td>
                      <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">在线</span>
                      </td>
                      <td className="py-3 px-4">192.168.1.101</td>
                      <td className="py-3 px-4">2026-01-14 17:00:33</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceConfig('T001')}
                          >
                            配置
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleEditDevice('T001')}
                          >
                            编辑
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceDiagnostic('T001')}
                          >
                            诊断
                          </button>
                          <button 
                            className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click"
                            onClick={() => handleDeleteDevice('T001')}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">T002</td>
                      <td className="py-3 px-4">电流传感器</td>
                      <td className="py-3 px-4">1-10MWh电池阵列B区</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">在线</span>
                      </td>
                      <td className="py-3 px-4">192.168.1.102</td>
                      <td className="py-3 px-4">2026-01-14 16:59:45</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceConfig('T002')}
                          >
                            配置
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleEditDevice('T002')}
                          >
                            编辑
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceDiagnostic('T002')}
                          >
                            诊断
                          </button>
                          <button 
                            className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click"
                            onClick={() => handleDeleteDevice('T002')}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">T182</td>
                      <td className="py-3 px-4">温度传感器</td>
                      <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">故障</span>
                      </td>
                      <td className="py-3 px-4">192.168.1.282</td>
                      <td className="py-3 px-4">2026-01-14 16:30:12</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceConfig('T182')}
                          >
                            配置
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleEditDevice('T182')}
                          >
                            编辑
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceDiagnostic('T182')}
                          >
                            诊断
                          </button>
                          <button 
                            className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click"
                            onClick={() => handleDeleteDevice('T182')}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">T190</td>
                      <td className="py-3 px-4">温度传感器</td>
                      <td className="py-3 px-4">集装箱高压配电区</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">维护中</span>
                      </td>
                      <td className="py-3 px-4">192.168.1.290</td>
                      <td className="py-3 px-4">2026-01-14 16:15:44</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceConfig('T190')}
                          >
                            配置
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleEditDevice('T190')}
                          >
                            编辑
                          </button>
                          <button 
                            className="btn-secondary text-xs px-2 py-1 btn-click"
                            onClick={() => handleDeviceDiagnostic('T190')}
                          >
                            诊断
                          </button>
                          <button 
                            className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click"
                            onClick={() => handleDeleteDevice('T190')}
                          >
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
                  <button 
                    className={`px-3 py-1 rounded-lg transition-colors ${devicePage > 1 ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-dark-lighter/50 cursor-not-allowed'}`}
                    onClick={handleDevicePrevPage}
                    disabled={devicePage <= 1}
                  >
                    上一页
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-lg ${devicePage === 1 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                    onClick={() => handleDevicePageChange(1)}
                  >1</button>
                  <button 
                    className={`px-3 py-1 rounded-lg ${devicePage === 2 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                    onClick={() => handleDevicePageChange(2)}
                  >2</button>
                  <button 
                    className={`px-3 py-1 rounded-lg ${devicePage === 3 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                    onClick={() => handleDevicePageChange(3)}
                  >3</button>
                  <button 
                    className={`px-3 py-1 rounded-lg transition-colors ${devicePage < 3 ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-dark-lighter/50 cursor-not-allowed'}`}
                    onClick={handleDeviceNextPage}
                    disabled={devicePage >= 3}
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备配置</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-3">基本信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        设备ID
                      </label>
                      <input
                        type="text"
                        id="deviceId"
                        name="deviceId"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        value="T001"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        设备名称
                      </label>
                      <input
                        type="text"
                        id="deviceName"
                        name="deviceName"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入设备名称"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        设备类型
                      </label>
                      <select
                        id="deviceType"
                        name="deviceType"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                      >
                        <option value="温度传感器">温度传感器</option>
                        <option value="电流传感器">电流传感器</option>
                        <option value="电压传感器">电压传感器</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        所属区域
                      </label>
                      <select
                        id="area"
                        name="area"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                      >
                        <option value="1-10MWh电池阵列A区">1-10MWh电池阵列A区</option>
                        <option value="1-10MWh电池阵列B区">1-10MWh电池阵列B区</option>
                        <option value="户外动力区">户外动力区</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-3">网络配置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        IP地址
                      </label>
                      <input
                        type="text"
                        id="ipAddress"
                        name="ipAddress"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入IP地址"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        子网掩码
                      </label>
                      <input
                        type="text"
                        id="subnetMask"
                        name="subnetMask"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入子网掩码"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        网关
                      </label>
                      <input
                        type="text"
                        id="gateway"
                        name="gateway"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入网关"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        端口
                      </label>
                      <input
                        type="number"
                        id="port"
                        name="port"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入端口"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium mb-3">传感器配置</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          采样频率 (Hz)
                        </label>
                        <input
                          type="number"
                          id="samplingFrequency"
                          name="samplingFrequency"
                          className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                          placeholder="输入采样频率"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          预警阈值 (°C)
                        </label>
                        <input
                          type="number"
                          id="warningThreshold"
                          name="warningThreshold"
                          className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                          placeholder="输入预警阈值"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          报警阈值 (°C)
                        </label>
                        <input
                          type="number"
                          id="alarmThreshold"
                          name="alarmThreshold"
                          className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                          placeholder="输入报警阈值"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
                    取消
                  </button>
                  <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
                    保存配置
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'diagnostic' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备故障诊断</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-md font-medium mb-3">设备选择</h3>
                  <div className="space-y-2">
                    <div className="bg-dark p-3 rounded-lg border border-dark-lighter">
                      <div className="font-medium">T001 - 温度传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列A区</div>
                    </div>
                    <div className="bg-dark p-3 rounded-lg border border-secondary">
                      <div className="font-medium">T182 - 温度传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列A区</div>
                    </div>
                    <div className="bg-dark p-3 rounded-lg border border-dark-lighter">
                      <div className="font-medium">T190 - 温度传感器</div>
                      <div className="text-xs text-gray-400">集装箱高压配电区</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium mb-3">诊断结果</h3>
                  <div className="bg-dark p-4 rounded-lg border border-dark-lighter space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">设备状态</div>
                      <div className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs inline-block">故障</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">故障时间</div>
                      <div className="text-gray-300">2026-01-14 16:30:12</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">故障原因</div>
                      <div className="text-gray-300">传感器通信中断</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">故障位置</div>
                      <div className="text-gray-300">1-10MWh电池阵列A区 - 第3排第2列</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">建议措施</div>
                      <div className="text-gray-300">检查传感器连接线缆，重启设备</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">历史故障记录</div>
                      <div className="text-gray-300 text-sm">
                        <div className="mb-1">2025-12-20 14:25:33 - 传感器校准偏移</div>
                        <div>2025-11-15 09:10:22 - 电源波动</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
                        生成诊断报告
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 设备分组标签页 */}
        {activeTab === 'group' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">设备分组管理</h2>
                <button className="btn-primary flex items-center space-x-2 btn-click">
                  <span>➕</span>
                  <span>添加分组</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">核心设备</div>
                      <div className="text-xs text-gray-400">包含 50 台设备</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T001</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T002</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T003</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">...</span>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">辅助设备</div>
                      <div className="text-xs text-gray-400">包含 30 台设备</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T051</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T052</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T053</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">...</span>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">传感器</div>
                      <div className="text-xs text-gray-400">包含 100 台设备</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T101</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T102</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T103</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">...</span>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">控制器</div>
                      <div className="text-xs text-gray-400">包含 20 台设备</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                      <button className="text-danger bg-danger/10 hover:bg-danger/20 text-xs px-2 py-1 rounded-lg transition-colors btn-click">删除</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T181</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T182</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">T183</span>
                    <span className="px-2 py-1 bg-dark-lighter rounded-full text-xs">...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 状态历史标签页 */}
        {activeTab === 'history' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备状态历史</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      设备ID
                    </label>
                    <input
                      type="text"
                      id="historyDeviceId"
                      name="historyDeviceId"
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                      placeholder="输入设备ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      时间范围
                    </label>
                    <input
                      type="date"
                      id="timeRange"
                      name="timeRange"
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="btn-primary flex items-center space-x-2 btn-click">
                    <span>查询</span>
                  </button>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium">T182 - 温度传感器</h3>
                    <span className="text-xs text-gray-400">1-10MWh电池阵列A区</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-lighter">
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">时间</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">状态</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">温度</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">操作人</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">备注</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-2 px-3 text-xs">2026-01-14 16:30:12</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-1 bg-danger/20 text-danger rounded-full text-xs">故障</span>
                          </td>
                          <td className="py-2 px-3 text-xs">72.2°C</td>
                          <td className="py-2 px-3 text-xs">系统</td>
                          <td className="py-2 px-3 text-xs">传感器通信中断</td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-2 px-3 text-xs">2026-01-14 15:45:33</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">预警</span>
                          </td>
                          <td className="py-2 px-3 text-xs">65.8°C</td>
                          <td className="py-2 px-3 text-xs">系统</td>
                          <td className="py-2 px-3 text-xs">温度接近阈值</td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-2 px-3 text-xs">2026-01-14 14:20:15</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">在线</span>
                          </td>
                          <td className="py-2 px-3 text-xs">58.3°C</td>
                          <td className="py-2 px-3 text-xs">系统</td>
                          <td className="py-2 px-3 text-xs">正常运行</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-2">
                      <button 
                        className={`px-3 py-1 rounded-lg transition-colors ${historyPage > 1 ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-dark-lighter/50 cursor-not-allowed'}`}
                        onClick={handleHistoryPrevPage}
                        disabled={historyPage <= 1}
                      >上一页</button>
                      <button 
                        className={`px-3 py-1 rounded-lg ${historyPage === 1 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                        onClick={() => handleHistoryPageChange(1)}
                      >1</button>
                      <button 
                        className={`px-3 py-1 rounded-lg ${historyPage === 2 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                        onClick={() => handleHistoryPageChange(2)}
                      >2</button>
                      <button 
                        className={`px-3 py-1 rounded-lg ${historyPage === 3 ? 'bg-secondary' : 'bg-dark-lighter hover:bg-dark-lighter/80'}`}
                        onClick={() => handleHistoryPageChange(3)}
                      >3</button>
                      <button 
                        className={`px-3 py-1 rounded-lg transition-colors ${historyPage < 3 ? 'bg-dark-lighter hover:bg-dark-lighter/80' : 'bg-dark-lighter/50 cursor-not-allowed'}`}
                        onClick={handleHistoryNextPage}
                        disabled={historyPage >= 3}
                      >下一页</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 维护计划标签页 */}
        {activeTab === 'maintenance' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">设备维护计划</h2>
                <button className="btn-primary flex items-center space-x-2 btn-click">
                  <span>➕</span>
                  <span>添加计划</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">T190 - 温度传感器</div>
                      <div className="text-xs text-gray-400">集装箱高压配电区</div>
                    </div>
                    <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">维护中</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">维护类型</div>
                      <div>定期校准</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">开始时间</div>
                      <div>2026-01-14 10:00:00</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">预计完成时间</div>
                      <div>2026-01-14 18:00:00</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-gray-400 text-xs mb-1">维护内容</div>
                    <div className="text-sm">校准温度传感器，检查连接线缆，更新固件</div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                    <button className="btn-primary text-xs px-2 py-1 btn-click">完成</button>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">T050 - 电流传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列B区</div>
                    </div>
                    <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">计划中</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">维护类型</div>
                      <div>预防性维护</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">开始时间</div>
                      <div>2026-01-15 09:00:00</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">预计完成时间</div>
                      <div>2026-01-15 12:00:00</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-gray-400 text-xs mb-1">维护内容</div>
                    <div className="text-sm">检查电流传感器精度，清洁设备，检查散热</div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="btn-secondary text-xs px-2 py-1 btn-click">编辑</button>
                    <button className="btn-secondary text-xs px-2 py-1 btn-click">取消</button>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">T100 - 电压传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列C区</div>
                    </div>
                    <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已完成</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">维护类型</div>
                      <div>固件更新</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">开始时间</div>
                      <div>2026-01-13 14:00:00</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">完成时间</div>
                      <div>2026-01-13 16:00:00</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-gray-400 text-xs mb-1">维护内容</div>
                    <div className="text-sm">更新电压传感器固件至最新版本，测试功能</div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="btn-secondary text-xs px-2 py-1 btn-click">查看详情</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 固件管理标签页 */}
        {activeTab === 'firmware' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备固件管理</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      固件版本
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    >
                      <option value="all">全部版本</option>
                      <option value="latest">最新版本</option>
                      <option value="outdated">需要更新</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <button className="btn-primary flex items-center space-x-2 btn-click">
                    <span>查询</span>
                  </button>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-lighter">
                          <th className="text-left py-3 px-4 text-gray-400">设备ID</th>
                          <th className="text-left py-3 px-4 text-gray-400">设备类型</th>
                          <th className="text-left py-3 px-4 text-gray-400">当前固件版本</th>
                          <th className="text-left py-3 px-4 text-gray-400">最新固件版本</th>
                          <th className="text-left py-3 px-4 text-gray-400">状态</th>
                          <th className="text-left py-3 px-4 text-gray-400">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-3 px-4">T001</td>
                          <td className="py-3 px-4">温度传感器</td>
                          <td className="py-3 px-4">v1.2.0</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">需要更新</span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="btn-primary text-xs px-2 py-1 btn-click">更新</button>
                          </td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-3 px-4">T002</td>
                          <td className="py-3 px-4">电流传感器</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">最新版本</span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="btn-secondary text-xs px-2 py-1 btn-click" disabled>已是最新</button>
                          </td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-3 px-4">T182</td>
                          <td className="py-3 px-4">温度传感器</td>
                          <td className="py-3 px-4">v1.1.0</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">需要更新</span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="btn-primary text-xs px-2 py-1 btn-click">更新</button>
                          </td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-3 px-4">T190</td>
                          <td className="py-3 px-4">温度传感器</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">v1.3.0</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">最新版本</span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="btn-secondary text-xs px-2 py-1 btn-click" disabled>已是最新</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">上一页</button>
                      <button className="px-3 py-1 bg-secondary rounded-lg">1</button>
                      <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">2</button>
                      <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">3</button>
                      <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">下一页</button>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <h3 className="text-md font-medium mb-3">固件更新历史</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-lighter">
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">时间</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">设备ID</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">旧版本</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">新版本</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">状态</th>
                          <th className="text-left py-2 px-3 text-gray-400 text-xs">操作人</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-2 px-3 text-xs">2026-01-13 15:00:00</td>
                          <td className="py-2 px-3 text-xs">T100</td>
                          <td className="py-2 px-3 text-xs">v1.2.0</td>
                          <td className="py-2 px-3 text-xs">v1.3.0</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">成功</span>
                          </td>
                          <td className="py-2 px-3 text-xs">admin</td>
                        </tr>
                        <tr className="border-b border-dark-lighter">
                          <td className="py-2 px-3 text-xs">2026-01-12 10:30:00</td>
                          <td className="py-2 px-3 text-xs">T050</td>
                          <td className="py-2 px-3 text-xs">v1.1.0</td>
                          <td className="py-2 px-3 text-xs">v1.3.0</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">成功</span>
                          </td>
                          <td className="py-2 px-3 text-xs">admin</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 远程控制标签页 */}
        {activeTab === 'remote' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备远程控制</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-md font-medium mb-3">设备选择</h3>
                  <div className="space-y-2">
                    <div className="bg-dark p-3 rounded-lg border border-dark-lighter">
                      <div className="font-medium">T001 - 温度传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列A区</div>
                      <div className="text-xs text-success mt-1">在线</div>
                    </div>
                    <div className="bg-dark p-3 rounded-lg border border-secondary">
                      <div className="font-medium">T002 - 电流传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列B区</div>
                      <div className="text-xs text-success mt-1">在线</div>
                    </div>
                    <div className="bg-dark p-3 rounded-lg border border-dark-lighter">
                      <div className="font-medium">T182 - 温度传感器</div>
                      <div className="text-xs text-gray-400">1-10MWh电池阵列A区</div>
                      <div className="text-xs text-danger mt-1">离线</div>
                    </div>
                    <div className="bg-dark p-3 rounded-lg border border-dark-lighter">
                      <div className="font-medium">T190 - 温度传感器</div>
                      <div className="text-xs text-gray-400">集装箱高压配电区</div>
                      <div className="text-xs text-warning mt-1">维护中</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium mb-3">控制操作</h3>
                  <div className="bg-dark rounded-lg p-4 border border-dark-lighter space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">设备状态</div>
                      <div className="px-2 py-1 bg-success/20 text-success rounded-full text-xs inline-block">在线</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">基本控制</div>
                      <div className="flex space-x-2">
                        <button className="btn-primary text-xs px-3 py-1 btn-click">重启设备</button>
                        <button className="btn-secondary text-xs px-3 py-1 btn-click">关闭设备</button>
                        <button className="btn-secondary text-xs px-3 py-1 btn-click">开启设备</button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">传感器控制</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            采样频率 (Hz)
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                            placeholder="输入采样频率"
                            defaultValue="10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            上报间隔 (s)
                          </label>
                          <input
                            type="number"
                            className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                            placeholder="输入上报间隔"
                            defaultValue="30"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">高级控制</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">启用数据加密</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">启用自动校准</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">启用异常检测</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="btn-secondary px-4 py-2 btn-click">取消</button>
                      <button className="btn-primary px-4 py-2 btn-click">应用设置</button>
                    </div>
                  </div>
                  <div className="mt-4 bg-dark rounded-lg p-4 border border-dark-lighter">
                    <h3 className="text-md font-medium mb-3">控制历史</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-dark-lighter">
                            <th className="text-left py-2 px-3 text-gray-400 text-xs">时间</th>
                            <th className="text-left py-2 px-3 text-gray-400 text-xs">操作</th>
                            <th className="text-left py-2 px-3 text-gray-400 text-xs">参数</th>
                            <th className="text-left py-2 px-3 text-gray-400 text-xs">状态</th>
                            <th className="text-left py-2 px-3 text-gray-400 text-xs">操作人</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-dark-lighter">
                            <td className="py-2 px-3 text-xs">2026-01-14 15:30:00</td>
                            <td className="py-2 px-3 text-xs">重启设备</td>
                            <td className="py-2 px-3 text-xs">-</td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">成功</span>
                            </td>
                            <td className="py-2 px-3 text-xs">admin</td>
                          </tr>
                          <tr className="border-b border-dark-lighter">
                            <td className="py-2 px-3 text-xs">2026-01-14 10:15:00</td>
                            <td className="py-2 px-3 text-xs">修改采样频率</td>
                            <td className="py-2 px-3 text-xs">10 Hz</td>
                            <td className="py-2 px-3">
                              <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">成功</span>
                            </td>
                            <td className="py-2 px-3 text-xs">admin</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 性能评估标签页 */}
        {activeTab === 'performance' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">设备性能评估</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      评估周期
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    >
                      <option value="7">最近7天</option>
                      <option value="30">最近30天</option>
                      <option value="90">最近90天</option>
                      <option value="custom">自定义</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <button className="btn-primary flex items-center space-x-2 btn-click">
                    <span>生成报告</span>
                  </button>
                </div>
                <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-medium">T001 - 温度传感器</h3>
                    <span className="text-xs text-gray-400">评估周期: 2026-01-08 至 2026-01-14</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-dark-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-success">98.5%</div>
                      <div className="text-gray-400 text-sm">可用性</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">95.2%</div>
                      <div className="text-gray-400 text-sm">准确率</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-warning">120ms</div>
                      <div className="text-gray-400 text-sm">响应时间</div>
                    </div>
                    <div className="bg-dark-light rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-info">A</div>
                      <div className="text-gray-400 text-sm">性能等级</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">性能趋势</h4>
                      <div className="h-64 bg-dark-light rounded-lg flex items-center justify-center">
                        <div className="text-gray-400">性能趋势图表</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">异常事件</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-dark-light rounded-lg">
                          <div>
                            <div className="text-sm">传感器校准偏移</div>
                            <div className="text-xs text-gray-400">2026-01-12 14:30:00</div>
                          </div>
                          <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">已处理</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-dark-light rounded-lg">
                          <div>
                            <div className="text-sm">通信延迟</div>
                            <div className="text-xs text-gray-400">2026-01-10 09:15:00</div>
                          </div>
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">已解决</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">建议措施</h4>
                      <div className="bg-dark-light rounded-lg p-3">
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>定期校准传感器，建议每3个月一次</li>
                          <li>检查设备散热情况，确保设备运行环境良好</li>
                          <li>考虑升级固件至最新版本以获得更好的性能</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button className="btn-secondary flex items-center space-x-2 btn-click">
                      <span>📤</span>
                      <span>导出报告</span>
                    </button>
                    <button className="btn-primary flex items-center space-x-2 btn-click">
                      <span>📋</span>
                      <span>生成PDF报告</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 添加设备模态框 */}
      {showAddDeviceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">添加设备</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowAddDeviceModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  placeholder="输入设备ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  placeholder="输入设备名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备类型
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="温度传感器">温度传感器</option>
                  <option value="电流传感器">电流传感器</option>
                  <option value="电压传感器">电压传感器</option>
                  <option value="湿度传感器">湿度传感器</option>
                  <option value="控制器">控制器</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  所属区域
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="1-10MWh电池阵列A区">1-10MWh电池阵列A区</option>
                  <option value="1-10MWh电池阵列B区">1-10MWh电池阵列B区</option>
                  <option value="1-10MWh电池阵列C区">1-10MWh电池阵列C区</option>
                  <option value="户外动力区">户外动力区</option>
                  <option value="集装箱高压配电区">集装箱高压配电区</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  所属分组
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="核心设备">核心设备</option>
                  <option value="辅助设备">辅助设备</option>
                  <option value="传感器">传感器</option>
                  <option value="控制器">控制器</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowAddDeviceModal(false)}
              >
                取消
              </button>
              <button className="btn-primary btn-click">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑设备模态框 */}
      {showEditDeviceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">编辑设备</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowEditDeviceModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  value={selectedDevice}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  placeholder="输入设备名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备类型
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="温度传感器">温度传感器</option>
                  <option value="电流传感器">电流传感器</option>
                  <option value="电压传感器">电压传感器</option>
                  <option value="湿度传感器">湿度传感器</option>
                  <option value="控制器">控制器</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  所属区域
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="1-10MWh电池阵列A区">1-10MWh电池阵列A区</option>
                  <option value="1-10MWh电池阵列B区">1-10MWh电池阵列B区</option>
                  <option value="1-10MWh电池阵列C区">1-10MWh电池阵列C区</option>
                  <option value="户外动力区">户外动力区</option>
                  <option value="集装箱高压配电区">集装箱高压配电区</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  所属分组
                </label>
                <select
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                >
                  <option value="核心设备">核心设备</option>
                  <option value="辅助设备">辅助设备</option>
                  <option value="传感器">传感器</option>
                  <option value="控制器">控制器</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowEditDeviceModal(false)}
              >
                取消
              </button>
              <button className="btn-primary btn-click">
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 配置设备模态框 */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">设备配置</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowConfigModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  value={selectedDevice}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  placeholder="输入设备名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  采样频率 (Hz)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  placeholder="输入采样频率"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  预警阈值 (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  placeholder="输入预警阈值"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  报警阈值 (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  placeholder="输入报警阈值"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowConfigModal(false)}
              >
                取消
              </button>
              <button 
                className="btn-primary btn-click"
                onClick={handleSave}
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 诊断设备模态框 */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">设备诊断</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowDiagnosticModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  设备ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
                  value={selectedDevice}
                  readOnly
                />
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-3">诊断结果</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">设备状态:</span>
                    <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">通信状态:</span>
                    <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">传感器读数:</span>
                    <span className="text-white">58.3°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">固件版本:</span>
                    <span className="text-white">v1.3.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowDiagnosticModal(false)}
              >
                关闭
              </button>
              <button 
                className="btn-primary btn-click"
                onClick={handleDiagnose}
              >
                开始诊断
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 成功消息提示 */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-success/20 text-success px-4 py-2 rounded-lg border border-success/40 shadow-lg z-50 animate-scaleIn">
          <div className="flex items-center space-x-2">
            <span>✓</span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* 搜索结果显示 */}
      {searchResults.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-2xl border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">搜索结果</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSearchResults([])}
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-lighter">
                    <th className="text-left py-3 px-4 text-gray-400">设备ID</th>
                    <th className="text-left py-3 px-4 text-gray-400">设备类型</th>
                    <th className="text-left py-3 px-4 text-gray-400">区域</th>
                    <th className="text-left py-3 px-4 text-gray-400">状态</th>
                    <th className="text-left py-3 px-4 text-gray-400">IP地址</th>
                    <th className="text-left py-3 px-4 text-gray-400">上次在线</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((device) => (
                    <tr key={device.id} className="border-b border-dark-lighter">
                      <td className="py-3 px-4">{device.id}</td>
                      <td className="py-3 px-4">{device.type}</td>
                      <td className="py-3 px-4">{device.area}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 ${device.status === '在线' ? 'bg-success/20 text-success' : device.status === '离线' ? 'bg-danger/20 text-danger' : device.status === '故障' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'} rounded-full text-xs`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{device.ip}</td>
                      <td className="py-3 px-4">{device.lastOnline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setSearchResults([])}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 加载中状态 */}
      {isSearching && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-gray-300">搜索中...</p>
          </div>
        </div>
      )}

      {/* 删除设备模态框 */}
      {showDeleteDeviceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark rounded-lg p-6 w-full max-w-md border border-dark-lighter">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">删除设备</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowDeleteDeviceModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-300">确定要删除设备 <span className="font-medium text-white">{selectedDevice}</span> 吗？此操作不可恢复。</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                className="btn-secondary btn-click"
                onClick={() => setShowDeleteDeviceModal(false)}
              >
                取消
              </button>
              <button 
                className="text-danger bg-danger/10 hover:bg-danger/20 px-4 py-2 rounded-lg transition-colors btn-click"
                onClick={() => {
                  setShowDeleteDeviceModal(false);
                  setSuccessMessage('删除成功');
                  setShowSuccessMessage(true);
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 3000);
                }}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;