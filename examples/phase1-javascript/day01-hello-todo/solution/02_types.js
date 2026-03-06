// ============================================
// Day 01 - 자바스크립트 자료형 심화 (풀이)
// ============================================

// --- 1. 원시 타입(Primitive Types) ---
console.log("=== 자바스크립트 원시 타입 ===\n");

const name = "김개발";
const greeting = '안녕하세요';
const template = `이름: ${name}`;

const age = 25;
const height = 175.5;
const infinity = Infinity;
const notANumber = NaN;

const isStudent = true;
const hasJob = false;

const empty = null;

let notYet;
const alsoUndefined = undefined;

// --- 2. typeof 연산자 ---
console.log("--- typeof 연산자 ---");
console.log("name:", typeof name);           // "string"
console.log("age:", typeof age);             // "number"
console.log("isStudent:", typeof isStudent); // "boolean"
console.log("empty:", typeof empty);         // "object" (자바스크립트의 유명한 버그!)
console.log("notYet:", typeof notYet);       // "undefined"
console.log("NaN:", typeof notANumber);      // "number" (NaN도 숫자 타입!)
console.log("");

// --- 3. 타입 변환 ---
console.log("--- 타입 변환 ---");

// 문자열 → 숫자
console.log('Number("123"):', Number("123"));         // 123
console.log('parseInt("123"):', parseInt("123"));     // 123
console.log('parseFloat("12.5"):', parseFloat("12.5")); // 12.5
console.log('parseInt("12.5"):', parseInt("12.5"));   // 12 (소수점 버림)
console.log('Number("abc"):', Number("abc"));         // NaN
console.log('parseInt("100px"):', parseInt("100px")); // 100 (숫자 부분만)
console.log("");

// 숫자 → 문자열
console.log('String(123):', String(123));
console.log('(123).toString():', (123).toString());
console.log('(255).toString(16):', (255).toString(16)); // "ff" (16진수)
console.log("");

// 불리언 변환
console.log("--- 불리언 변환 ---");
console.log('Boolean(0):', Boolean(0));         // false
console.log('Boolean(""):', Boolean(""));       // false
console.log('Boolean(null):', Boolean(null));   // false
console.log('Boolean("hello"):', Boolean("hello")); // true
console.log('Boolean(42):', Boolean(42));       // true
console.log('Boolean([]):', Boolean([]));       // true (빈 배열도 truthy!)
console.log('Boolean({}):', Boolean({}));       // true (빈 객체도 truthy!)
console.log("");

// --- 4. Falsy 값 실험 ---
console.log("--- Falsy 값 체크 ---");
const falsyValues = [0, "", null, undefined, NaN, false];
falsyValues.forEach((val, i) => {
  if (val) {
    console.log(`  ${i}: ${val} → truthy`);
  } else {
    console.log(`  ${i}: ${String(val)} → falsy`);
  }
});
console.log("");

// --- 5. NaN 체크 ---
console.log("--- NaN 체크 ---");
console.log("NaN === NaN:", NaN === NaN);       // false (자기 자신과도 같지 않음!)
console.log("isNaN(NaN):", isNaN(NaN));         // true
console.log("isNaN('hello'):", isNaN("hello")); // true (문자열도 NaN 판단)
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));       // true
console.log("Number.isNaN('hello'):", Number.isNaN("hello")); // false (더 엄격)
