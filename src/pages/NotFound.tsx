import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 404错误页面
 * 当用户访问不存在的路由时显示
 */
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="text-6xl font-bold mb-4 text-secondary">404</div>
      <h1 className="text-2xl font-semibold mb-6">页面不存在</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <button
        onClick={handleGoHome}
        className="btn-primary flex items-center space-x-2"
      >
        <span>🏠</span>
        <span>返回首页</span>
      </button>
    </div>
  );
};

export default NotFound;