import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TerminalData {
  id: string;
  area: string;
  temperature: number;
  status: 'warning' | 'danger';
  statusText: string;
}

interface AbnormalTerminalListProps {
  terminals: TerminalData[];
}

/**
 * 异常终端列表组件
 * 用于显示系统中的异常终端信息
 */
const AbnormalTerminalList: React.FC<AbnormalTerminalListProps> = ({ terminals }) => {
  const navigate = useNavigate();

  const handleViewTerminal = (id: string) => {
    navigate(`/terminal/${id}`);
  };

  return (
    <div className="card transition-all duration-300 hover:shadow-card-hover">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">异常终端列表</h2>
        <span className="bg-danger/20 text-danger font-medium px-3 py-1 rounded-full text-sm">
          {terminals.length}个异常
        </span>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-lighter">
              <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
              <th className="text-left py-3 px-4 text-gray-400">区域</th>
              <th className="text-left py-3 px-4 text-gray-400">温度 (°C)</th>
              <th className="text-left py-3 px-4 text-gray-400">状态</th>
              <th className="text-left py-3 px-4 text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            {terminals.map((terminal) => (
              <tr 
                key={terminal.id} 
                className="border-b border-dark-lighter hover:bg-dark transition-colors duration-300"
              >
                <td className="py-3 px-4 font-medium">{terminal.id}</td>
                <td className="py-3 px-4">{terminal.area}</td>
                <td className={`py-3 px-4 text-${terminal.status} font-medium`}>
                  {terminal.temperature}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 bg-${terminal.status}/20 text-${terminal.status} rounded-full text-xs font-medium transition-all duration-300`}>
                    {terminal.statusText}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button 
                    className="text-secondary hover:underline font-medium transition-colors duration-300"
                    onClick={() => handleViewTerminal(terminal.id)}
                  >
                    查看
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(AbnormalTerminalList);