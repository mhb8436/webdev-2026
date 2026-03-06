# Day 08 - 제네릭: 타입 매개변수, 제약조건, 제네릭 클래스

> **Phase 2: TypeScript** | 학습일: 8일차

---

## 학습 목표

- 제네릭 함수와 인터페이스를 만든다
- 제약조건(`extends`)으로 타입을 제한한다
- `keyof`로 객체 키를 타입으로 활용한다
- 제네릭 클래스(DataStore, Stack)를 구현한다
- API 응답 타입을 제네릭으로 설계한다

---

## 핵심 개념

### 1. 제네릭 함수

```typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // T = string
identity(42);               // T = number (추론)
```

### 2. 제약조건 (extends)

```typescript
// T가 반드시 { length: number }를 가져야 함
function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}

logLength("hello");    // OK (string에 length 있음)
logLength([1, 2, 3]);  // OK (배열에 length 있음)
// logLength(42);      // 에러! number에 length 없음
```

### 3. keyof와 제네릭

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "홍길동", age: 30 };
getProperty(user, "name");  // string 반환
getProperty(user, "age");   // number 반환
// getProperty(user, "foo"); // 에러! "foo"는 user의 키가 아님
```

### 4. 제네릭 인터페이스

```typescript
// API 응답 래퍼
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  totalPages: number;
  totalItems: number;
}

// 사용
const response: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "홍길동" },
  timestamp: Date.now(),
};
```

### 5. 제네릭 클래스

```typescript
class DataStore<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void { this.items.push(item); }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.items.filter(item => item[key] === value);
  }

  getAll(): T[] { return [...this.items]; }
}

// 어떤 타입이든 재사용 가능
const userStore = new DataStore<User>();
const productStore = new DataStore<Product>();
```

### 6. 여러 타입 매개변수

```typescript
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const result = merge({ name: "홍길동" }, { age: 30 });
// 타입: { name: string } & { age: number }
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.ts` | 제네릭 기초, Storage 클래스, DTO 패턴 |
| `02_generic_constraints.ts` | 제약조건, keyof, DataStore, ApiResponse |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.ts` | 기본 제네릭 연습 |
| `practice-extra.ts` | 제네릭 Stack, 타입 안전 EventEmitter, 제네릭 파이프라인 |

---

## 실행 방법

```bash
npx tsx starter/index.ts
npx tsx starter/02_generic_constraints.ts
npx tsx practice/practice-extra.ts
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| `<T>` | 타입 매개변수 (사용 시 구체 타입으로 대체) |
| `extends` | 제약조건 (`T extends { id: number }`) |
| `keyof T` | T의 키들을 유니온 타입으로 |
| `T[K]` | 인덱스 접근 타입 |
| 제네릭 클래스 | `class Store<T> { ... }` |
| `ApiResponse<T>` | 재사용 가능한 응답 래퍼 |

> **다음 시간**: Day 09 - React 시작 (Vite + TypeScript, 컴포넌트, Props)
