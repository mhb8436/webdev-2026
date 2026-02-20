// 할일 관리 앱 - TypeScript 버전
// Day05의 JavaScript 코드를 TypeScript로 변환합니다.

// TODO: Priority 타입 별칭을 정의하세요 ('high' | 'medium' | 'low')

// TODO: Todo 타입을 정의하세요
// - id: number
// - title: string
// - done: boolean
// - priority: Priority
// - category: string
// - createdAt: Date

let nextId: number = 1;
let todos = []; // TODO: 타입을 지정하세요 (Todo[])

// TODO: 아래 함수들에 매개변수 타입과 반환 타입을 추가하세요

// 할일 추가 함수
function addTodo(title, priority, category) {
  // TODO: 타입이 있는 todo 객체를 생성하고 todos 배열에 추가하세요
  // - id는 nextId를 사용하고 1 증가시키세요
  // - done은 기본값 false
  // - createdAt은 현재 시간
}

// 할일 삭제 함수
function removeTodo(id) {
  // TODO: 해당 id의 할일을 배열에서 제거하세요
  // 삭제 성공 여부를 boolean으로 반환하세요
}

// 할일 완료 토글 함수
function toggleTodo(id) {
  // TODO: 해당 id의 할일의 done 상태를 반전시키세요
  // 토글 성공 여부를 boolean으로 반환하세요
}

// 전체 할일 출력 함수
function printTodos() {
  // TODO: 모든 할일을 콘솔에 출력하세요
  // 형식: [완료여부] 제목 (우선순위: high, 카테고리: 공부)
}

// 카테고리별 할일 검색 함수
function findByCategory(category) {
  // TODO: 해당 카테고리의 할일들을 반환하세요
  // 반환 타입을 명시하세요
}

// === 테스트 코드 ===
console.log("=== 할일 관리 앱 (TypeScript) ===\n");

// 할일 추가
addTodo("TypeScript 배우기", "high", "공부");
addTodo("점심 먹기", "medium", "생활");
addTodo("운동하기", "low", "건강");
addTodo("TypeScript 복습", "high", "공부");

console.log("--- 전체 할일 목록 ---");
printTodos();

// 할일 완료 처리
console.log("\n--- 첫 번째 할일 완료 처리 ---");
toggleTodo(1);
printTodos();

// 카테고리 검색
console.log("\n--- '공부' 카테고리 할일 ---");
const studyTodos = findByCategory("공부");
console.log(studyTodos);

// 할일 삭제
console.log("\n--- 두 번째 할일 삭제 ---");
removeTodo(2);
printTodos();
