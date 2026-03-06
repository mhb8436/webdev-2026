# Day 01 - JavaScript 기초: 변수, 자료형, 배열

> **Phase 1: JavaScript** | 학습일: 1일차

---

## 학습 목표

- `let`과 `const`로 변수를 선언하고 차이를 이해한다
- 기본 자료형(`string`, `number`, `boolean`)과 `typeof` 연산자를 사용한다
- 문자열 메서드(`indexOf`, `includes`, `slice`, `split`, `replace`)를 활용한다
- 배열 메서드(`push`, `pop`, `splice`, `find`, `map`, `filter`, `reduce`)를 활용한다
- `console.log`로 디버깅하고 템플릿 리터럴로 문자열을 조합한다

---

## 핵심 개념

### 1. 변수 선언

```javascript
const appName = "나의 앱";  // 재할당 불가 (상수)
let count = 0;              // 재할당 가능
count = 1;                  // OK
// appName = "다른 앱";     // TypeError!
```

> **원칙**: 기본적으로 `const`를 사용하고, 값이 변경되어야 할 때만 `let`을 사용합니다.

### 2. 자료형과 typeof

| 자료형 | 설명 | 예시 |
|--------|------|------|
| `string` | 문자열 | `"안녕하세요"`, `'Hello'` |
| `number` | 숫자 (정수/소수 구분 없음) | `42`, `3.14`, `NaN` |
| `boolean` | 참/거짓 | `true`, `false` |
| `undefined` | 값이 할당되지 않음 | `let x;` |
| `null` | 의도적으로 비어있음 | `let y = null;` |

```javascript
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (JavaScript의 유명한 버그!)
```

**Falsy 값**: `false`, `0`, `""`, `null`, `undefined`, `NaN` → 조건문에서 거짓으로 평가

### 3. 타입 변환

```javascript
// 문자열 → 숫자
Number("42")        // 42
parseInt("42px")    // 42
parseFloat("3.14")  // 3.14

// 숫자 → 문자열
String(42)          // "42"
(42).toString()     // "42"

// 주의: 느슨한 비교 vs 엄격한 비교
"42" == 42          // true  (타입 변환 후 비교)
"42" === 42         // false (타입까지 비교) ← 이것을 사용!
```

### 4. 문자열 메서드

```javascript
const str = "Hello, JavaScript!";

str.length           // 18
str.indexOf("Java")  // 7 (위치), 없으면 -1
str.includes("Java") // true
str.slice(7, 17)     // "JavaScript"
str.toUpperCase()    // "HELLO, JAVASCRIPT!"
str.split(", ")      // ["Hello", "JavaScript!"]
str.replace("Hello", "안녕") // "안녕, JavaScript!"

// 템플릿 리터럴
const name = "홍길동";
console.log(`안녕하세요, ${name}님!`);
```

### 5. 배열 메서드

```javascript
const fruits = ["사과", "바나나", "포도"];

// 추가/제거
fruits.push("딸기");       // 뒤에 추가
fruits.pop();              // 뒤에서 제거
fruits.unshift("키위");    // 앞에 추가
fruits.splice(1, 1);       // 인덱스 1에서 1개 제거

// 검색
fruits.indexOf("바나나")   // 인덱스 반환 (-1이면 없음)
fruits.includes("사과")    // true/false
fruits.find(f => f.length > 2)  // 조건에 맞는 첫 요소

// 변환 (원본 유지, 새 배열 반환)
const lengths = fruits.map(f => f.length);        // 각 요소 변환
const long = fruits.filter(f => f.length > 2);    // 조건 필터링
const total = [1,2,3].reduce((sum, n) => sum + n, 0);  // 누적 계산

// 정렬
[3,1,2].sort((a, b) => a - b);  // 오름차순 [1,2,3]

// 체이닝
const result = [85, 92, 67, 45, 78]
  .filter(s => s >= 70)
  .map(s => s + 5)
  .sort((a, b) => b - a);  // [97, 90, 83]
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.js` | 변수 선언, 배열, 반복문으로 할일 목록 출력 |
| `02_types.js` | 자료형 탐구, typeof, 타입 변환, falsy 값 |
| `03_strings.js` | 문자열 메서드 연습 |
| `04_arrays.js` | 배열 메서드 연습 (map, filter, reduce, sort) |

### solution/ (완성 코드)

위 파일들의 정답 코드입니다. 먼저 starter를 풀어본 후 비교하세요.

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.js` | 자기소개, 쇼핑목록, 온도변환, 좋아하는 것 목록 |
| `practice-extra.js` | 학생 성적 분석, 문자열 분석기, 배열 조작 |
| `solution.js` / `solution-extra.js` | 연습 문제 풀이 |

---

## 실행 방법

```bash
# starter 폴더에서 직접 구현 후 실행
node starter/index.js
node starter/02_types.js
node starter/03_strings.js
node starter/04_arrays.js

# solution과 비교
node solution/index.js

# 연습 문제
node practice/practice.js
node practice/practice-extra.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| `const` vs `let` | 재할당 여부로 구분, 기본은 `const` |
| `typeof` | 자료형 확인, `null`은 `"object"` 반환 주의 |
| `===` vs `==` | 항상 엄격한 비교(`===`) 사용 |
| 문자열 메서드 | `includes`, `slice`, `split`, `replace` |
| 배열 변환 | `map`(변환), `filter`(필터), `reduce`(누적) |

> **다음 시간**: Day 02 - 함수 (화살표 함수, 콜백, 클로저)
