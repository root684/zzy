import React from 'react';

export interface FilterOptions {
  dateRange: [string, string];
  deviceType: string;
  status: string;
  area: string;
  minTemperature: number;
  maxTemperature: number;
}

interface DataFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const DataFilter: React.FC<DataFilterProps> = ({ onFilterChange, currentFilters }) => {
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({
      ...currentFilters,
      [key]: value
    });
  };

  return (
    <div className="card p-4 mb-6 animate-slide-up">
      <h2 className="text-lg font-semibold mb-4">数据筛选</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 日期范围 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            日期范围
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={currentFilters.dateRange[0]}
              onChange={(e) => handleFilterChange('dateRange', [e.target.value, currentFilters.dateRange[1]])}
            />
            <input
              type="date"
              className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={currentFilters.dateRange[1]}
              onChange={(e) => handleFilterChange('dateRange', [currentFilters.dateRange[0], e.target.value])}
            />
          </div>
        </div>

        {/* 设备类型 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            设备类型
          </label>
          <select
            className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
            value={currentFilters.deviceType}
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
          >
            <option value="all">全部设备</option>
            <option value="battery">电池设备</option>
            <option value="temperature">温度传感器</option>
            <option value="power">电力设备</option>
          </select>
        </div>

        {/* 状态 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            状态
          </label>
          <select
            className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
            value={currentFilters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">全部状态</option>
            <option value="normal">正常</option>
            <option value="warning">预警</option>
            <option value="danger">告警</option>
            <option value="offline">离线</option>
          </select>
        </div>

        {/* 区域 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            区域
          </label>
          <select
            className="w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
            value={currentFilters.area}
            onChange={(e) => handleFilterChange('area', e.target.value)}
          >
            <option value="all">全部区域</option>
            <option value="A">A区</option>
            <option value="B">B区</option>
            <option value="C">C区</option>
            <option value="D">D区</option>
          </select>
        </div>

        {/* 温度范围 */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            温度范围 (°C)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={currentFilters.minTemperature}
              onChange={(e) => handleFilterChange('minTemperature', parseFloat(e.target.value) || 0)}
              placeholder="最低温度"
            />
            <span className="flex items-center text-gray-400">-</span>
            <input
              type="number"
              className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
              value={currentFilters.maxTemperature}
              onChange={(e) => handleFilterChange('maxTemperature', parseFloat(e.target.value) || 100)}
              placeholder="最高温度"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilter;