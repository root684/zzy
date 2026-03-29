import React from 'react';

interface Factory {
  id: string;
  company: string;
  dtuCnt: number;
  plcCnt: number;
  dataCnt: number;
  alarm: number;
}

interface FactoryListProps {
  data: Factory[];
}

const FactoryList: React.FC<FactoryListProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-dark-light/60 border-b border-blue-900/50">
          <tr>
            <th className="px-4 py-3 text-gray-400 font-medium">公司名称</th>
            <th className="px-4 py-3 text-gray-400 font-medium">DTU数量</th>
            <th className="px-4 py-3 text-gray-400 font-medium">PLC数量</th>
            <th className="px-4 py-3 text-gray-400 font-medium">数据量</th>
            <th className="px-4 py-3 text-gray-400 font-medium">告警数量</th>
            <th className="px-4 py-3 text-gray-400 font-medium">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-900/30">
          {data.map((factory) => (
            <tr key={factory.id} className="hover:bg-dark-light/40 transition-colors">
              <td className="px-4 py-4 text-white font-medium">{factory.company}</td>
              <td className="px-4 py-4 text-white">{factory.dtuCnt}</td>
              <td className="px-4 py-4 text-white">{factory.plcCnt}</td>
              <td className="px-4 py-4 text-white">{factory.dataCnt.toLocaleString()}</td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${factory.alarm > 0 ? 'bg-red-900/50 text-red-500' : 'bg-green-900/50 text-green-500'}`}>
                  {factory.alarm}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-900/50 text-blue-400 text-xs rounded hover:bg-blue-800/50 transition-colors">
                    告警记录
                  </button>
                  <button className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded hover:bg-green-800/50 transition-colors">
                    历史数据
                  </button>
                  <button className="px-3 py-1 bg-purple-900/50 text-purple-400 text-xs rounded hover:bg-purple-800/50 transition-colors">
                    组态应用
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-gray-400 text-center py-8">
          暂无工厂数据
        </div>
      )}
    </div>
  );
};

export default FactoryList;
