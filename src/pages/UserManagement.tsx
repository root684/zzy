import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

/**
 * 用户管理页面
 * 用于管理系统用户，包括添加、编辑、删除和查看用户信息
 */
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@system.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-02-27 10:30:00',
      createdAt: '2026-01-01 00:00:00'
    },
    {
      id: '2',
      username: 'operator',
      email: 'operator@system.com',
      role: 'operator',
      status: 'active',
      lastLogin: '2026-02-26 15:45:00',
      createdAt: '2026-01-02 00:00:00'
    },
    {
      id: '3',
      username: 'viewer',
      email: 'viewer@system.com',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2026-02-20 09:15:00',
      createdAt: '2026-01-03 00:00:00'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'viewer' as 'admin' | 'operator' | 'viewer',
    status: 'active' as 'active' | 'inactive'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索逻辑
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      role: 'viewer',
      status: 'active'
    });
    setIsAddModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsAddModalOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('确定要删除这个用户吗？')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // 编辑用户
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // 添加新用户
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        lastLogin: 'Never',
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }
    setIsAddModalOpen(false);
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <div className="flex space-x-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索用户..."
              className="bg-dark-lighter border border-dark-lightest rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </form>
          <button 
            onClick={handleAddUser}
            className="btn-primary flex items-center space-x-2"
          >
            <span>➕</span>
            <span>添加用户</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-lighter">
                <th className="text-left py-3 px-4 text-gray-400">用户名</th>
                <th className="text-left py-3 px-4 text-gray-400">邮箱</th>
                <th className="text-left py-3 px-4 text-gray-400">角色</th>
                <th className="text-left py-3 px-4 text-gray-400">状态</th>
                <th className="text-left py-3 px-4 text-gray-400">最后登录</th>
                <th className="text-left py-3 px-4 text-gray-400">创建时间</th>
                <th className="text-left py-3 px-4 text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b border-dark-lighter hover:bg-dark transition-colors duration-300"
                >
                  <td className="py-3 px-4 font-medium">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-primary/20 text-primary' :
                      user.role === 'operator' ? 'bg-secondary/20 text-secondary' :
                      'bg-info/20 text-info'
                    }`}>
                      {user.role === 'admin' ? '管理员' :
                       user.role === 'operator' ? '操作员' : '查看者'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                    }`}>
                      {user.status === 'active' ? '活跃' : '禁用'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{user.lastLogin}</td>
                  <td className="py-3 px-4 text-gray-400">{user.createdAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-secondary hover:underline font-medium"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-danger hover:underline font-medium"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加/编辑用户模态框 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-light rounded-lg border border-dark-lighter p-6 w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? '编辑用户' : '添加用户'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">用户名</label>
                <input
                  type="text"
                  className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">邮箱</label>
                <input
                  type="email"
                  className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">角色</label>
                <select
                  className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'operator' | 'viewer' })}
                >
                  <option value="admin">管理员</option>
                  <option value="operator">操作员</option>
                  <option value="viewer">查看者</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">状态</label>
                <select
                  className="w-full bg-dark border border-dark-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">活跃</option>
                  <option value="inactive">禁用</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingUser ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;