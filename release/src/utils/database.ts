// 数据库连接模块
// 使用 SQLite 作为本地数据库

// 定义 Database 类型
type Database = any;

// 数据库实例
let db: Database | null = null;

// 模拟数据，用于在浏览器环境中使用
const mockData = {
  terminals: [
    { id: 'T182', area: '1-10MWh电池阵列C区', temperature: 72.2, status: 'danger', statusText: '告警', timestamp: new Date().toISOString() },
    { id: 'T005', area: '1-10MWh电池阵列A区', temperature: 62.1, status: 'warning', statusText: '预警', timestamp: new Date().toISOString() },
    { id: 'T053', area: '1-10MWh电池阵列B区', temperature: 60.7, status: 'warning', statusText: '预警', timestamp: new Date().toISOString() },
    { id: 'T180', area: '1-10MWh电池阵列D区', temperature: 68.9, status: 'warning', statusText: '预警', timestamp: new Date().toISOString() }
  ],
  area_temperatures: [
    { id: 1, name: '1-10MWh电池阵列A区', avgTemp: 42.5, maxTemp: 45.2, status: 'normal', timestamp: new Date().toISOString() },
    { id: 2, name: '1-10MWh电池阵列B区', avgTemp: 42.8, maxTemp: 44.9, status: 'normal', timestamp: new Date().toISOString() },
    { id: 3, name: '1-10MWh电池阵列C区', avgTemp: 38.6, maxTemp: 40.1, status: 'normal', timestamp: new Date().toISOString() },
    { id: 4, name: '户外动力区', avgTemp: 40.0, maxTemp: 42.7, status: 'normal', timestamp: new Date().toISOString() },
    { id: 5, name: '集装箱高压配电区', avgTemp: 44.3, maxTemp: 46.8, status: 'normal', timestamp: new Date().toISOString() }
  ],
  cameras: [
    { id: 'cam1', name: '变电站入口', status: '正常', location: '变电站主入口', streamUrl: 'http://example.com/stream1', hasInfrared: 1, infraredStatus: 'normal' },
    { id: 'cam2', name: '电池阵列区', status: '正常', location: '1-10MWh电池阵列', streamUrl: 'http://example.com/stream2', hasInfrared: 1, infraredStatus: 'normal' },
    { id: 'cam3', name: '高压配电区', status: '正常', location: '集装箱高压配电区', streamUrl: 'http://example.com/stream3', hasInfrared: 1, infraredStatus: 'normal' },
    { id: 'cam4', name: '户外动力区', status: '正常', location: '户外动力设备区', streamUrl: 'http://example.com/stream4', hasInfrared: 1, infraredStatus: 'normal' }
  ],
  alerts: [
    { id: 'alert1', level: '二级', message: '检测到移动', location: '变电站主入口', timestamp: new Date().toISOString() },
    { id: 'alert2', level: '三级', message: '设备异常', location: '电池阵列区', timestamp: new Date(Date.now() - 3600000).toISOString() }
  ],
  recordings: [
    { id: 'rec1', cameraId: 'cam1', cameraName: '变电站入口', startTime: new Date(Date.now() - 86400000).toISOString(), endTime: new Date(Date.now() - 82800000).toISOString(), duration: 3600, fileSize: '1.2GB' },
    { id: 'rec2', cameraId: 'cam2', cameraName: '电池阵列区', startTime: new Date(Date.now() - 172800000).toISOString(), endTime: new Date(Date.now() - 169200000).toISOString(), duration: 3600, fileSize: '1.0GB' }
  ],
  system_parameters: [
    { id: 1, parameter: '电压', value: 380.5, unit: 'V', timestamp: new Date().toISOString() },
    { id: 2, parameter: '电流', value: 125.3, unit: 'A', timestamp: new Date().toISOString() },
    { id: 3, parameter: '功率', value: 47.6, unit: 'kW', timestamp: new Date().toISOString() },
    { id: 4, parameter: '功率因数', value: 0.98, unit: '', timestamp: new Date().toISOString() },
    { id: 5, parameter: '环境温度', value: 25.8, unit: '°C', timestamp: new Date().toISOString() },
    { id: 6, parameter: '湿度', value: 45, unit: '%', timestamp: new Date().toISOString() },
    { id: 7, parameter: '气压', value: 1013.2, unit: 'hPa', timestamp: new Date().toISOString() },
    { id: 8, parameter: '烟雾浓度', value: 0, unit: '', timestamp: new Date().toISOString() }
  ]
};

