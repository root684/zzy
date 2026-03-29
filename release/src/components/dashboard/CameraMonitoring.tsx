import React, { useState, useRef, useEffect } from 'react';

// 添加视频噪点动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes flicker {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);

interface Camera {
  id: string;
  name: string;
  status: string;
  location: string;
  streamUrl: string;
  hasInfrared: boolean; // 是否配备红外感应
  infraredStatus: 'normal' | 'detected' | 'error'; // 红外感应状态
}

interface Alert {
  id: string;
  level: string;
  message: string;
  location: string;
  timestamp: string;
}

interface Recording {
  id: string;
  cameraId: string;
  cameraName: string;
  startTime: string;
  endTime: string;
  duration: number;
  fileSize: string;
}

interface CameraMonitoringProps {
  data: {
    cameras: Camera[];
    alerts: Alert[];
    recordings: Recording[];
  };
}

const CameraMonitoring: React.FC<CameraMonitoringProps> = ({ data }) => {
  // 状态管理
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(data.cameras[0] || null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<string>('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [showRecordings, setShowRecordings] = useState(false);
  const [showMotionSettings, setShowMotionSettings] = useState(false);
  const [motionSensitivity, setMotionSensitivity] = useState(50); // 0-100
  const [motionDetected, setMotionDetected] = useState(false);
  const [abnormalDetected, setAbnormalDetected] = useState(false);
  const [motionAlerts, setMotionAlerts] = useState<Alert[]>([]);
  
  // 红外感应相关状态
  const [infraredDetected, setInfraredDetected] = useState(false);
  const [infraredSensitivity, setInfraredSensitivity] = useState(60); // 0-100
  const [infraredEnabled, setInfraredEnabled] = useState(true);
  const [infraredLinkage, setInfraredLinkage] = useState(true); // 红外感应触发摄像联动
  const [infraredLinkageDelay, setInfraredLinkageDelay] = useState(0); // 联动延迟（秒）
  const [infraredLinkageDuration, setInfraredLinkageDuration] = useState(60); // 联动持续时间（秒）
  const [infraredLinkageMode, setInfraredLinkageMode] = useState('record'); // 联动模式：record（仅录制）, record-alert（录制+报警）, alert（仅报警）
  const [showInfraredSettings, setShowInfraredSettings] = useState(false);
  const [infraredHistory, setInfraredHistory] = useState<{
    id: string;
    timestamp: string;
    cameraName: string;
  }[]>([]);
  
  // 高清摄像头相关状态
  const [resolution, setResolution] = useState('1080p'); // 分辨率选项：720p, 1080p, 4k
  const [autoFocus, setAutoFocus] = useState(true); // 自动对焦
  const [lowLightMode, setLowLightMode] = useState(false); // 低光增强模式
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  
  // 供电与数据传输相关状态
  const [powerMode, setPowerMode] = useState('normal'); // 供电模式：normal（正常）, power-saving（节能）, high-performance（高性能）
  const [powerConsumption, setPowerConsumption] = useState(5.2); // 当前功耗（W）
  const [batteryLevel, setBatteryLevel] = useState(85); // 电池电量（%）
  const [dataTransferSpeed, setDataTransferSpeed] = useState(12.5); // 数据传输速度（Mbps）
  const [networkStatus, setNetworkStatus] = useState('excellent'); // 网络状态：excellent, good, fair, poor
  const [showSystemSettings, setShowSystemSettings] = useState(false);
  
  // 引用
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const panStartRef = useRef({ x: 0, y: 0 });

  // 根据告警级别获取颜色
  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case '一级':
        return 'text-red-500';
      case '二级':
        return 'text-orange-500';
      case '三级':
        return 'text-yellow-500';
      default:
        return 'text-gray-400';
    }
  };

  // 开始录制
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingStartTime(new Date().toISOString());
    setRecordingDuration(0);
  };

  // 停止录制
  const handleStopRecording = () => {
    setIsRecording(false);
    // 这里可以添加保存录制文件的逻辑
  };

  // 计算录制时间
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // 切换夜间模式
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  // 缩放控制
  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(prev => prev + 0.2);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.2);
    }
  };

  // 重置缩放和平移
  const resetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // 平移控制
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanPosition({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // 模拟移动侦测
  useEffect(() => {
    const motionInterval = setInterval(() => {
      // 根据灵敏度设置模拟检测到移动
      const threshold = 1 - motionSensitivity / 100;
      if (Math.random() > threshold) {
        setMotionDetected(true);
        
        // 添加报警记录
        const newAlert: Alert = {
          id: `motion-${Date.now()}`,
          level: '二级',
          message: '检测到移动',
          location: selectedCamera?.location || '未知位置',
          timestamp: new Date().toISOString()
        };
        setMotionAlerts(prev => [newAlert, ...prev].slice(0, 10)); // 只保留最近10条
        
        setTimeout(() => setMotionDetected(false), 3000);
      }
    }, 5000);

    return () => clearInterval(motionInterval);
  }, [motionSensitivity, selectedCamera]);

  // 模拟异常行为检测
  useEffect(() => {
    const abnormalBehaviors = [
      '检测到可疑人员',
      '检测到异常物体',
      '检测到区域入侵',
      '检测到异常行为'
    ];
    
    const abnormalInterval = setInterval(() => {
      // 模拟随机检测到异常行为
      if (Math.random() > 0.98) {
        setAbnormalDetected(true);
        
        // 添加报警记录
        const newAlert: Alert = {
          id: `abnormal-${Date.now()}`,
          level: '一级',
          message: abnormalBehaviors[Math.floor(Math.random() * abnormalBehaviors.length)],
          location: selectedCamera?.location || '未知位置',
          timestamp: new Date().toISOString()
        };
        setMotionAlerts(prev => [newAlert, ...prev].slice(0, 10)); // 只保留最近10条
        
        setTimeout(() => setAbnormalDetected(false), 5000);
      }
    }, 10000);

    return () => clearInterval(abnormalInterval);
  }, [selectedCamera]);

  // 模拟红外感应
  useEffect(() => {
    if (!infraredEnabled || !selectedCamera?.hasInfrared) return;
    
    const infraredInterval = setInterval(() => {
      // 根据灵敏度设置模拟检测到红外信号
      const threshold = 1 - infraredSensitivity / 100;
      if (Math.random() > threshold) {
        setInfraredDetected(true);
        
        // 添加红外感应记录
        const newDetection = {
          id: `infrared-${Date.now()}`,
          timestamp: new Date().toISOString(),
          cameraName: selectedCamera.name
        };
        setInfraredHistory(prev => [newDetection, ...prev].slice(0, 10)); // 只保留最近10条
        
        // 红外感应触发摄像联动
        if (infraredLinkage) {
          // 联动延迟
          setTimeout(() => {
            // 根据联动模式执行不同操作
            if (infraredLinkageMode === 'record' || infraredLinkageMode === 'record-alert') {
              if (!isRecording) {
                handleStartRecording();
                
                // 联动持续时间后自动停止录制
                setTimeout(() => {
                  if (isRecording) {
                    handleStopRecording();
                  }
                }, infraredLinkageDuration * 1000);
              }
            }
            
            if (infraredLinkageMode === 'alert' || infraredLinkageMode === 'record-alert') {
              // 添加报警记录
              const newAlert: Alert = {
                id: `infrared-${Date.now()}`,
                level: '二级',
                message: '红外感应触发',
                location: selectedCamera.location,
                timestamp: new Date().toISOString()
              };
              setMotionAlerts(prev => [newAlert, ...prev].slice(0, 10)); // 只保留最近10条
            }
          }, infraredLinkageDelay * 1000);
        }
        
        setTimeout(() => setInfraredDetected(false), 3000);
      }
    }, 3000);

    return () => clearInterval(infraredInterval);
  }, [infraredEnabled, infraredSensitivity, infraredLinkage, infraredLinkageDelay, infraredLinkageDuration, infraredLinkageMode, selectedCamera, isRecording]);

  // 生成随机点数据
  const [randomPoints, setRandomPoints] = useState<Array<{x: number, y: number, animation: string}>>([]);
  const [noisePoints, setNoisePoints] = useState<Array<{x: number, y: number, animation: string}>>([]);

  // 初始化随机点
  useEffect(() => {
    // 生成电流流动效果的随机点
    const points = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      animation: `flicker ${Math.random() * 3 + 1}s infinite`
    }));
    setRandomPoints(points);

    // 生成视频噪点效果的随机点
    const noise = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      animation: `flicker ${Math.random() * 2 + 1}s infinite`
    }));
    setNoisePoints(noise);
  }, []);

  // 模拟不同摄像头的内容
  const getCameraContent = (cameraId: string) => {
    switch (cameraId) {
      case 'cam1':
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-6xl mb-4">🚪</div>
              <div className="text-white text-xl">变电站入口</div>
              <div className="text-gray-400 mt-2">实时监控中</div>
            </div>
            {/* 模拟视频效果 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
              {/* 模拟移动物体 */}
              <div className="absolute top-1/4 left-1/4 w-2 h-8 bg-white/30 animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
            </div>
          </div>
        );
      case 'cam2':
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-6xl mb-4">🔋</div>
              <div className="text-white text-xl">电池阵列区</div>
              <div className="text-gray-400 mt-2">实时监控中</div>
            </div>
            {/* 模拟视频效果 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-yellow-900/20 to-orange-900/20"></div>
              {/* 模拟电池状态指示灯 */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-6 bg-green-500/40 rounded-sm animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '30%',
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      case 'cam3':
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-6xl mb-4">⚡</div>
              <div className="text-white text-xl">高压配电区</div>
              <div className="text-gray-400 mt-2">实时监控中</div>
            </div>
            {/* 模拟视频效果 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
              {/* 模拟电流流动效果 */}
              <div className="absolute top-0 left-0 w-full h-full">
                {randomPoints.map((point, i) => (
                  <div 
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      animation: point.animation
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'cam4':
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-6xl mb-4">🌳</div>
              <div className="text-white text-xl">户外动力区</div>
              <div className="text-gray-400 mt-2">实时监控中</div>
            </div>
            {/* 模拟视频效果 */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>
              {/* 模拟户外环境 */}
              <div className="absolute top-1/5 left-1/5 w-4 h-12 bg-green-500/30 rounded-sm"></div>
              <div className="absolute top-1/4 right-1/4 w-3 h-8 bg-green-600/30 rounded-sm"></div>
              <div className="absolute bottom-1/4 left-1/3 w-5 h-10 bg-green-400/30 rounded-sm"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <div className="text-white text-xl">未知摄像头</div>
              <div className="text-gray-400 mt-2">实时监控中</div>
            </div>
          </div>
        );
    }
  };

  // 模拟功耗和数据传输速度更新
  useEffect(() => {
    const systemInterval = setInterval(() => {
      // 根据供电模式和当前状态更新功耗
      let basePower = 0;
      switch (powerMode) {
        case 'power-saving':
          basePower = 3.0;
          break;
        case 'normal':
          basePower = 5.0;
          break;
        case 'high-performance':
          basePower = 8.0;
          break;
      }
      
      // 根据摄像头状态调整功耗
      if (isRecording) basePower += 2.0;
      if (lowLightMode) basePower += 1.0;
      if (resolution === '4k') basePower += 1.5;
      if (resolution === '1080p') basePower += 0.5;
      
      // 添加随机波动
      const powerVariation = (Math.random() - 0.5) * 0.4;
      setPowerConsumption(prev => Math.max(2.0, Math.min(12.0, prev + powerVariation)));
      
      // 更新数据传输速度
      let baseSpeed = 0;
      switch (networkStatus) {
        case 'excellent':
          baseSpeed = 15.0;
          break;
        case 'good':
          baseSpeed = 10.0;
          break;
        case 'fair':
          baseSpeed = 5.0;
          break;
        case 'poor':
          baseSpeed = 2.0;
          break;
      }
      
      // 根据分辨率调整传输速度
      if (resolution === '4k') baseSpeed += 5.0;
      if (resolution === '1080p') baseSpeed += 2.0;
      
      // 添加随机波动
      const speedVariation = (Math.random() - 0.5) * 2.0;
      setDataTransferSpeed(prev => Math.max(1.0, Math.min(25.0, prev + speedVariation)));
      
      // 模拟网络状态变化
      if (Math.random() > 0.95) {
        const statuses = ['excellent', 'good', 'fair', 'poor'];
        const currentIndex = statuses.indexOf(networkStatus);
        let newIndex = currentIndex + (Math.random() > 0.5 ? 1 : -1);
        newIndex = Math.max(0, Math.min(3, newIndex));
        setNetworkStatus(statuses[newIndex] as 'excellent' | 'good' | 'fair' | 'poor');
      }
    }, 5000);

    return () => clearInterval(systemInterval);
  }, [powerMode, isRecording, lowLightMode, resolution, networkStatus]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 主视频显示区 */}
      <div className="lg:col-span-2">
        <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
          {selectedCamera ? (
            <div 
              ref={videoRef}
              className="w-full h-full flex items-center justify-center"
              style={{
                cursor: isPanning ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                  className={`transition-all duration-300 ${isNightMode ? 'brightness-75 contrast-125' : ''}`}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* 摄像头视频流 */}
                  <div className="w-full h-full relative">
                    {/* 根据不同摄像头显示不同内容 */}
                    {getCameraContent(selectedCamera.id)}
                    
                    {/* 摄像头信息叠加 */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex flex-col space-y-1">
                      <div className="font-medium">{selectedCamera.name}</div>
                      <div className="text-gray-300 text-xs">{selectedCamera.location}</div>
                      <div className={`text-xs ${selectedCamera.status === '正常' ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedCamera.status}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {resolution} 实时流
                      </div>
                    </div>
                    
                    {/* 模拟视频噪点效果 */}
                    <div className="absolute inset-0 opacity-10">
                      {noisePoints.map((point, i) => (
                        <div 
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            animation: point.animation
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              没有可用的摄像头
            </div>
          )}
          
          {/* 监控状态标签 */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center space-x-2">
            <span>变电站实时监控</span>
            {isNightMode && (
              <span className="bg-blue-900/80 text-blue-300 text-xs px-2 py-0.5 rounded-full">
                夜间模式
              </span>
            )}
            {motionDetected && (
              <span className="bg-red-900/80 text-red-300 text-xs px-2 py-0.5 rounded-full animate-pulse">
                移动侦测
              </span>
            )}
            {abnormalDetected && (
              <span className="bg-yellow-900/80 text-yellow-300 text-xs px-2 py-0.5 rounded-full animate-pulse">
                异常行为
              </span>
            )}
            {infraredDetected && (
              <span className="bg-purple-900/80 text-purple-300 text-xs px-2 py-0.5 rounded-full animate-pulse">
                红外感应
              </span>
            )}
          </div>

          {/* 录制状态 */}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-900/80 text-red-300 text-sm px-3 py-1 rounded-full flex items-center space-x-2 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>录制中</span>
              <span className="text-white text-xs">
                {Math.floor(recordingDuration / 3600).toString().padStart(2, '0')}:
                {Math.floor((recordingDuration % 3600) / 60).toString().padStart(2, '0')}:
                {Math.floor(recordingDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}


        </div>

        {/* 控制按钮 */}
        <div className="mt-4 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 space-x-4 transition-all duration-300 hover:bg-black/80">
          {/* 录制按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-red-600 hover:bg-red-700 scale-105' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            title={isRecording ? '停止录制' : '开始录制'}
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isRecording ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              )}
            </svg>
          </button>

          {/* 夜间模式按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isNightMode ? 'bg-blue-600 hover:bg-blue-700 scale-105' : 'bg-dark-lighter hover:bg-dark'}`}
            onClick={toggleNightMode}
            title={isNightMode ? '关闭夜间模式' : '开启夜间模式'}
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isNightMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              )}
            </svg>
          </button>

          {/* 缩放控制 */}
          <div className="flex flex-col space-y-1">
            <button 
              className="w-8 h-8 rounded bg-dark-lighter hover:bg-dark flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={handleZoomIn}
              title="放大"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button 
              className="w-8 h-8 rounded bg-dark-lighter hover:bg-dark flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={handleZoomOut}
              title="缩小"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* 重置视图按钮 */}
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-dark-lighter hover:bg-dark hover:scale-110"
            onClick={resetView}
            title="重置视图"
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300 hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* 移动侦测设置按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${showMotionSettings ? 'bg-blue-600 hover:bg-blue-700 scale-105' : 'bg-dark-lighter hover:bg-dark'}`}
            onClick={() => setShowMotionSettings(!showMotionSettings)}
            title="移动侦测设置"
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* 红外感应设置按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${showInfraredSettings ? 'bg-purple-600 hover:bg-purple-700 scale-105' : 'bg-dark-lighter hover:bg-dark'}`}
            onClick={() => setShowInfraredSettings(!showInfraredSettings)}
            title="红外感应设置"
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          {/* 摄像头设置按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${showCameraSettings ? 'bg-green-600 hover:bg-green-700 scale-105' : 'bg-dark-lighter hover:bg-dark'}`}
            onClick={() => setShowCameraSettings(!showCameraSettings)}
            title="摄像头设置"
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* 系统设置按钮 */}
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${showSystemSettings ? 'bg-yellow-600 hover:bg-yellow-700 scale-105' : 'bg-dark-lighter hover:bg-dark'}`}
            onClick={() => setShowSystemSettings(!showSystemSettings)}
            title="系统设置"
          >
            <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* 历史录像查询 */}
        <div className="mt-6 bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">历史录像查询</h3>
            <button 
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              onClick={() => setShowRecordings(!showRecordings)}
            >
              <span>{showRecordings ? '隐藏' : '显示'}录像</span>
              <svg className={`w-4 h-4 ml-1 transition-transform ${showRecordings ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {showRecordings && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {data.recordings.length > 0 ? (
                data.recordings.map((recording) => (
                  <div key={recording.id} className="bg-dark-light/40 p-3 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white text-sm font-medium">{recording.cameraName}</div>
                        <div className="text-gray-400 text-xs mt-1">
                          {new Date(recording.startTime).toLocaleString()} - {new Date(recording.endTime).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-xs">时长: {recording.duration}秒</div>
                        <button className="mt-2 text-blue-400 hover:text-blue-300 text-xs">
                          播放
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-4">
                  暂无历史录像
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 摄像头列表和告警信息 */}
      <div className="space-y-6">
        {/* 摄像头列表 */}
        <div className="bg-dark-light/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
          <h3 className="text-white font-medium mb-3">变电站摄像头列表</h3>
          <div className="space-y-2">
            {data.cameras.map((camera) => (
              <div
                key={camera.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedCamera?.id === camera.id ? 'bg-blue-900/50 border border-blue-500 scale-105' : 'bg-dark-light/40 hover:bg-dark-light/60 hover:scale-102'}`}
                onClick={() => setSelectedCamera(camera)}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${camera.status === '正常' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="text-white text-sm">{camera.name}</div>
                    <div className="text-gray-400 text-xs">{camera.location}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${camera.status === '正常' ? 'bg-green-900/50 text-green-500' : 'bg-red-900/50 text-red-500'}`}>
                  {camera.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 告警信息 */}
        <div className="bg-dark-light/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
          <h3 className="text-white font-medium mb-3">变电站告警信息</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {data.alerts.map((alert) => (
              <div key={alert.id} className="bg-dark-light/40 p-3 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{alert.message}</div>
                    <div className="text-gray-400 text-xs mt-1">{alert.location}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium ${getAlertLevelColor(alert.level)}`}>
                      {alert.level}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {data.alerts.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                暂无告警信息
              </div>
            )}
          </div>
        </div>

        {/* 系统状态 */}
        <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50">
          <h3 className="text-white font-medium mb-3">系统状态</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">视频分辨率</span>
              <span className="text-white text-sm">{resolution}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">自动对焦</span>
              <span className={`text-sm ${autoFocus ? 'text-green-500' : 'text-gray-400'}`}>
                {autoFocus ? '开启' : '关闭'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">低光增强</span>
              <span className={`text-sm ${lowLightMode ? 'text-green-500' : 'text-gray-400'}`}>
                {lowLightMode ? '开启' : '关闭'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">视频延迟</span>
              <span className="text-white text-sm">&lt; 100ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">存储状态</span>
              <span className="text-white text-sm">85% 可用</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">系统状态</span>
              <span className="text-green-500 text-sm">正常运行</span>
            </div>
          </div>
        </div>

        {/* 移动侦测设置 */}
        {showMotionSettings && (
          <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 transition-all duration-300 ease-in-out animate-fadeIn">
            <h3 className="text-white font-medium mb-3">移动侦测设置</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">灵敏度</span>
                  <span className="text-white text-sm">{motionSensitivity}%</span>
                </div>
                <input
                  type="range"
                  id="motionSensitivity"
                  name="motionSensitivity"
                  min="0"
                  max="100"
                  value={motionSensitivity}
                  onChange={(e) => setMotionSensitivity(Number(e.target.value))}
                  className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${motionSensitivity}%, #1e293b ${motionSensitivity}%, #1e293b 100%)`
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">移动侦测</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="motionDetection" name="motionDetection" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">报警通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="alarmNotification" name="alarmNotification" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">录制触发</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="recordingTrigger" name="recordingTrigger" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 红外感应设置 */}
        {showInfraredSettings && (
          <div className="bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 transition-all duration-300 ease-in-out animate-fadeIn">
            <h3 className="text-white font-medium mb-3">红外感应设置</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">灵敏度</span>
                  <span className="text-white text-sm">{infraredSensitivity}%</span>
                </div>
                <input
                  type="range"
                  id="infraredSensitivity"
                  name="infraredSensitivity"
                  min="0"
                  max="100"
                  value={infraredSensitivity}
                  onChange={(e) => setInfraredSensitivity(Number(e.target.value))}
                  className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${infraredSensitivity}%, #1e293b ${infraredSensitivity}%, #1e293b 100%)`
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">红外感应</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="infraredEnabled"
                    name="infraredEnabled"
                    value="" 
                    className="sr-only peer" 
                    checked={infraredEnabled}
                    onChange={(e) => setInfraredEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">摄像联动</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="infraredLinkage"
                    name="infraredLinkage"
                    value="" 
                    className="sr-only peer" 
                    checked={infraredLinkage}
                    onChange={(e) => setInfraredLinkage(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              {infraredLinkage && (
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm mb-2">联动模式</div>
                    <div className="flex space-x-2">
                      {[
                        { value: 'record', label: '仅录制' },
                        { value: 'record-alert', label: '录制+报警' },
                        { value: 'alert', label: '仅报警' }
                      ].map((mode) => (
                        <button
                          key={mode.value}
                          className={`px-3 py-1 rounded-full text-sm transition-all ${infraredLinkageMode === mode.value ? 'bg-purple-600 text-white' : 'bg-dark-lighter text-gray-400 hover:bg-dark'}`}
                          onClick={() => setInfraredLinkageMode(mode.value)}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">联动延迟（秒）</span>
                      <span className="text-white text-sm">{infraredLinkageDelay}s</span>
                    </div>
                    <input
                      type="range"
                      id="infraredLinkageDelay"
                      name="infraredLinkageDelay"
                      min="0"
                      max="10"
                      value={infraredLinkageDelay}
                      onChange={(e) => setInfraredLinkageDelay(Number(e.target.value))}
                      className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(infraredLinkageDelay / 10) * 100}%, #1e293b ${(infraredLinkageDelay / 10) * 100}%, #1e293b 100%)`
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">联动持续时间（秒）</span>
                      <span className="text-white text-sm">{infraredLinkageDuration}s</span>
                    </div>
                    <input
                      type="range"
                      id="infraredLinkageDuration"
                      name="infraredLinkageDuration"
                      min="10"
                      max="300"
                      step="10"
                      value={infraredLinkageDuration}
                      onChange={(e) => setInfraredLinkageDuration(Number(e.target.value))}
                      className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((infraredLinkageDuration - 10) / 290) * 100}%, #1e293b ${((infraredLinkageDuration - 10) / 290) * 100}%, #1e293b 100%)`
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">报警通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="infraredAlarmNotification" name="infraredAlarmNotification" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 红外感应历史 */}
        <div className="bg-dark-light/40 backdrop-blur-sm rounded-lg p-4 border border-blue-900/30">
          <h3 className="text-white font-medium mb-3">红外感应历史</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {infraredHistory.length > 0 ? (
              infraredHistory.map((detection) => (
                <div key={detection.id} className="bg-dark-light/40 p-3 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{detection.cameraName}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {new Date(detection.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-purple-400 text-xs">
                      红外触发
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                暂无红外感应记录
              </div>
            )}
          </div>
        </div>

        {/* 摄像头设置 */}
        {showCameraSettings && (
          <div className="mt-4 bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 transition-all duration-300 ease-in-out animate-fadeIn">
            <h3 className="text-white font-medium mb-3">摄像头设置</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-2">分辨率</div>
                <div className="flex space-x-2">
                  {['720p', '1080p', '4k'].map((res) => (
                    <button
                      key={res}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${resolution === res ? 'bg-blue-600 text-white' : 'bg-dark-lighter text-gray-400 hover:bg-dark'}`}
                      onClick={() => setResolution(res)}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">自动对焦</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="autoFocus"
                      name="autoFocus"
                      value="" 
                      className="sr-only peer" 
                      checked={autoFocus}
                      onChange={(e) => setAutoFocus(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">低光增强模式</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      id="lowLightMode"
                      name="lowLightMode"
                      value="" 
                      className="sr-only peer" 
                      checked={lowLightMode}
                      onChange={(e) => setLowLightMode(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-dark-lighter peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
            </div>
          </div>
        )}

        {/* 系统设置 */}
        {showSystemSettings && (
          <div className="mt-4 bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50 transition-all duration-300 ease-in-out animate-fadeIn">
            <h3 className="text-white font-medium mb-3">系统设置</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-2">供电模式</div>
                <div className="flex space-x-2">
                  {[
                    { value: 'power-saving', label: '节能模式' },
                    { value: 'normal', label: '正常模式' },
                    { value: 'high-performance', label: '高性能模式' }
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${powerMode === mode.value ? 'bg-green-600 text-white' : 'bg-dark-lighter text-gray-400 hover:bg-dark'}`}
                      onClick={() => setPowerMode(mode.value)}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">当前功耗</span>
                  <span className="text-white text-sm">{powerConsumption}W</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">电池电量</span>
                  <span className="text-white text-sm">{batteryLevel}%</span>
                </div>
                <div className="w-full h-2 bg-dark rounded-lg overflow-hidden">
                  <div 
                    className={`h-full rounded-lg ${batteryLevel > 70 ? 'bg-green-500' : batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">数据传输速度</span>
                  <span className="text-white text-sm">{dataTransferSpeed} Mbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">网络状态</span>
                  <span className={`text-sm ${networkStatus === 'excellent' ? 'text-green-500' : networkStatus === 'good' ? 'text-blue-500' : networkStatus === 'fair' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {networkStatus === 'excellent' ? '优秀' : networkStatus === 'good' ? '良好' : networkStatus === 'fair' ? '一般' : '较差'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraMonitoring;