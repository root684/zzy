import { useEffect, useRef } from 'react';
// 按需导入ECharts核心模块和所需组件
import * as echarts from 'echarts/core';
import { RadarChart as EChartsRadarChart } from 'echarts/charts';
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
  EChartsRadarChart,
  CanvasRenderer
]);

interface RadarChartProps {
  data: {
    indicator: {
      name: string;
      max: number;
    }[];
    series: {
      name: string;
      value: number[];
      color?: string;
    }[];
  };
  title?: string;
  height?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  title = '多维度数据雷达图',
  height = '400px'
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option = {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: '#e2e8f0'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params: any) {
            return `${params.seriesName}: ${params.value}`;
          }
        },
        legend: {
          data: data.series.map(item => item.name),
          top: 30,
          textStyle: {
            color: '#94a3b8'
          }
        },
        radar: {
          indicator: data.indicator,
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: '#94a3b8'
          },
          splitLine: {
            lineStyle: {
              color: ['rgba(255, 255, 255, 0.1)']
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.05)']
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        series: data.series.map((item, index) => ({
          name: item.name,
          type: 'radar',
          data: [{
            value: item.value,
            name: item.name,
            areaStyle: {
              color: item.color || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
            },
            lineStyle: {
              color: item.color || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            },
            itemStyle: {
              color: item.color || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            }
          }]
        }))
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        chartInstance?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
      };
    }
  }, [data, title, height]);

  return (
    <div className="w-full" style={{ height }}>
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default RadarChart;