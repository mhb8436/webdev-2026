/**
 * Day 06 연습 문제 정답 - 기본 타입, 배열 타입, 타입 추론
 */

// ============================================
// 연습 문제 1: 타입 붙이기 연습
// ============================================

// User 타입 별칭 정의
type User = {
  name: string;
  age: number;
  email: string;
  hobbies: string[];
};

// Product 타입 별칭 정의
type Product = {
  name: string;
  price: number;
  discountRate: number;
  inStock: boolean;
};

// User 타입으로 변수 선언
const user1: User = {
  name: "김철수",
  age: 25,
  email: "kim@example.com",
  hobbies: ["독서", "게임", "운동"],
};

// Product 타입으로 변수 선언
const product1: Product = {
  name: "노트북",
  price: 1500000,
  discountRate: 0.1,
  inStock: true,
};

// 사용자 정보 출력 함수
function printUser(user: User): void {
  console.log(`이름: ${user.name}`);
  console.log(`나이: ${user.age}세`);
  console.log(`이메일: ${user.email}`);
  console.log(`취미: ${user.hobbies.join(", ")}`);
}

// 할인가 계산 함수
function getDiscountPrice(product: Product): number {
  return product.price * (1 - product.discountRate);
}

// 테스트
console.log("=== 타입 붙이기 연습 ===");
printUser(user1);
console.log(`할인가: ${getDiscountPrice(product1)}원`);
console.log();

// ============================================
// 연습 문제 2: 계산기 with 타입
// ============================================

function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
  }
  return a / b;
}

// 테스트
console.log("=== 계산기 ===");
console.log(`10 + 3 = ${add(10, 3)}`);
console.log(`10 - 3 = ${subtract(10, 3)}`);
console.log(`10 * 3 = ${multiply(10, 3)}`);
console.log(`10 / 3 = ${divide(10, 3)}`);
console.log();

// 아래 코드는 컴파일 에러가 발생합니다 (주석 해제 시 확인 가능)
// console.log(add("10", 3));       // 에러: string은 number에 할당할 수 없음
// console.log(subtract(10, true)); // 에러: boolean은 number에 할당할 수 없음

// ============================================
// 연습 문제 3: 배열 유틸리티
// ============================================

type ArrayStats = {
  sum: number;
  average: number;
  max: number;
};

function getArrayStats(numbers: number[]): ArrayStats {
  if (numbers.length === 0) {
    return { sum: 0, average: 0, max: 0 };
  }

  const sum: number = numbers.reduce((acc, cur) => acc + cur, 0);
  const average: number = sum / numbers.length;
  const max: number = Math.max(...numbers);

  return { sum, average, max };
}

// 테스트
console.log("=== 배열 유틸리티 ===");
console.log(getArrayStats([10, 20, 30, 40, 50]));
// { sum: 150, average: 30, max: 50 }
console.log(getArrayStats([1, 2, 3]));
// { sum: 6, average: 2, max: 3 }
console.log(getArrayStats([]));
// { sum: 0, average: 0, max: 0 }
console.log();

// ============================================
// 연습 문제 4: 리터럴 타입 연습
// ============================================

type Color = "빨강" | "파랑" | "초록";

function translateColor(color: Color): string {
  switch (color) {
    case "빨강":
      return "red";
    case "파랑":
      return "blue";
    case "초록":
      return "green";
  }
}

// 테스트
console.log("=== 색상 번역 ===");
console.log(translateColor("빨강")); // "red"
console.log(translateColor("파랑")); // "blue"
console.log(translateColor("초록")); // "green"
console.log();

// 아래 코드는 컴파일 에러가 발생합니다 (주석 해제 시 확인 가능)
// console.log(translateColor("노랑")); // 에러: "노랑"은 Color 타입에 없음

// 추가 도전: Direction 타입과 getMovement 함수
type Direction = "상" | "하" | "좌" | "우";

type Movement = {
  x: number;
  y: number;
};

function getMovement(direction: Direction): Movement {
  switch (direction) {
    case "상":
      return { x: 0, y: -1 };
    case "하":
      return { x: 0, y: 1 };
    case "좌":
      return { x: -1, y: 0 };
    case "우":
      return { x: 1, y: 0 };
  }
}

// 테스트
console.log("=== 방향 이동 ===");
console.log(getMovement("상")); // { x: 0, y: -1 }
console.log(getMovement("하")); // { x: 0, y: 1 }
console.log(getMovement("좌")); // { x: -1, y: 0 }
console.log(getMovement("우")); // { x: 1, y: 0 }
