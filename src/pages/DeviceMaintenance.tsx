import { useState, useEffect } from 'react';
import StatusHistoryChart from '../components/dashboard/StatusHistoryChart';

/**
 * 设备维护页面
 * 实现设备信息管理、维护记录、故障报修及状态监控功能
 */
const DeviceMaintenance = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 设备信息数据
  const [deviceInfo] = useState({
    id: 'T001',
    name: '温度传感器',
    type: '温度传感器',
    model: 'TS-2000',
    manufacturer: '传感器科技有限公司',
    serialNumber: 'TS2023010001',
    installationDate: '2023-01-15',
    location: '1-10MWh电池阵列A区',
    status: '在线',
    ipAddress: '192.168.1.101',
    firmwareVersion: 'v1.2.3',
    lastMaintenance: '2026-01-01',
    nextMaintenance: '2026-04-01'
  });

  // 维护记录数据
  const [maintenanceRecords] = useState([
    {
      id: 'MR001',
      date: '2026-01-01',
      type: '定期维护',
      content: '校准温度传感器，检查连接线缆',
      technician: '张工',
      status: '已完成'
    },
    {
      id: 'MR002',
      date: '2025-10-01',
      type: '定期维护',
      content: '清洁设备，检查散热',
      technician: '李工',
      status: '已完成'
    },
    {
      id: 'MR003',
      date: '2025-07-01',
      type: '故障维修',
      content: '更换传感器探头',
      technician: '王工',
      status: '已完成'
    }
  ]);

  // 故障报修数据
  const [repairRequests] = useState([
    {
      id: 'RR001',
      date: '2025-06-15',
      deviceId: 'T001',
      deviceName: '温度传感器',
      issue: '传感器读数异常',
      status: '已解决',
      technician: '王工',
      solution: '校准传感器'
    },
    {
      id: 'RR002',
      date: '2025-03-20',
      deviceId: 'T001',
      deviceName: '温度传感器',
      issue: '通信中断',
      status: '已解决',
      technician: '李工',
      solution: '重新连接线缆'
    }
  ]);

  // 设备状态数据
  const [deviceStatus] = useState({
    temperature: 45.2,
    voltage: 5.0,
    current: 0.1,
    signalStrength: 95,
    uptime: '15天 8小时 32分钟'
  });

  // 状态历史数据
  const [statusHistoryData, setStatusHistoryData] = useState<{
    timestamp: string;
    status: number;
    isKeyNode?: boolean;
  }[]>([]);

  // 生成30天的状态历史数据
  useEffect(() => {
    const generateStatusHistoryData = () => {
      const data: {
        timestamp: string;
        status: number;
        isKeyNode?: boolean;
      }[] = [];
      
      const today = new Date();
      
      // 生成过去30天的数据
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // 生成随机状态值（0-100），模拟设备状态
        const status = Math.floor(Math.random() * 100);
        
        // 随机标记一些关键节点
        const isKeyNode = Math.random() > 0.8;
        
        data.push({
          timestamp: date.toLocaleDateString('zh-CN'),
          status,
          isKeyNode
        });
      }
      
      return data;
    };
    
    setStatusHistoryData(generateStatusHistoryData());
  }, []);

  const handleSaveInfo = () => {
    // 模拟保存设备信息操作
    console.log('保存设备信息');
    setSuccessMessage('设备信息保存成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleAddMaintenance = () => {
    // 模拟添加维护记录操作
    console.log('添加维护记录');
    setSuccessMessage('维护记录添加成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSubmitRepair = () => {
    // 模拟提交故障报修操作
    console.log('提交故障报修');
    setSuccessMessage('故障报修提交成功');
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up">
        <h1 className="text-2xl font-bold">设备维护</h1>
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
          <button className="btn-primary flex items-center space-x-2 btn-click">
            <span>➕</span>
            <span>添加维护记录</span>
          </button>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('info')}
          >
            设备信息
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'maintenance' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('maintenance')}
          >
            维护记录
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'repair' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('repair')}
          >
            故障报修
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'status' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('status')}
          >
            状态监控
          </button>
        </div>

        {/* 设备信息 */}
        {activeTab === 'info' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">基本信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备ID
                  </label>
                  <input
                    type="text"
                    id="deviceId"
                    name="deviceId"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.id}
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
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备类型
                  </label>
                  <input
                    type="text"
                    id="deviceType"
                    name="deviceType"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.type}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    型号
                  </label>
                  <input
                    type="text"
                    id="deviceModel"
                    name="deviceModel"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.model}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    制造商
                  </label>
                  <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.manufacturer}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    序列号
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.serialNumber}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    安装日期
                  </label>
                  <input
                    type="date"
                    id="installationDate"
                    name="installationDate"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.installationDate}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    位置
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.location}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    IP地址
                  </label>
                  <input
                    type="text"
                    id="ipAddress"
                    name="ipAddress"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.ipAddress}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    固件版本
                  </label>
                  <input
                    type="text"
                    id="firmwareVersion"
                    name="firmwareVersion"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.firmwareVersion}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    上次维护
                  </label>
                  <input
                    type="date"
                    id="lastMaintenance"
                    name="lastMaintenance"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.lastMaintenance}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    下次维护
                  </label>
                  <input
                    type="date"
                    id="nextMaintenance"
                    name="nextMaintenance"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.nextMaintenance}
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  className="btn-primary px-4 py-2 btn-click"
                  onClick={handleSaveInfo}
                >
                  保存信息
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 维护记录 */}
        {activeTab === 'maintenance' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">维护记录</h2>
                <button 
                  className="btn-primary px-4 py-2 btn-click"
                  onClick={handleAddMaintenance}
                >
                  添加记录
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">记录ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">日期</th>
                      <th className="text-left py-3 px-4 text-gray-400">类型</th>
                      <th className="text-left py-3 px-4 text-gray-400">内容</th>
                      <th className="text-left py-3 px-4 text-gray-400">技术员</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-dark-lighter">
                        <td className="py-3 px-4">{record.id}</td>
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">{record.type}</span>
                        </td>
                        <td className="py-3 px-4">{record.content}</td>
                        <td className="py-3 px-4">{record.technician}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">{record.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 故障报修 */}
        {activeTab === 'repair' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">故障报修</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    设备ID
                  </label>
                  <input
                    type="text"
                    id="deviceId"
                    name="deviceId"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.id}
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
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    value={deviceInfo.name}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    故障描述
                  </label>
                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                    rows={4}
                    placeholder="请描述故障情况"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    紧急程度
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button 
                    className="btn-primary px-4 py-2 btn-click"
                    onClick={handleSubmitRepair}
                  >
                    提交报修
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">报修历史</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">报修ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">日期</th>
                      <th className="text-left py-3 px-4 text-gray-400">设备ID</th>
                      <th className="text-left py-3 px-4 text-gray-400">故障描述</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">技术员</th>
                      <th className="text-left py-3 px-4 text-gray-400">解决方案</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repairRequests.map((request) => (
                      <tr key={request.id} className="border-b border-dark-lighter">
                        <td className="py-3 px-4">{request.id}</td>
                        <td className="py-3 px-4">{request.date}</td>
                        <td className="py-3 px-4">{request.deviceId}</td>
                        <td className="py-3 px-4">{request.issue}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">{request.status}</span>
                        </td>
                        <td className="py-3 px-4">{request.technician}</td>
                        <td className="py-3 px-4">{request.solution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 状态监控 */}
        {activeTab === 'status' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">温度</h3>
                <div className="text-2xl font-bold text-secondary">{deviceStatus.temperature}°C</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 0-60°C</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电压</h3>
                <div className="text-2xl font-bold text-secondary">{deviceStatus.voltage}V</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 4.5-5.5V</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">电流</h3>
                <div className="text-2xl font-bold text-secondary">{deviceStatus.current}A</div>
                <div className="text-sm text-gray-400 mt-1">正常范围: 0-0.5A</div>
              </div>
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="text-md font-medium mb-2">信号强度</h3>
                <div className="text-2xl font-bold text-success">{deviceStatus.signalStrength}%</div>
                <div className="text-sm text-gray-400 mt-1">良好</div>
              </div>
            </div>
            
            <div className="bg-dark-light rounded-lg p-4">
              <h3 className="text-md font-medium mb-2">运行时间</h3>
              <div className="text-2xl font-bold text-secondary">{deviceStatus.uptime}</div>
              <div className="text-sm text-gray-400 mt-1">自上次重启以来</div>
            </div>
            
            <div className="bg-dark-light rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">状态历史</h3>
              <p className="text-gray-400 mt-2 mb-4">
                此部分展示了设备状态历史图表，包含30天的模拟数据，
                支持缩放、平移交互功能，并能清晰标识关键状态节点。
              </p>
              <div className="h-96">
                {/* 状态历史图表 */}
                <StatusHistoryChart 
                  data={statusHistoryData} 
                  title="30天状态历史趋势" 
                />
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-white mb-3">图表功能说明</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>支持显示至少30天的历史数据</li>
                  <li>提供缩放、平移交互功能</li>
                  <li>清晰标识关键状态节点（红色圆点）</li>
                  <li>响应式设计，适配不同屏幕尺寸</li>
                  <li>性能优化，在数据量较大时仍保持流畅交互</li>
                  <li>视觉设计与现有界面风格保持一致</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceMaintenance;