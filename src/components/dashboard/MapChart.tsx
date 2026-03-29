import React, { useEffect, useRef, useCallback } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { MapChart as EChartsMapChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  EChartsMapChart,
  CanvasRenderer
]);

interface MapDataItem {
  name: string;
  value: number;
}

const MapChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [mapData, setMapData] = useState<MapDataItem[]>([]);

  // 模拟地理分布数据
  const generateMockData = (): MapDataItem[] => {
    return [
      { name: '北京', value: Math.floor(Math.random() * 1000) },
      { name: '上海', value: Math.floor(Math.random() * 1000) },
      { name: '广州', value: Math.floor(Math.random() * 1000) },
      { name: '深圳', value: Math.floor(Math.random() * 1000) },
      { name: '杭州', value: Math.floor(Math.random() * 1000) },
      { name: '成都', value: Math.floor(Math.random() * 1000) },
      { name: '武汉', value: Math.floor(Math.random() * 1000) },
      { name: '西安', value: Math.floor(Math.random() * 1000) },
      { name: '南京', value: Math.floor(Math.random() * 1000) },
      { name: '重庆', value: Math.floor(Math.random() * 1000) },
    ];
  };

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
          text: '地理分布数据',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600'
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderColor: '#475569',
          textStyle: {
            color: '#fff'
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
          data: mapData.map(item => item.name),
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
        series: [
          {
            name: '数据值',
            type: 'bar',
            data: mapData.map(item => item.value),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#3b82f6' },
                { offset: 1, color: '#1d4ed8' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#60a5fa' },
                  { offset: 1, color: '#3b82f6' }
                ])
              }
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut'
          }
        ]
      };

      chartInstance.current.setOption(option);
    }
  }, [mapData]);

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      // 销毁现有实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }

      // 创建新实例
      chartInstance.current = echarts.init(chartRef.current, undefined, {
        // 优化性能
        renderer: 'canvas',
        useDirtyRect: true
      });

      updateChart();

      // 监听窗口大小变化 - 使用节流
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

  // 数据更新时重新渲染图表
  useEffect(() => {
    updateChart();
  }, [updateChart]);

  // 初始加载数据
  useEffect(() => {
    setMapData(generateMockData());
  }, []);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMapData(generateMockData());
    }, 5000); // 每5秒更新一次数据

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-80">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(MapChart);