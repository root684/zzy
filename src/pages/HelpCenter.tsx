import { useState } from 'react';

/**
 * 帮助中心页面
 * 提供系统文档和使用指南
 */
const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 系统文档数据
  const systemDocuments = [
    {
      id: 'doc-1',
      title: '系统概述',
      description: '储能安全防护系统的整体介绍和功能说明',
      content: '储能安全防护系统是一套专为储能电站设计的监控和管理系统，旨在确保储能设备的安全运行和高效管理。系统提供实时监控、告警管理、数据分析等功能，帮助运维人员及时发现和处理潜在问题。'
    },
    {
      id: 'doc-2',
      title: '安装指南',
      description: '系统的安装步骤和配置方法',
      content: '系统安装包括前端部署和后端配置两个部分。前端部署需要安装Node.js环境，后端配置需要配置数据库和相关服务。详细步骤请参考安装文档。'
    },
    {
      id: 'doc-3',
      title: '用户手册',
      description: '系统的使用方法和操作指南',
      content: '系统用户手册详细介绍了各个功能模块的使用方法，包括仪表盘、设备管理、告警管理等。用户可以通过手册快速了解系统的各项功能。'
    },
    {
      id: 'doc-4',
      title: 'API文档',
      description: '系统的API接口说明',
      content: '系统提供了丰富的API接口，用于与其他系统集成。API文档详细说明了各个接口的参数和返回值，方便开发者进行集成开发。'
    }
  ];

  // 常见问题数据
  const faqs = [
    {
      id: 'faq-1',
      question: '系统无法正常登录怎么办？',
      answer: '请检查用户名和密码是否正确，确保网络连接正常。如果问题仍然存在，请联系系统管理员重置密码。'
    },
    {
      id: 'faq-2',
      question: '如何添加新设备？',
      answer: '在设备管理页面，点击"添加设备"按钮，填写设备信息并保存即可。系统会自动开始监控新添加的设备。'
    },
    {
      id: 'faq-3',
      question: '告警信息如何处理？',
      answer: '在告警管理页面，查看告警详情，根据告警级别采取相应的处理措施。处理完成后，点击"处理"按钮标记告警为已处理。'
    },
    {
      id: 'faq-4',
      question: '如何导出报表？',
      answer: '在报表管理页面，选择报表类型和时间范围，点击"导出"按钮即可导出报表。支持Excel和PDF格式。'
    },
    {
      id: 'faq-5',
      question: '系统运行缓慢怎么办？',
      answer: '请检查服务器资源使用情况，确保服务器有足够的内存和CPU资源。同时，可以清理系统缓存和日志，提高系统性能。'
    }
  ];

  // 使用指南数据
  const guides = [
    {
      id: 'guide-1',
      title: '系统初始化配置',
      steps: [
        '登录系统管理员账号',
        '进入系统设置页面',
        '配置系统基本信息',
        '设置告警规则',
        '添加初始设备'
      ]
    },
    {
      id: 'guide-2',
      title: '设备监控操作',
      steps: [
        '进入设备管理页面',
        '查看设备列表和状态',
        '点击设备查看详情',
        '配置设备参数',
        '进行设备诊断'
      ]
    },
    {
      id: 'guide-3',
      title: '告警处理流程',
      steps: [
        '收到告警通知',
        '进入告警管理页面',
        '查看告警详情',
        '分析告警原因',
        '采取处理措施',
        '标记告警为已处理'
      ]
    },
    {
      id: 'guide-4',
      title: '报表生成操作',
      steps: [
        '进入报表管理页面',
        '选择报表类型',
        '设置时间范围',
        '点击生成报表',
        '查看报表详情',
        '导出报表'
      ]
    }
  ];

  // 搜索功能
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('搜索:', searchQuery);
    // 这里可以添加搜索逻辑
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between animate-slide-up">
        <h1 className="text-2xl font-bold">帮助中心</h1>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            className="px-4 py-2 bg-dark border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300"
            placeholder="搜索帮助文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="btn-secondary flex items-center space-x-2 btn-click"
          >
            <span>🔍</span>
            <span>搜索</span>
          </button>
        </form>
      </div>

      {/* 标签页 */}
      <div className="bg-dark rounded-lg p-4 border border-dark-lighter animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex border-b border-dark-lighter">
          <button
            className={`px-4 py-2 ${activeTab === 'documents' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('documents')}
          >
            系统文档
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'faq' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('faq')}
          >
            常见问题
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'guide' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('guide')}
          >
            使用指南
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'contact' ? 'border-b-2 border-secondary text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('contact')}
          >
            联系支持
          </button>
        </div>

        {/* 系统文档 */}
        {activeTab === 'documents' && (
          <div className="mt-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {systemDocuments.map((doc) => (
              <div key={doc.id} className="bg-dark-light rounded-lg p-4 hover:border-secondary/50 border border-dark-lighter transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                <p className="text-gray-400 mb-3">{doc.description}</p>
                <div className="text-sm text-gray-300">{doc.content}</div>
                <div className="mt-4 flex justify-end">
                  <button className="btn-secondary text-sm btn-click">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 常见问题 */}
        {activeTab === 'faq' && (
          <div className="mt-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-dark-light rounded-lg p-4 hover:border-secondary/50 border border-dark-lighter transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* 使用指南 */}
        {activeTab === 'guide' && (
          <div className="mt-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {guides.map((guide) => (
              <div key={guide.id} className="bg-dark-light rounded-lg p-4 hover:border-secondary/50 border border-dark-lighter transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3">{guide.title}</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  {guide.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        {/* 联系支持 */}
        {activeTab === 'contact' && (
          <div className="mt-6 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-dark-light rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">联系支持</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-md font-medium mb-2">技术支持</h4>
                    <p className="text-gray-300">电话: 400-123-4567</p>
                    <p className="text-gray-300">邮箱: support@yixiaopai.com</p>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">售后服务</h4>
                    <p className="text-gray-300">电话: 400-123-4568</p>
                    <p className="text-gray-300">邮箱: service@yixiaopai.com</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">在线支持</h4>
                  <p className="text-gray-300">工作时间: 周一至周五 9:00-18:00</p>
                  <p className="text-gray-300">在线客服: <a href="#" className="text-secondary hover:underline">点击咨询</a></p>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">提交工单</h4>
                  <p className="text-gray-300">如果您遇到问题，可以提交工单，我们会尽快处理。</p>
                  <button className="mt-2 btn-primary btn-click">
                    提交工单
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;