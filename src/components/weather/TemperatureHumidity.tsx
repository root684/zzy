import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import dataIntegrationService from '../../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartWeatherData = ReturnType<typeof dataIntegrationService.getData>['weather'];

interface TemperatureHumidityProps {
  data: SmartWeatherData;
}

const TemperatureHumidity: React.FC<TemperatureHumidityProps> = ({ data }) => {
  const tempChartRef = useRef<HTMLDivElement>(null);
  const humChartRef = useRef<HTMLDivElement>(null);
  const tempChartInstance = useRef<echarts.ECharts | null>(null);
  const humChartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // 初始化温度图表
    if (tempChartRef.current) {
      // 确保销毁之前的实例
      if (tempChartInstance.current) {
        tempChartInstance.current.dispose();
      }
      tempChartInstance.current = echarts.init(tempChartRef.current);

      // 准备数据
      const dates = data.temperature.historical.map(item => item.date);
      const minTemps = data.temperature.historical.map(item => item.min);
      const maxTemps = data.temperature.historical.map(item => item.max);

      // 配置选项
      const tempOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['最低温度', '最高温度'],
          textStyle: {
            color: '#9CA3AF'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF',
            formatter: '{value}°C'
          },
          splitLine: {
            lineStyle: {
              color: '#1F2937'
            }
          }
        },
        series: [
          {
            name: '最低温度',
            type: 'line',
            data: minTemps,
            itemStyle: {
              color: '#3B82F6'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
              ])
            }
          },
          {
            name: '最高温度',
            type: 'line',
            data: maxTemps,
            itemStyle: {
              color: '#EF4444'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(239, 68, 68, 0.5)' },
                { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
              ])
            }
          }
        ]
      };

      tempChartInstance.current.setOption(tempOption);
    }

    // 初始化湿度图表
    if (humChartRef.current) {
      // 确保销毁之前的实例
      if (humChartInstance.current) {
        humChartInstance.current.dispose();
      }
      humChartInstance.current = echarts.init(humChartRef.current);

      // 准备数据
      const dates = data.humidity.historical.map(item => item.date);
      const humidityValues = data.humidity.historical.map(item => item.value);

      // 配置选项
      const humOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF',
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#1F2937'
            }
          }
        },
        series: [
          {
            name: '湿度',
            type: 'line',
            data: humidityValues,
            itemStyle: {
              color: '#06B6D4'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(6, 182, 212, 0.5)' },
                { offset: 1, color: 'rgba(6, 182, 212, 0.1)' }
              ])
            }
          }
        ]
      };

      humChartInstance.current.setOption(humOption);
    }

    // 响应式调整
    const handleResize = () => {
      tempChartInstance.current?.resize();
      humChartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tempChartInstance.current?.dispose();
      humChartInstance.current?.dispose();
      tempChartInstance.current = null;
      humChartInstance.current = null;
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 温度图表 */}
      <div>
        <h3 className="text-white font-medium mb-4">温度趋势</h3>
        <div ref={tempChartRef} style={{ height: '300px' }}></div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">室内温度</div>
            <div className="text-xl font-bold text-white">{data.temperature.indoor}°C</div>
          </div>
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">室外温度</div>
            <div className="text-xl font-bold text-white">{data.temperature.outdoor}°C</div>
          </div>
        </div>
      </div>

      {/* 湿度图表 */}
      <div>
        <h3 className="text-white font-medium mb-4">湿度趋势</h3>
        <div ref={humChartRef} style={{ height: '300px' }}></div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">室内湿度</div>
            <div className="text-xl font-bold text-white">{data.humidity.indoor}%</div>
          </div>
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">室外湿度</div>
            <div className="text-xl font-bold text-white">{data.humidity.outdoor}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureHumidity;
