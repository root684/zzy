import React from 'react';
import dataIntegrationService from '../../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartWeatherData = ReturnType<typeof dataIntegrationService.getData>['weather'];

interface WeatherOverviewProps {
  data: SmartWeatherData;
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ data }) => {
  // 根据温度获取天气状况描述
  const getWeatherCondition = (temperature: number) => {
    if (temperature > 30) return { text: '炎热', icon: '☀️', color: 'text-red-500' };
    if (temperature > 20) return { text: '温暖', icon: '⛅', color: 'text-yellow-500' };
    if (temperature > 10) return { text: '凉爽', icon: '🌤️', color: 'text-blue-400' };
    if (temperature > 0) return { text: '寒冷', icon: '🌥️', color: 'text-blue-500' };
    return { text: '严寒', icon: '❄️', color: 'text-blue-600' };
  };

  const weatherCondition = getWeatherCondition(data.temperature.outdoor);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 天气状况 */}
      <div className="bg-dark-light/40 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">天气状况</div>
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{weatherCondition.icon}</div>
          <div>
            <div className={`text-xl font-bold ${weatherCondition.color}`}>
              {weatherCondition.text}
            </div>
            <div className="text-sm text-gray-400">
              {data.temperature.outdoor}°C
            </div>
          </div>
        </div>
      </div>

      {/* 气压 */}
      <div className="bg-dark-light/40 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">气压</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">相对气压</span>
            <span className="text-white font-medium">{data.pressure.relative} hPa</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">绝对气压</span>
            <span className="text-white font-medium">{data.pressure.absolute} hPa</span>
          </div>
        </div>
      </div>

      {/* 湿度 */}
      <div className="bg-dark-light/40 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">湿度</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">室内湿度</span>
            <span className="text-white font-medium">{data.humidity.indoor}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">室外湿度</span>
            <span className="text-white font-medium">{data.humidity.outdoor}%</span>
          </div>
        </div>
      </div>

      {/* 风速 */}
      <div className="bg-dark-light/40 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">风速</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">当前风速</span>
            <span className="text-white font-medium">{data.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">风向</span>
            <span className="text-white font-medium">{data.wind.direction}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherOverview;
