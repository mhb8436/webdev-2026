# Day 03 - 할일에 정보 추가하기 (3/25)

## 학습목표

- **객체(Object)** 를 사용하여 관련된 데이터를 하나로 묶기
- **배열 메서드** 이해하기: `filter`, `find`, `map`, `forEach`
- **Date 객체** 를 사용하여 날짜와 시간 다루기
- 객체 배열에서 조건에 맞는 데이터를 검색하고 변환하기

## 핵심 개념 설명

### 객체 (Object)

객체는 관련된 데이터를 키-값(key-value) 쌍으로 묶어서 저장하는 자료구조입니다.

```javascript
const todo = {
  id: 1,
  title: "JavaScript 공부하기",
  done: false,
  priority: "high",
  category: "공부",
  createdAt: new Date()
};

console.log(todo.title);    // "JavaScript 공부하기"
console.log(todo["done"]);  // false
```

### 배열 메서드 (Array Methods)

배열에는 데이터를 검색하고 변환하는 유용한 메서드들이 있습니다.

#### `filter` - 조건에 맞는 요소만 걸러내기

```javascript
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(n => n % 2 === 0);
// [2, 4]
```

#### `find` - 조건에 맞는 첫 번째 요소 찾기

```javascript
const users = [
  { name: "홍길동", age: 25 },
  { name: "김철수", age: 30 }
];
const found = users.find(u => u.name === "홍길동");
// { name: "홍길동", age: 25 }
```

#### `map` - 배열의 각 요소를 변환하기

```javascript
const names = ["홍길동", "김철수"];
const greetings = names.map(name => `안녕하세요, ${name}님!`);
// ["안녕하세요, 홍길동님!", "안녕하세요, 김철수님!"]
```

#### `forEach` - 배열의 각 요소에 대해 작업 수행하기

```javascript
const fruits = ["사과", "바나나", "포도"];
fruits.forEach(fruit => {
  console.log(`과일: ${fruit}`);
});
```

### Date 객체

`Date` 객체를 사용하면 날짜와 시간을 다룰 수 있습니다.

```javascript
const now = new Date();
console.log(now);                    // 현재 날짜와 시간
console.log(now.toLocaleDateString()); // "2025. 3. 25."
console.log(now.toLocaleTimeString()); // "오후 2:30:00"
```

### `includes` - 문자열 포함 여부 확인

```javascript
const text = "JavaScript 공부하기";
console.log(text.includes("공부")); // true
console.log(text.includes("운동")); // false
```

## 문제 (Problem)

> **"할일에 날짜, 우선순위, 카테고리를 넣고 검색하자"**

Day 02에서 만든 할일 앱을 확장하여, 각 할일을 **객체**로 관리합니다. 다음 요구사항을 만족하는 프로그램을 작성하세요:

1. `addTodo(title, priority, category)` - 할일을 객체로 생성하여 추가합니다.
   - 객체에는 `id`, `title`, `done`, `priority`('high'/'medium'/'low'), `category`, `createdAt`(Date 객체) 속성이 포함됩니다.
2. `completeTodo(id)` - ID로 할일을 찾아 완료 처리합니다.
3. `findByCategory(category)` - 카테고리별로 할일을 필터링합니다.
4. `findByPriority(priority)` - 우선순위별로 할일을 필터링합니다.
5. `searchTodos(keyword)` - 키워드로 할일 제목을 검색합니다.
6. `getTodoSummary()` - 각 할일을 요약 문자열로 변환합니다.
7. `printTodos()` - 모든 할일을 보기 좋게 출력합니다.

### 예상 출력

```
=== 할일 관리 v3.0 ===

[할일 추가]
추가됨: JavaScript 공부하기 (우선순위: high, 카테고리: 공부)
추가됨: 운동하기 (우선순위: medium, 카테고리: 건강)
추가됨: 프로젝트 코드 리뷰 (우선순위: high, 카테고리: 업무)
추가됨: 책 읽기 (우선순위: low, 카테고리: 공부)
추가됨: 장보기 (우선순위: medium, 카테고리: 생활)

[할일 완료]
완료됨: JavaScript 공부하기

[카테고리: 공부]
- JavaScript 공부하기 [완료] (high)
- 책 읽기 (low)

[우선순위: high]
- JavaScript 공부하기 [완료] (공부)
- 프로젝트 코드 리뷰 (업무)

[검색: "코드"]
- 프로젝트 코드 리뷰 (업무, high)

[할일 요약]
[완료] #1 JavaScript 공부하기 - 공부 (high)
[ ] #2 운동하기 - 건강 (medium)
[ ] #3 프로젝트 코드 리뷰 - 업무 (high)
[ ] #4 책 읽기 - 공부 (low)
[ ] #5 장보기 - 생활 (medium)
```

## 힌트

- `filter`는 조건에 맞는 **모든** 요소를 배열로 반환합니다.
- `find`는 조건에 맞는 **첫 번째** 요소 하나만 반환합니다.
- `map`은 배열의 각 요소를 **변환**하여 새 배열을 만듭니다.
- 문자열의 `includes()` 메서드로 키워드 포함 여부를 확인할 수 있습니다.
- `new Date()`는 현재 시간으로 Date 객체를 생성합니다.

## 실행 방법

`starter/index.js` 파일을 수정한 후, 터미널에서 다음 명령어를 실행하세요:

```bash
node index.js
```

완성된 코드와 비교하고 싶다면 `solution/index.js`를 확인하세요:

```bash
node solution/index.js
```
