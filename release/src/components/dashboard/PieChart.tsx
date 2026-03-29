import React, { useEffect, useRef, useCallback } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { PieChart as EChartsPieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  EChartsPieChart,
  CanvasRenderer
]);

interface PieChartProps {
  data: {
    value: number;
    name: string;
  }[];
  title?: string;
  radius?: string | [string, string];
  showLegend?: boolean;
}

/**
 * 饼图数据可视化组件
 * 用于展示占比数据，支持悬停交互效果和实时数据更新
 */
const PieChart: React.FC<PieChartProps> = ({
  data,
  title = '占比数据展示',
  radius = ['40%', '70%'],
  showLegend = true
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
          trigger: 'item',
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderColor: '#475569',
          textStyle: {
            color: '#fff'
          },
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: showLegend,
          orient: 'horizontal',
          bottom: 10,
          textStyle: {
            color: '#94a3b8'
          }
        },
        series: [{
          name: title,
          type: 'pie',
          radius: radius,
          center: ['50%', '50%'],
          data: data,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#1e293b',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: false
          },
          // 添加动画效果
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        }]
      });
    }
  }, [data, title, radius, showLegend]);

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
export default React.memo(PieChart);
