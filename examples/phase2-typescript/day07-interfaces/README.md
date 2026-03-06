# Day 07 - 인터페이스와 유틸리티 타입

> **Phase 2: TypeScript** | 학습일: 7일차

---

## 학습 목표

- `interface`로 객체 구조를 정의한다
- `readonly`, 선택적 속성(`?`), 인덱스 시그니처를 활용한다
- `extends`로 인터페이스를 확장하고 `implements`로 클래스에 구현한다
- `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly` 유틸리티 타입을 활용한다

---

## 핵심 개념

### 1. 인터페이스 기본

```typescript
interface User {
  readonly id: number;     // 읽기 전용 (생성 후 변경 불가)
  name: string;
  email?: string;          // 선택적 속성
}

const user: User = { id: 1, name: "홍길동" };
// user.id = 2;            // 에러! readonly
```

### 2. 인터페이스 확장 (extends)

```typescript
interface BaseEntity {
  readonly id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: number;
}

// Post = { id, createdAt, updatedAt, title, content, authorId }
```

### 3. 클래스에서 구현 (implements)

```typescript
interface Printable {
  toString(): string;
}

interface Serializable {
  toJSON(): object;
}

class TodoItem implements Printable, Serializable {
  constructor(public id: number, public title: string) {}
  toString() { return `[${this.id}] ${this.title}`; }
  toJSON() { return { id: this.id, title: this.title }; }
}
```

### 4. 유틸리티 타입

```typescript
interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: "high" | "medium" | "low";
}

// Partial<T> - 모든 속성을 선택적으로
type UpdateTodoInput = Partial<Todo>;
// { id?: number; title?: string; done?: boolean; priority?: ... }

// Omit<T, K> - 특정 속성 제외
type CreateTodoInput = Omit<Todo, "id">;
// { title: string; done: boolean; priority: ... }

// Pick<T, K> - 특정 속성만 선택
type TodoSummary = Pick<Todo, "id" | "title" | "done">;
// { id: number; title: string; done: boolean }

// Record<K, V> - 키-값 매핑 타입
type PriorityCount = Record<Todo["priority"], number>;
// { high: number; medium: number; low: number }

// Readonly<T> - 모든 속성을 readonly로
type ReadonlyTodo = Readonly<Todo>;

// Required<T> - 모든 속성을 필수로
type RequiredConfig = Required<{ host?: string; port?: number }>;
```

### 5. 인덱스 시그니처

```typescript
interface StringMap {
  [key: string]: string;   // 어떤 문자열 키든 가능
}

const env: StringMap = {
  NODE_ENV: "development",
  PORT: "3000",
};
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.ts` | 인터페이스 정의, readonly, optional, implements |
| `02_interface_advanced.ts` | extends, 다중 구현, 인덱스 시그니처 |
| `03_utility_types.ts` | Partial, Omit, Pick, Record, Readonly |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.ts` | 기본 인터페이스 연습 |
| `practice-extra.ts` | 게시판 타입 설계, 제네릭 CRUD Repository, 폼 검증 타입 |

---

## 실행 방법

```bash
npx tsx starter/index.ts
npx tsx starter/02_interface_advanced.ts
npx tsx starter/03_utility_types.ts
npx tsx practice/practice-extra.ts
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| `interface` | 객체 구조 정의 |
| `readonly` | 생성 후 변경 불가 |
| `?` | 선택적 속성 |
| `extends` | 인터페이스 확장 (상속) |
| `implements` | 클래스에서 인터페이스 구현 |
| `Partial<T>` | 모든 속성을 선택적으로 |
| `Omit<T, K>` | 특정 속성 제외 |
| `Pick<T, K>` | 특정 속성만 선택 |
| `Record<K, V>` | 키-값 매핑 |

> **다음 시간**: Day 08 - 제네릭 (제약조건, keyof, 제네릭 클래스)
