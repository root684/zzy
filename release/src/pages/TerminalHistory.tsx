import React, { useState, useEffect } from 'react';

interface TerminalHistory {
  id: string;
  terminalId: string;
  area: string;
  eventType: 'online' | 'offline' | 'alarm' | 'normal' | 'maintenance';
  temperature: number;
  voltage: number;
  current: number;
  power: number;
  timestamp: string;
  message: string;
}

/**
 * 终端历史页面
 * 用于查看终端的历史事件和状态变化
 */
const TerminalHistory: React.FC = () => {
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      id: '1',
      terminalId: 'T005',
      area: '1-10MWh电池阵列A区',
      eventType: 'alarm',
      temperature: 62.1,
      voltage: 385.2,
      current: 52.3,
      power: 19946.46,
      timestamp: '2026-02-27 10:15:30',
      message: '温度超过阈值，触发预警'
    },
    {
      id: '2',
      terminalId: 'T053',
      area: '1-10MWh电池阵列B区',
      eventType: 'alarm',
      temperature: 60.7,
      voltage: 382.1,
      current: 51.8,
      power: 19802.78,
      timestamp: '2026-02-27 09:45:12',
      message: '温度超过阈值，触发预警'
    },
    {
      id: '3',
      terminalId: 'T182',
      area: '1-10MWh电池阵列C区',
      eventType: 'alarm',
      temperature: 72.2,
      voltage: 390.5,
      current: 55.2,
      power: 21555.6,
      timestamp: '2026-02-27 08:30:45',
      message: '温度严重超过阈值，触发告警'
    },
    {
      id: '4',
      terminalId: 'T180',
      area: '1-10MWh电池阵列D区',
      eventType: 'alarm',
      temperature: 68.9,
      voltage: 388.7,
      current: 54.1,
      power: 20928.67,
      timestamp: '2026-02-27 07:15:22',
      message: '温度超过阈值，触发预警'
    },
    {
      id: '5',
      terminalId: 'T005',
      area: '1-10MWh电池阵列A区',
      eventType: 'normal',
      temperature: 45.3,
      voltage: 380.0,
      current: 50.0,
      power: 19000.0,
      timestamp: '2026-02-26 23:59:59',
      message: '终端状态恢复正常'
    },
    {
      id: '6',
      terminalId: 'T053',
      area: '1-10MWh电池阵列B区',
      eventType: 'normal',
      temperature: 44.8,
      voltage: 379.5,
      current: 49.8,
      power: 18909.1,
      timestamp: '2026-02-26 23:45:00',
      message: '终端状态恢复正常'
    },
    {
      id: '7',
      terminalId: 'T182',
      area: '1-10MWh电池阵列C区',
      eventType: 'maintenance',
      temperature: 42.1,
      voltage: 378.9,
      current: 49.2,
      power: 18641.88,
      timestamp: '2026-02-26 22:30:15',
      message: '终端进入维护模式'
    },
    {
      id: '8',
      terminalId: 'T180',
      area: '1-10MWh电池阵列D区',
      eventType: 'normal',
      temperature: 43.5,
      voltage: 379.2,
      current: 49.5,
      power: 18770.4,
      timestamp: '2026-02-26 21:15:30',
      message: '终端状态恢复正常'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventType, setEventType] = useState('all');

  const uniqueTerminals = [...new Set(history.map(item => item.terminalId))];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索逻辑
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.terminalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTerminal = selectedTerminal ? item.terminalId === selectedTerminal : true;
    const matchesType = eventType === 'all' ? true : item.eventType === eventType;
    // 日期过滤逻辑可以在这里添加
    return matchesSearch && matchesTerminal && matchesType;
  });

  const getEventColor = (type: string) => {
    switch (type) {
      case 'online': return 'bg-success/20 text-success';
      case 'offline': return 'bg-danger/20 text-danger';
      case 'alarm': return 'bg-warning/20 text-warning';
      case 'normal': return 'bg-info/20 text-info';
      case 'maintenance': return 'bg-primary/20 text-primary';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getEventText = (type: string) => {
    switch (type) {
      case 'online': return '上线';
      case 'offline': return '离线';
      case 'alarm': return '告警';
      case 'normal': return '正常';
      case 'maintenance': return '维护';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">终端历史</h1>
        <button 
          className="btn-secondary flex items-center space-x-2"
        >
          <span>📤</span>
          <span>导出历史</span>
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="card">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">终端ID</label>
            <input
              type="text"
              placeholder="搜索终端..."
              className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">选择终端</label>
            <select
              className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              value={selectedTerminal}
              onChange={(e) => setSelectedTerminal(e.target.value)}
            >
              <option value="">所有终端</option>
              {uniqueTerminals.map(terminal => (
                <option key={terminal} value={terminal}>{terminal}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">事件类型</label>
            <select
              className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="all">所有类型</option>
              <option value="online">上线</option>
              <option value="offline">离线</option>
              <option value="alarm">告警</option>
              <option value="normal">正常</option>
              <option value="maintenance">维护</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              className="btn-primary w-full"
            >
              筛选
            </button>
          </div>
        </form>
      </div>

      {/* 历史记录表格 */}
      <div className="card">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-lighter">
                <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
                <th className="text-left py-3 px-4 text-gray-400">区域</th>
                <th className="text-left py-3 px-4 text-gray-400">事件类型</th>
                <th className="text-left py-3 px-4 text-gray-400">温度 (°C)</th>
                <th className="text-left py-3 px-4 text-gray-400">电压 (V)</th>
                <th className="text-left py-3 px-4 text-gray-400">电流 (A)</th>
                <th className="text-left py-3 px-4 text-gray-400">功率 (W)</th>
                <th className="text-left py-3 px-4 text-gray-400">时间</th>
                <th className="text-left py-3 px-4 text-gray-400">消息</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr 
                  key={item.id} 
                  className="border-b border-dark-lighter hover:bg-dark transition-colors duration-300"
                >
                  <td className="py-3 px-4 font-medium">{item.terminalId}</td>
                  <td className="py-3 px-4">{item.area}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(item.eventType)}`}>
                      {getEventText(item.eventType)}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-medium ${
                    item.temperature > 60 ? 'text-warning' : item.temperature > 70 ? 'text-danger' : 'text-success'
                  }`}>
                    {item.temperature}
                  </td>
                  <td className="py-3 px-4">{item.voltage}</td>
                  <td className="py-3 px-4">{item.current}</td>
                  <td className="py-3 px-4">{item.power.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-400">{item.timestamp}</td>
                  <td className="py-3 px-4">{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-400 text-sm mb-1">总事件数</div>
              <div className="text-2xl font-bold">{history.length}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-secondary text-xl">📊</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-400 text-sm mb-1">告警事件</div>
              <div className="text-2xl font-bold text-warning">{history.filter(item => item.eventType === 'alarm').length}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
              <span className="text-warning text-xl">⚠️</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-400 text-sm mb-1">离线事件</div>
              <div className="text-2xl font-bold text-danger">{history.filter(item => item.eventType === 'offline').length}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center">
              <span className="text-danger text-xl">📴</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-400 text-sm mb-1">正常事件</div>
              <div className="text-2xl font-bold text-success">{history.filter(item => item.eventType === 'normal').length}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success text-xl">✅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHistory;