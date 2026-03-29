import React, { useEffect, useRef, useCallback } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer
]);

interface TemperatureChartProps {
  data: number[];
  labels: string[];
}

/**
 * 温度趋势图表组件
 * 用于显示温度随时间的变化趋势
 */
const TemperatureChart: React.FC<TemperatureChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 节流函数
  const throttle = (func: () => void, delay: number) => {
    let inThrottle = false;
    return function(...args: unknown[]) {
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
      chartInstance.current.setOption({
        title: {
          text: '温度趋势',
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
          // 添加交互效果
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: labels,
          axisLine: {
            lineStyle: {
              color: '#475569'
            }
          },
          axisLabel: {
            color: '#94a3b8'
          }
        },
        yAxis: {
          type: 'value',
          name: '温度 (°C)',
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
              color: '#334155'
            }
          }
        },
        // 增强交互效果
        grid: {
          left: '5%',
          right: '8%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },
        series: [{
          data: data,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#3b82f6',
            width: 3
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ])
          },
          itemStyle: {
            color: '#3b82f6',
            borderColor: '#fff',
            borderWidth: 2
          },
          symbol: 'circle',
          symbolSize: 8,
          // 添加动画效果
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        }]
      });
    }
  }, [data, labels]);

  useEffect(() => {
    if (chartRef.current) {
      // 检查是否已经存在图表实例，如果存在则先销毁
      const existingInstance = echarts.getInstanceByDom(chartRef.current);
      if (existingInstance) {
        existingInstance.dispose();
      }
      
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
        chartInstance.current?.dispose();
      };
    }
  }, [updateChart]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <div ref={chartRef} className="w-full h-96"></div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(TemperatureChart);