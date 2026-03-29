import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // 表单验证
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      setIsLoading(false);
      return;
    }
    
    if (!formData.username || !formData.password || !formData.email || !formData.name) {
      setError('请填写所有必填字段');
      setIsLoading(false);
      return;
    }
    
    try {
      // 模拟注册
      console.log('注册数据:', formData);
      
      // 模拟注册延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 注册成功，跳转到登录页面
      navigate('/login');
    } catch (err) {
      setError('注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-red-900/90 via-dark to-red-900/90">
      {/* 背景效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 爱国主题背景元素 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-5"></div>
        {/* 渐变光效 */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-red-600/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className={`bg-dark-light/90 backdrop-blur-md rounded-2xl border border-red-500/30 p-8 shadow-2xl shadow-red-500/10 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 系统图标 */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse-border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          {/* 标题 */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">忆小排系统</h2>
            <p className="text-red-200">储能电站监控系统注册</p>
          </div>
          
          {/* 注册表单 */}
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {/* 姓名输入 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-red-100 mb-2">
                  姓名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-light border border-red-500/30 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-500/50"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="请输入姓名"
                  />
                </div>
              </div>
              
              {/* 用户名输入 */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-red-100 mb-2">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-light border border-red-500/30 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-500/50"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                  />
                </div>
              </div>
              
              {/* 邮箱输入 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-red-100 mb-2">
                  邮箱
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-light border border-red-500/30 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-500/50"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>
              
              {/* 密码输入 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-red-100 mb-2">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-light border border-red-500/30 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-500/50"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="请输入密码"
                  />
                </div>
              </div>
              
              {/* 确认密码输入 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-red-100 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-light border border-red-500/30 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-red-500/50"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="请再次输入密码"
                  />
                </div>
              </div>
            </div>
            
            {/* 注册按钮 */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-dark bg-gradient-to-r from-red-500 to-yellow-400 hover:from-red-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    注册中...
                  </>
                ) : (
                  '注册'
                )}
              </button>
            </div>
            
            {/* 登录链接 */}
            <div className="text-center text-sm">
              <span className="text-red-200">已有账号? </span>
              <a
                href="/login"
                className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              >
                登录
              </a>
            </div>
          </form>
        </div>
        
        {/* 版权信息 */}
        <div className="text-center text-xs text-red-300/70 mt-6">
          © 2026 忆小排系统. 保留所有权利.
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;