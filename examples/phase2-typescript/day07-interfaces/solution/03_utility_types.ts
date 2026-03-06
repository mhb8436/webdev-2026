// ============================================
// Day 07 - 유틸리티 타입 (풀이)
// ============================================

interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  category: string;
}

// --- 1. Partial<T> ---
console.log("=== Partial<T> ===");

const todos: Todo[] = [
  { id: 1, title: "공부하기", done: false, priority: "high", category: "학습" },
  { id: 2, title: "운동하기", done: false, priority: "low", category: "건강" },
];

function updateTodo(id: number, updates: Partial<Todo>): Todo | undefined {
  const todo = todos.find(t => t.id === id);
  if (!todo) return undefined;
  Object.assign(todo, updates);
  return todo;
}

// 일부 필드만 업데이트 가능!
updateTodo(1, { done: true });
updateTodo(2, { priority: "high", category: "필수" });
console.log("업데이트 후:", todos);
console.log("");

// --- 2. Required<T> ---
console.log("=== Required<T> ===");

interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

type StrictConfig = Required<Config>;

const config: StrictConfig = {
  host: "localhost",  // 필수!
  port: 3000,         // 필수!
  debug: true,        // 필수!
};
console.log("필수 설정:", config);
console.log("");

// --- 3. Pick<T, K> ---
console.log("=== Pick<T, K> ===");

type TodoPreview = Pick<Todo, "id" | "title" | "done">;

const previews: TodoPreview[] = todos.map(({ id, title, done }) => ({
  id, title, done
}));
console.log("미리보기:", previews);
console.log("");

// --- 4. Omit<T, K> ---
console.log("=== Omit<T, K> ===");

type CreateTodoInput = Omit<Todo, "id">;

function createTodo(input: CreateTodoInput): Todo {
  const newTodo: Todo = {
    id: Math.max(...todos.map(t => t.id)) + 1,
    ...input,
  };
  todos.push(newTodo);
  return newTodo;
}

const newTodo = createTodo({
  title: "새 할일",
  done: false,
  priority: "medium",
  category: "기타",
});
console.log("생성된 할일:", newTodo);
console.log("");

// --- 5. Record<K, V> ---
console.log("=== Record<K, V> ===");

type PriorityCount = Record<"high" | "medium" | "low", number>;

function countByPriority(todos: Todo[]): PriorityCount {
  return {
    high: todos.filter(t => t.priority === "high").length,
    medium: todos.filter(t => t.priority === "medium").length,
    low: todos.filter(t => t.priority === "low").length,
  };
}

console.log("우선순위 통계:", countByPriority(todos));

// Record로 딕셔너리 만들기
type UserMap = Record<number, { name: string; email: string }>;
const userMap: UserMap = {
  1: { name: "김개발", email: "kim@dev.com" },
  2: { name: "이영희", email: "lee@dev.com" },
};
console.log("UserMap:", userMap);
console.log("");

// --- 6. Readonly<T> ---
console.log("=== Readonly<T> ===");

type FrozenTodo = Readonly<Todo>;
const frozenTodo: FrozenTodo = todos[0];
// frozenTodo.title = "변경"; // 컴파일 에러!
console.log("읽기 전용:", frozenTodo.title);

// ReadonlyArray도 유용
const readonlyArr: ReadonlyArray<number> = [1, 2, 3];
// readonlyArr.push(4); // 에러!
// readonlyArr[0] = 99; // 에러!
console.log("ReadonlyArray:", readonlyArr);
