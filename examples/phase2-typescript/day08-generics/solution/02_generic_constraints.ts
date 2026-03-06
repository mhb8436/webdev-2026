// ============================================
// Day 08 - 제네릭 제약과 활용 (풀이)
// ============================================

// --- 1. 제네릭 함수 기본 ---
console.log("=== 제네릭 함수 ===");

function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("hello"));
console.log(identity(42)); // 타입 추론

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log("first:", firstElement([10, 20, 30]));
console.log("first:", firstElement(["가", "나", "다"]));

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
const merged = merge({ name: "김개발" }, { age: 25 });
console.log("merge:", merged); // { name: "김개발", age: 25 }
console.log("");

// --- 2. 제약 조건 ---
console.log("=== 제약 조건 ===");

function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
console.log("문자열:", getLength("hello"));   // 5
console.log("배열:", getLength([1, 2, 3]));    // 3
// getLength(123);  // 에러! number에는 length 없음

interface HasName {
  name: string;
}

function greet<T extends HasName>(obj: T): string {
  return `안녕하세요, ${obj.name}님!`;
}
console.log(greet({ name: "김개발", age: 25 })); // OK
console.log("");

// --- 3. keyof ---
console.log("=== keyof ===");

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "김개발", age: 25, email: "kim@dev.com" };
console.log("name:", getProperty(user, "name"));
console.log("age:", getProperty(user, "age"));
// getProperty(user, "phone");  // 에러! "phone"은 keyof User가 아님

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}
const users = [
  { name: "김개발", age: 25 },
  { name: "이영희", age: 30 },
];
console.log("이름들:", pluck(users, "name"));
console.log("");

// --- 4. 제네릭 인터페이스 ---
console.log("=== 제네릭 인터페이스 ===");

interface ApiResponse<T> {
  status: number;
  data: T;
  error?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  totalPages: number;
  totalItems: number;
}

const userResponse: ApiResponse<typeof user> = {
  status: 200,
  data: user,
};
console.log("API 응답:", userResponse);

const listResponse: PaginatedResponse<typeof user> = {
  status: 200,
  data: users,
  page: 1,
  totalPages: 5,
  totalItems: 48,
};
console.log("페이지네이션:", listResponse.page, "/", listResponse.totalPages);
console.log("");

// --- 5. 제네릭 클래스 ---
console.log("=== 제네릭 클래스 ===");

class DataStore<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, updates: Partial<T>): T | undefined {
    const item = this.getById(id);
    if (!item) return undefined;
    Object.assign(item, updates);
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const todoStore = new DataStore<Todo>();
todoStore.add({ id: 1, title: "공부하기", done: false });
todoStore.add({ id: 2, title: "운동하기", done: false });

console.log("전체:", todoStore.getAll());
todoStore.update(1, { done: true });
console.log("수정 후:", todoStore.getById(1));
todoStore.delete(2);
console.log("삭제 후:", todoStore.getAll());
