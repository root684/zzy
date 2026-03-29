import React from 'react';

interface Alarm {
  id: string;
  msg: string;
  timestamp: string;
}

interface AlarmsData {
  alarm: number;
  fault: number;
  recentAlarms: Alarm[];
}

interface AlarmInfoProps {
  data: AlarmsData;
}

const AlarmInfo: React.FC<AlarmInfoProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 告警统计 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-light/40 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">告警信息</div>
          <div className="text-xl font-bold text-yellow-500">{data.alarm}</div>
        </div>
        <div className="bg-dark-light/40 p-3 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">故障信息</div>
          <div className="text-xl font-bold text-red-500">{data.fault}</div>
        </div>
      </div>

      {/* 最近告警 */}
      <div>
        <h3 className="text-white font-medium mb-3">最近告警</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {data.recentAlarms.map((alarm) => (
            <div key={alarm.id} className="bg-dark-light/40 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="text-white text-sm font-medium">{alarm.msg}</div>
                <div className="text-gray-400 text-xs">
                  {new Date(alarm.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {data.recentAlarms.length === 0 && (
            <div className="text-gray-400 text-center py-4">
              暂无告警信息
            </div>
          )}
        </div>
      </div>

      {/* 告警趋势 */}
      <div className="bg-blue-900/30 border border-blue-900/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77.633.192 3 1.732 3z" />
            </svg>
            <div>
              <div className="text-white font-medium">告警趋势</div>
              <div className="text-sm text-gray-400">最近24小时</div>
            </div>
          </div>
          <div className="text-yellow-500 text-sm">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            上升 12%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmInfo;
