import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navGroups = [
    {
      title: '系统概览',
      items: [
        {
          title: '系统概览',
          path: '/overview',
          icon: '📊'
        }
      ]
    },
    {
      title: '监控中心',
      items: [
        {
          title: '实时监控',
          path: '/realtime',
          icon: '📡'
        },
        {
          title: '历史数据',
          path: '/historical',
          icon: '📋'
        },
        {
          title: '可视化监控',
          path: '/visualization',
          icon: '🎛️'
        }
      ]
    },
    {
      title: '设备管理',
      items: [
        {
          title: '终端管理',
          path: '/terminal',
          icon: '🖥️'
        },
        {
          title: '设备维护',
          path: '/maintenance',
          icon: '🔧'
        },
        {
          title: '设备监控',
          path: '/smart-traffic',
          icon: '⚡'
        }
      ]
    },
    {
      title: '预警与分析',
      items: [
        {
          title: '预警中心',
          path: '/alarm',
          icon: '🚨',
          badge: 4
        },
        {
          title: '数据分析',
          path: '/analysis',
          icon: '📈'
        },
        {
          title: '报表管理',
          path: '/report',
          icon: '📄'
        },
        {
          title: '变电站分析',
          path: '/smart-iot',
          icon: '📊'
        }
      ]
    },
    {
      title: '智慧变电站',
      items: [
        {
          title: '环境监测',
          path: '/smart-weather',
          icon: '🌡️'
        }
      ]
    },
    {
      title: '系统管理',
      items: [
        {
          title: '用户管理',
          path: '/users',
          icon: '👤'
        },
        {
          title: '日志管理',
          path: '/log',
          icon: '📃'
        },
        {
          title: '系统设置',
          path: '/settings',
          icon: '⚙️'
        },
        {
          title: '通知管理',
          path: '/notification',
          icon: '🔔'
        }
      ]
    },
    {
      title: '帮助中心',
      items: [
        {
          title: '帮助中心',
          path: '/help',
          icon: '❓'
        }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-dark/90 backdrop-blur-sm border-r border-secondary/30 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
      {/* 品牌标识 */}
      <div className="p-4 border-b border-secondary/30 transition-all duration-300 hover:bg-dark-light/50 animate-pulse-border">
        <h2 className="text-lg font-bold text-neon-blue transition-all duration-300">国补-数字孪生变电站</h2>
        <p className="text-xs text-secondary/70 font-mono transition-all duration-300 hover:text-secondary/90">Digital Twin Substation</p>
      </div>
      
      {/* 导航菜单 */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary/30 scrollbar-track-dark-light/50 scroll-smooth">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h3 className="px-4 mb-2 text-xs font-semibold text-secondary/70 uppercase tracking-wider transition-all duration-300 hover:text-secondary">{group.title}</h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.path} className="group">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (
                      `flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:translate-x-1 ${isActive ? 'bg-gradient-to-r from-dark-light/80 to-dark-light/40 border-l-2 border-secondary text-neon-blue shadow-neon-blue' : 'text-gray-300 hover:bg-dark-light/40 hover:text-white hover:border-l-2 hover:border-secondary/50'}`
                    )}
                    onClick={(e) => {
                      // 添加点击反馈效果
                      const linkElement = e.currentTarget;
                      linkElement.classList.add('scale-95');
                      setTimeout(() => {
                        linkElement.classList.remove('scale-95');
                      }, 150);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg transition-all duration-300 group-hover:scale-110 group-hover:text-secondary">{item.icon}</span>
                      <span className="transition-all duration-300 group-hover:text-secondary">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-danger text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center transition-all duration-300 group-hover:scale-110 animate-pulse shadow-neon-orange">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* 底部信息 */}
      <div className="p-4 border-t border-secondary/30 transition-all duration-300 hover:bg-dark-light/50">
        <div className="text-xs text-secondary/70 font-mono transition-all duration-300 hover:text-secondary/90">
          <div className="flex items-center justify-between mb-1">
            <span>版本: v1.0.0</span>
            <span className="text-success text-xs transition-all duration-300 hover:scale-110">✓ 已更新</span>
          </div>
          <div className="transition-all duration-300 hover:text-secondary/90">© 2026 数字孪生系统</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;