import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface RuntimeTrend3DChartProps {
  uptimeData: number[];
  downtimeData: number[];
  labels: string[];
}

const RuntimeTrend3DChart: React.FC<RuntimeTrend3DChartProps> = ({ uptimeData, downtimeData, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

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
          // 准备数据
          const displayData = uptimeData.slice(-24);
          const displayDowntimeData = downtimeData.slice(-24);
          const timeLabels = labels.slice(-24).map((_, i) => `${i}:00`);

          const option = {
            title: {
              text: '运行时间趋势',
              textStyle: {
                color: '#ffffff'
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: (params: any) => {
                let result = `${params[0].name}<br/>`;
                params.forEach((item: any) => {
                  result += `${item.seriesName}: ${item.value}分钟<br/>`;
                });
                return result;
              }
            },
            legend: {
              data: ['正常运行时间', '异常中断时间'],
              textStyle: {
                color: '#ffffff'
              }
            },
            xAxis: {
              type: 'category',
              data: timeLabels,
              axisLabel: {
                color: '#ffffff'
              }
            },
            yAxis: {
              type: 'value',
              name: '时间 (分钟)',
              axisLabel: {
                color: '#ffffff'
              }
            },
            series: [
              {
                name: '正常运行时间',
                type: 'bar',
                data: displayData,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#52c41a' },
                    { offset: 1, color: '#73d13d' }
                  ]),
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  shadowColor: 'rgba(82, 196, 26, 0.5)'
                },
                emphasis: {
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#73d13d' },
                      { offset: 1, color: '#52c41a' }
                    ])
                  }
                }
              },
              {
                name: '异常中断时间',
                type: 'bar',
                data: displayDowntimeData,
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
                  name: '运行时间趋势'
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
  }, [uptimeData, downtimeData, labels]);

  return (
    <div className="h-64">
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default RuntimeTrend3DChart;