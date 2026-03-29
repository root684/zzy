import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface IndustryItem {
  type: string;
  count: number;
}

interface IndustryDistributionProps {
  data: IndustryItem[];
}

const IndustryDistribution: React.FC<IndustryDistributionProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 确保销毁之前的实例
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      
      // 初始化图表
      chartInstance.current = echarts.init(chartRef.current);

      // 准备数据
      const industryTypes = data.map(item => item.type);
      const industryCounts = data.map(item => item.count);

      // 配置选项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          },
          splitLine: {
            lineStyle: {
              color: '#1F2937'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: industryTypes,
          axisLine: {
            lineStyle: {
              color: '#4B5563'
            }
          },
          axisLabel: {
            color: '#9CA3AF'
          }
        },
        series: [
          {
            name: '企业数量',
            type: 'bar',
            data: industryCounts,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#3B82F6' },
                { offset: 1, color: '#1E40AF' }
              ])
            },
            barWidth: '60%'
          }
        ]
      };

      chartInstance.current.setOption(option);

      // 响应式调整
      const handleResize = () => {
        chartInstance.current?.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.current?.dispose();
        chartInstance.current = null;
      };
    }
  }, [data]);

  return (
    <div>
      <div ref={chartRef} style={{ height: '250px' }}></div>
      <div className="mt-4">
        <h3 className="text-white font-medium mb-3">行业分布</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{item.type}</span>
              <span className="text-white font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryDistribution;
