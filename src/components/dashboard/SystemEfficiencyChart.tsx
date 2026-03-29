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

interface SystemEfficiencyChartProps {
  data: number[];
  labels: string[];
}

/**
 * 系统效率图表组件
 * 显示系统效率的趋势
 */
const SystemEfficiencyChart = ({ data, labels }: SystemEfficiencyChartProps) => {
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
      const option = {
        title: {
          text: '系统效率趋势',
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
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
          formatter: '{b}: {c}%',
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderColor: '#475569',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '10%',
          top: '15%',
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
          min: 87,
          max: 90,
          axisLine: {
            lineStyle: {
              color: '#10b981'
            }
          },
          axisLabel: {
            color: '#94a3b8',
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#1e293b'
            }
          }
        },
        series: [
          {
            name: '系统效率',
            type: 'line',
            data: data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#10b981'
            },
            itemStyle: {
              color: '#10b981',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(16, 185, 129, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(16, 185, 129, 0.1)'
                }
              ])
            },
            markLine: {
              silent: true,
              lineStyle: {
                color: '#f59e0b',
                type: 'dashed'
              },
              data: [
                {
                  yAxis: 88,
                  label: {
                    formatter: '目标效率: 88%',
                    color: '#f59e0b'
                  }
                }
              ]
            },
            // 添加动画效果
            animationDuration: 1000,
            animationEasing: 'cubicOut'
          }
        ]
      };

      // 设置图表配置
      chartInstance.current.setOption(option);
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

      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, [updateChart]);

  useEffect(() => {
    // 只有在图表实例初始化后才更新图表
    if (chartInstance.current) {
      updateChart();
    }
  }, [updateChart]);

  return (
    <div className="h-96">
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(SystemEfficiencyChart);