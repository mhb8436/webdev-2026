/**
 * Day 08 연습 문제 정답 - 제네릭, 유틸리티 타입
 */

// ============================================
// 연습 문제 1: 제네릭 스택
// ============================================

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  print(): void {
    console.log(`Stack: [${this.items.join(", ")}]`);
  }
}

// 테스트
console.log("=== 제네릭 스택 ===");

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
numberStack.print(); // Stack: [10, 20, 30]
console.log(`peek: ${numberStack.peek()}`); // 30
console.log(`pop: ${numberStack.pop()}`); // 30
console.log(`size: ${numberStack.size()}`); // 2
console.log(`isEmpty: ${numberStack.isEmpty()}`); // false
numberStack.print(); // Stack: [10, 20]
console.log();

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
stringStack.push("typescript");
stringStack.print(); // Stack: [hello, world, typescript]
console.log(`pop: ${stringStack.pop()}`); // "typescript"
stringStack.clear();
console.log(`isEmpty: ${stringStack.isEmpty()}`); // true
stringStack.print(); // Stack: []
console.log();

// ============================================
// 연습 문제 2: 제네릭 함수 모음
// ============================================

// 배열 뒤집기 (원본 변경 없음)
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// 첫 번째 요소 반환
function getFirst<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// 키 값으로 그룹화
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// 테스트
console.log("=== 제네릭 함수 모음 ===");

// reverseArray 테스트
const numbers = [1, 2, 3, 4, 5];
console.log("뒤집기:", reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log("원본:", numbers); // [1, 2, 3, 4, 5] (원본 유지)
console.log("문자열 뒤집기:", reverseArray(["a", "b", "c"])); // ["c", "b", "a"]
console.log();

// getFirst 테스트
console.log("첫 번째(숫자):", getFirst([10, 20, 30])); // 10
console.log("첫 번째(문자):", getFirst(["hello"])); // "hello"
console.log("첫 번째(빈 배열):", getFirst([])); // undefined
console.log();

// groupBy 테스트
const students = [
  { name: "김철수", grade: "A", age: 20 },
  { name: "이영희", grade: "B", age: 22 },
  { name: "박민수", grade: "A", age: 21 },
  { name: "정수진", grade: "B", age: 20 },
  { name: "최동현", grade: "C", age: 23 },
];

console.log("학점별 그룹화:");
const groupedByGrade = groupBy(students, "grade");
console.log(JSON.stringify(groupedByGrade, null, 2));
console.log();

console.log("나이별 그룹화:");
const groupedByAge = groupBy(students, "age");
console.log(JSON.stringify(groupedByAge, null, 2));
console.log();

// ============================================
// 연습 문제 3: 유틸리티 타입 실전
// ============================================

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: Date;
}

// 1. CreateUserDTO: 회원가입용 (password 필수, 나머지 선택, id/createdAt 제외)
type CreateUserDTO = Pick<IUser, "password"> &
  Partial<Pick<IUser, "name" | "email" | "phone" | "address">>;

// 2. UserProfile: 프로필 표시용 (id, name, email만)
type UserProfile = Pick<IUser, "id" | "name" | "email">;

// 3. ChangePasswordDTO: 비밀번호 변경용 (id, password만)
type ChangePasswordDTO = Pick<IUser, "id" | "password">;

// 4. UpdateUserDTO: 회원정보 수정용 (id 필수, 나머지 선택, password/createdAt 제외)
type UpdateUserDTO = Pick<IUser, "id"> &
  Partial<Pick<IUser, "name" | "email" | "phone" | "address">>;

// 테스트
console.log("=== 유틸리티 타입 실전 ===");

// CreateUserDTO 테스트 - password만 필수, 나머지는 선택
const newUser: CreateUserDTO = {
  password: "secure123!",
  name: "홍길동",
  email: "hong@example.com",
};
console.log("회원가입:", newUser);

// password만 있어도 됨
const minimalUser: CreateUserDTO = {
  password: "minimal456!",
};
console.log("최소 회원가입:", minimalUser);

// UserProfile 테스트
const profile: UserProfile = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
};
console.log("프로필:", profile);

// ChangePasswordDTO 테스트
const changePassword: ChangePasswordDTO = {
  id: 1,
  password: "newPassword456!",
};
console.log("비밀번호 변경:", changePassword);

// UpdateUserDTO 테스트 - id만 필수, 나머지는 선택
const updateUser: UpdateUserDTO = {
  id: 1,
  phone: "010-1234-5678",
};
console.log("회원정보 수정(전화번호만):", updateUser);

const updateUser2: UpdateUserDTO = {
  id: 1,
  name: "홍길순",
  email: "hong2@example.com",
  address: "서울시 강남구",
};
console.log("회원정보 수정(여러 항목):", updateUser2);
