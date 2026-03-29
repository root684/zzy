import { useEffect, useState } from 'react';
import dataIntegrationService from '../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartWeatherData = ReturnType<typeof dataIntegrationService.getData>['weather'];
import WeatherOverview from '../components/weather/WeatherOverview';
import TemperatureHumidity from '../components/weather/TemperatureHumidity';
import WindRainfall from '../components/weather/WindRainfall';
import WeatherMap from '../components/weather/WeatherMap';

const SmartWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<SmartWeatherData | null>(null);

  useEffect(() => {
    // 初始化数据
    dataIntegrationService.simulateDataUpdate();
    
    // 获取初始数据
    const data = dataIntegrationService.getData();
    setWeatherData(data.weather);

    // 订阅数据变化
    const unsubscribe = dataIntegrationService.subscribe(() => {
      const updatedData = dataIntegrationService.getData();
      setWeatherData(updatedData.weather);
    });

    return unsubscribe;
  }, []);

  if (!weatherData) {
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
        <h1 className="text-2xl font-bold text-white">环境监测</h1>
        <div className="text-sm text-gray-400">
          最后更新: {new Date().toLocaleString()}
        </div>
      </div>

      {/* 环境概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">气压</div>
          <div className="text-3xl font-bold text-white">
            {weatherData.pressure.relative} hPa
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-blue-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              变电站内气压
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">温度</div>
          <div className="text-3xl font-bold text-white">
            {weatherData.temperature.outdoor}°C
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-green-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              设备温度
            </span>
          </div>
        </div>

        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <div className="text-sm text-gray-400 mb-2">湿度</div>
          <div className="text-3xl font-bold text-white">
            {weatherData.humidity.outdoor}%
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-cyan-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              变电站内湿度
            </span>
          </div>
        </div>
      </div>

      {/* 温度和湿度 */}
      <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
        <h2 className="text-xl font-semibold text-white mb-4">温度和湿度监测</h2>
        <TemperatureHumidity data={weatherData} />
      </div>

      {/* 通风和降雨量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">通风和降雨量</h2>
          <WindRainfall data={weatherData} />
        </div>

        {/* 监测点分布 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
          <h2 className="text-xl font-semibold text-white mb-4">监测点分布</h2>
          <WeatherMap data={weatherData} />
        </div>
      </div>

      {/* 环境概览 */}
      <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50">
        <h2 className="text-xl font-semibold text-white mb-4">环境监测概览</h2>
        <WeatherOverview data={weatherData} />
      </div>
    </div>
  );
};

export default SmartWeather;
