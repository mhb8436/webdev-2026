// ============================================
// Day 26 - 환경 변수와 dotenv
// ============================================
// 학습목표: dotenv로 환경 설정, NODE_ENV 분기
// 실행: npm install dotenv && node 02_dotenv.js

// TODO 1: .env 파일 생성
// PORT=3000
// DB_HOST=localhost
// DB_PORT=5432
// DB_NAME=myapp
// DB_USER=postgres
// DB_PASSWORD=secret
// JWT_SECRET=my-super-secret-key
// NODE_ENV=development

// TODO 2: dotenv 로드
// require('dotenv').config();
// 또는 특정 경로: require('dotenv').config({ path: '.env.local' });

// TODO 3: 환경 변수 접근
// const port = process.env.PORT || 3000;
// const dbHost = process.env.DB_HOST;
// 주의: 모든 환경 변수 값은 문자열!
// Number(process.env.PORT) 로 숫자 변환 필요

// TODO 4: 환경별 설정 분기
// const isProduction = process.env.NODE_ENV === 'production';
// const config = isProduction ? productionConfig : developmentConfig;

// TODO 5: 필수 환경 변수 검증
// function validateEnv(required) {
//   const missing = required.filter(key => !process.env[key]);
//   if (missing.length > 0) throw new Error(`Missing: ${missing.join(', ')}`);
// }
// validateEnv(['DB_HOST', 'DB_NAME', 'JWT_SECRET']);

// TODO 6: .env 파일은 .gitignore에 추가!
// .env.example 파일을 만들어 필요한 변수 목록 공유
