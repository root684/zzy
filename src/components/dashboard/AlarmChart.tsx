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

interface AlarmData {
  value: number;
  name: string;
  color: string;
}

interface AlarmChartProps {
  data: AlarmData[];
}

/**
 * 告警类型分布图表组件
 * 用于显示不同类型告警的分布情况
 */
const AlarmChart: React.FC<AlarmChartProps> = ({ data }) => {
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
          text: '告警类型分布',
          left: 'center',
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
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          data: data.map(item => item.name),
          textStyle: {
            color: '#94a3b8',
            fontSize: 12
          },
          // 增强交互效果
          emphasis: {
            textStyle: {
              color: '#fff'
            }
          },
          // 避免图例重叠
          itemGap: 20
        },
        // 调整图表边距
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          top: '15%',
          containLabel: true
        },
        series: [{
          name: '告警类型',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
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
              fontSize: '16',
              fontWeight: 'bold',
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.6)'
            }
          },
          labelLine: {
            show: false
          },
          data: data.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color }
          })),
          // 添加动画效果
          animationDuration: 1000,
          animationEasing: 'cubicOut',
          animationType: 'scale'
        }]
      });
    }
  }, [data]);

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
export default React.memo(AlarmChart);