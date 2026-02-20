/**
 * Day 06 연습 문제 - 기본 타입, 배열 타입, 타입 추론
 *
 * 각 문제의 TODO를 채워주세요.
 * 완성 후 `npx tsc && node dist/practice.js`로 실행하세요.
 */

// ============================================
// 연습 문제 1: 타입 붙이기 연습
// ============================================

// TODO: User 타입 별칭을 정의하세요 (이름, 나이, 이메일, 취미 배열)

// TODO: Product 타입 별칭을 정의하세요 (이름, 가격, 할인율, 재고 여부)

// TODO: User 타입으로 user1 변수를 선언하세요
// const user1 = ...

// TODO: Product 타입으로 product1 변수를 선언하세요
// const product1 = ...

// TODO: 사용자 정보를 출력하는 printUser 함수를 만드세요
// function printUser(...) { ... }

// TODO: 상품의 할인가를 계산하는 getDiscountPrice 함수를 만드세요
// function getDiscountPrice(...) { ... }

// 테스트
// printUser(user1);
// console.log(`할인가: ${getDiscountPrice(product1)}원`);

// ============================================
// 연습 문제 2: 계산기 with 타입
// ============================================

// TODO: add 함수 (덧셈)

// TODO: subtract 함수 (뺄셈)

// TODO: multiply 함수 (곱셈)

// TODO: divide 함수 (나눗셈, 0으로 나누면 에러)

// 테스트
// console.log("=== 계산기 ===");
// console.log(`10 + 3 = ${add(10, 3)}`);
// console.log(`10 - 3 = ${subtract(10, 3)}`);
// console.log(`10 * 3 = ${multiply(10, 3)}`);
// console.log(`10 / 3 = ${divide(10, 3)}`);

// TODO: 아래 주석을 해제하면 컴파일 에러가 나야 합니다
// console.log(add("10", 3));    // 에러!
// console.log(subtract(10, true)); // 에러!

// ============================================
// 연습 문제 3: 배열 유틸리티
// ============================================

// TODO: ArrayStats 타입 별칭을 정의하세요 (sum, average, max)

// TODO: getArrayStats 함수를 만드세요

// 테스트
// console.log("=== 배열 유틸리티 ===");
// console.log(getArrayStats([10, 20, 30, 40, 50]));
// console.log(getArrayStats([1, 2, 3]));
// console.log(getArrayStats([]));

// ============================================
// 연습 문제 4: 리터럴 타입 연습
// ============================================

// TODO: Color 타입을 정의하세요 ("빨강" | "파랑" | "초록")

// TODO: translateColor 함수를 만드세요

// 테스트
// console.log("=== 색상 번역 ===");
// console.log(translateColor("빨강")); // "red"
// console.log(translateColor("파랑")); // "blue"
// console.log(translateColor("초록")); // "green"

// TODO: 아래 주석을 해제하면 컴파일 에러가 나야 합니다
// console.log(translateColor("노랑")); // 에러!

// 추가 도전: Direction 타입과 getMovement 함수

// TODO: Direction 타입을 정의하세요 ("상" | "하" | "좌" | "우")

// TODO: getMovement 함수를 만드세요 (방향 → { x: number; y: number })

// 테스트
// console.log("=== 방향 이동 ===");
// console.log(getMovement("상")); // { x: 0, y: -1 }
// console.log(getMovement("우")); // { x: 1, y: 0 }
