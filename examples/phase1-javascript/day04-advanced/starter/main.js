// Day 04 - 메인 실행 파일 (main.js)
// todo.js와 utils.js에서 함수를 가져와서 사용합니다.

// TODO: todo.js에서 addTodo, removeTodo, completeTodo, getTodos를 import하세요
// import { addTodo, removeTodo, completeTodo, getTodos } from './todo.js';

// TODO: utils.js에서 getStats, sortByPriority, sortByDate, formatTodo를 import하세요
// import { getStats, sortByPriority, sortByDate, formatTodo } from './utils.js';

console.log("=== 할일 관리 v4.0 ===\n");

// --- 1. 할일 추가 ---
console.log("[할일 추가]");
// TODO: 아래 할일들을 추가하세요
// addTodo("JavaScript 공부하기", "high", "공부");
// addTodo("운동하기", "medium", "건강");
// addTodo("프로젝트 발표 준비", "high", "업무");
// addTodo("책 읽기", "low", "공부");
// addTodo("장보기", "medium", "생활");

// --- 2. 할일 완료 ---
console.log("\n[할일 완료]");
// TODO: 1번과 2번 할일을 완료하세요
// completeTodo(1);
// completeTodo(2);

// --- 3. 할일 삭제 ---
console.log("\n[할일 삭제]");
// TODO: 4번 할일을 삭제하세요
// removeTodo(4);

// --- 4. 통계 출력 ---
console.log("\n[통계]");
// TODO: getTodos()로 할일 목록을 가져오고, getStats()로 통계를 계산하세요
// const todos = getTodos();
// const stats = getStats(todos);
// console.log(`전체: ${stats.total}개, 완료: ${stats.done}개, 미완료: ${stats.pending}개`);
// const { high, medium, low } = stats.byPriority;
// console.log(`우선순위별 - high: ${high}개, medium: ${medium}개, low: ${low}개`);

// --- 5. 우선순위 순 정렬 ---
console.log("\n[우선순위 순 정렬]");
// TODO: sortByPriority()로 정렬하고 formatTodo()로 출력하세요
// const byPriority = sortByPriority(todos);
// byPriority.forEach(todo => console.log(formatTodo(todo)));

// --- 6. 생성일 순 정렬 ---
console.log("\n[생성일 순 정렬]");
// TODO: sortByDate()로 정렬하고 formatTodo()로 출력하세요
// const byDate = sortByDate(todos);
// byDate.forEach(todo => console.log(formatTodo(todo)));
