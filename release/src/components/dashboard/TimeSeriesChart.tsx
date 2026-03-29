import React, { useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';

interface TimeSeriesData {
  time: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  yAxisName: string;
  interval?: number; // 实时更新间隔（毫秒）
}

/**
 * 时间序列折线图组件
 * 用于展示时间序列数据，支持实时数据更新和悬停交互效果
 */
const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  yAxisName
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 节流函数
  const throttle = (func: () => void, delay: number) => {
    let inThrottle = false;
    return function() {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => inThrottle = false, delay);
      }
    };
  };

  // 使用useCallback缓存updateChart函数
  const updateChart = useCallback(() => {
    if (chartInstance.current) {
      const times = data.map(item => item.time);
      const values = data.map(item => item.value);

      chartInstance.current.setOption({
        title: {
          text: title,
          textStyle: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderColor: '#475569',
          textStyle: {
            color: '#fff'
          },
          formatter: (params: { [key: number]: { name: string; value: number } }) => {
            const data = params[0];
            return `${data.name}<br/>${yAxisName}: ${data.value}`;
          },
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
          data: times,
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8',
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: yAxisName,
          nameTextStyle: {
            color: '#94a3b8'
          },
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(71, 85, 105, 0.3)'
            }
          }
        },
        series: [{
          name: yAxisName,
          type: 'line',
          stack: 'Total',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 2,
            color: '#3b82f6'
          },
          itemStyle: {
            color: '#3b82f6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.1)'
              }
            ])
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              symbolSize: 8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(59, 130, 246, 0.5)'
            }
          },
          // 添加动画效果
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        }]
      });
    }
  }, [data, title, yAxisName]);

  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表
      chartInstance.current = echarts.init(chartRef.current, undefined, {
        // 优化性能
        renderer: 'canvas',
        useDirtyRect: true
      });
      updateChart();

      // 响应式调整 - 使用节流
      const handleResize = throttle(() => {
        chartInstance.current?.resize();
      }, 200);

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        const instance = chartInstance.current;
        if (instance) {
          instance.dispose();
        }
      };
    }
  }, [updateChart]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <div ref={chartRef} className="w-full h-[300px] sm:h-80"></div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(TimeSeriesChart);
