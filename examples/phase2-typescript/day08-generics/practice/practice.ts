/**
 * Day 08 연습 문제 - 제네릭, 유틸리티 타입
 *
 * 각 문제의 TODO를 채워주세요.
 * 완성 후 `npx tsc && node dist/practice.js`로 실행하세요.
 */

// ============================================
// 연습 문제 1: 제네릭 스택
// ============================================

// TODO: Stack<T> 클래스를 구현하세요
// - push(item: T): void
// - pop(): T | undefined
// - peek(): T | undefined
// - isEmpty(): boolean
// - size(): number
// - clear(): void
// - print(): void

// 테스트
// console.log("=== 제네릭 스택 ===");
//
// const numberStack = new Stack<number>();
// numberStack.push(10);
// numberStack.push(20);
// numberStack.push(30);
// numberStack.print();             // [10, 20, 30]
// console.log(`peek: ${numberStack.peek()}`);    // 30
// console.log(`pop: ${numberStack.pop()}`);      // 30
// console.log(`size: ${numberStack.size()}`);    // 2
// console.log(`isEmpty: ${numberStack.isEmpty()}`); // false
//
// const stringStack = new Stack<string>();
// stringStack.push("hello");
// stringStack.push("world");
// stringStack.push("typescript");
// stringStack.print();             // ["hello", "world", "typescript"]
// console.log(`pop: ${stringStack.pop()}`);      // "typescript"
// stringStack.clear();
// console.log(`isEmpty: ${stringStack.isEmpty()}`); // true

// ============================================
// 연습 문제 2: 제네릭 함수 모음
// ============================================

// TODO: reverseArray<T> 함수를 만드세요
// - 배열을 뒤집어 새 배열로 반환 (원본 배열 변경 금지)

// TODO: getFirst<T> 함수를 만드세요
// - 배열의 첫 번째 요소 반환, 빈 배열이면 undefined

// TODO: groupBy<T> 함수를 만드세요
// - 배열의 요소를 특정 키 값으로 그룹화

// 테스트
// console.log("\n=== 제네릭 함수 모음 ===");
//
// // reverseArray 테스트
// const numbers = [1, 2, 3, 4, 5];
// console.log(reverseArray(numbers));  // [5, 4, 3, 2, 1]
// console.log(numbers);               // [1, 2, 3, 4, 5] (원본 유지)
// console.log(reverseArray(["a", "b", "c"])); // ["c", "b", "a"]
//
// // getFirst 테스트
// console.log(getFirst([10, 20, 30]));  // 10
// console.log(getFirst(["hello"]));     // "hello"
// console.log(getFirst([]));            // undefined
//
// // groupBy 테스트
// const students = [
//   { name: "김철수", grade: "A", age: 20 },
//   { name: "이영희", grade: "B", age: 22 },
//   { name: "박민수", grade: "A", age: 21 },
//   { name: "정수진", grade: "B", age: 20 },
//   { name: "최동현", grade: "C", age: 23 },
// ];
// console.log(groupBy(students, "grade"));

// ============================================
// 연습 문제 3: 유틸리티 타입 실전
// ============================================

// TODO: IUser 인터페이스를 정의하세요
// interface IUser {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   createdAt: Date;
// }

// TODO: CreateUserDTO 타입을 만드세요
// - password 필수, name/email/phone/address 선택적, id/createdAt 제외

// TODO: UserProfile 타입을 만드세요
// - id, name, email만 포함

// TODO: ChangePasswordDTO 타입을 만드세요
// - id와 password만 포함

// TODO: UpdateUserDTO 타입을 만드세요
// - id 필수, name/email/phone/address 선택적, password/createdAt 제외

// 테스트
// console.log("\n=== 유틸리티 타입 실전 ===");
//
// // CreateUserDTO 테스트
// const newUser: CreateUserDTO = {
//   password: "secure123!",
//   name: "홍길동",
//   email: "hong@example.com",
// };
// console.log("회원가입:", newUser);
//
// // UserProfile 테스트
// const profile: UserProfile = {
//   id: 1,
//   name: "홍길동",
//   email: "hong@example.com",
// };
// console.log("프로필:", profile);
//
// // ChangePasswordDTO 테스트
// const changePassword: ChangePasswordDTO = {
//   id: 1,
//   password: "newPassword456!",
// };
// console.log("비밀번호 변경:", changePassword);
//
// // UpdateUserDTO 테스트
// const updateUser: UpdateUserDTO = {
//   id: 1,
//   phone: "010-1234-5678",
// };
// console.log("회원정보 수정:", updateUser);
