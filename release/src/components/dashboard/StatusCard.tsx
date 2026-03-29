import React from 'react';

interface StatusCardProps {
  title: string;
  value: number | string;
  status: string;
  icon: string;
  color: string;
  subtext?: string;
  className?: string;
}

/**
 * 数字孪生变电站状态卡片组件
 * 用于显示系统的各种状态指标
 */
const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  status,
  icon,
  color,
  subtext,
  className
}) => {
  // 映射颜色到对应的霓虹类
  const getNeonClass = (color: string) => {
    switch (color) {
      case 'success':
        return 'text-neon-green';
      case 'danger':
        return 'text-danger';
      case 'warning':
        return 'text-warning';
      case 'secondary':
        return 'text-neon-blue';
      case 'info':
        return 'text-info';
      default:
        return 'text-gray-400';
    }
  };

  // 映射颜色到对应的背景类
  const getBgClass = (color: string) => {
    switch (color) {
      case 'success':
        return 'bg-success/20';
      case 'danger':
        return 'bg-danger/20';
      case 'warning':
        return 'bg-warning/20';
      case 'secondary':
        return 'bg-secondary/20';
      case 'info':
        return 'bg-info/20';
      default:
        return 'bg-gray-400/20';
    }
  };

  // 映射颜色到对应的图标颜色类
  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'success':
        return 'text-success';
      case 'danger':
        return 'text-danger';
      case 'warning':
        return 'text-warning';
      case 'secondary':
        return 'text-secondary';
      case 'info':
        return 'text-info';
      default:
        return 'text-gray-400';
    }
  };

  const neonClass = getNeonClass(color);
  const bgClass = getBgClass(color);
  const iconColorClass = getIconColorClass(color);

  return (
    <div className={`card-futuristic transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1 animate-pulse-border ${className || ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-secondary/70 text-sm mb-1 font-mono">{title}</div>
          <div className={`text-2xl font-bold ${neonClass} animate-number`}>{value}</div>
          {subtext && (
            <div className="text-secondary/70 text-sm mt-1 font-mono">{subtext}</div>
          )}
          <div className={`${neonClass} text-sm mt-1 flex items-center font-mono`}>
            <span className={`w-2 h-2 bg-${color} rounded-full mr-2 animate-pulse`}></span>
            {status}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center shadow-lg shadow-${color}/20`}>
          <span className={`${iconColorClass} text-xl transition-all duration-300 hover:scale-110`}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

// 使用React.memo减少不必要的渲染
export default React.memo(StatusCard);