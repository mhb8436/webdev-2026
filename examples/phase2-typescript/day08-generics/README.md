# Day 08 - 재사용 가능한 코드 만들기 (4/1)

## 학습 목표

- 제네릭(`Generic<T>`)의 개념과 사용법 이해하기
- 유니온 타입(Union Type)으로 유연한 타입 정의하기
- 유틸리티 타입 활용하기: `Partial`, `Pick`, `Omit`
- 제네릭 제약 조건(`extends`)으로 타입 안전성 확보하기
- DTO(Data Transfer Object) 패턴 이해하기

## 문제

> "제네릭으로 범용 저장소를 만들고 타입을 조합해보자"

Day07에서 만든 TodoService를 제네릭 기반의 범용 Storage로 리팩토링합니다.
Todo 뿐만 아니라 어떤 데이터든 저장할 수 있는 재사용 가능한 코드를 만듭니다.

## 핵심 개념

### 1. 제네릭 (Generic)

```typescript
// T는 타입 매개변수 - 사용할 때 구체적인 타입으로 대체됩니다
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // T가 string으로 대체
identity<number>(42);       // T가 number로 대체
```

### 2. 제네릭 인터페이스와 클래스

```typescript
interface IStorage<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

class Storage<T extends { id: number }> implements IStorage<T> {
  private items: T[] = [];
  // ...구현
}
```

### 3. 유틸리티 타입

```typescript
interface ITodo {
  id: number;
  title: string;
  done: boolean;
  priority: string;
}

// Partial<T> - 모든 속성을 선택적으로 만듦
type UpdateDTO = Partial<ITodo>;
// { id?: number; title?: string; done?: boolean; priority?: string; }

// Pick<T, K> - 특정 속성만 선택
type TodoSummary = Pick<ITodo, 'id' | 'title' | 'done'>;
// { id: number; title: string; done: boolean; }

// Omit<T, K> - 특정 속성을 제외
type CreateDTO = Omit<ITodo, 'id'>;
// { title: string; done: boolean; priority: string; }
```

### 4. 유니온 타입

```typescript
type TodoFilter = 'all' | 'active' | 'completed';
type Result = ITodo | null;
type ID = number | string;
```

## 프로젝트 구조

```
day08-generics/
├── README.md
├── starter/
│   ├── tsconfig.json
│   └── index.ts          # TODO가 포함된 시작 코드
└── solution/
    ├── tsconfig.json
    └── index.ts          # 완성된 정답 코드
```

## 실행 방법

```bash
# starter 또는 solution 디렉토리에서 실행

# 방법 1: 컴파일 후 실행
npx tsc && node dist/index.js

# 방법 2: ts-node로 직접 실행
npx ts-node index.ts
```

## 도전 과제

1. `IStorage<T>` 제네릭 인터페이스를 정의하세요
2. `Storage<T>` 제네릭 클래스를 구현하세요
3. `Omit`, `Partial`, `Pick`을 사용하여 DTO 타입을 만드세요
4. `TodoService`가 내부적으로 `Storage<ITodo>`를 사용하도록 리팩토링하세요
5. 제네릭 Storage를 다른 데이터(예: User)에도 재사용해보세요

## 참고 자료

- [TypeScript 공식 문서 - 제네릭](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript 공식 문서 - 유틸리티 타입](https://www.typescriptlang.org/docs/handbook/utility-types.html)
