import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

interface AlarmHistoryChartProps {
  data: number[];
  labels: string[];
}

/**
 * 告警历史图表组件
 * 显示告警数量的历史趋势
 */
const AlarmHistoryChart = ({ data, labels }: AlarmHistoryChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表
      chartInstance = echarts.init(chartRef.current);

      // 配置图表
      const option = {
        title: {
          text: '告警历史趋势',
          textStyle: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: '{b}: {c} 条告警'
        },
        grid: {
          left: '3%',
          right: '20%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: labels,
          axisLine: {
            lineStyle: {
              color: '#334155'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 10,
          axisLine: {
            lineStyle: {
              color: '#ef4444'
            }
          },
          axisLabel: {
            color: '#94a3b8',
            formatter: '{value} 条'
          },
          splitLine: {
            lineStyle: {
              color: '#1e293b'
            }
          }
        },
        series: [
          {
            name: '告警数量',
            type: 'line',
            data: data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#ef4444'
            },
            itemStyle: {
              color: '#ef4444',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(239, 68, 68, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(239, 68, 68, 0.1)'
                }
              ])
            },
            markLine: {
              silent: true,
              lineStyle: {
                color: '#f59e0b',
                type: 'dashed'
              },
              label: {
                position: 'end',
                distance: 10
              },
              data: [
                {
                  yAxis: 5,
                  label: {
                    formatter: '告警阈值: 5 条',
                    color: '#f59e0b',
                    position: 'end',
                    distance: 10
                  }
                }
              ]
            }
          }
        ]
      };

      // 设置图表配置
      chartInstance.setOption(option);

      // 响应式调整
      const handleResize = () => {
        chartInstance?.resize();
      };

      window.addEventListener('resize', handleResize);

      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
      };
    }
  }, [data, labels]);

  return (
    <div className="h-full min-h-[400px]">
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default AlarmHistoryChart;