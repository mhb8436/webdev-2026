// ============================================
// Day 26 - 환경 변수와 dotenv (풀이)
// ============================================

// dotenv 로드 (가장 먼저 호출)
require('dotenv').config();

// --- 1. 환경 변수 접근 ---
console.log("=== 환경 변수 ===");
const port = Number(process.env.PORT) || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
console.log(`PORT: ${port} (타입: ${typeof port})`);
console.log(`NODE_ENV: ${nodeEnv}`);
console.log("");

// --- 2. 환경별 설정 ---
console.log("=== 환경별 설정 ===");

const configs = {
  development: {
    db: { host: 'localhost', port: 5432, name: 'myapp_dev', ssl: false },
    debug: true,
    logLevel: 'debug',
  },
  production: {
    db: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      name: process.env.DB_NAME,
      ssl: true,
    },
    debug: false,
    logLevel: 'error',
  },
  test: {
    db: { host: 'localhost', port: 5432, name: 'myapp_test', ssl: false },
    debug: true,
    logLevel: 'warn',
  },
};

const config = configs[nodeEnv] || configs.development;
console.log("현재 설정:", JSON.stringify(config, null, 2));
console.log("");

// --- 3. 필수 환경 변수 검증 ---
console.log("=== 환경 변수 검증 ===");

function validateEnv(required) {
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error(`필수 환경 변수 누락: ${missing.join(', ')}`);
    console.error('.env 파일을 확인하세요.');
    // production에서는 프로세스 종료
    if (nodeEnv === 'production') {
      process.exit(1);
    }
    return false;
  }
  console.log("모든 필수 환경 변수 확인 완료");
  return true;
}

// 개발 환경에서는 경고만
validateEnv(['PORT', 'NODE_ENV']);
console.log("");

// --- 4. 설정 객체로 내보내기 ---
console.log("=== 설정 객체 ===");

const appConfig = {
  port,
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isDevelopment: nodeEnv === 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};

console.log("앱 설정:", JSON.stringify(appConfig, null, 2));

// module.exports = appConfig;  // 다른 파일에서 사용
