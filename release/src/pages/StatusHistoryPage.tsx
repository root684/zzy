import React, { useState, useEffect } from 'react';
import StatusHistoryChart from '../components/dashboard/StatusHistoryChart';

/**
 * 状态历史页面
 * 用于展示状态历史图表组件的使用示例
 */
const StatusHistoryPage: React.FC = () => {
  const [statusData, setStatusData] = useState<{
    timestamp: string;
    status: number;
    isKeyNode?: boolean;
  }[]>([]);

  // 生成30天的模拟数据
  useEffect(() => {
    const generateMockData = () => {
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
        
        // 生成随机状态值（0-100）
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
    
    setStatusData(generateMockData());
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">状态历史图表示例</h1>
        <p className="text-gray-400 mt-2">
          此页面展示了状态历史图表组件的使用示例，包含30天的模拟数据，
          支持缩放、平移交互功能，并能清晰标识关键状态节点。
        </p>
      </div>
      
      <div className="bg-dark-light rounded-lg p-4 shadow-lg">
        <div className="h-96 w-full">
          <StatusHistoryChart 
            data={statusData} 
            title="30天状态历史趋势"
          />
        </div>
      </div>
      
      <div className="mt-8 bg-dark-light rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">图表功能说明</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>支持显示至少30天的历史数据</li>
          <li>提供缩放、平移交互功能</li>
          <li>清晰标识关键状态节点（红色圆点）</li>
          <li>响应式设计，适配不同屏幕尺寸</li>
          <li>性能优化，在数据量较大时仍保持流畅交互</li>
          <li>视觉设计与现有界面风格保持一致</li>
        </ul>
      </div>
    </div>
  );
};

export default StatusHistoryPage;
