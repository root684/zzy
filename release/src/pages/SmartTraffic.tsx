import { useEffect, useState } from 'react';
import dataIntegrationService from '../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartTrafficData = ReturnType<typeof dataIntegrationService.getData>['traffic'];
import VideoMonitoring from '../components/traffic/VideoMonitoring';
import TourismData from '../components/traffic/TourismData';
import HighwayData from '../components/traffic/HighwayData';

const SmartTraffic: React.FC = () => {
  const [trafficData, setTrafficData] = useState<SmartTrafficData | null>(null);

  useEffect(() => {
    // 初始化数据
    dataIntegrationService.simulateDataUpdate();
    
    // 获取初始数据
    const data = dataIntegrationService.getData();
    setTrafficData(data.traffic);

    // 订阅数据变化
    const unsubscribe = dataIntegrationService.subscribe(() => {
      const updatedData = dataIntegrationService.getData();
      setTrafficData(updatedData.traffic);
    });

    return unsubscribe;
  }, []);

  if (!trafficData || !trafficData.substationData || !trafficData.powerData || !trafficData.substationData.equipmentCount || !trafficData.powerData.powerOutput) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">变电站设备监控</h1>
        <div className="text-sm text-gray-400">
          最后更新: {new Date().toLocaleString()}
        </div>
      </div>

      {/* 数据概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">监控摄像头</div>
          <div className="text-3xl font-bold text-white">
            {trafficData.videoMonitoring.cameras.length}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              正常运行
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">设备总数</div>
          <div className="text-3xl font-bold text-white">
            {trafficData.substationData.equipmentCount.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-blue-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              今日数据
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">电力输出</div>
          <div className="text-3xl font-bold text-white">
            {trafficData.powerData.powerOutput.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-yellow-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              负载率: {trafficData.powerData.loadPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* 视频监控模块 */}
      <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
        <h2 className="text-xl font-semibold text-white mb-4">变电站视频监控</h2>
        <VideoMonitoring data={trafficData.videoMonitoring} />
      </div>

      {/* 设备数据和运行状态 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 设备数据 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">变电站设备运行数据</h2>
          <TourismData data={trafficData.substationData} />
        </div>

        {/* 运行状态分析 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">变电站运行状态分析</h2>
          <HighwayData data={trafficData.powerData} />
        </div>
      </div>
    </div>
  );
};

export default SmartTraffic;
