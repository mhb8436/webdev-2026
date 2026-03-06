// ============================================
// Day 25 - ES Modules (import/export)
// ============================================
// 학습목표: ESM 문법, named/default export, 동적 import
// 실행: node 02_esm_modules.mjs (.mjs 확장자 또는 package.json에 "type": "module")

// TODO 1: Named Export / Import
// math.mjs 파일에:
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export const PI = 3.14159;
//
// 이 파일에서:
// import { add, subtract, PI } from './math.mjs';


// TODO 2: Default Export / Import
// logger.mjs 파일에:
// export default function log(message) { console.log(`[LOG] ${message}`); }
//
// import log from './logger.mjs';


// TODO 3: 별칭과 전체 가져오기
// import { add as sum } from './math.mjs';
// import * as MathUtils from './math.mjs';
// MathUtils.add(1, 2);


// TODO 4: 동적 import (조건부 모듈 로딩)
// const module = await import('./math.mjs');
// module.add(1, 2);


// TODO 5: CJS vs ESM 비교
// CJS: const fs = require('fs');        → module.exports = { ... }
// ESM: import fs from 'fs';             → export default / export { ... }
// ESM에서 __dirname 대체: import.meta.url
