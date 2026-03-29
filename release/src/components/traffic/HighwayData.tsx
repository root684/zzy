import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface Incident {
  id: string;
  type: string;
  location: string;
  status: string;
  timestamp: string;
}

interface SubstationDataProps {
  data: {
    powerOutput: number;
    loadPercentage: number;
    incidents: Incident[];
  };
}

const HighwayData: React.FC<SubstationDataProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 确保销毁之前的实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      
      // 初始化图表
      chartInstance.current = echarts.init(chartRef.current);

      // 模拟24小时设备运行数据
      const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const flowData = hours.map(() => Math.floor(Math.random() * 3000) + 2000);

      // 配置选项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
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
          boundaryGap: false,
          data: hours,
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF',
            fontSize: 10
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
            name: '设备运行数据',
            type: 'line',
            stack: 'Total',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                { offset: 1, color: 'rgba(30, 64, 175, 0.1)' }
              ])
            },
            lineStyle: {
              color: '#3B82F6'
            },
            emphasis: {
              focus: 'series'
            },
            data: flowData
          }
        ]
      };

      // 设置图表
      chartInstance.current.setOption(option);

      // 响应式调整
      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }
  }, []);

  // 根据状态获取颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '处理中':
        return 'text-yellow-500 bg-yellow-900/30';
      case '已处理':
        return 'text-green-500 bg-green-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* 变电站运行概览 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-light/40 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">电力输出</div>
          <div className="text-2xl font-bold text-white">
            {data.powerOutput.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-gray-400">kW</div>
        </div>
        <div className="bg-dark-light/40 p-4 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">负载百分比</div>
          <div className="text-2xl font-bold text-white">
            {data.loadPercentage}%
          </div>
          <div className="mt-2 text-xs text-gray-400">百分比</div>
        </div>
      </div>

      {/* 电力输出趋势 */}
      <div>
        <h3 className="text-white font-medium mb-4">24小时电力输出趋势</h3>
        <div ref={chartRef} style={{ height: '200px' }}></div>
      </div>

      {/* 电力事件 */}
      <div>
        <h3 className="text-white font-medium mb-3">电力事件</h3>
        <div className="space-y-3">
          {data.incidents.map((incident) => (
            <div key={incident.id} className="bg-dark-light/40 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white font-medium">{incident.type}</div>
                  <div className="text-gray-400 text-sm mt-1">{incident.location}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {new Date(incident.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {data.incidents.length === 0 && (
            <div className="text-gray-400 text-center py-4">
              暂无设备事件
            </div>
          )}
        </div>
      </div>

      {/* 变电站状态 */}
      <div className="bg-blue-900/30 border border-blue-900/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <div className="text-white font-medium">变电站状态</div>
              <div className="text-sm text-gray-400">当前运行正常</div>
            </div>
          </div>
          <div className="text-blue-400 text-sm">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            实时更新
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighwayData;
