import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { username: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // 从本地存储中获取登录状态
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth).isLoggedIn : false;
  });
  const [user, setUser] = useState<{ username: string; email: string } | null>(() => {
    // 从本地存储中获取用户信息
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth).user : null;
  });

  // 当登录状态或用户信息变化时，更新本地存储
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn, user }));
  }, [isLoggedIn, user]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟登录验证
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setUser({ username: 'admin', email: 'admin@system.com' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
