import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * 终端详情页面
 * 显示终端的详细信息
 */
const TerminalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [terminal, setTerminal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 模拟获取终端详情数据
  useEffect(() => {
    if (id) {
      // 模拟API请求延迟
      const timer = setTimeout(() => {
        // 模拟终端数据
        const mockTerminal = {
          id: id,
          area: '1-10MWh电池阵列A区',
          temperature: 62.1,
          status: 'warning' as const,
          statusText: '预警',
          voltage: 52.3,
          current: 15.7,
          soc: 78.5,
          lastUpdated: new Date().toISOString()
        };
        setTerminal(mockTerminal);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!terminal) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 text-danger">❌</div>
          <h1 className="text-2xl font-semibold mb-4">终端不存在</h1>
          <button 
            className="btn-secondary mt-4"
            onClick={() => navigate('/')}
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">终端详情</h1>
        <button 
          className="btn-secondary flex items-center space-x-2"
          onClick={() => navigate('/')}
        >
          <span>←</span>
          <span>返回</span>
        </button>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-lg font-semibold mb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              终端ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={terminal.id}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              所属区域
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={terminal.area}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              当前温度
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={`${terminal.temperature}°C`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              状态
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 ${terminal.status === 'danger' ? 'bg-danger/20 text-danger border-danger/30' : 'bg-warning/20 text-warning border-warning/30'} rounded-lg`}
              value={terminal.statusText}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              电池电压
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={`${terminal.voltage}V`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              电池电流
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={`${terminal.current}A`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              SOC
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={`${terminal.soc}%`}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              最后更新时间
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-dark border border-dark-lighter rounded-lg"
              value={new Date(terminal.lastUpdated).toLocaleString()}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-lg font-semibold mb-4">历史温度记录</h2>
        <div className="bg-dark rounded-lg p-4 h-60 flex items-center justify-center">
          <div className="text-gray-400">温度历史图表</div>
        </div>
      </div>

      <div className="bg-dark-light rounded-lg p-6 border border-dark-lighter">
        <h2 className="text-lg font-semibold mb-4">告警历史</h2>
        <div className="bg-dark rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
              <div>
                <div className="font-medium">温度预警</div>
                <div className="text-sm text-gray-400">温度达到60°C，接近阈值</div>
              </div>
              <div className="text-sm text-gray-400">2026-01-14 15:30:00</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
              <div>
                <div className="font-medium">温度告警</div>
                <div className="text-sm text-gray-400">温度达到65°C，超过阈值</div>
              </div>
              <div className="text-sm text-gray-400">2026-01-14 16:00:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button 
          className="btn-secondary"
          onClick={() => navigate('/')}
        >
          返回
        </button>
        <button 
          className="btn-accent"
          onClick={() => {
            // 模拟处理操作
            alert('终端处理成功');
            navigate('/');
          }}
        >
          处理
        </button>
      </div>
    </div>
  );
};

export default TerminalDetail;