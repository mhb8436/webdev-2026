# Day 06 - JavaScript에 타입 입히기 (3/30)

## 학습 목표

- TypeScript 기본 타입 이해하기: `string`, `number`, `boolean`
- 배열 타입 선언 방법 익히기: `string[]`, `Array<number>`
- 타입 추론(Type Inference) 개념 이해하기
- `tsconfig.json` 설정 파일 구조 파악하기
- 타입 별칭(Type Alias)과 유니온 타입 사용하기

## 문제

> "Day05의 JavaScript 코드를 TypeScript로 변환해보자"

Day05에서 만든 할일 관리 앱의 JavaScript 코드를 TypeScript로 변환합니다.
함수의 매개변수와 반환 타입을 명시하고, 데이터 구조에 타입을 부여하는 연습을 합니다.

## 핵심 개념

### 1. 기본 타입

```typescript
let name: string = "홍길동";
let age: number = 25;
let isDone: boolean = false;
```

### 2. 배열 타입

```typescript
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
```

### 3. 타입 별칭 (Type Alias)

```typescript
type Priority = 'high' | 'medium' | 'low';
let myPriority: Priority = 'high';
```

### 4. 타입 추론

```typescript
let count = 10;        // TypeScript가 자동으로 number로 추론
let message = "hello"; // 자동으로 string으로 추론
```

### 5. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",     // 컴파일 대상 JavaScript 버전
    "module": "commonjs",   // 모듈 시스템
    "outDir": "./dist",     // 출력 디렉토리
    "strict": true,         // 엄격한 타입 검사
    "esModuleInterop": true // ES 모듈 호환성
  },
  "include": ["*.ts"]       // 컴파일할 파일 패턴
}
```

## 프로젝트 구조

```
day06-types/
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

1. `starter/index.ts`의 모든 TODO를 완성하세요
2. 모든 함수에 매개변수 타입과 반환 타입을 추가하세요
3. `Priority` 타입 별칭을 만들어 사용하세요
4. `npx tsc`로 컴파일했을 때 에러가 없어야 합니다

## 참고 자료

- [TypeScript 공식 문서 - 기본 타입](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript 공식 문서 - tsconfig.json](https://www.typescriptlang.org/tsconfig)
