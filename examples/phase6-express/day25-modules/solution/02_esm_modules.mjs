// ============================================
// Day 25 - ES Modules (풀이)
// ============================================
// 실행: node 02_esm_modules.mjs

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("현재 파일:", __filename);
console.log("현재 디렉터리:", __dirname);
console.log("");

// --- 1. Named Export (인라인 정의) ---
// 실제로는 별도 파일에서 import하지만, 여기서는 인라인으로 시연

// math 모듈 시뮬레이션
const MathUtils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  PI: 3.14159,
};

console.log("=== Named Export/Import ===");
const { add, subtract, PI } = MathUtils;
console.log(`add(3, 5) = ${add(3, 5)}`);
console.log(`subtract(10, 3) = ${subtract(10, 3)}`);
console.log(`PI = ${PI}`);
console.log("");

// --- 2. Default Export ---
console.log("=== Default Export ===");
// logger 모듈 시뮬레이션
function createLogger(prefix) {
  return {
    info: (msg) => console.log(`[${prefix}:INFO] ${msg}`),
    warn: (msg) => console.log(`[${prefix}:WARN] ${msg}`),
    error: (msg) => console.log(`[${prefix}:ERROR] ${msg}`),
  };
}

const logger = createLogger('APP');
logger.info("서버 시작");
logger.warn("메모리 사용량 높음");
logger.error("DB 연결 실패");
console.log("");

// --- 3. 별칭과 전체 가져오기 ---
console.log("=== 별칭(as)과 전체 가져오기(*) ===");
const { add: sum } = MathUtils;  // 별칭
console.log(`sum(10, 20) = ${sum(10, 20)}`);
console.log(`MathUtils.multiply(3, 4) = ${MathUtils.multiply(3, 4)}`);
console.log("");

// --- 4. 동적 Import ---
console.log("=== 동적 Import ===");
async function loadModule(name) {
  try {
    // 조건부 모듈 로딩
    if (name === 'fs') {
      const fs = await import('fs');
      const files = fs.readdirSync('.');
      console.log(`현재 디렉터리 파일 수: ${files.length}`);
    } else if (name === 'os') {
      const os = await import('os');
      console.log(`플랫폼: ${os.platform()}, CPU: ${os.cpus().length}코어`);
    }
  } catch (e) {
    console.log(`모듈 로딩 실패: ${e.message}`);
  }
}

await loadModule('fs');
await loadModule('os');
console.log("");

// --- 5. CJS vs ESM 비교 ---
console.log("=== CJS vs ESM 비교 ===");
console.log("CJS: require() / module.exports - 동기적 로딩");
console.log("ESM: import/export - 정적 분석 가능, 트리 셰이킹 지원");
console.log("ESM: Top-level await 사용 가능");
console.log("ESM: import.meta.url로 파일 경로 접근");

// Top-level await 예시
const data = await Promise.resolve({ message: "Top-level await 작동!" });
console.log(data.message);
