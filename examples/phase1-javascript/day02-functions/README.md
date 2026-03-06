# Day 02 - 함수: 화살표 함수, 콜백, 클로저

> **Phase 1: JavaScript** | 학습일: 2일차

---

## 학습 목표

- 함수 선언문, 표현식, 화살표 함수의 차이를 이해한다
- 매개변수, 반환값, 기본값을 활용한다
- 콜백 함수와 고차 함수 패턴을 활용한다
- 클로저의 개념과 실용적 활용법을 익힌다
- IIFE(즉시 실행 함수)를 이해한다

---

## 핵심 개념

### 1. 함수 선언 3가지 방식

```javascript
// 1) 함수 선언문 (호이스팅됨 - 선언 전에 호출 가능)
function add(a, b) {
  return a + b;
}

// 2) 함수 표현식 (호이스팅 안됨)
const subtract = function(a, b) {
  return a - b;
};

// 3) 화살표 함수 (ES6, 가장 간결)
const multiply = (a, b) => a * b;
const square = x => x * x;        // 매개변수 1개면 괄호 생략
const greet = () => "안녕하세요";   // 매개변수 없음
```

### 2. 매개변수와 반환값

```javascript
// 기본값
function createUser(name, role = "user") {
  return { name, role };
}

// 나머지 매개변수 (Rest)
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4);  // 10
```

### 3. 콜백 함수

함수를 다른 함수의 인자로 전달하는 패턴입니다.

```javascript
function processArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

processArray([1, 2, 3], x => x * 2);  // [2, 4, 6]
```

### 4. 고차 함수 (함수 팩토리)

```javascript
function createMultiplier(factor) {
  return (number) => number * factor;  // 함수를 반환
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));   // 10
console.log(triple(5));   // 15
```

### 5. 클로저 (Closure)

함수가 선언된 환경의 변수를 기억하는 특성입니다.

```javascript
function createCounter() {
  let count = 0;  // 외부에서 직접 접근 불가 (private)
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.getCount();   // 2
// count 변수에 직접 접근 불가 → 캡슐화
```

**실용 예제: 은행 계좌**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit: (amount) => { balance += amount; return balance; },
    withdraw: (amount) => {
      if (amount > balance) return "잔액 부족";
      balance -= amount;
      return balance;
    },
    getBalance: () => balance,
  };
}
```

### 6. IIFE (즉시 실행 함수)

```javascript
const module = (function() {
  const privateVar = "비밀";
  return { getSecret: () => privateVar };
})();
// module.getSecret() → "비밀"
// privateVar → 접근 불가
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.js` | 함수 선언, 매개변수, 기본값, 조건문으로 할일 관리 |
| `02_arrow_functions.js` | 화살표 함수, 콜백, 배열 체이닝, 함수 팩토리 |
| `03_closures.js` | 스코프, 클로저 카운터, 은행 계좌, IIFE |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.js` | 기본 함수 연습 |
| `practice-extra.js` | `unique`/`flatten`/`chunk` 구현, `myMap`/`myFilter`/`myReduce` 직접 만들기, `pipe` 함수 합성 |

---

## 실행 방법

```bash
node starter/index.js
node starter/02_arrow_functions.js
node starter/03_closures.js
node practice/practice-extra.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| 화살표 함수 | `(a, b) => a + b`, 간결한 문법 |
| 콜백 | 함수를 인자로 전달하는 패턴 |
| 고차 함수 | 함수를 반환하는 함수 (팩토리 패턴) |
| 클로저 | 외부 변수를 기억하는 함수, private 변수 구현 |
| IIFE | `(function() { ... })()`, 전역 오염 방지 |

> **다음 시간**: Day 03 - 객체, 구조분해, 클래스, JSON