/**
 * 初始化数据库连接
 */
export const initDatabase = async (): Promise<Database> => {
  if (db) return db;

  try {
    // 检查是否在浏览器环境中
    if (typeof window !== 'undefined') {
      // 在浏览器环境中使用模拟数据
      console.log('在浏览器环境中使用模拟数据');
      db = {
        all: async (query: string) => {
          if (query.includes('terminals')) return mockData.terminals;
          if (query.includes('area_temperatures')) return mockData.area_temperatures;
          if (query.includes('cameras')) return mockData.cameras;
          if (query.includes('alerts')) return mockData.alerts;
          if (query.includes('recordings')) return mockData.recordings;
          if (query.includes('system_parameters')) return mockData.system_parameters;
          return [];
        },
        get: async () => ({ count: 0 }),
        exec: async () => {}
      } as unknown as Database;
      return db;
    }

    // 在Node.js环境中使用真实数据库
    const sqlite3 = await import('sqlite3');
    const { open } = await import('sqlite');
    
    // 打开数据库连接
    db = await open({
      filename: './yixiaopai.db',
      driver: sqlite3.Database
    });

    // 创建必要的表
    await createTables();

    console.log('数据库连接成功');
    return db;
  } catch (error) {
    console.error('数据库连接失败:', error);
    // 发生错误时使用模拟数据
    console.log('使用模拟数据');
    db = {
      all: async (query: string) => {
        if (query.includes('terminals')) return mockData.terminals;
        if (query.includes('area_temperatures')) return mockData.area_temperatures;
        if (query.includes('cameras')) return mockData.cameras;
        if (query.includes('alerts')) return mockData.alerts;
        if (query.includes('recordings')) return mockData.recordings;
        if (query.includes('system_parameters')) return mockData.system_parameters;
        return [];
      },
      get: async () => ({ count: 0 }),
      exec: async () => {}
    } as unknown as Database;
    return db;
  }
};

/**
 * 创建数据库表
 */
const createTables = async () => {
  if (!db) return;

  // 创建终端表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS terminals (
      id TEXT PRIMARY KEY,
      area TEXT,
      temperature REAL,
      status TEXT,
      statusText TEXT,
      timestamp TEXT
    );
  `);

  // 创建区域温度表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS area_temperatures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avgTemp REAL,
      maxTemp REAL,
      status TEXT,
      timestamp TEXT
    );
  `);

  // 创建摄像头表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cameras (
      id TEXT PRIMARY KEY,
      name TEXT,
      status TEXT,
      location TEXT,
      streamUrl TEXT,
      hasInfrared INTEGER,
      infraredStatus TEXT
    );
  `);

  // 创建告警表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      level TEXT,
      message TEXT,
      location TEXT,
      timestamp TEXT
    );
  `);

  // 创建录制表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recordings (
      id TEXT PRIMARY KEY,
      cameraId TEXT,
      cameraName TEXT,
      startTime TEXT,
      endTime TEXT,
      duration INTEGER,
      fileSize TEXT
    );
  `);

  // 创建系统参数表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS system_parameters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parameter TEXT,
      value REAL,
      unit TEXT,
      timestamp TEXT
    );
  `);

  // 插入初始数据
  await insertInitialData();
};

/**
 * 插入初始数据
 */
