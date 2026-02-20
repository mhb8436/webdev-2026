# Day 06 - 기본 타입, 배열 타입, 타입 추론: 연습 문제

## 연습 문제 1: 타입 붙이기 연습

아래 JavaScript 코드에 TypeScript 타입을 붙이세요.

### 요구사항

- **사용자 정보**: 이름(`string`), 나이(`number`), 이메일(`string`), 취미 배열(`string[]`)을 포함하는 `User` 타입 별칭을 만드세요.
- **상품 정보**: 이름(`string`), 가격(`number`), 할인율(`number`), 재고 여부(`boolean`)를 포함하는 `Product` 타입 별칭을 만드세요.
- 각 타입을 사용하여 변수를 선언하고 값을 할당하세요.
- 사용자 정보를 출력하는 `printUser` 함수와 상품의 할인가를 계산하는 `getDiscountPrice` 함수를 만드세요.

```javascript
// 이 JavaScript 코드에 타입을 붙이세요
const user1 = {
  name: "김철수",
  age: 25,
  email: "kim@example.com",
  hobbies: ["독서", "게임", "운동"]
};

const product1 = {
  name: "노트북",
  price: 1500000,
  discountRate: 0.1,
  inStock: true
};
```

---

## 연습 문제 2: 계산기 with 타입

사칙연산 함수 4개를 만들되, 매개변수와 반환값에 모두 타입을 붙이세요.

### 요구사항

- `add(a: number, b: number): number` - 덧셈
- `subtract(a: number, b: number): number` - 뺄셈
- `multiply(a: number, b: number): number` - 곱셈
- `divide(a: number, b: number): number` - 나눗셈 (0으로 나누면 에러 발생)
- 각 함수를 호출하여 결과를 출력하세요.
- 잘못된 타입의 값(예: 문자열)을 넣으면 컴파일 에러가 나는지 주석으로 확인하세요.

---

## 연습 문제 3: 배열 유틸리티

`number[]` 배열을 받아 합계, 평균, 최대값을 반환하는 함수를 타입과 함께 만드세요.

### 요구사항

- 반환 타입은 `{ sum: number; average: number; max: number }` 객체로 하세요.
- 타입 별칭 `ArrayStats`를 정의하여 사용하세요.
- 빈 배열이 들어오면 `{ sum: 0, average: 0, max: 0 }`을 반환하세요.
- 다양한 테스트 케이스로 함수를 테스트하세요.

```typescript
// 이런 형태로 동작해야 합니다
const result = getArrayStats([10, 20, 30, 40, 50]);
// { sum: 150, average: 30, max: 50 }
```

---

## 연습 문제 4: 리터럴 타입 연습

리터럴 타입과 유니언 타입을 활용한 색상 번역 함수를 만드세요.

### 요구사항

- `Color` 타입을 `"빨강" | "파랑" | "초록"`으로 정의하세요.
- `translateColor` 함수는 `Color` 타입을 받아 영어 문자열(`"red"`, `"blue"`, `"green"`)을 반환합니다.
- 잘못된 색상 값(예: `"노랑"`)을 넣으면 컴파일 에러가 나야 합니다.
- **추가 도전**: `Direction` 타입(`"상" | "하" | "좌" | "우"`)을 만들고, 방향을 받아 좌표 변화량 `{ x: number; y: number }`을 반환하는 `getMovement` 함수도 만들어 보세요.

---

## 실행 방법

```bash
# TypeScript 컴파일
npx tsc

# 실행
node dist/practice.js
```
