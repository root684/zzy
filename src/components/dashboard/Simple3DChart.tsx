import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

interface Simple3DChartProps {
  title: string;
  data: number[];
}

const Simple3DChart: React.FC<Simple3DChartProps> = ({ title, data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      try {
        const chart = echarts.init(chartRef.current);
        
        // 准备数据
        const chartData = data.slice(0, 7).map((value, index) => [index, value, 0]);
        const labels = data.slice(0, 7).map((_, index) => `Day ${index + 1}`);

        const option = {
          title: {
            text: title,
            textStyle: {
              color: '#ffffff'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          xAxis3D: {
            type: 'category',
            data: labels,
            axisLabel: {
              color: '#ffffff'
            }
          },
          yAxis3D: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            }
          },
          zAxis3D: {
            type: 'value',
            axisLabel: {
              color: '#ffffff'
            }
          },
          grid3D: {
            viewControl: {
              autoRotate: true,
              projection: 'perspective'
            }
          },
          series: [{
            type: 'scatter3D',
            data: chartData,
            symbolSize: 10,
            itemStyle: {
              color: '#ff4d4f'
            }
          }]
        };

        chart.setOption(option);

        const handleResize = () => {
          chart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.dispose();
        };
      } catch (error) {
        console.error('图表初始化失败:', error);
      }
    }
  }, [title, data]);

  return (
    <div className="h-64">
      <div ref={chartRef} className="w-full h-full"></div>
    </div>
  );
};

export default Simple3DChart;