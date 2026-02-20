// Day 04 - 유틸리티 모듈 (utils.js)
// reduce, sort, 구조분해, 템플릿 리터럴을 사용하여 구현하세요

// --- 통계 계산 ---
// reduce를 사용하여 할일 통계를 객체로 반환합니다.
// 반환 형태: { total, done, pending, byPriority: { high, medium, low } }
export const getStats = (todos) => {
  // TODO: reduce를 사용하여 통계를 계산하세요
  // 초기값: { total: 0, done: 0, pending: 0, byPriority: { high: 0, medium: 0, low: 0 } }
  //
  // return todos.reduce((acc, todo) => {
  //   - acc.total 증가
  //   - todo.done이면 acc.done 증가, 아니면 acc.pending 증가
  //   - acc.byPriority[todo.priority] 증가
  //   - acc 반환
  // }, 초기값);
};

// --- 우선순위 순 정렬 ---
// high > medium > low 순으로 정렬합니다.
// 원본 배열을 변경하지 않도록 spread로 복사 후 정렬하세요.
export const sortByPriority = (todos) => {
  // TODO: 우선순위 순서를 정의하는 객체를 만드세요
  // const priorityOrder = { high: 0, medium: 1, low: 2 };

  // TODO: spread로 배열을 복사한 후 sort로 정렬하세요
  // return [...todos].sort((a, b) => ...)
  // 힌트: priorityOrder[a.priority] - priorityOrder[b.priority]
};

// --- 생성일 순 정렬 ---
// 생성일이 오래된 순서(오름차순)로 정렬합니다.
export const sortByDate = (todos) => {
  // TODO: spread로 배열을 복사한 후 createdAt 기준으로 정렬하세요
  // return [...todos].sort((a, b) => ...)
  // 힌트: new Date(a.createdAt) - new Date(b.createdAt)
};

// --- 할일 포맷팅 ---
// 구조분해를 사용하여 할일을 문자열로 변환합니다.
export const formatTodo = (todo) => {
  // TODO: 매개변수에서 구조분해로 필요한 속성을 추출하세요
  // const { id, title, done, category, priority, createdAt } = todo;

  // TODO: 템플릿 리터럴로 포맷된 문자열을 반환하세요
  // 형식: "[완료] #1 JavaScript 공부하기 - 공부 (high) 2025-03-26"
  //       "[ ] #2 운동하기 - 건강 (medium) 2025-03-26"
  // 힌트: done ? "[완료]" : "[ ]"
  // 힌트: new Date(createdAt).toISOString().split('T')[0] 로 날짜만 추출
};
