import React, { useEffect, useRef } from 'react';
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

interface DeviceHealthChartProps {
  healthyDevices: number;
  warningDevices: number;
  criticalDevices: number;
}

/**
 * 设备健康状态图表组件
 * 显示设备健康状态分布
 */
const DeviceHealthChart: React.FC<DeviceHealthChartProps> = ({ healthyDevices, warningDevices, criticalDevices }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 检查是否已经存在图表实例，如果存在则先销毁
      const existingInstance = echarts.getInstanceByDom(chartRef.current);
      if (existingInstance) {
        existingInstance.dispose();
      }
      
      // 初始化图表实例
      chartInstance.current = echarts.init(chartRef.current);

      // 图表配置
      const option = {
        title: {
          text: '设备健康状态分布',
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'
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
          orient: 'horizontal',
          bottom: 0,
          data: ['健康设备', '警告设备', '严重设备'],
          textStyle: {
            color: '#94a3b8',
            fontSize: 12
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
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            data: [
              {
                value: healthyDevices,
                name: '健康设备',
                itemStyle: {
                  color: '#10b981'
                }
              },
              {
                value: warningDevices,
                name: '警告设备',
                itemStyle: {
                  color: '#f59e0b'
                }
              },
              {
                value: criticalDevices,
                name: '严重设备',
                itemStyle: {
                  color: '#ef4444'
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.6)'
              },
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold',
                color: '#fff'
              }
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        ],
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      };

      // 设置图表配置
      chartInstance.current.setOption(option);

      // 响应式处理
      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
      };
    }
  }, [healthyDevices, warningDevices, criticalDevices]);

  return (
    <div className="w-full h-96">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default DeviceHealthChart;