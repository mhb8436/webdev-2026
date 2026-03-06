// ============================================
// Day 06 - TypeScript 타입 연습문제 (풀이)
// ============================================

// --- 연습 1: 타입 좁히기 함수 ---
type FormatInput = string | number | boolean | null | undefined;

function formatValue(value: FormatInput): string {
  if (value === null || value === undefined) {
    return '값 없음';
  }
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  if (typeof value === 'boolean') {
    return value ? '예' : '아니오';
  }
  // 여기 도달하면 never
  const _exhaustive: never = value;
  return _exhaustive;
}

console.log("=== 연습 1 ===");
console.log(formatValue('hello'));      // "HELLO"
console.log(formatValue(3.14159));      // "3.14"
console.log(formatValue(true));         // "예"
console.log(formatValue(false));        // "아니오"
console.log(formatValue(null));         // "값 없음"
console.log(formatValue(undefined));    // "값 없음"
console.log("");


// --- 연습 2: 판별 유니온 ---
type Circle = { kind: 'circle'; radius: number };
type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Triangle = { kind: 'triangle'; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log("=== 연습 2 ===");
console.log(getArea({ kind: 'circle', radius: 5 }));             // 78.539...
console.log(getArea({ kind: 'rectangle', width: 4, height: 6 })); // 24
console.log(getArea({ kind: 'triangle', base: 3, height: 8 }));   // 12
console.log("");


// --- 연습 3: API 응답 타입 ---
type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; message: string; code: number }
  | { status: 'loading' };

function handleResponse<T>(response: ApiResponse<T>): string {
  switch (response.status) {
    case 'success':
      return `데이터: ${JSON.stringify(response.data)}`;
    case 'error':
      return `에러 ${response.code}: ${response.message}`;
    case 'loading':
      return '로딩 중...';
  }
}

console.log("=== 연습 3 ===");
const success: ApiResponse<{ name: string }> = {
  status: 'success',
  data: { name: '홍길동' },
  timestamp: Date.now(),
};
const error: ApiResponse<never> = {
  status: 'error',
  message: '서버 오류',
  code: 500,
};
const loading: ApiResponse<unknown> = { status: 'loading' };

console.log(handleResponse(success));  // 데이터: {"name":"홍길동"}
console.log(handleResponse(error));    // 에러 500: 서버 오류
console.log(handleResponse(loading));  // 로딩 중...
