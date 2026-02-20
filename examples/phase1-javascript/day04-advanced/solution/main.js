// Day 04 - 메인 실행 파일 (풀이)
// todo.js와 utils.js 모듈을 import하여 사용

import { addTodo, removeTodo, completeTodo, getTodos } from "./todo.js";
import {
  getStats,
  sortByPriority,
  sortByDate,
  formatTodo,
} from "./utils.js";

console.log("=== 할일 관리 v4.0 ===\n");

// --- 1. 할일 추가 ---
console.log("[할일 추가]");
addTodo("JavaScript 공부하기", "high", "공부");
addTodo("운동하기", "medium", "건강");
addTodo("프로젝트 발표 준비", "high", "업무");
addTodo("책 읽기", "low", "공부");
addTodo("장보기", "medium", "생활");

// --- 2. 할일 완료 ---
console.log("\n[할일 완료]");
completeTodo(1);
completeTodo(2);

// --- 3. 할일 삭제 ---
console.log("\n[할일 삭제]");
removeTodo(4);

// --- 4. 통계 출력 ---
console.log("\n[통계]");
const todos = getTodos();
const stats = getStats(todos);
console.log(
  `전체: ${stats.total}개, 완료: ${stats.done}개, 미완료: ${stats.pending}개`
);

// 우선순위별 통계를 구조분해로 추출
const { high, medium, low } = stats.byPriority;
console.log(`우선순위별 - high: ${high}개, medium: ${medium}개, low: ${low}개`);

// --- 5. 우선순위 순 정렬 ---
console.log("\n[우선순위 순 정렬]");
const byPriority = sortByPriority(todos);
byPriority.forEach((todo) => console.log(formatTodo(todo)));

// --- 6. 생성일 순 정렬 ---
console.log("\n[생성일 순 정렬]");
const byDate = sortByDate(todos);
byDate.forEach((todo) => console.log(formatTodo(todo)));
