// 할일 관리 앱 - TypeScript 버전 (정답)
// Day05의 JavaScript 코드를 TypeScript로 변환한 완성 코드입니다.

// 우선순위 타입 별칭 정의 - 유니온 타입으로 허용 값을 제한합니다
type Priority = 'high' | 'medium' | 'low';

// Todo 타입 정의 - 할일 객체의 구조를 명시합니다
type Todo = {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  category: string;
  createdAt: Date;
};

// 다음 ID를 위한 카운터 (타입 추론: number로 자동 추론됨)
let nextId: number = 1;

// 할일 배열 - Todo[] 타입으로 지정
let todos: Todo[] = [];

// 할일 추가 함수
// 매개변수 타입과 반환 타입(Todo)을 명시합니다
function addTodo(title: string, priority: Priority, category: string): Todo {
  const todo: Todo = {
    id: nextId++,
    title: title,
    done: false,
    priority: priority,
    category: category,
    createdAt: new Date(),
  };
  todos.push(todo);
  console.log(`추가됨: [${todo.id}] ${todo.title}`);
  return todo;
}

// 할일 삭제 함수
// 반환 타입 boolean으로 삭제 성공 여부를 알려줍니다
function removeTodo(id: number): boolean {
  const index: number = todos.findIndex((todo: Todo) => todo.id === id);
  if (index !== -1) {
    const removed: Todo = todos.splice(index, 1)[0];
    console.log(`삭제됨: [${removed.id}] ${removed.title}`);
    return true;
  }
  console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
  return false;
}

// 할일 완료 토글 함수
// 타입 내로잉: find 결과가 undefined일 수 있으므로 체크합니다
function toggleTodo(id: number): boolean {
  const todo: Todo | undefined = todos.find((t: Todo) => t.id === id);
  // 타입 내로잉 (Type Narrowing) - undefined 체크
  if (todo !== undefined) {
    todo.done = !todo.done;
    const status: string = todo.done ? "완료" : "미완료";
    console.log(`토글됨: [${todo.id}] ${todo.title} → ${status}`);
    return true;
  }
  console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
  return false;
}

// 우선순위 한글 변환 함수
// 타입 추론 예시: 반환 타입을 명시하지 않아도 string으로 추론됩니다
function getPriorityLabel(priority: Priority): string {
  // 타입 내로잉 - switch 문에서 각 케이스의 타입이 좁혀집니다
  switch (priority) {
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
  }
}

// 전체 할일 출력 함수
// 반환값이 없으므로 void 타입을 사용합니다
function printTodos(): void {
  if (todos.length === 0) {
    console.log("할일이 없습니다.");
    return;
  }
  todos.forEach((todo: Todo) => {
    const check: string = todo.done ? "✓" : " ";
    const priorityLabel: string = getPriorityLabel(todo.priority);
    console.log(
      `  [${check}] ${todo.title} (우선순위: ${priorityLabel}, 카테고리: ${todo.category})`
    );
  });
  console.log(`총 ${todos.length}개의 할일`);
}

// 카테고리별 할일 검색 함수
// 반환 타입: Todo[] (할일 배열)
function findByCategory(category: string): Todo[] {
  return todos.filter((todo: Todo) => todo.category === category);
}

// 완료 통계 함수
// 타입 추론 활용: 객체의 타입이 자동으로 추론됩니다
function getStats() {
  const total: number = todos.length;
  const completed: number = todos.filter((t: Todo) => t.done).length;
  const active: number = total - completed;

  // 반환 객체의 타입이 자동으로 추론됩니다
  // { total: number; completed: number; active: number; }
  return { total, completed, active };
}

// === 테스트 코드 ===
console.log("=== 할일 관리 앱 (TypeScript) ===\n");

// 할일 추가
addTodo("TypeScript 배우기", "high", "공부");
addTodo("점심 먹기", "medium", "생활");
addTodo("운동하기", "low", "건강");
addTodo("TypeScript 복습", "high", "공부");

console.log("\n--- 전체 할일 목록 ---");
printTodos();

// 할일 완료 처리
console.log("\n--- 첫 번째 할일 완료 처리 ---");
toggleTodo(1);
printTodos();

// 카테고리 검색
console.log("\n--- '공부' 카테고리 할일 ---");
const studyTodos: Todo[] = findByCategory("공부");
studyTodos.forEach((todo: Todo) => {
  console.log(`  [${todo.id}] ${todo.title} (${todo.done ? "완료" : "미완료"})`);
});

// 할일 삭제
console.log("\n--- 두 번째 할일 삭제 ---");
removeTodo(2);
printTodos();

// 통계 출력
console.log("\n--- 통계 ---");
const stats = getStats(); // 타입 추론: { total: number; completed: number; active: number; }
console.log(`전체: ${stats.total}개, 완료: ${stats.completed}개, 진행중: ${stats.active}개`);

// 타입 안전성 확인 - 아래 코드들은 컴파일 에러가 발생합니다
// addTodo("테스트", "urgent", "기타");  // 에러: "urgent"는 Priority 타입이 아님
// addTodo(123, "high", "기타");         // 에러: number는 string 타입이 아님
// let wrongTodo: Todo = { id: "abc" };  // 에러: 필수 속성 누락 및 타입 불일치
