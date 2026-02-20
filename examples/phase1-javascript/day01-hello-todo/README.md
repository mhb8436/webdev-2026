# Day 01 - 첫 번째 할일 만들기 (3/23)

## 학습목표

- **변수** 선언 방법 이해하기: `let`과 `const`의 차이
- **자료형** 이해하기: `string`, `number`, `boolean`
- **배열(Array)** 을 사용하여 여러 데이터를 하나의 변수에 담기
- **`console.log`** 를 사용하여 콘솔에 데이터를 출력하기

## 핵심 개념 설명

### 변수 (Variables)

변수는 데이터를 저장하는 공간입니다. JavaScript에서는 `let`과 `const` 키워드를 사용하여 변수를 선언합니다.

- **`const`**: 한번 값을 할당하면 변경할 수 없는 상수입니다. 변하지 않는 값에 사용합니다.
- **`let`**: 나중에 값을 변경할 수 있는 변수입니다. 변할 수 있는 값에 사용합니다.

```javascript
const appName = "나의 앱";  // 변경 불가
let count = 0;              // 변경 가능
count = 1;                  // OK
// appName = "다른 앱";     // 오류 발생!
```

### 자료형 (Data Types)

JavaScript의 기본 자료형은 다음과 같습니다:

| 자료형 | 설명 | 예시 |
|--------|------|------|
| `string` | 문자열 | `"안녕하세요"`, `'Hello'` |
| `number` | 숫자 | `42`, `3.14` |
| `boolean` | 참/거짓 | `true`, `false` |

`typeof` 연산자를 사용하면 값의 자료형을 확인할 수 있습니다:

```javascript
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
```

### 배열 (Array)

배열은 여러 개의 값을 순서대로 저장하는 자료구조입니다.

```javascript
const fruits = ["사과", "바나나", "포도"];
console.log(fruits[0]);     // "사과" (인덱스는 0부터 시작)
console.log(fruits.length); // 3
```

### console.log

`console.log()`는 콘솔(터미널)에 값을 출력하는 함수입니다.

```javascript
console.log("Hello, World!");
console.log("이름:", "홍길동");
```

## 문제 (Problem)

> **"콘솔에 나의 할일 목록을 출력해보자"**

다음 요구사항을 만족하는 프로그램을 작성하세요:

1. 앱 이름과 버전을 `const` 변수로 선언하세요.
2. 할일 목록을 문자열 배열(`string[]`)로 만드세요. (최소 3개 이상)
3. `for` 반복문을 사용하여 각 할일을 번호와 함께 출력하세요.
4. 전체 할일 개수를 출력하세요.

### 예상 출력

```
=== 나의 할일 관리 v1.0 ===
1. 점심 먹기
2. JavaScript 공부하기
3. 운동하기
4. 책 읽기
5. 코딩 연습하기
--------------------------
총 할일 개수: 5개
```

## 힌트

- 배열의 길이는 `배열이름.length`로 구할 수 있습니다.
- `for` 반복문의 기본 형태: `for (let i = 0; i < 배열.length; i++) { ... }`
- 문자열을 연결할 때는 `+` 연산자 또는 템플릿 리터럴(`` ` ``)을 사용하세요.
  - 예: `` `${번호}. ${할일}` ``
- `typeof` 연산자를 사용하면 변수의 자료형을 확인할 수 있습니다.

## 실행 방법

`starter/index.js` 파일을 수정한 후, 터미널에서 다음 명령어를 실행하세요:

```bash
node index.js
```

완성된 코드와 비교하고 싶다면 `solution/index.js`를 확인하세요:

```bash
node solution/index.js
```
