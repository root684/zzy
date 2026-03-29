import React, { useEffect, useRef, useCallback } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer
]);

interface StatusHistoryChartProps {
  data: {
    timestamp: string;
    status: number;
    isKeyNode?: boolean;
  }[];
  title?: string;
}

/**
 * 状态历史图表组件
 * 用于直观展示状态变化过程，包含时间轴X轴和状态值Y轴
 * 支持显示至少30天的历史数据，提供缩放、平移交互功能
 * 能清晰标识关键状态节点
 */
const StatusHistoryChart: React.FC<StatusHistoryChartProps> = ({ 
  data, 
  title = '状态历史图表' 
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
      // 处理数据，分离时间戳和状态值
      const timestamps = data.map(item => item.timestamp);
      const statusValues = data.map(item => item.status);
      const keyNodes = data.filter(item => item.isKeyNode);
      
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
          // 添加交互效果
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // 添加工具箱，提供缩放、平移等功能
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: '#94a3b8'
          }
        },
        // 添加数据缩放，支持缩放和平移
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100,
            height: 20,
            bottom: 10,
            fillerColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#475569',
            textStyle: {
              color: '#94a3b8'
            }
          }
        ],
        xAxis: {
          type: 'category',
          data: timestamps,
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
          name: '状态值',
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
          bottom: '20%',
          top: '15%',
          containLabel: true
        },
        series: [
          {
            data: statusValues,
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
          },
          // 关键状态节点
          {
            data: keyNodes.map(node => {
              const index = data.findIndex(item => item.timestamp === node.timestamp);
              return [index, node.status];
            }),
            type: 'scatter',
            symbolSize: 12,
            itemStyle: {
              color: '#ef4444',
              borderColor: '#fff',
              borderWidth: 2
            },
            emphasis: {
              itemStyle: {
                symbolSize: 16
              }
            }
          }
        ]
      });
    }
  }, [data, title]);

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
    <div ref={chartRef} className="w-full h-full"></div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(StatusHistoryChart);
