# Day 04 - 코드를 깔끔하게 정리하기 (3/26)

## 학습목표

- **구조분해 할당(Destructuring)** 으로 객체와 배열의 값을 간결하게 추출하기
- **전개 연산자(Spread Operator)** 로 객체와 배열을 복사하고 합치기
- **화살표 함수(Arrow Function)** 로 함수를 간결하게 작성하기
- **고차 함수** `map`, `filter`, `reduce`를 능숙하게 활용하기
- **모듈(Module)** 의 `import`/`export`로 코드를 파일별로 분리하기

## 핵심 개념 설명

### 구조분해 할당 (Destructuring)

객체나 배열에서 원하는 값을 변수로 바로 꺼내는 문법입니다.

```javascript
// 객체 구조분해
const todo = { id: 1, title: "공부하기", priority: "high" };
const { title, priority } = todo;
console.log(title);    // "공부하기"
console.log(priority); // "high"

// 배열 구조분해
const colors = ["빨강", "파랑", "초록"];
const [first, second] = colors;
console.log(first);  // "빨강"
console.log(second); // "파랑"

// 함수 매개변수에서 구조분해
function printTodo({ title, done }) {
  console.log(`${title}: ${done ? "완료" : "미완료"}`);
}
```

### 전개 연산자 (Spread Operator)

`...`을 사용하여 객체나 배열을 펼치거나 복사합니다.

```javascript
// 배열 복사 및 합치기
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 객체 복사 및 속성 덮어쓰기
const original = { name: "홍길동", age: 25 };
const updated = { ...original, age: 26 }; // { name: "홍길동", age: 26 }
```

### 화살표 함수 (Arrow Function)

함수를 간결하게 작성하는 문법입니다.

```javascript
// 기존 함수
function add(a, b) {
  return a + b;
}

// 화살표 함수
const add = (a, b) => a + b;

// 여러 줄인 경우
const greet = (name) => {
  const message = `안녕하세요, ${name}님!`;
  return message;
};
```

### reduce - 배열을 하나의 값으로 줄이기

`reduce`는 배열의 모든 요소를 순회하며 하나의 결과값을 만듭니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// sum = 15

// 객체로 집계하기
const fruits = ["사과", "바나나", "사과", "포도", "바나나", "사과"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { 사과: 3, 바나나: 2, 포도: 1 }
```

### 모듈 (Module) - import/export

코드를 여러 파일로 분리하여 관리합니다. ES 모듈을 사용하려면 `package.json`에 `"type": "module"`을 추가해야 합니다.

```javascript
// math.js - 내보내기
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js - 가져오기
import { add, subtract } from './math.js';
console.log(add(1, 2)); // 3
```

## 문제 (Problem)

> **"할일 앱에 통계와 정렬 기능을 추가하고 코드를 모듈화하자"**

Day 03의 코드를 리팩토링하여 3개의 모듈로 분리합니다:

### 1. `todo.js` - 할일 관리 모듈
- `addTodo(title, priority, category)` - 할일 추가 (화살표 함수 사용)
- `removeTodo(id)` - 할일 삭제 (filter로 제거)
- `completeTodo(id)` - 할일 완료 (spread로 객체 업데이트)
- `getTodos()` - 전체 할일 목록 반환

### 2. `utils.js` - 유틸리티 모듈
- `getStats(todos)` - 통계 계산 (reduce 사용: 완료/미완료 수, 우선순위별 수)
- `sortByPriority(todos)` - 우선순위 순 정렬 (high > medium > low)
- `sortByDate(todos)` - 생성일 순 정렬
- `formatTodo(todo)` - 할일을 문자열로 포맷 (구조분해 사용)

### 3. `main.js` - 메인 실행 파일
- `todo.js`와 `utils.js`를 import하여 전체 기능을 테스트

### 예상 출력

```
=== 할일 관리 v4.0 ===

[할일 추가]
추가됨: JavaScript 공부하기 (high, 공부)
추가됨: 운동하기 (medium, 건강)
추가됨: 프로젝트 발표 준비 (high, 업무)
추가됨: 책 읽기 (low, 공부)
추가됨: 장보기 (medium, 생활)

[할일 완료]
완료됨: JavaScript 공부하기
완료됨: 운동하기

[할일 삭제]
삭제됨: #4 책 읽기

[통계]
전체: 4개, 완료: 2개, 미완료: 2개
우선순위별 - high: 2개, medium: 1개, low: 0개

[우선순위 순 정렬]
[완료] #1 JavaScript 공부하기 - 공부 (high) 2025-03-26
[ ] #3 프로젝트 발표 준비 - 업무 (high) 2025-03-26
[완료] #2 운동하기 - 건강 (medium) 2025-03-26
[ ] #5 장보기 - 생활 (medium) 2025-03-26

[생성일 순 정렬]
[완료] #1 JavaScript 공부하기 - 공부 (high) 2025-03-26
[완료] #2 운동하기 - 건강 (medium) 2025-03-26
[ ] #3 프로젝트 발표 준비 - 업무 (high) 2025-03-26
[ ] #5 장보기 - 생활 (medium) 2025-03-26
```

## 힌트

- `reduce`의 초기값으로 객체를 넘기면 여러 항목을 동시에 집계할 수 있습니다.
- `sort`에 비교 함수를 전달하여 정렬 기준을 지정합니다.
- spread 연산자로 배열을 복사한 후 정렬하면 원본 배열이 변경되지 않습니다.
- `import`/`export` 사용 시 파일 확장자(`.js`)를 꼭 포함하세요.

## 실행 방법

이 프로젝트는 ES 모듈을 사용합니다. `starter/` 또는 `solution/` 디렉토리에서 실행하세요:

```bash
cd starter
node main.js
```

완성된 코드와 비교하고 싶다면:

```bash
cd solution
node main.js
```

> **참고**: 각 폴더에 있는 `package.json`의 `"type": "module"` 설정 덕분에 `import`/`export` 문법을 사용할 수 있습니다.
