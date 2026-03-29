import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟搜索操作
    console.log('搜索:', searchQuery);
    performSearch(searchQuery);
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // 模拟搜索结果，实际项目中应该调用API获取搜索结果
    const results = [
      // 设备相关结果
      {
        id: 1,
        title: '设备 T182',
        type: '设备',
        description: '1-10MWh电池阵列A区',
        path: '/device-management'
      },
      {
        id: 2,
        title: '设备 T256',
        type: '设备',
        description: '1-10MWh电池阵列B区',
        path: '/device-management'
      },
      {
        id: 3,
        title: '设备 T378',
        type: '设备',
        description: '1-10MWh电池阵列C区',
        path: '/device-management'
      },
      // 告警相关结果
      {
        id: 4,
        title: '母排温度过高',
        type: '告警',
        description: '紧急级别 - 1-10MWh电池阵列A区',
        path: '/alert-management'
      },
      {
        id: 5,
        title: '电流异常',
        type: '告警',
        description: '警告级别 - 1-10MWh电池阵列B区',
        path: '/alert-management'
      },
      {
        id: 6,
        title: '电压过低',
        type: '告警',
        description: '严重级别 - 1-10MWh电池阵列C区',
        path: '/alert-management'
      },
      // 规则相关结果
      {
        id: 7,
        title: '温度告警规则',
        type: '规则',
        description: '适用于所有温度传感器',
        path: '/alert-management?tab=rules'
      },
      {
        id: 8,
        title: '电流告警规则',
        type: '规则',
        description: '适用于所有电流传感器',
        path: '/alert-management?tab=rules'
      },
      // 页面相关结果
      {
        id: 9,
        title: '系统概览',
        type: '页面',
        description: '系统运行状态及关键指标',
        path: '/system-overview'
      },
      {
        id: 10,
        title: '数据分析',
        type: '页面',
        description: '系统性能、能耗、告警和设备分析',
        path: '/data-analysis'
      },
      {
        id: 11,
        title: '实时监控',
        type: '页面',
        description: '实时监控系统运行状态',
        path: '/real-time-monitoring'
      },
      {
        id: 12,
        title: '设备管理',
        type: '页面',
        description: '管理所有终端设备',
        path: '/device-management'
      },
      {
        id: 13,
        title: '告警管理',
        type: '页面',
        description: '管理系统告警和规则',
        path: '/alert-management'
      },
      // 其他系统内容
      {
        id: 14,
        title: '用户管理',
        type: '页面',
        description: '管理系统用户和权限',
        path: '/user-management'
      },
      {
        id: 15,
        title: '系统设置',
        type: '页面',
        description: '系统配置和参数设置',
        path: '/system-settings'
      },
      // 帮助中心 - 系统文档
      {
        id: 201,
        title: '系统概述',
        type: '系统文档',
        description: '储能安全防护系统的整体介绍和功能说明',
        path: '/help'
      },
      {
        id: 202,
        title: '安装指南',
        type: '系统文档',
        description: '系统的安装步骤和配置方法',
        path: '/help'
      },
      {
        id: 203,
        title: '用户手册',
        type: '系统文档',
        description: '系统的使用方法和操作指南',
        path: '/help'
      },
      {
        id: 204,
        title: 'API文档',
        type: '系统文档',
        description: '系统的API接口说明',
        path: '/help'
      },
      // 帮助中心 - 常见问题
      {
        id: 205,
        title: '系统无法正常登录怎么办？',
        type: '常见问题',
        description: '检查用户名和密码是否正确，确保网络连接正常',
        path: '/help'
      },
      {
        id: 206,
        title: '如何添加新设备？',
        type: '常见问题',
        description: '在设备管理页面，点击"添加设备"按钮，填写设备信息并保存',
        path: '/help'
      },
      {
        id: 207,
        title: '告警信息如何处理？',
        type: '常见问题',
        description: '在告警管理页面，查看告警详情，根据告警级别采取相应的处理措施',
        path: '/help'
      },
      {
        id: 208,
        title: '如何导出报表？',
        type: '常见问题',
        description: '在报表管理页面，选择报表类型和时间范围，点击"导出"按钮',
        path: '/help'
      },
      {
        id: 209,
        title: '系统运行缓慢怎么办？',
        type: '常见问题',
        description: '检查服务器资源使用情况，确保服务器有足够的内存和CPU资源',
        path: '/help'
      },
      // 帮助中心 - 使用指南
      {
        id: 210,
        title: '系统初始化配置',
        type: '使用指南',
        description: '系统管理员账号登录、系统设置、配置基本信息、设置告警规则、添加初始设备',
        path: '/help'
      },
      {
        id: 211,
        title: '设备监控操作',
        type: '使用指南',
        description: '进入设备管理页面、查看设备列表和状态、点击设备查看详情、配置设备参数、进行设备诊断',
        path: '/help'
      },
      {
        id: 212,
        title: '告警处理流程',
        type: '使用指南',
        description: '收到告警通知、进入告警管理页面、查看告警详情、分析告警原因、采取处理措施、标记告警为已处理',
        path: '/help'
      },
      {
        id: 213,
        title: '报表生成操作',
        type: '使用指南',
        description: '进入报表管理页面、选择报表类型、设置时间范围、点击生成报表、查看报表详情、导出报表',
        path: '/help'
      },
      // 帮助中心 - 联系支持
      {
        id: 214,
        title: '技术支持',
        type: '联系支持',
        description: '电话: 400-123-4567, 邮箱: support@yixiaopai.com',
        path: '/help'
      },
      {
        id: 215,
        title: '售后服务',
        type: '联系支持',
        description: '电话: 400-123-4568, 邮箱: service@yixiaopai.com',
        path: '/help'
      },
      {
        id: 216,
        title: '在线支持',
        type: '联系支持',
        description: '工作时间: 周一至周五 9:00-18:00, 在线客服: 点击咨询',
        path: '/help'
      },
      {
        id: 217,
        title: '提交工单',
        type: '联系支持',
        description: '如果您遇到问题，可以提交工单，我们会尽快处理',
        path: '/help'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-md py-2 shadow-lg shadow-secondary/10' : 'bg-dark py-3'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* 左侧：品牌标识 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-info flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-neon-blue animate-pulse-border">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white transition-all duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neon-blue">忆小排</h1>
                <span className="text-xs text-secondary/70 font-mono">Digital Twin Substation</span>
              </div>
            </div>
          </div>
          
          {/* 中间：搜索功能 */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${isSearchFocused ? 'text-secondary' : 'text-gray-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索设备、告警... 🔍"
                className={`w-full bg-dark-light/80 border border-secondary/30 rounded-lg pl-12 pr-4 py-2.5 text-sm focus:outline-none transition-all duration-300 ${isSearchFocused ? 'border-secondary shadow-neon-blue' : 'hover:border-secondary/50'}`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  performSearch(e.target.value);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setIsSearchFocused(false);
                  // 延迟关闭搜索结果，以便用户可以点击结果
                  setTimeout(() => setShowSearchResults(false), 200);
                }}
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-secondary transition-colors"
                  onClick={() => setSearchQuery('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* 搜索结果 */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-light/95 backdrop-blur-md border border-secondary/30 rounded-lg shadow-xl shadow-secondary/10 z-50 animate-fade-in transform transition-all duration-300 origin-top">
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <a 
                        key={result.id}
                        href={result.path}
                        className="flex items-start space-x-3 px-4 py-3 text-sm hover:bg-dark-lighter/80 transition-colors group"
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                          {result.type === '设备' && '📱'}
                          {result.type === '告警' && '⚠️'}
                          {result.type === '规则' && '📝'}
                          {result.type === '页面' && '📄'}
                          {result.type === '系统文档' && '📚'}
                          {result.type === '常见问题' && '❓'}
                          {result.type === '使用指南' && '📋'}
                          {result.type === '联系支持' && '📞'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">{result.title}</div>
                          <div className="text-xs text-gray-400 truncate">{result.description}</div>
                          <div className="text-xs text-secondary mt-1">{result.type}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-light/95 backdrop-blur-md border border-secondary/30 rounded-lg shadow-xl shadow-secondary/10 z-50 animate-fade-in transform transition-all duration-300 origin-top">
                  <div className="py-6 px-4 text-center">
                    <div className="text-gray-400 mb-2">未找到匹配的结果</div>
                    <div className="text-xs text-gray-500">尝试使用其他关键词搜索</div>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          {/* 右侧：系统状态和用户信息 */}
          <div className="flex items-center space-x-4">
            {/* 系统状态 */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-dark-light/60 rounded-lg border border-secondary/30 transition-all duration-300 hover:border-secondary/50 hover:bg-dark-light/80">
                <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse relative">
                  <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-medium text-neon-green">200 终端在线</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-dark-light/60 rounded-lg border border-secondary/30 transition-all duration-300 hover:border-secondary/50 hover:bg-dark-light/80">
                <div className="w-2.5 h-2.5 bg-warning rounded-full animate-pulse relative">
                  <div className="absolute inset-0 bg-warning rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-medium text-warning">39.2°C</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-dark-light/60 rounded-lg border border-secondary/30 transition-all duration-300 hover:border-secondary/50 hover:bg-dark-light/80">
                <div className="w-2.5 h-2.5 bg-danger rounded-full animate-pulse relative">
                  <div className="absolute inset-0 bg-danger rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-medium text-danger">4 告警</span>
              </div>
            </div>
            
            {/* 时间显示 */}
            <div className="hidden lg:block text-sm text-neon-blue font-mono px-3 py-1.5 bg-dark-light/60 rounded-lg border border-secondary/30 transition-all duration-300 hover:border-secondary/50 hover:bg-dark-light/80">
              {dateTime.toLocaleString('zh-CN', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            
            {/* 用户信息或登录/注册按钮 */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-light/60 transition-all duration-300 group border border-secondary/20 hover:border-secondary/50"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-info flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-neon-blue">
                    <span className="text-sm font-medium">管</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">系统管理员</div>
                    <div className="text-xs text-secondary/70">admin@system.com</div>
                  </div>
                  <span className="text-secondary/70 transition-transform duration-300 group-hover:rotate-180">▼</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-dark-light/80 backdrop-blur-sm border border-secondary/30 rounded-lg shadow-xl shadow-secondary/10 z-50 animate-fade-in transform transition-all duration-300 origin-top-right scale-95 opacity-0 animate-[fadeIn_0.2s_ease-in-out_forwards] animate-[scaleIn_0.2s_ease-in-out_forwards">
                    <div className="py-3">
                      <a href="#" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-dark-lighter/80 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        个人资料
                      </a>
                      <a href="/settings" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-dark-lighter/80 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        系统设置
                      </a>
                      <a href="/help" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-dark-lighter/80 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        帮助中心
                      </a>
                      <div className="border-t border-secondary/20 my-1"></div>
                      <a 
                        href="#" 
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-danger hover:bg-dark-lighter/80 transition-colors group"
                        onClick={() => {
                          logout();
                          navigate('/login');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-300 group-hover:text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        退出登录
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-dark-light/60 border border-secondary/30 rounded-lg text-sm font-medium hover:bg-dark-light/80 transition-all duration-300 hover:border-secondary/50"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-secondary border border-secondary rounded-lg text-sm font-medium hover:bg-secondary/90 transition-all duration-300"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;