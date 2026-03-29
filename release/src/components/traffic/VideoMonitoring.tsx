import React, { useState, useRef, useEffect } from 'react';

interface Camera {
  id: string;
  name: string;
  status: string;
  location: string;
  streamUrl: string;
}

interface Alert {
  id: string;
  level: string;
  message: string;
  location: string;
  timestamp: string;
}

interface VideoMonitoringProps {
  data: {
    cameras: Camera[];
    alerts: Alert[];
  };
}

const VideoMonitoring: React.FC<VideoMonitoringProps> = ({ data }) => {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(data.cameras[0] || null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [imageEnhancement, setImageEnhancement] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sharpness: 100,
    noiseReduction: 0
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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

  // 检查摄像头是否正常
  const isCameraNormal = (camera: Camera | null): boolean => {
    return camera?.status === '正常';
  };

  // 启动摄像头
  const startCamera = async () => {
    // 检查摄像头状态
    if (!isCameraNormal(selectedCamera)) {
      alert('摄像头状态异常，无法启动拍摄');
      return;
    }

    try {
      // 检查浏览器是否支持摄像头API
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('浏览器不支持摄像头API');
        setCameraPermission('denied');
        alert('浏览器不支持摄像头API');
        return;
      }
      
      // 请求摄像头权限，使用灵活的分辨率设置
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setCameraPermission('granted');
      setIsCameraActive(true);
      
      // 保存流引用
      streamRef.current = stream;
      
      // 显示摄像头画面
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // 监听视频播放事件
        videoRef.current.addEventListener('loadedmetadata', () => {
          console.log('视频元数据加载完成');
          // 显示实际分辨率信息
          if (videoRef.current) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;
            console.log(`摄像头分辨率: ${videoWidth}×${videoHeight}`);
            // 可以在这里添加一个提示，显示当前摄像头的实际分辨率
          }
        });
        
        videoRef.current.addEventListener('play', () => {
          console.log('视频开始播放');
        });
        
        videoRef.current.addEventListener('error', (e) => {
          console.error('视频错误:', e);
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraPermission('denied');
      alert('无法访问摄像头，请检查权限设置');
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // 捕获图像
  const captureImage = () => {
    // 检查摄像头状态
    if (!isCameraNormal(selectedCamera)) {
      alert('摄像头状态异常，无法捕获图像');
      return;
    }

    if (videoRef.current) {
      // 获取实际视频分辨率
      const videoWidth = videoRef.current.videoWidth || 1920;
      const videoHeight = videoRef.current.videoHeight || 1080;
      
      const canvas = document.createElement('canvas');
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImages(prev => [...prev, imageUrl]);
        
        // 显示分辨率信息
        console.log(`捕获图像分辨率: ${videoWidth}×${videoHeight}`);
        alert(`图像已捕获，分辨率: ${videoWidth}×${videoHeight}`);
      }
    }
  };

  // 应用图像增强效果
  useEffect(() => {
    if (!isCameraActive || !videoRef.current) return;

    // 创建Canvas元素
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 1920;
      canvas.height = videoRef.current.videoHeight || 1080;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvasRef.current = canvas;
      
      // 获取2D上下文
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
      
      // 将Canvas添加到视频容器中
      if (videoRef.current.parentElement) {
        videoRef.current.parentElement.appendChild(canvas);
        // 隐藏原始视频元素
        videoRef.current.style.display = 'none';
      }
    }

    // 动画循环
    const animate = () => {
      if (!canvasRef.current || !ctxRef.current || !videoRef.current) return;

      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      const video = videoRef.current;

      // 调整Canvas大小
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 1920;
        canvas.height = video.videoHeight || 1080;
      }

      // 绘制视频帧 - 优化画质
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 应用图像增强效果
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 应用亮度、对比度、饱和度和锐度调整
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // 亮度调整
        r = (r * imageEnhancement.brightness) / 100;
        g = (g * imageEnhancement.brightness) / 100;
        b = (b * imageEnhancement.brightness) / 100;

        // 对比度调整
        r = ((r - 128) * (imageEnhancement.contrast / 100)) + 128;
        g = ((g - 128) * (imageEnhancement.contrast / 100)) + 128;
        b = ((b - 128) * (imageEnhancement.contrast / 100)) + 128;

        // 饱和度调整
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = gray + (r - gray) * (imageEnhancement.saturation / 100);
        g = gray + (g - gray) * (imageEnhancement.saturation / 100);
        b = gray + (b - gray) * (imageEnhancement.saturation / 100);

        // 限制值范围
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
      }

      // 应用降噪效果（简单的均值滤波）
      if (imageEnhancement.noiseReduction > 0) {
        const kernelSize = Math.floor(imageEnhancement.noiseReduction / 20) + 1;
        const kernelRadius = Math.floor(kernelSize / 2);
        
        // 创建临时图像数据
        const tempImageData = ctx.createImageData(canvas.width, canvas.height);
        const tempData = tempImageData.data;

        // 应用均值滤波
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            let r = 0, g = 0, b = 0, count = 0;
            
            // 遍历 kernel
            for (let ky = -kernelRadius; ky <= kernelRadius; ky++) {
              for (let kx = -kernelRadius; kx <= kernelRadius; kx++) {
                const px = Math.max(0, Math.min(canvas.width - 1, x + kx));
                const py = Math.max(0, Math.min(canvas.height - 1, y + ky));
                const index = (py * canvas.width + px) * 4;
                r += data[index];
                g += data[index + 1];
                b += data[index + 2];
                count++;
              }
            }
            
            // 计算平均值
            const index = (y * canvas.width + x) * 4;
            tempData[index] = r / count;
            tempData[index + 1] = g / count;
            tempData[index + 2] = b / count;
            tempData[index + 3] = data[index + 3]; // 保持 alpha 通道
          }
        }
        
        // 将处理后的数据放回
        ctx.putImageData(tempImageData, 0, 0);
      } else {
        // 直接放回处理后的数据
        ctx.putImageData(imageData, 0, 0);
      }

      // 继续动画循环
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      // 清理Canvas
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.parentElement.removeChild(canvasRef.current);
        canvasRef.current = null;
        ctxRef.current = null;
      }
      // 显示原始视频元素
      if (videoRef.current) {
        videoRef.current.style.display = 'block';
      }
    };
  }, [isCameraActive, imageEnhancement]);

  // 组件卸载时停止摄像头
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 主视频显示区 */}
      <div className="lg:col-span-2">
        <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
          {isCameraActive ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                playsinline
              />
              <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                摄像头拍摄中
              </div>
            </>
          ) : selectedCamera ? (
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={startCamera}
              style={{ cursor: isCameraNormal(selectedCamera) ? 'pointer' : 'not-allowed' }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📹</div>
                <div className="text-white font-medium">{selectedCamera.name}</div>
                <div className="text-gray-400 text-sm mt-2">{selectedCamera.location}</div>
                <div className={`text-sm mt-2 ${selectedCamera.status === '正常' ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedCamera.status}
                </div>
                <button 
                  className={`mt-4 px-4 py-2 rounded-lg transition-colors ${isCameraNormal(selectedCamera) ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
                  disabled={!isCameraNormal(selectedCamera)}
                  onClick={startCamera}
                >
                  启动摄像头
                </button>
                {!isCameraNormal(selectedCamera) && (
                  <div className="mt-2 text-red-500 text-sm">
                    摄像头状态异常，无法启动拍摄
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              没有可用的摄像头
            </div>
          )}
          {!isCameraActive && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              变电站实时监控
            </div>
          )}
        </div>

        {/* 摄像头控制按钮 */}
        {isCameraActive && (
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={captureImage}
              disabled={!isCameraNormal(selectedCamera)}
            >
              捕获图像
            </button>
            <button
              className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={stopCamera}
            >
              停止拍摄
            </button>
          </div>
        )}

        {/* 摄像头控制按钮 */}
        {isCameraActive && (
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={captureImage}
              disabled={!isCameraNormal(selectedCamera)}
            >
              捕获图像
            </button>
            <button
              className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
              onClick={stopCamera}
            >
              停止拍摄
            </button>
          </div>
        )}

        {/* 图像增强控制面板 */}
        {isCameraActive && (
          <div className="mt-4 bg-black/60 backdrop-blur-sm text-white text-sm p-3 rounded-lg">
            <h4 className="font-medium mb-2">图像增强</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>亮度</span>
                  <span>{imageEnhancement.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={imageEnhancement.brightness}
                  onChange={(e) => setImageEnhancement(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>对比度</span>
                  <span>{imageEnhancement.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={imageEnhancement.contrast}
                  onChange={(e) => setImageEnhancement(prev => ({ ...prev, contrast: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>饱和度</span>
                  <span>{imageEnhancement.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={imageEnhancement.saturation}
                  onChange={(e) => setImageEnhancement(prev => ({ ...prev, saturation: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>锐度</span>
                  <span>{imageEnhancement.sharpness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={imageEnhancement.sharpness}
                  onChange={(e) => setImageEnhancement(prev => ({ ...prev, sharpness: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>降噪</span>
                  <span>{imageEnhancement.noiseReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={imageEnhancement.noiseReduction}
                  onChange={(e) => setImageEnhancement(prev => ({ ...prev, noiseReduction: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* 捕获的图像 */}
        {capturedImages.length > 0 && (
          <div className="mt-4">
            <h3 className="text-white font-medium mb-3">捕获的图像</h3>
            <div className="grid grid-cols-2 gap-4">
              {capturedImages.map((image, index) => (
                <div key={index} className="bg-dark-light/40 p-2 rounded-lg">
                  <img src={image} alt={`捕获的图像 ${index + 1}`} className="w-full h-auto rounded" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 历史录像查询 */}
        <div className="mt-6 bg-dark-light/60 backdrop-blur-sm rounded-lg p-4 border border-blue-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">历史录像查询</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
              <span>隐藏录像</span>
              <svg className="w-4 h-4 ml-1 transition-transform transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-dark-light/40 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white text-sm font-medium">变电站入口</div>
                  <div className="text-gray-400 text-xs mt-1">2026/3/5 20:32:33 - 2026/3/5 21:32:33</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">时长: 3600秒</div>
                  <button className="mt-2 text-blue-400 hover:text-blue-300 text-xs">播放</button>
                </div>
              </div>
            </div>
            <div className="bg-dark-light/40 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white text-sm font-medium">电池阵列区</div>
                  <div className="text-gray-400 text-xs mt-1">2026/3/4 20:32:33 - 2026/3/4 21:32:33</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">时长: 3600秒</div>
                  <button className="mt-2 text-blue-400 hover:text-blue-300 text-xs">播放</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 摄像头列表和告警信息 */}
      <div className="space-y-6">
        {/* 摄像头列表 */}
        <div>
          <h3 className="text-white font-medium mb-3">变电站摄像头列表</h3>
          <div className="space-y-2">
            {data.cameras.map((camera) => (
              <div
                key={camera.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${selectedCamera?.id === camera.id ? 'bg-blue-900/50 border border-blue-500' : 'bg-dark-light/40 hover:bg-dark-light/60'}`}
                onClick={() => {
                  stopCamera();
                  setSelectedCamera(camera);
                }}
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
        <div>
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
      </div>
    </div>
  );
};

export default VideoMonitoring;
