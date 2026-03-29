import React, { useEffect, useRef, useCallback } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { BarChart as EChartsBarChart } from 'echarts/charts';
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
  EChartsBarChart,
  CanvasRenderer
]);

interface BarChartProps {
  data: number[];
  labels: string[];
  title?: string;
  yAxisName?: string;
}

/**
 * 柱状图数据可视化组件
 * 用于展示分类数据对比，支持悬停交互效果和实时数据更新
 */
const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  labels, 
  title = '分类数据对比', 
  yAxisName = '数值' 
}) => {
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
          // 添加悬停交互效果
          axisPointer: {
            type: 'shadow',
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
              color: '#334155'
            }
          }
        },
        // 增强交互效果
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [{
          data: data,
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1d4ed8' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          // 添加动画效果
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          // 悬停效果
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#60a5fa' },
                { offset: 1, color: '#3b82f6' }
              ])
            }
          }
        }]
      });
    }
  }, [data, labels, title, yAxisName]);

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
        chartInstance.current?.dispose();
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
export default React.memo(BarChart);
