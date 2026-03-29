import { useEffect, useState } from 'react';
import dataIntegrationService from '../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartIOTData = ReturnType<typeof dataIntegrationService.getData>['iot'];
import DeviceStatus from '../components/iot/DeviceStatus';
import FactoryList from '../components/iot/FactoryList';
import AlarmInfo from '../components/iot/AlarmInfo';
import IndustryDistribution from '../components/iot/IndustryDistribution';

const SmartIOT: React.FC = () => {
  const [iotData, setIotData] = useState<SmartIOTData | null>(null);

  useEffect(() => {
    // 初始化数据
    dataIntegrationService.simulateDataUpdate();
    
    // 获取初始数据
    const data = dataIntegrationService.getData();
    setIotData(data.iot);

    // 订阅数据变化
    const unsubscribe = dataIntegrationService.subscribe(() => {
      const updatedData = dataIntegrationService.getData();
      setIotData(updatedData.iot);
    });

    return unsubscribe;
  }, []);

  if (!iotData) {
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
        <h1 className="text-2xl font-bold text-white">数据分析</h1>
        <div className="text-sm text-gray-400">
          最后更新: {new Date().toLocaleString()}
        </div>
      </div>

      {/* 设备概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">终端设备数</div>
          <div className="text-3xl font-bold text-white">
            {iotData.devices.dtuCount}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-blue-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              数据采集终端
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">控制设备数</div>
          <div className="text-3xl font-bold text-white">
            {iotData.devices.plcCount}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              可编程控制器
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">在线设备</div>
          <div className="text-3xl font-bold text-white">
            {iotData.devices.onlineCount}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              正常运行
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">离线设备</div>
          <div className="text-3xl font-bold text-white">
            {iotData.devices.offlineCount}
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-red-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              需要注意
            </span>
          </div>
        </div>
      </div>

      {/* 设备状态和告警信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 设备状态 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">设备状态</h2>
          <DeviceStatus data={iotData.devices} />
        </div>

        {/* 告警信息 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">告警信息</h2>
          <AlarmInfo data={iotData.alarms} />
        </div>

        {/* 设备分布 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">设备分布</h2>
          <IndustryDistribution data={iotData.industryDistribution} />
        </div>
      </div>

      {/* 变电站列表 */}
      <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
        <h2 className="text-xl font-semibold text-white mb-4">变电站监控列表</h2>
        <FactoryList data={iotData.factories} />
      </div>
    </div>
  );
};

export default SmartIOT;
