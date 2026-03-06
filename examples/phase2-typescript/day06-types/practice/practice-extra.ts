// ============================================
// Day 06 - TypeScript 타입 연습문제
// ============================================
// 실행: npx ts-node practice-extra.ts 또는 npx tsx practice-extra.ts

// --- 연습 1: 타입 좁히기 함수 ---
// formatValue 함수를 구현하세요
// - string → 대문자로 변환
// - number → 소수점 2자리까지 표시 (예: "3.14")
// - boolean → "예" 또는 "아니오"
// - null | undefined → "값 없음"
type FormatInput = string | number | boolean | null | undefined;

function formatValue(value: FormatInput): string {
  // TODO: 타입 좁히기로 구현
  return '';
}

// 테스트
console.log(formatValue('hello'));      // "HELLO"
console.log(formatValue(3.14159));      // "3.14"
console.log(formatValue(true));         // "예"
console.log(formatValue(null));         // "값 없음"


// --- 연습 2: 판별 유니온 ---
// 도형의 넓이를 계산하는 getArea 함수를 구현하세요

type Circle = { kind: 'circle'; radius: number };
type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  // TODO: switch문으로 구현 (default에서 never 타입 활용)
  return 0;
}

// 테스트
console.log(getArea({ kind: 'circle', radius: 5 }));           // 78.54...
console.log(getArea({ kind: 'rectangle', width: 4, height: 6 })); // 24
console.log(getArea({ kind: 'triangle', base: 3, height: 8 }));   // 12


// --- 연습 3: API 응답 타입 ---
// API 응답을 처리하는 타입과 함수를 만드세요

// TODO: ApiResponse 타입 정의 (판별 유니온)
// 성공: { status: 'success', data: T, timestamp: number }
// 에러: { status: 'error', message: string, code: number }
// 로딩: { status: 'loading' }

// TODO: handleResponse 함수 구현
// 성공 → "데이터: {data}"
// 에러 → "에러 {code}: {message}"
// 로딩 → "로딩 중..."
