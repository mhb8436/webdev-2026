// Day 04 - 할일 관리 모듈 (풀이)
// 화살표 함수, 구조분해, spread 연산자 활용

// --- 내부 상태 ---
let nextId = 1;
let todos = [];

// --- 할일 추가 ---
// 화살표 함수 + 단축 속성명(shorthand property) + 기본 매개변수 사용
export const addTodo = (title, priority = "medium", category = "일반") => {
  const todo = {
    id: nextId++,
    title,       // 단축 속성명: title: title 과 동일
    done: false,
    priority,    // 단축 속성명: priority: priority 와 동일
    category,    // 단축 속성명: category: category 와 동일
    createdAt: new Date(),
  };

  todos = [...todos, todo]; // spread로 새 배열 생성하여 추가
  console.log(`추가됨: ${title} (${priority}, ${category})`);
};

// --- 할일 삭제 ---
// filter를 사용하여 해당 id를 제외한 새 배열 생성
export const removeTodo = (id) => {
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    console.log("할일을 찾을 수 없습니다.");
    return;
  }

  todos = todos.filter((t) => t.id !== id);
  console.log(`삭제됨: #${todo.id} ${todo.title}`);
};

// --- 할일 완료 ---
// map + spread로 불변성을 유지하며 업데이트
export const completeTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: true } : todo
  );

  const completed = todos.find((t) => t.id === id);
  if (completed) {
    console.log(`완료됨: ${completed.title}`);
  } else {
    console.log("할일을 찾을 수 없습니다.");
  }
};

// --- 전체 할일 반환 ---
// spread로 배열을 복사하여 반환 (원본 보호)
export const getTodos = () => [...todos];