const insertInitialData = async () => {
  if (!db) return;

  // 检查是否已有数据
  const terminalCount = await db.get('SELECT COUNT(*) as count FROM terminals');
  if (terminalCount && (terminalCount as any).count > 0) {
    return; // 已有数据，跳过插入
  }

  // 插入终端数据
  await db.exec(`
    INSERT INTO terminals (id, area, temperature, status, statusText, timestamp) VALUES
    ('T182', '1-10MWh电池阵列C区', 72.2, 'danger', '告警', datetime('now')),
    ('T005', '1-10MWh电池阵列A区', 62.1, 'warning', '预警', datetime('now')),
    ('T053', '1-10MWh电池阵列B区', 60.7, 'warning', '预警', datetime('now')),
    ('T180', '1-10MWh电池阵列D区', 68.9, 'warning', '预警', datetime('now'));
  `);

  // 插入区域温度数据
  await db.exec(`
    INSERT INTO area_temperatures (name, avgTemp, maxTemp, status, timestamp) VALUES
    ('1-10MWh电池阵列A区', 42.5, 45.2, 'normal', datetime('now')),
    ('1-10MWh电池阵列B区', 42.8, 44.9, 'normal', datetime('now')),
    ('1-10MWh电池阵列C区', 38.6, 40.1, 'normal', datetime('now')),
    ('户外动力区', 40.0, 42.7, 'normal', datetime('now')),
    ('集装箱高压配电区', 44.3, 46.8, 'normal', datetime('now'));
  `);

  // 插入摄像头数据
  await db.exec(`
    INSERT INTO cameras (id, name, status, location, streamUrl, hasInfrared, infraredStatus) VALUES
    ('cam1', '变电站入口', '正常', '变电站主入口', 'http://example.com/stream1', 1, 'normal'),
    ('cam2', '电池阵列区', '正常', '1-10MWh电池阵列', 'http://example.com/stream2', 1, 'normal'),
    ('cam3', '高压配电区', '正常', '集装箱高压配电区', 'http://example.com/stream3', 1, 'normal'),
    ('cam4', '户外动力区', '正常', '户外动力设备区', 'http://example.com/stream4', 1, 'normal');
  `);

  // 插入告警数据
  await db.exec(`
    INSERT INTO alerts (id, level, message, location, timestamp) VALUES
    ('alert1', '二级', '检测到移动', '变电站主入口', datetime('now')),
    ('alert2', '三级', '设备异常', '电池阵列区', datetime('now', '-1 hour'));
  `);

  // 插入录制数据
  await db.exec(`
    INSERT INTO recordings (id, cameraId, cameraName, startTime, endTime, duration, fileSize) VALUES
    ('rec1', 'cam1', '变电站入口', datetime('now', '-1 day'), datetime('now', '-1 day', '+1 hour'), 3600, '1.2GB'),
    ('rec2', 'cam2', '电池阵列区', datetime('now', '-2 days'), datetime('now', '-2 days', '+1 hour'), 3600, '1.0GB');
  `);

  // 插入系统参数数据
  await db.exec(`
    INSERT INTO system_parameters (parameter, value, unit, timestamp) VALUES
    ('电压', 380.5, 'V', datetime('now')),
    ('电流', 125.3, 'A', datetime('now')),
    ('功率', 47.6, 'kW', datetime('now')),
    ('功率因数', 0.98, '', datetime('now')),
    ('环境温度', 25.8, '°C', datetime('now')),
    ('湿度', 45, '%', datetime('now')),
    ('气压', 1013.2, 'hPa', datetime('now')),
    ('烟雾浓度', 0, '', datetime('now'));
  `);
};

/**
 * 获取终端数据
 */
export const getTerminals = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM terminals ORDER BY timestamp DESC');
};

/**
 * 获取区域温度数据
 */
export const getAreaTemperatures = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM area_temperatures ORDER BY id');
};

/**
 * 获取摄像头数据
 */
export const getCameras = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM cameras');
};

/**
 * 获取告警数据
 */
export const getAlerts = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM alerts ORDER BY timestamp DESC');
};

/**
 * 获取录制数据
 */
export const getRecordings = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM recordings ORDER BY startTime DESC');
};

/**
 * 获取系统参数
 */
export const getSystemParameters = async () => {
  const database = await initDatabase();
  return database.all('SELECT * FROM system_parameters');
};

/**
 * 关闭数据库连接
 */
export const closeDatabase = async () => {
  if (db) {
    await db.close();
    db = null;
    console.log('数据库连接已关闭');
  }
};
