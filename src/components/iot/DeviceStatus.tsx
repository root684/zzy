import React from 'react';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DevicesData {
  dtuCount: number;
  plcCount: number;
  onlineCount: number;
  offlineCount: number;
}

interface DeviceStatusProps {
  data: DevicesData;
}

const DeviceStatus: React.FC<DeviceStatusProps> = ({ data }) => {
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

      // 配置选项
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#9CA3AF'
          }
        },
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: '70%',
            data: [
              { value: data.onlineCount, name: '在线设备' },
              { value: data.offlineCount, name: '离线设备' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              color: function(params: any) {
                const colors = ['#10B981', '#EF4444'];
                return colors[params.dataIndex];
              }
            }
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
    <div className="space-y-6">
      {/* 设备类型分布 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-light/40 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">DTU设备</div>
          <div className="text-xl font-bold text-white">{data.dtuCount}</div>
        </div>
        <div className="bg-dark-light/40 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">PLC设备</div>
          <div className="text-xl font-bold text-white">{data.plcCount}</div>
        </div>
      </div>

      {/* 设备在线状态 */}
      <div>
        <h3 className="text-white font-medium mb-3">设备在线状态</h3>
        <div ref={chartRef} style={{ height: '200px' }}></div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">在线设备</div>
            <div className="text-xl font-bold text-green-500">{data.onlineCount}</div>
          </div>
          <div className="bg-dark-light/40 p-3 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">离线设备</div>
            <div className="text-xl font-bold text-red-500">{data.offlineCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
