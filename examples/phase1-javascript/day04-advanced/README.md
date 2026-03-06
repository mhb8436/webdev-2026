# Day 04 - 비동기 프로그래밍: Promise, async/await

> **Phase 1: JavaScript** | 학습일: 4일차

---

## 학습 목표

- 동기/비동기의 차이를 이해한다
- Promise를 생성하고 체이닝한다
- `async`/`await`로 비동기 코드를 동기처럼 작성한다
- `Promise.all`, `Promise.allSettled`로 병렬 처리한다
- 커스텀 에러 클래스를 만들고 재시도 패턴을 구현한다
- 코드를 모듈(`import`/`export`)로 분리한다

---

## 핵심 개념

### 1. Promise

```javascript
// Promise 생성
const fetchData = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) resolve({ id, name: `사용자${id}` });
    else reject(new Error("유효하지 않은 ID"));
  }, 1000);
});

// Promise 체이닝
fetchData(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error(err.message))
  .finally(() => console.log("완료"));
```

### 2. async / await

```javascript
async function getUserWithPosts(userId) {
  try {
    const user = await fetchData(userId);     // 기다림
    const posts = await fetchPosts(user.id);  // 순차 실행
    return { user, posts };
  } catch (error) {
    console.error("에러:", error.message);
  }
}
```

### 3. 병렬 처리

```javascript
// Promise.all - 모두 성공해야 (하나라도 실패하면 전체 실패)
const [users, products] = await Promise.all([
  fetchUsers(), fetchProducts()
]);

// Promise.allSettled - 실패해도 모든 결과 수집
const results = await Promise.allSettled([
  fetchData(1), fetchData(-1), fetchData(3)
]);
// [{ status: "fulfilled", value }, { status: "rejected", reason }, ...]
```

### 4. 커스텀 에러 클래스

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource}을(를) 찾을 수 없습니다`, 404);
  }
}
```

### 5. 재시도 패턴 (지수 백오프)

```javascript
async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}
```

### 6. 모듈 분리 (import/export)

```javascript
// todo.js
export const addTodo = (title) => { ... };
export const getTodos = () => { ... };

// main.js
import { addTodo, getTodos } from './todo.js';
```

> `package.json`에 `"type": "module"` 필요

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `main.js` + `todo.js` + `utils.js` | 모듈 분리된 할일 앱 (통계, 정렬) |
| `04_promises.js` | Promise 생성, async/await, Promise.all |
| `05_error_handling.js` | 커스텀 에러, 입력 검증, 재시도 패턴 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.js` | 기본 비동기 연습 |
| `practice-extra.js` | Promise 파이프라인, 병렬 처리 성능 비교, 지수 백오프 재시도 |

---

## 실행 방법

```bash
# 모듈 분리 실습 (starter 폴더에서)
cd starter && node main.js

# 비동기 실습
node starter/04_promises.js
node starter/05_error_handling.js

# 연습 문제
node practice/practice-extra.js
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| Promise | `new Promise((resolve, reject) => { ... })` |
| async/await | `async function` + `await` (try/catch) |
| Promise.all | 병렬 실행, 하나라도 실패→전체 실패 |
| Promise.allSettled | 병렬 실행, 모든 결과 수집 |
| 커스텀 에러 | `extends Error`, `statusCode` 속성 추가 |
| 재시도 | 반복 + catch + 지수 백오프 delay |
| 모듈 | `export` / `import`, `"type": "module"` |

> **다음 시간**: Day 05 - DOM 조작과 이벤트 처리
