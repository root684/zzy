import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import dataIntegrationService from '../../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartWeatherData = ReturnType<typeof dataIntegrationService.getData>['weather'];

interface WindRainfallProps {
  data: SmartWeatherData;
}

const WindRainfall: React.FC<WindRainfallProps> = ({ data }) => {
  const windChartRef = useRef<HTMLDivElement>(null);
  const windChartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (windChartRef.current) {
      // 确保销毁之前的实例
      if (windChartInstance.current) {
        windChartInstance.current.dispose();
      }
      
      // 初始化风向图
      windChartInstance.current = echarts.init(windChartRef.current);

      // 配置选项
      const windOption = {
        tooltip: {},
        radar: {
          indicator: [
            { name: 'N', max: 12 },
            { name: 'NNE', max: 12 },
            { name: 'NE', max: 12 },
            { name: 'ENE', max: 12 },
            { name: 'E', max: 12 },
            { name: 'ESE', max: 12 },
            { name: 'SE', max: 12 },
            { name: 'SSE', max: 12 },
            { name: 'S', max: 12 },
            { name: 'SSW', max: 12 },
            { name: 'SW', max: 12 },
            { name: 'WSW', max: 12 },
            { name: 'W', max: 12 },
            { name: 'WNW', max: 12 },
            { name: 'NW', max: 12 },
            { name: 'NNW', max: 12 }
          ],
          axisName: {
            color: '#9CA3AF'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.4)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.4)'
            }
          },
          splitArea: {
            areaStyle: {
              color: 'rgba(255, 255, 255, 0)'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: [2.8, 5.3, 7.1, 5.4, 10.6, 8.5, 5.1, 2.1, 2.9, 4.0, 9.4, 6.3, 3.5, 0.9, 1, 0.9],
              name: '风速',
              areaStyle: {
                color: 'rgba(59, 130, 246, 0.5)'
              },
              lineStyle: {
                color: 'rgba(59, 130, 246, 0.7)'
              },
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: {
                color: '#3B82F6'
              }
            }
          ]
        }]
      };

      windChartInstance.current.setOption(windOption);

      // 响应式调整
      const handleResize = () => {
        windChartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        windChartInstance.current?.dispose();
        windChartInstance.current = null;
      };
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* 风向图 */}
      <div>
        <h3 className="text-white font-medium mb-4">风向分析</h3>
        <div ref={windChartRef} style={{ height: '250px' }}></div>
      </div>

      {/* 风速和降雨量 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 风速 */}
        <div className="bg-dark-light/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">风速</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">当前风速</span>
                <span className="text-white font-medium">{data.wind.speed} m/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full"
                  style={{ width: `${(data.wind.speed / 20) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">阵风风速</span>
                <span className="text-white font-medium">{data.wind.gust} m/s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full"
                  style={{ width: `${(data.wind.gust / 20) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-400">风向：</span>
              <span className="text-white ml-2">{data.wind.direction}</span>
            </div>
          </div>
        </div>

        {/* 降雨量 */}
        <div className="bg-dark-light/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">降雨量</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">今日</span>
              <span className="text-white font-medium">{data.rainfall.daily} mm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">本周</span>
              <span className="text-white font-medium">{data.rainfall.weekly} mm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">本月</span>
              <span className="text-white font-medium">{data.rainfall.monthly} mm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">本年</span>
              <span className="text-white font-medium">{data.rainfall.yearly} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindRainfall;
