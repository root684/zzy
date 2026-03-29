import { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const HistoricalData = () => {
  const [searchParams, setSearchParams] = useState({
    startTime: '2025-01-13',
    endTime: '2026-01-14',
    area: '全部区域',
    terminalId: ''
  });

  useEffect(() => {
    // 初始化趋势分析图表
    initTrendChart();
  }, []);

  const initTrendChart = () => {
    const trendChart = echarts.init(document.getElementById('trendChart'));
    
    // 模拟历史温度数据
    const dates = [];
    const temperatures = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('zh-CN'));
      // 生成模拟温度数据，有一定的波动
      const baseTemp = 40;
      const variation = Math.sin(i / 5) * 5 + Math.random() * 3 - 1.5;
      temperatures.push((baseTemp + variation).toFixed(1));
    }
    
    trendChart.setOption({
      title: {
        text: '温度趋势分析',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['温度'],
        textStyle: {
          color: '#94a3b8'
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
        boundaryGap: false,
        data: dates,
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
        name: '温度 (°C)',
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
      series: [{
        name: '温度',
        type: 'line',
        stack: 'Total',
        data: temperatures,
        lineStyle: {
          color: '#3b82f6'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
          ])
        }
      }]
    });

    // 响应式调整
    window.addEventListener('resize', () => {
      trendChart.resize();
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟搜索操作
    console.log('搜索参数:', searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">历史数据</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
            刷新
          </button>
          <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
            导出
          </button>
        </div>
      </div>

      {/* 搜索条件 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <h2 className="text-lg font-semibold mb-4">筛选条件</h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              开始日期
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={searchParams.startTime}
              onChange={(e) => setSearchParams(prev => ({ ...prev, startTime: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              结束日期
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={searchParams.endTime}
              onChange={(e) => setSearchParams(prev => ({ ...prev, endTime: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              区域
            </label>
            <select
              className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={searchParams.area}
              onChange={(e) => setSearchParams(prev => ({ ...prev, area: e.target.value }))}
            >
              <option value="全部区域">全部区域</option>
              <option value="1-10MWh电池阵列A区">1-10MWh电池阵列A区</option>
              <option value="1-10MWh电池阵列B区">1-10MWh电池阵列B区</option>
              <option value="1-10MWh电池阵列C区">1-10MWh电池阵列C区</option>
              <option value="户外动力区">户外动力区</option>
              <option value="集装箱高压配电区">集装箱高压配电区</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              终端ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              placeholder="搜索终端ID"
              value={searchParams.terminalId}
              onChange={(e) => setSearchParams(prev => ({ ...prev, terminalId: e.target.value }))}
            />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors"
            >
              搜索
            </button>
          </div>
        </form>
      </div>

      {/* 趋势分析图表 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div id="trendChart" className="w-full h-96"></div>
      </div>

      {/* 历史数据表格 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">温度历史记录</h2>
          <span className="text-gray-400">4800条记录</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-lighter">
                <th className="text-left py-3 px-4 text-gray-400">时间</th>
                <th className="text-left py-3 px-4 text-gray-400">终端ID</th>
                <th className="text-left py-3 px-4 text-gray-400">区域</th>
                <th className="text-left py-3 px-4 text-gray-400">温度 (°C)</th>
                <th className="text-left py-3 px-4 text-gray-400">状态</th>
                <th className="text-left py-3 px-4 text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dark-lighter">
                <td className="py-3 px-4">01/14 17:03</td>
                <td className="py-3 px-4">T001</td>
                <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                <td className="py-3 px-4">46.1</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-secondary hover:underline">查看</button>
                </td>
              </tr>
              <tr className="border-b border-dark-lighter">
                <td className="py-3 px-4">01/14 16:43</td>
                <td className="py-3 px-4">T001</td>
                <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                <td className="py-3 px-4">45.0</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-secondary hover:underline">查看</button>
                </td>
              </tr>
              <tr className="border-b border-dark-lighter">
                <td className="py-3 px-4">01/14 15:33</td>
                <td className="py-3 px-4">T001</td>
                <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                <td className="py-3 px-4">45.0</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-secondary hover:underline">查看</button>
                </td>
              </tr>
              <tr className="border-b border-dark-lighter">
                <td className="py-3 px-4">01/14 14:33</td>
                <td className="py-3 px-4">T001</td>
                <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                <td className="py-3 px-4">45.0</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-secondary hover:underline">查看</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">01/14 12:33</td>
                <td className="py-3 px-4">T001</td>
                <td className="py-3 px-4">1-10MWh电池阵列A区</td>
                <td className="py-3 px-4">45.0</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs">正常</span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-secondary hover:underline">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
              上一页
            </button>
            <button className="px-3 py-1 bg-secondary rounded-lg">1</button>
            <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">2</button>
            <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">3</button>
            <button className="px-3 py-1 bg-dark-lighter rounded-lg hover:bg-dark-lighter/80 transition-colors">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;