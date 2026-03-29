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
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer
]);

interface BatteryStatusChartProps {
  voltageData: number[];
  currentData: number[];
  socData: number[];
  labels: string[];
}

/**
 * 电池状态图表组件
 * 显示电池电压、电流和SOC的趋势
 */
const BatteryStatusChart = ({
  voltageData,
  currentData,
  socData,
  labels
}: BatteryStatusChartProps) => {
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
          text: '电池状态趋势',
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
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderColor: '#475569',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['电压 (V)', '电流 (A)', 'SOC (%)'],
          textStyle: {
            color: '#94a3b8',
            fontSize: 12
          },
          bottom: 0,
          left: 'center'
        },
        grid: {
          left: '8%',
          right: '20%',
          bottom: '15%',
          top: '20%',
          containLabel: true
        },
        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '电压 (V)',
            min: 51.5,
            max: 53,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#3b82f6'
              }
            },
            axisLabel: {
              color: '#94a3b8',
              formatter: '{value} V'
            },
            splitLine: {
              lineStyle: {
                color: '#1e293b'
              }
            }
          },
          {
            type: 'value',
            name: '电流 (A)',
            min: 14.5,
            max: 16.5,
            position: 'right',
            offset: 100,
            axisLine: {
              lineStyle: {
                color: '#10b981'
              }
            },
            axisLabel: {
              color: '#94a3b8',
              formatter: '{value} A'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: 'SOC (%)',
            min: 77.5,
            max: 79,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#f59e0b'
              }
            },
            axisLabel: {
              color: '#94a3b8',
              formatter: '{value} %'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '电压 (V)',
            type: 'line',
            data: voltageData,
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
                  color: 'rgba(59, 130, 246, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(59, 130, 246, 0.1)'
                }
              ])
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut'
          },
          {
            name: '电流 (A)',
            type: 'line',
            yAxisIndex: 1,
            data: currentData,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: '#10b981'
            },
            itemStyle: {
              color: '#10b981'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(16, 185, 129, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(16, 185, 129, 0.1)'
                }
              ])
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut'
          },
          {
            name: 'SOC (%)',
            type: 'line',
            yAxisIndex: 2,
            data: socData,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: '#f59e0b'
            },
            itemStyle: {
              color: '#f59e0b'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(245, 158, 11, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(245, 158, 11, 0.1)'
                }
              ])
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut'
          }
        ]
      };

      chartInstance.current.setOption(option);
    }
  }, [voltageData, currentData, socData, labels]);

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
export default React.memo(BatteryStatusChart);