# Day 07 - Todo 설계도 만들기 (3/31)

## 학습 목표

- `interface` 키워드로 객체 구조를 정의하는 방법 이해하기
- 선택적 속성(`?`)과 읽기 전용 속성(`readonly`) 사용법 익히기
- 함수 타입을 인터페이스로 정의하기
- `class`에서 `implements`로 인터페이스를 구현하는 방법 배우기
- 인터페이스와 타입 별칭의 차이점 이해하기

## 문제

> "Todo의 구조를 인터페이스로 정의하고 함수에 타입을 붙이자"

Day06에서 `type`으로 정의했던 Todo 구조를 `interface`로 변환하고,
서비스 클래스를 만들어 객체지향적으로 리팩토링합니다.

## 핵심 개념

### 1. interface 정의

```typescript
interface IUser {
  readonly id: number;   // 읽기 전용 - 생성 후 변경 불가
  name: string;
  email?: string;        // 선택적 속성 - 있어도 되고 없어도 됨
}
```

### 2. readonly 속성

```typescript
const user: IUser = { id: 1, name: "홍길동" };
// user.id = 2;  // 에러! readonly 속성은 변경 불가
user.name = "김철수"; // OK - readonly가 아닌 속성은 변경 가능
```

### 3. 선택적 속성 (Optional Property)

```typescript
interface IConfig {
  host: string;
  port: number;
  debug?: boolean; // 선택적 - undefined일 수 있음
}

const config: IConfig = { host: "localhost", port: 3000 };
// debug를 생략해도 에러 없음
```

### 4. 함수 타입 인터페이스

```typescript
interface ICalculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}
```

### 5. 클래스에서 인터페이스 구현

```typescript
class Calculator implements ICalculator {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
}
```

## 프로젝트 구조

```
day07-interfaces/
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

1. `ITodo` 인터페이스를 정의하세요 (readonly, optional 포함)
2. `ITodoService` 인터페이스로 서비스 메서드 시그니처를 정의하세요
3. `TodoService` 클래스가 `ITodoService`를 구현하도록 만드세요
4. 모든 메서드가 올바른 타입으로 동작하는지 확인하세요

## 참고 자료

- [TypeScript 공식 문서 - 인터페이스](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript 공식 문서 - 클래스](https://www.typescriptlang.org/docs/handbook/2/classes.html)
