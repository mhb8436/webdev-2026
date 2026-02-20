// Day 04 - 할일 관리 모듈 (todo.js)
// 화살표 함수, 구조분해, spread 연산자를 사용하여 구현하세요

// --- 내부 상태 ---
let nextId = 1;
let todos = [];

// --- 할일 추가 ---
// 화살표 함수로 작성하세요
// 객체 생성 시 단축 속성명(shorthand property)을 활용하세요
// 예: { title, priority } 는 { title: title, priority: priority } 와 같습니다
export const addTodo = (title, priority = "medium", category = "일반") => {
  // TODO: 할일 객체를 생성하세요
  // - id: nextId++ 사용
  // - title, priority, category: 매개변수 값 사용 (단축 속성명)
  // - done: false
  // - createdAt: new Date()

  // TODO: todos 배열에 추가하세요

  // TODO: 추가된 할일 정보를 출력하세요
  // 예: "추가됨: JavaScript 공부하기 (high, 공부)"
};

// --- 할일 삭제 ---
// filter를 사용하여 해당 id를 제외한 새 배열을 만드세요
export const removeTodo = (id) => {
  // TODO: find로 삭제할 할일을 먼저 찾으세요
  // const todo = todos.find(...)

  // TODO: 할일이 없으면 "할일을 찾을 수 없습니다." 출력 후 리턴

  // TODO: filter를 사용하여 해당 id를 제외한 새 배열을 todos에 할당하세요
  // todos = todos.filter(...)

  // TODO: 삭제된 할일 정보를 출력하세요
  // 예: "삭제됨: #4 책 읽기"
};

// --- 할일 완료 ---
// spread 연산자를 사용하여 할일 객체를 업데이트하세요
export const completeTodo = (id) => {
  // TODO: map을 사용하여 해당 id의 할일만 done을 true로 변경하세요
  // spread 연산자를 사용: { ...todo, done: true }
  // todos = todos.map(...)

  // TODO: find로 완료된 할일을 찾아서 메시지를 출력하세요
  // 예: "완료됨: JavaScript 공부하기"
};

// --- 전체 할일 반환 ---
// spread로 배열을 복사하여 반환하세요 (원본 보호)
export const getTodos = () => {
  // TODO: spread 연산자로 todos 배열을 복사하여 반환하세요
  // return [...]
};
