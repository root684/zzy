import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 * 用于捕获子组件树中的JavaScript错误
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新状态，下次渲染时显示错误界面
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 可以在这里记录错误信息
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleTryAgain = (): void => {
    // 重置错误状态
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // 自定义错误界面
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="text-4xl font-bold mb-4 text-danger">❌</div>
          <h1 className="text-2xl font-semibold mb-4">应用出错了</h1>
          <p className="text-gray-400 mb-6 max-w-md">
            抱歉，应用在运行过程中遇到了错误。
          </p>
          <div className="bg-dark-lighter rounded-lg p-4 mb-6 text-left max-w-md">
            <p className="text-sm text-gray-300 mb-2">错误信息:</p>
            <p className="text-sm text-danger font-mono">
              {this.state.error?.message || '未知错误'}
            </p>
          </div>
          <button
            onClick={this.handleTryAgain}
            className="btn-primary flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>重试</span>
          </button>
        </div>
      );
    }

    // 正常渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;