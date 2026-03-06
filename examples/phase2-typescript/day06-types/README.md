# Day 06 - TypeScript 기초: 타입, 유니온, 타입 좁히기

> **Phase 2: TypeScript** | 학습일: 6일차

---

## 학습 목표

- TypeScript의 기본 타입과 타입 추론을 이해한다
- 유니온 타입과 리터럴 타입으로 정밀한 타입을 정의한다
- `typeof`, `in`, 동등성 검사로 타입을 좁힌다 (Type Narrowing)
- 판별 유니온(Discriminated Union)으로 안전한 분기를 구현한다
- `tsconfig.json` 설정을 이해한다

---

## 핵심 개념

### 1. 기본 타입

```typescript
let name: string = "홍길동";
let age: number = 25;
let isDone: boolean = false;
let nothing: null = null;
let notDefined: undefined = undefined;

// 배열
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// 튜플 (고정 길이, 고정 타입)
let pair: [string, number] = ["홍길동", 25];
```

### 2. 타입 추론 (Type Inference)

```typescript
let count = 10;        // 자동으로 number
let message = "hello"; // 자동으로 string
// 추론이 충분하면 타입 표기 생략 가능
```

### 3. 유니온 타입과 리터럴 타입

```typescript
// 유니온: 여러 타입 중 하나
let value: string | number = "hello";
value = 42;  // OK

// 리터럴 타입: 특정 값으로 제한
type Direction = "up" | "down" | "left" | "right";
type HttpStatus = 200 | 301 | 404 | 500;

let dir: Direction = "up";    // OK
// dir = "diagonal";          // 에러!
```

### 4. 타입 좁히기 (Type Narrowing)

```typescript
function formatValue(value: string | number | boolean): string {
  // typeof로 타입 좁히기
  if (typeof value === "string") {
    return value.toUpperCase();      // 여기서 value는 string
  }
  if (typeof value === "number") {
    return value.toFixed(2);         // 여기서 value는 number
  }
  return value ? "예" : "아니오";    // 여기서 value는 boolean
}
```

### 5. 판별 유니온 (Discriminated Union)

```typescript
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;  // 모든 케이스 처리 확인
      return _exhaustive;
  }
}
```

> `never` 타입으로 모든 분기가 처리되었는지 컴파일 타임에 확인

### 6. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["*.ts"]
}
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.ts` | 기본 타입, 배열, 함수 타입, Todo 타입 별칭 |
| `02_union_literal.ts` | 유니온, 리터럴, 타입 좁히기, 판별 유니온 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice.ts` | 기본 타입 연습 |
| `practice-extra.ts` | `formatValue` 함수, Shape `getArea`, 제네릭 API 응답 타입 |

---

## 실행 방법

```bash
# ts-node로 직접 실행
npx ts-node starter/index.ts
npx ts-node starter/02_union_literal.ts

# 또는 tsx (더 빠름)
npx tsx starter/index.ts

# 연습 문제
npx tsx practice/practice-extra.ts
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| 기본 타입 | `string`, `number`, `boolean`, `null`, `undefined` |
| 배열 | `number[]` 또는 `Array<number>` |
| 유니온 | `string \| number` — 여러 타입 중 하나 |
| 리터럴 | `"up" \| "down"` — 특정 값으로 제한 |
| 타입 좁히기 | `typeof`, `in`, `===`로 분기 |
| 판별 유니온 | `kind` 필드 + `switch`문, `never`로 완전성 검사 |

> **다음 시간**: Day 07 - 인터페이스와 유틸리티 타입
