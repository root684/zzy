import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import dataIntegrationService from '../../utils/dataIntegrationService';
// 从默认导出中获取类型
type SmartWeatherData = ReturnType<typeof dataIntegrationService.getData>['weather'];

interface WeatherMapProps {
  data: SmartWeatherData;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ data }) => {
  const mapChartRef = useRef<HTMLDivElement>(null);
  const mapChartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (mapChartRef.current) {
      // 初始化图表
      mapChartInstance.current = echarts.init(mapChartRef.current);

      // 准备数据
      const scatterData = data.observationPoints.map((point) => ({
        name: point.name,
        value: [point.location[0], point.location[1]]
      }));

      // 配置选项 - 使用散点图替代地图
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        xAxis: {
          type: 'value',
          name: '经度',
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          },
          splitLine: {
            lineStyle: {
              color: '#1F2937'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '纬度',
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          },
          splitLine: {
            lineStyle: {
              color: '#1F2937'
            }
          }
        },
        series: [
          {
            name: '观测点',
            type: 'scatter',
            data: scatterData,
            symbolSize: 10,
            itemStyle: {
              color: '#3B82F6'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(59, 130, 246, 0.5)'
              }
            }
          }
        ]
      };

      mapChartInstance.current.setOption(option);

      // 响应式调整
      const handleResize = () => {
        mapChartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        mapChartInstance.current?.dispose();
      };
    }
  }, [data]);

  return (
    <div>
      <div ref={mapChartRef} style={{ height: '350px' }}></div>
      <div className="mt-4">
        <h4 className="text-white font-medium mb-3">观测点列表</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.observationPoints.map((point, index) => (
            <div key={index} className="bg-dark-light/40 p-3 rounded-lg flex justify-between items-center">
              <div>
                <div className="text-white font-medium">{point.name}</div>
                <div className="text-sm text-gray-400">
                  坐标: {point.location[0].toFixed(4)}, {point.location[1].toFixed(4)}
                </div>
              </div>
              <div className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs">
                实时监测
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
