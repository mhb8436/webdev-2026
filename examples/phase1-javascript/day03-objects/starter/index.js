// Day 03 - 할일에 정보 추가하기
// 학습목표: 객체, 배열 메서드(filter, find, map, forEach), Date 객체

// --- 데이터 저장소 ---
let nextId = 1; // 다음 할일에 부여할 ID
let todos = []; // 할일 객체들을 저장하는 배열

// --- 할일 추가 ---
// 할일 객체를 생성하여 배열에 추가합니다.
// 객체 속성: id, title, done, priority('high'/'medium'/'low'), category, createdAt
function addTodo(title, priority, category) {
  // TODO: 할일 객체를 생성하세요
  // - id: nextId 값을 사용하고, nextId를 1 증가시키세요
  // - title: 매개변수로 받은 title
  // - done: false (초기값)
  // - priority: 매개변수로 받은 priority ('high', 'medium', 'low')
  // - category: 매개변수로 받은 category
  // - createdAt: new Date()로 현재 시간 저장

  // TODO: 생성한 객체를 todos 배열에 추가하세요 (push 사용)

  // TODO: 추가된 할일 정보를 출력하세요
  // 예: "추가됨: JavaScript 공부하기 (우선순위: high, 카테고리: 공부)"
}

// --- 할일 완료 ---
// id로 할일을 찾아서 done을 true로 변경합니다.
function completeTodo(id) {
  // TODO: find 메서드를 사용하여 id가 일치하는 할일을 찾으세요
  // const todo = todos.find(...)

  // TODO: 찾은 할일이 있으면 done을 true로 변경하고 메시지를 출력하세요
  // 예: "완료됨: JavaScript 공부하기"
  // 찾은 할일이 없으면 "할일을 찾을 수 없습니다." 를 출력하세요
}

// --- 카테고리별 검색 ---
// 특정 카테고리에 해당하는 할일들을 반환합니다.
function findByCategory(category) {
  // TODO: filter 메서드를 사용하여 category가 일치하는 할일들을 반환하세요
  // return todos.filter(...)
}

// --- 우선순위별 검색 ---
// 특정 우선순위에 해당하는 할일들을 반환합니다.
function findByPriority(priority) {
  // TODO: filter 메서드를 사용하여 priority가 일치하는 할일들을 반환하세요
  // return todos.filter(...)
}

// --- 키워드 검색 ---
// 할일 제목에 키워드가 포함된 할일들을 반환합니다.
function searchTodos(keyword) {
  // TODO: filter와 includes를 사용하여 title에 keyword가 포함된 할일들을 반환하세요
  // return todos.filter(...)
  // 힌트: todo.title.includes(keyword)
}

// --- 할일 요약 ---
// 각 할일을 요약 문자열로 변환하여 배열로 반환합니다.
function getTodoSummary() {
  // TODO: map 메서드를 사용하여 각 할일을 문자열로 변환하세요
  // 형식: "[완료] #1 JavaScript 공부하기 - 공부 (high)"
  //       "[ ] #2 운동하기 - 건강 (medium)"
  // return todos.map(...)
  // 힌트: todo.done ? "[완료]" : "[ ]" 를 사용하세요
}

// --- 할일 출력 ---
// 할일 목록을 보기 좋게 출력합니다.
function printTodos() {
  if (todos.length === 0) {
    console.log("할일이 없습니다.");
    return;
  }

  // TODO: forEach를 사용하여 각 할일을 출력하세요
  // 형식: "- JavaScript 공부하기 [완료] (공부, high)"
  //       "- 운동하기 (건강, medium)"
  // todos.forEach(...)
}

// =====================
// 테스트 코드
// =====================
console.log("=== 할일 관리 v3.0 ===\n");

// 1. 할일 추가
console.log("[할일 추가]");
addTodo("JavaScript 공부하기", "high", "공부");
addTodo("운동하기", "medium", "건강");
addTodo("프로젝트 코드 리뷰", "high", "업무");
addTodo("책 읽기", "low", "공부");
addTodo("장보기", "medium", "생활");

// 2. 할일 완료
console.log("\n[할일 완료]");
completeTodo(1);

// 3. 카테고리별 검색
console.log("\n[카테고리: 공부]");
const studyTodos = findByCategory("공부");
if (studyTodos) {
  studyTodos.forEach(function (todo) {
    const status = todo.done ? " [완료]" : "";
    console.log(`- ${todo.title}${status} (${todo.priority})`);
  });
}

// 4. 우선순위별 검색
console.log("\n[우선순위: high]");
const highTodos = findByPriority("high");
if (highTodos) {
  highTodos.forEach(function (todo) {
    const status = todo.done ? " [완료]" : "";
    console.log(`- ${todo.title}${status} (${todo.category})`);
  });
}

// 5. 키워드 검색
console.log('\n[검색: "코드"]');
const searchResult = searchTodos("코드");
if (searchResult) {
  searchResult.forEach(function (todo) {
    console.log(`- ${todo.title} (${todo.category}, ${todo.priority})`);
  });
}

// 6. 할일 요약
console.log("\n[할일 요약]");
const summaries = getTodoSummary();
if (summaries) {
  summaries.forEach(function (summary) {
    console.log(summary);
  });
}
