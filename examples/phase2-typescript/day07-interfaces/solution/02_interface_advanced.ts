// ============================================
// Day 07 - 인터페이스 심화 (풀이)
// ============================================

// --- 1. 선택적 속성과 readonly ---
console.log("=== Optional & Readonly ===");

interface User {
  readonly id: number;
  name: string;
  email: string;
  phone?: string;
  readonly createdAt: Date;
}

const user: User = {
  id: 1,
  name: "김개발",
  email: "kim@dev.com",
  createdAt: new Date(),
};
// user.id = 2;  // 에러! readonly
user.name = "김수정";  // OK
console.log("User:", user.name, user.phone ?? "전화번호 없음");
console.log("");

// --- 2. 인덱스 시그니처 ---
console.log("=== 인덱스 시그니처 ===");

interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  "Content-Type": "application/json",
  "Authorization": "Bearer token123",
};
headers["X-Custom"] = "custom-value";
console.log("headers:", headers);

interface Config {
  name: string;
  version: string;
  [key: string]: string | number | boolean;
}

const appConfig: Config = {
  name: "MyApp",
  version: "1.0.0",
  debug: true,
  port: 3000,
};
console.log("config:", appConfig);
console.log("");

// --- 3. 인터페이스 확장 ---
console.log("=== 인터페이스 확장 ===");

interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: number;
}

interface Comment extends BaseEntity {
  postId: number;
  body: string;
  authorId: number;
}

const post: Post = {
  id: 1,
  title: "TypeScript 배우기",
  content: "인터페이스를 배워봅시다",
  authorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
console.log("Post:", post.title);

const comment: Comment = {
  id: 1,
  postId: 1,
  body: "좋은 글이네요!",
  authorId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};
console.log("Comment:", comment.body);
console.log("");

// --- 4. 클래스에서 인터페이스 구현 ---
console.log("=== implements ===");

interface Printable {
  print(): void;
}

interface Serializable {
  toJSON(): string;
}

class TodoItem implements Printable, Serializable {
  constructor(
    public id: number,
    public title: string,
    public done: boolean = false
  ) {}

  print(): void {
    const status = this.done ? "V" : " ";
    console.log(`  [${status}] ${this.id}. ${this.title}`);
  }

  toJSON(): string {
    return JSON.stringify({ id: this.id, title: this.title, done: this.done });
  }
}

const todo = new TodoItem(1, "공부하기");
todo.print();
console.log("JSON:", todo.toJSON());
console.log("");

// --- 5. 함수 타입 인터페이스 ---
console.log("=== 함수 타입 ===");

interface SearchFunction {
  (items: string[], query: string): string[];
}

const search: SearchFunction = (items, query) => {
  return items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
};

const fruits = ["사과", "바나나", "파인애플", "수박", "사탕수수"];
console.log("'사' 검색:", search(fruits, "사"));
console.log("'바' 검색:", search(fruits, "바"));
