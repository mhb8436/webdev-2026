# Day 08 - 제네릭, 유틸리티 타입: 연습 문제

## 연습 문제 1: 제네릭 스택

제네릭을 사용하여 `Stack<T>` 클래스를 구현하세요.

### 요구사항

- `Stack<T>` 클래스는 다음 메서드를 가집니다:
  - `push(item: T): void` - 스택에 아이템 추가
  - `pop(): T | undefined` - 스택에서 아이템 꺼내기 (비어있으면 undefined)
  - `peek(): T | undefined` - 스택의 맨 위 아이템 확인 (꺼내지 않음)
  - `isEmpty(): boolean` - 스택이 비어있는지 확인
  - `size(): number` - 스택의 크기 반환
  - `clear(): void` - 스택 비우기
  - `print(): void` - 스택 내용 출력

- `number` 타입과 `string` 타입으로 각각 스택을 만들어 테스트하세요.

### 테스트 시나리오

```typescript
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log(numberStack.peek());  // 30
console.log(numberStack.pop());   // 30
console.log(numberStack.size());  // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop());   // "world"
```

---

## 연습 문제 2: 제네릭 함수 모음

다양한 제네릭 함수를 구현하세요.

### 요구사항

다음 3개의 제네릭 함수를 만드세요:

1. **`reverseArray<T>(arr: T[]): T[]`**
   - 배열을 뒤집어 새 배열로 반환합니다. (원본 배열은 변경하지 않음)
   - 예: `reverseArray([1, 2, 3])` -> `[3, 2, 1]`

2. **`getFirst<T>(arr: T[]): T | undefined`**
   - 배열의 첫 번째 요소를 반환합니다. 빈 배열이면 undefined를 반환합니다.
   - 예: `getFirst(["a", "b", "c"])` -> `"a"`

3. **`groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>`**
   - 배열의 요소를 특정 키의 값으로 그룹화합니다.
   - 예: `groupBy(students, "grade")` -> `{ "A": [...], "B": [...] }`

### 테스트 시나리오

```typescript
// reverseArray
console.log(reverseArray([1, 2, 3, 4, 5]));         // [5, 4, 3, 2, 1]
console.log(reverseArray(["a", "b", "c"]));          // ["c", "b", "a"]

// getFirst
console.log(getFirst([10, 20, 30]));                 // 10
console.log(getFirst([]));                            // undefined

// groupBy
const students = [
  { name: "김철수", grade: "A" },
  { name: "이영희", grade: "B" },
  { name: "박민수", grade: "A" },
  { name: "정수진", grade: "B" },
];
console.log(groupBy(students, "grade"));
```

---

## 연습 문제 3: 유틸리티 타입 실전

TypeScript의 내장 유틸리티 타입을 활용하여 실전에서 쓰이는 DTO 타입들을 만드세요.

### 요구사항

먼저 다음 기본 인터페이스를 정의하세요:

```typescript
interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: Date;
}
```

그리고 유틸리티 타입을 사용하여 아래 타입들을 만드세요:

1. **`CreateUserDTO`**: 회원가입용 DTO
   - `password`는 필수, 나머지(`name`, `email`, `phone`, `address`)는 선택적
   - `id`와 `createdAt`은 서버에서 자동 생성되므로 제외
   - 힌트: `Omit` + `Partial` + `Pick`을 조합하세요

2. **`UserProfile`**: 프로필 표시용
   - `id`, `name`, `email`만 포함
   - 힌트: `Pick`을 사용하세요

3. **`ChangePasswordDTO`**: 비밀번호 변경용
   - `id`와 `password`만 포함
   - 힌트: `Pick`을 사용하세요

4. **`UpdateUserDTO`**: 회원정보 수정용
   - `id`는 필수, 나머지(`name`, `email`, `phone`, `address`)는 선택적
   - `password`와 `createdAt`은 제외
   - 힌트: `Pick` + `Partial` + `Omit`을 조합하세요

각 타입으로 객체를 만들어 정상적으로 동작하는지 테스트하세요.

---

## 실행 방법

```bash
# TypeScript 컴파일
npx tsc

# 실행
node dist/practice.js
```
