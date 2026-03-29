import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ResponseTime3DChartProps {
  data: number[];
  labels: string[];
}

const ResponseTime3DChart: React.FC<ResponseTime3DChartProps> = ({ data, labels }) => {
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
          const responseTimeData = data.slice(-24);
          const timeLabels = labels.slice(-24).map((_, i) => `${i}:00`);
          
          // 计算阈值和异常点
          const average = responseTimeData.reduce((sum, val) => sum + val, 0) / responseTimeData.length;
          const threshold = average * 1.2;
          const abnormalPoints = responseTimeData.map((value, index) => 
            value > threshold ? value : null
          );

          const option = {
            title: {
              text: '响应时间趋势',
              textStyle: {
                color: '#ffffff'
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: '{b}: {c}ms'
            },
            legend: {
              data: ['响应时间', '阈值线'],
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
              name: '响应时间 (ms)',
              axisLabel: {
                color: '#ffffff'
              }
            },
            series: [
              {
                name: '响应时间',
                type: 'line',
                data: responseTimeData,
                lineStyle: {
                  width: 4,
                  color: '#1890ff',
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  shadowColor: 'rgba(24, 144, 255, 0.5)'
                },
                itemStyle: {
                  color: '#1890ff'
                },
                emphasis: {
                  lineStyle: {
                    width: 6
                  }
                },
                markPoint: {
                  data: abnormalPoints.map((value, index) => {
                    if (value) {
                      return {
                        name: '异常',
                        value: value,
                        xAxis: index,
                        yAxis: value,
                        itemStyle: {
                          color: '#ff4d4f'
                        }
                      };
                    }
                    return null;
                  }).filter((point): point is any => point !== null)
                }
              },
              {
                name: '阈值线',
                type: 'line',
                data: responseTimeData.map(() => threshold),
                lineStyle: {
                  width: 2,
                  color: '#faad14',
                  type: 'dashed'
                },
                itemStyle: {
                  color: '#faad14'
                },
                symbol: 'none'
              }
            ],
            toolbox: {
              feature: {
                saveAsImage: {
                  name: '响应时间趋势'
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
  }, [data, labels]);

  return (
    <div className="h-64">
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default ResponseTime3DChart;