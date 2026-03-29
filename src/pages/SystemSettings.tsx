import { useState } from 'react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('system');

  const handleSaveSettings = () => {
    // 模拟保存设置操作
    console.log('保存系统设置');
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 模拟导入配置操作
    console.log('导入配置', e.target.files);
  };

  const handleExportConfig = () => {
    // 模拟导出配置操作
    console.log('导出配置');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">系统设置</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
            恢复默认
          </button>
          <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
            保存设置
          </button>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'system' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('system')}
          >
            系统参数
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('users')}
          >
            用户权限
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'alarm' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('alarm')}
          >
            告警阈值
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'import-export' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('import-export')}
          >
            导入导出
          </button>
        </div>

        {activeTab === 'system' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">基本设置</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        系统名称
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入系统名称"
                        defaultValue="储能电站监控系统"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        系统版本
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        defaultValue="v1.0.0"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        数据刷新间隔 (秒)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        defaultValue="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        历史数据保留时间 (天)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        defaultValue="365"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        服务器地址
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入服务器地址"
                        defaultValue="http://localhost:8080"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        数据库连接
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入数据库连接字符串"
                        defaultValue="mongodb://localhost:27017/yixiaopai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        日志级别
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                      >
                        <option value="debug">Debug</option>
                        <option value="info" selected>Info</option>
                        <option value="warn">Warn</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        系统语言
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                      >
                        <option value="zh-CN" selected>简体中文</option>
                        <option value="en-US">English</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">网络设置</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        监听端口
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        defaultValue="3000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        最大连接数
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        defaultValue="100"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        防火墙设置
                      </label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="firewall" checked />
                        <label htmlFor="firewall">启用防火墙</label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        允许的IP地址
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="多个IP地址用逗号分隔"
                        defaultValue="192.168.1.0/24, 10.0.0.0/8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">用户管理</h2>
                <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
                  添加用户
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-lighter">
                      <th className="text-left py-3 px-4 text-gray-400">用户名</th>
                      <th className="text-left py-3 px-4 text-gray-400">姓名</th>
                      <th className="text-left py-3 px-4 text-gray-400">角色</th>
                      <th className="text-left py-3 px-4 text-gray-400">联系邮箱</th>
                      <th className="text-left py-3 px-4 text-gray-400">状态</th>
                      <th className="text-left py-3 px-4 text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">admin</td>
                      <td className="py-3 px-4">系统管理员</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">系统管理员</span>
                      </td>
                      <td className="py-3 px-4">admin@system.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary hover:underline">编辑</button>
                          <button className="text-danger hover:underline">删除</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">operator</td>
                      <td className="py-3 px-4">张伟</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-info/20 text-info rounded-full text-xs">运维人员</span>
                      </td>
                      <td className="py-3 px-4">zhangwei@company.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary hover:underline">编辑</button>
                          <button className="text-danger hover:underline">删除</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">viewer</td>
                      <td className="py-3 px-4">李娜</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs">访客</span>
                      </td>
                      <td className="py-3 px-4">lina@company.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary hover:underline">编辑</button>
                          <button className="text-danger hover:underline">删除</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-dark-lighter">
                      <td className="py-3 px-4">engineer01</td>
                      <td className="py-3 px-4">王强</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">工程师</span>
                      </td>
                      <td className="py-3 px-4">wangqiang@company.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-secondary hover:underline">编辑</button>
                          <button className="text-danger hover:underline">删除</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">角色权限管理</h2>
              <div className="space-y-4">
                <div className="bg-dark p-4 rounded-lg border border-dark-lighter">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">系统管理员</h3>
                    <select className="px-3 py-1 bg-dark-lighter border border-dark-lighter rounded-lg">
                      <option>系统管理员</option>
                      <option>运维人员</option>
                      <option>工程师</option>
                      <option>访客</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">系统功能</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-system" checked />
                          <label htmlFor="perm-system">系统设置</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-users" checked />
                          <label htmlFor="perm-users">用户管理</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-logs" checked />
                          <label htmlFor="perm-logs">系统日志</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">监控功能</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-realtime" checked />
                          <label htmlFor="perm-realtime">实时监控</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-historical" checked />
                          <label htmlFor="perm-historical">历史数据</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-alarm" checked />
                          <label htmlFor="perm-alarm">告警管理</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-device" checked />
                          <label htmlFor="perm-device">设备管理</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
                      保存权限
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alarm' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">告警阈值设置</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-3">温度阈值 (°C)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        正常范围
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                          placeholder="最小值"
                          defaultValue="0"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                          placeholder="最大值"
                          defaultValue="45"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        关注阈值
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入关注阈值"
                        defaultValue="45"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        预警阈值
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入预警阈值"
                        defaultValue="55"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        报警阈值
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入报警阈值"
                        defaultValue="70"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        紧急阈值
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入紧急阈值"
                        defaultValue="85"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-3">其他阈值设置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        电流阈值 (A)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入电流阈值"
                        defaultValue="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        电压阈值 (V)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入电压阈值"
                        defaultValue="400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        湿度阈值 (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入湿度阈值"
                        defaultValue="80"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        告警持续时间 (分钟)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入告警持续时间"
                        defaultValue="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        告警重复间隔 (分钟)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
                        placeholder="输入告警重复间隔"
                        defaultValue="30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'import-export' && (
          <div className="mt-6 space-y-6">
            <div className="bg-dark-light rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">配置导入导出</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark p-6 rounded-lg border border-dark-lighter text-center">
                  <h3 className="text-md font-medium mb-4">导入配置</h3>
                  <p className="text-gray-400 text-sm mb-6">上传配置文件以导入系统设置</p>
                  <input
                    type="file"
                    accept=".json, .yaml, .yml"
                    className="hidden"
                    id="importFile"
                    onChange={handleImportConfig}
                  />
                  <label
                    htmlFor="importFile"
                    className="px-6 py-3 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors cursor-pointer inline-block"
                  >
                    选择文件
                  </label>
                  <p className="text-gray-500 text-xs mt-4">支持 .json, .yaml, .yml 格式</p>
                </div>
                <div className="bg-dark p-6 rounded-lg border border-dark-lighter text-center">
                  <h3 className="text-md font-medium mb-4">导出配置</h3>
                  <p className="text-gray-400 text-sm mb-6">导出当前系统配置为文件</p>
                  <button
                    className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors"
                    onClick={handleExportConfig}
                  >
                    导出配置
                  </button>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">包含用户数据</span>
                      <input type="checkbox" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">包含历史数据</span>
                      <input type="checkbox" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">包含告警记录</span>
                      <input type="checkbox" checked />
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

export default SystemSettings;