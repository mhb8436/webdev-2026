# Day 03 - 객체: 구조분해, 클래스, JSON

> **Phase 1: JavaScript** | 학습일: 3일차

---

## 학습 목표

- 객체 리터럴과 메서드를 활용한다
- 구조분해 할당(Destructuring)으로 값을 추출한다
- Spread/Rest 연산자를 활용한다
- ES6 클래스와 상속(`extends`, `super`)을 구현한다
- JSON 직렬화/역직렬화와 깊은 복사를 이해한다

---

## 핵심 개념

### 1. 구조분해 할당 (Destructuring)

```javascript
// 객체 구조분해
const user = { name: "홍길동", age: 30, role: "개발자" };
const { name, age, role = "사용자" } = user;

// 중첩 구조분해
const company = { ceo: { contact: { email: "ceo@test.com" } } };
const { ceo: { contact: { email } } } = company;

// 배열 구조분해
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// 변수 교환
let a = 1, b = 2;
[a, b] = [b, a];  // a=2, b=1

// 함수 매개변수 구조분해
function createUser({ name, age, role = "user" }) {
  return { name, age, role };
}
```

### 2. Spread / Rest 연산자

```javascript
// Spread: 펼치기
const defaults = { theme: "light", lang: "ko" };
const settings = { ...defaults, theme: "dark" };  // 병합 (뒤가 덮어쓰기)

// Rest: 나머지 모으기 (비밀번호 제외)
const { password, ...safeUser } = { name: "홍길동", email: "a@b.c", password: "secret" };
// safeUser = { name: "홍길동", email: "a@b.c" }
```

### 3. ES6 클래스

```javascript
class Animal {
  #sound;  // private 필드 (ES2022)

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  speak() { return `${this.name}: ${this.#sound}`; }

  static create(name, sound) { return new Animal(name, sound); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "멍멍");  // 부모 생성자 호출
    this.breed = breed;
  }

  fetch(item) { return `${this.name}이(가) ${item}을(를) 물어옴`; }
}
```

### 4. JSON과 깊은 복사

```javascript
const obj = { name: "홍길동", scores: [85, 92] };

// 직렬화 / 역직렬화
const json = JSON.stringify(obj, null, 2);  // → 문자열
const parsed = JSON.parse(json);             // → 객체

// 얕은 복사 vs 깊은 복사
const shallow = { ...obj };            // 중첩 객체는 참조 공유!
const deep = structuredClone(obj);     // 깊은 복사 (ES2022)
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.js` | 객체로 할일 관리, 카테고리/우선순위 검색 |
| `02_destructuring.js` | 객체/배열 구조분해, spread, rest 연습 |
| `03_classes.js` | Animal/Dog 상속, TodoList 클래스 구현 |
| `04_json.js` | JSON 직렬화, 깊은 복사, localStorage 시뮬레이션 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.js` | 기본 객체 연습 |
| `practice-extra.js` | Student 클래스, 장바구니 객체, API 응답 구조분해, CSV→JSON 변환 |

---

## 실행 방법

```bash
node starter/index.js
node starter/02_destructuring.js
node starter/03_classes.js
node starter/04_json.js
node practice/practice-extra.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| 구조분해 | `const { a, b } = obj` / `const [x, y] = arr` |
| Spread | `{ ...obj }` 펼치기, 병합, 얕은 복사 |
| Rest | `...rest`로 나머지 모으기 |
| 클래스 | `class`, `extends`, `super`, `#private`, `static` |
| JSON | `stringify`/`parse`, 깊은 복사는 `structuredClone` |

> **다음 시간**: Day 04 - 비동기 프로그래밍 (Promise, async/await, 에러 처리)
