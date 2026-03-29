import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { preloadCriticalResources } from './utils/performance';

function App() {
  // 预加载关键资源
  useEffect(() => {
    preloadCriticalResources();
  }, []);

  return (
    <div className="flex h-screen bg-dark text-white relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 grid-lines radial-bg pointer-events-none"></div>
      
      {/* 侧边导航栏 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* 顶部导航栏 */}
        <Navbar />
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-6 bg-dark-light/60 backdrop-blur-sm scrollbar-thin pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;