import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface SystemEfficiency3DChartProps {
  data: number[];
  labels: string[];
}

const SystemEfficiency3DChart: React.FC<SystemEfficiency3DChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [timeRange, setTimeRange] = useState('today');

  // 模拟不同时间范围的数据
  const getTimeRangeData = () => {
    switch (timeRange) {
      case 'today':
        return data.slice(-24);
      case 'week':
        return data.slice(-168);
      case 'month':
        return data.slice(-720);
      default:
        return data;
    }
  };

  const getTimeRangeLabels = () => {
    switch (timeRange) {
      case 'today':
        return labels.slice(-24).map((_, i) => `${i}:00`);
      case 'week':
        return labels.slice(-168).filter((_, i) => i % 6 === 0).map((_, i) => `Day ${Math.floor(i / 6) + 1}`);
      case 'month':
        return labels.slice(-720).filter((_, i) => i % 24 === 0).map((_, i) => `Day ${i + 1}`);
      default:
        return labels;
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      try {
        // 先销毁旧的图表实例
        if (chartInstance.current) {
          chartInstance.current.dispose();
        }
        
        // 创建新的图表实例
        chartInstance.current = echarts.init(chartRef.current);

        const updateChart = () => {
          const timeRangeData = getTimeRangeData();
          const timeRangeLabels = getTimeRangeLabels();

          const option = {
            title: {
              text: '系统效率趋势',
              textStyle: {
                color: '#ffffff'
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: '{b}: {c}%'
            },
            legend: {
              data: ['系统效率'],
              textStyle: {
                color: '#ffffff'
              }
            },
            xAxis: {
              type: 'category',
              data: timeRangeLabels,
              axisLabel: {
                color: '#ffffff'
              }
            },
            yAxis: {
              type: 'value',
              name: '效率 (%)',
              min: 80,
              max: 100,
              axisLabel: {
                color: '#ffffff'
              }
            },
            series: [
              {
                name: '系统效率',
                type: 'bar',
                data: timeRangeData,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#ff4d4f' },
                    { offset: 1, color: '#ff7a45' }
                  ]),
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  shadowColor: 'rgba(255, 77, 79, 0.5)'
                },
                emphasis: {
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#ff7a45' },
                      { offset: 1, color: '#ff4d4f' }
                    ])
                  }
                }
              }
            ],
            toolbox: {
              feature: {
                saveAsImage: {
                  name: '系统效率趋势'
                }
              }
            }
          };

          chartInstance.current?.setOption(option);
        };

        updateChart();

        const handleResize = () => {
          chartInstance.current?.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chartInstance.current) {
            chartInstance.current.dispose();
            chartInstance.current = null;
          }
        };
      } catch (error) {
        console.error('初始化图表时出错:', error);
      }
    }
  }, [data, labels, timeRange]);

  return (
    <div className="h-64">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${timeRange === 'today' ? 'bg-red-500 text-white' : 'bg-dark-light text-gray-300'}`}
            onClick={() => setTimeRange('today')}
          >
            今日
          </button>
          <button
            className={`px-3 py-1 rounded ${timeRange === 'week' ? 'bg-red-500 text-white' : 'bg-dark-light text-gray-300'}`}
            onClick={() => setTimeRange('week')}
          >
            本周
          </button>
          <button
            className={`px-3 py-1 rounded ${timeRange === 'month' ? 'bg-red-500 text-white' : 'bg-dark-light text-gray-300'}`}
            onClick={() => setTimeRange('month')}
          >
            本月
          </button>
        </div>
      </div>
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default SystemEfficiency3DChart;