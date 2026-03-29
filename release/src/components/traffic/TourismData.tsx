import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface Device {
  id: string;
  name: string;
  status: string;
  lastChecked: string;
}

interface DeviceDataProps {
  data: {
    equipmentCount: number;
    operationalStatus: Device[];
  };
}

const TourismData: React.FC<DeviceDataProps> = ({ data }) => {
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
      const deviceNames = data.operationalStatus.map(device => device.name);
      const deviceStatus = data.operationalStatus.map(device => device.status === '正常' ? 1 : 0);

      // 配置选项 - 简化版，确保 Y 轴标签正确显示
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
        xAxis: [
          {
            type: 'category',
            data: deviceNames,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#4B5563'
              }
            },
            axisLabel: {
              color: '#9CA3AF'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 1,
            interval: 1,
            axisLine: {
              lineStyle: {
                color: '#4B5563'
              }
            },
            axisLabel: {
              color: '#9CA3AF',
              formatter: function(params: any) {
                return params === 1 ? '正常' : '异常';
              }
            },
            splitLine: {
              lineStyle: {
                color: '#1F2937'
              }
            }
          }
        ],
        series: [
          {
            name: '设备状态',
            type: 'bar',
            barWidth: '60%',
            data: deviceStatus,
            itemStyle: {
              color: function(params: any) {
                return params.value === 1 ? '#10B981' : '#EF4444';
              }
            }
          }
        ]
      };

      // 强制设置图表选项
      chartInstance.current.setOption(option, true);

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

  // 根据状态获取颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '正常':
        return 'text-green-500';
      case '异常':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* 设备总数 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400">变电站设备总数</div>
          <div className="text-2xl font-bold text-white">
            {data.equipmentCount.toLocaleString()}
          </div>
        </div>
        <div className="bg-blue-900/30 text-blue-400 px-4 py-2 rounded-lg text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            正常运行率 98.5%
          </div>
        </div>
      </div>

      {/* 设备运行状态 */}
      <div>
        <h3 className="text-white font-medium mb-4">变电站设备运行状态</h3>
        <div ref={chartRef} style={{ height: '300px' }}></div>
      </div>

      {/* 设备状态详情 */}
      <div>
        <h3 className="text-white font-medium mb-3">设备状态详情</h3>
        <div className="space-y-3">
          {data.operationalStatus.map((device) => (
            <div key={device.id} className="bg-dark-light/40 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">{device.name}</div>
                <div className={`font-medium ${getStatusColor(device.status)}`}>
                  {device.status}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>最后检查时间</span>
                <span>{new Date(device.lastChecked).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourismData;
