/**
 * 主入口文件
 * 集成所有传感器模块，实现完整的数据采集、处理和诊断功能
 */
import { DataCollector } from './sensors/dataCollector';
import { DataProcessor } from './utils/dataProcessor';
import { SensorDiagnostic } from './utils/sensorDiagnostic';
import { DataFusionEngine } from './fusion/dataFusionEngine';
import { AlertManager, AlertLevel } from './utils/alertManager';
import { BatteryPowerManager, BatteryModule, ThermalZone } from './power/batteryPowerManager';
import { DeviceManager, BMSInterface, PCSInterface, PLCInterface } from './power/deviceInterfaces';
import { ThermalZoneManager } from './power/thermalZoneManager';
import { PerformanceOptimizer } from './power/performanceOptimizer';
import { TemperatureVerifier } from './power/temperatureVerifier';
import { SuccessRateTester } from './power/successRateTester';

async function main() {
  console.log('=== 忆小排传感器系统启动 ===');
  
  try {
    // 1. 初始化数据采集器
    const dataCollector = new DataCollector();
    const initSuccess = await dataCollector.init();
    
    if (!initSuccess) {
      console.error('数据采集器初始化失败');
      return;
    }
    
    console.log(`数据采集器初始化成功，共初始化 ${dataCollector.getSensorCount()} 个传感器`);
    
    // 2. 初始化数据处理器
    const dataProcessor = new DataProcessor();
    
    // 3. 初始化传感器诊断器
    const sensorDiagnostic = new SensorDiagnostic(dataCollector);
    
    // 4. 初始化数据融合引擎（基于忆阻阵列和脉冲神经网络）
    const dataFusionEngine = new DataFusionEngine();
    console.log('数据融合引擎初始化成功');
    
    // 5. 初始化预警管理器
    const alertManager = new AlertManager();
    console.log('预警管理器初始化成功');
    
    // 6. 初始化电池功率管理器
    const batteryPowerManager = new BatteryPowerManager();
    
    // 7. 初始化设备管理器
    const deviceManager = new DeviceManager();
    deviceManager.addDevice('bms', new BMSInterface('bms://localhost:8080'));
    deviceManager.addDevice('pcs', new PCSInterface('pcs://localhost:8081'));
    deviceManager.addDevice('plc', new PLCInterface('plc://localhost:8082'));
    
    // 8. 初始化热区域管理器
    const thermalZoneManager = new ThermalZoneManager();
    
    // 9. 初始化性能优化器
    const performanceOptimizer = new PerformanceOptimizer();
    
    // 10. 初始化温度验证器
    const temperatureVerifier = new TemperatureVerifier(thermalZoneManager);
    
    // 11. 初始化成功率测试器
    const successRateTester = new SuccessRateTester(performanceOptimizer);
    
    // 12. 设置环境参数
    alertManager.setEnvironmentParams({
      ambientTemperature: 28,
      humidity: 45,
      pressure: 1013,
      ventilation: 'good'
    });
    console.log('环境参数设置完成');
    
    // 13. 初始化电池模组和热区域
    const batteryModules: BatteryModule[] = [
      {
        id: 'MODULE-1',
        voltage: 51.2,
        current: 10.5,
        temperature: 25.5,
        stateOfCharge: 85,
        power: 537.6,
        maxPower: 1000,
        minPower: 200
      },
      {
        id: 'MODULE-2',
        voltage: 51.2,
        current: 9.8,
        temperature: 26.0,
        stateOfCharge: 82,
        power: 501.76,
        maxPower: 1000,
        minPower: 200
      },
      {
        id: 'MODULE-3',
        voltage: 51.2,
        current: 11.2,
        temperature: 27.5,
        stateOfCharge: 88,
        power: 573.44,
        maxPower: 1000,
        minPower: 200
      }
    ];
    
    const thermalZones: ThermalZone[] = [
      {
        id: 'ZONE-1',
        temperature: 30.0,
        threshold: 75.0,
        modules: ['MODULE-1', 'MODULE-2']
      },
      {
        id: 'ZONE-2',
        temperature: 31.0,
        threshold: 75.0,
        modules: ['MODULE-3']
      }
    ];
    
    batteryPowerManager.initModules(batteryModules);
    batteryPowerManager.initThermalZones(thermalZones);
    thermalZoneManager.initZones(thermalZones);
    thermalZoneManager.initModules(batteryModules);
    
    // 14. 初始化设备连接
    console.log('\n=== 初始化设备连接 ===');
    const deviceInitSuccess = await deviceManager.initAllDevices();
    console.log(`设备初始化${deviceInitSuccess ? '成功' : '失败'}`);
    
    // 15. 执行传感器诊断
    console.log('\n=== 执行传感器诊断 ===');
    const diagnosticReport = await sensorDiagnostic.runDiagnostic();
    console.log('诊断结果:', diagnosticReport);
    
    // 16. 同步采集数据
    console.log('\n=== 同步采集数据 ===');
    const synchronizedData = await dataCollector.collectData();
    console.log(`采集状态: ${synchronizedData.status}`);
    console.log(`采集时间戳: ${new Date(synchronizedData.timestamp).toISOString()}`);
    console.log(`成功采集 ${synchronizedData.sensorData.length} 个传感器数据`);
    
    // 17. 预处理数据
    console.log('\n=== 预处理数据 ===');
    const processedData = dataProcessor.processData(synchronizedData);
    console.log('预处理状态:', processedData.status);
    console.log('融合特征:', processedData.fusionFeatures);
    
    // 18. 使用硬件级并行MAC运算和脉冲神经网络进行数据融合和异常检测
    console.log('\n=== 硬件级并行MAC运算和脉冲神经网络处理 ===');
    const fusionResult = dataFusionEngine.fuseData(synchronizedData.sensorData);
    console.log('融合状态:', fusionResult.status);
    console.log('融合特征:', fusionResult.fusionFeatures);
    console.log('异常检测结果:', fusionResult.anomalyDetection);
    console.log('处理延迟:', fusionResult.processingLatency.toFixed(2), 'ms');
    
    // 19. 分析数据生成预警
    console.log('\n=== 分析数据生成预警 ===');
    const alerts = alertManager.analyzeData(processedData);
    
    if (alerts.length > 0) {
      console.log('生成预警:', alerts);
      
      // 20. 远程上报预警信息
      console.log('\n=== 远程上报预警信息 ===');
      for (const alert of alerts) {
        const reportSuccess = await alertManager.reportAlert(alert);
        console.log(`预警 ${alert.id} 上报${reportSuccess ? '成功' : '失败'}`);
        
        // 21. 自动记录预警信息
        alertManager.recordAlert(alert);
      }
      
      // 22. 处理预警
      console.log('\n=== 处理预警 ===');
      for (const alert of alerts) {
        alertManager.processAlert(alert.id);
        console.log(`预警 ${alert.id} 已处理`);
      }
    } else {
      console.log('未生成预警');
    }
    
    // 23. 检测数据异常
    console.log('\n=== 检测数据异常 ===');
    const anomalies = sensorDiagnostic.detectDataAnomaly(synchronizedData.sensorData);
    if (anomalies.length > 0) {
      console.log('检测到异常:', anomalies);
    } else {
      console.log('未检测到异常');
    }
    
    // 24. 预测传感器故障
    console.log('\n=== 预测传感器故障 ===');
    const predictions = sensorDiagnostic.predictSensorFailure(diagnosticReport.results);
    if (predictions.length > 0) {
      console.log('故障预测:', predictions);
    } else {
      console.log('未预测到故障');
    }
    
    // 25. 计算误报率
    console.log('\n=== 计算误报率 ===');
    const falseAlarmRate = alertManager.calculateFalseAlarmRate();
    console.log(`当前误报率: ${falseAlarmRate.toFixed(2)}%`);
    if (falseAlarmRate < 5) {
      console.log('误报率符合要求（低于5%）');
    } else {
      console.log('误报率超出要求，需要调整预警算法');
    }
    
    // 26. 校准所有传感器
    console.log('\n=== 校准所有传感器 ===');
    const calibrationResults = await dataCollector.calibrateAllSensors();
    console.log('校准结果:', calibrationResults);
    
    // 27. 模拟过热情况并测试功率调整
    console.log('\n=== 测试电池模组功率动态调整 ===');
    
    // 模拟过热情况
    thermalZoneManager.updateZoneTemperature('ZONE-1', 85.0);
    thermalZoneManager.updateZoneTemperature('ZONE-2', 80.0);
    
    // 更新模组状态
    thermalZoneManager.updateModuleStatus('MODULE-1', 800, 85);
    thermalZoneManager.updateModuleStatus('MODULE-2', 750, 82);
    thermalZoneManager.updateModuleStatus('MODULE-3', 850, 80);
    
    // 计算功率调整指令
    const commands = thermalZoneManager.calculateCoordinatedAdjustments();
    console.log('生成的功率调整指令:', commands);
    
    // 处理指令
    if (commands.length > 0) {
      const bmsDevice = new BMSInterface('bms://localhost:8080');
      await bmsDevice.init();
      
      const processSuccess = await performanceOptimizer.processCommands(commands, bmsDevice);
      console.log(`指令处理${processSuccess ? '成功' : '失败'}`);
      
      // 验证温度下降
      const validationResult = temperatureVerifier.validatePowerAdjustmentImpact('ZONE-1', commands);
      console.log('温度下降验证结果:', validationResult);
      
      // 测试成功率
      console.log('\n=== 测试调控成功率 ===');
      const testResult = await successRateTester.runTests(bmsDevice, 100);
      console.log(successRateTester.generateTestReport(testResult));
      
      bmsDevice.disconnect();
    }
    
    // 28. 断开设备连接
    deviceManager.disconnectAll();
    
    console.log('\n=== 系统运行正常 ===');
    
  } catch (error) {
    console.error('系统运行失败:', error);
  }
}

// 运行主函数
main();
