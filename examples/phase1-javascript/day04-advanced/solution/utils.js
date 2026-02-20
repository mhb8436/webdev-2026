// Day 04 - 유틸리티 모듈 (풀이)
// reduce, sort, 구조분해, 템플릿 리터럴 활용

// --- 통계 계산 ---
// reduce로 한 번의 순회로 여러 통계를 동시에 계산
export const getStats = (todos) => {
  return todos.reduce(
    (acc, { done, priority }) => {
      // 매개변수에서 구조분해로 필요한 속성만 추출
      acc.total++;
      done ? acc.done++ : acc.pending++;
      acc.byPriority[priority]++;
      return acc;
    },
    {
      total: 0,
      done: 0,
      pending: 0,
      byPriority: { high: 0, medium: 0, low: 0 },
    }
  );
};

// --- 우선순위 순 정렬 ---
// high(0) > medium(1) > low(2) 순으로 정렬
export const sortByPriority = (todos) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  // spread로 복사 후 정렬 (원본 변경 방지)
  return [...todos].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

// --- 생성일 순 정렬 ---
// 오래된 순서(오름차순)로 정렬
export const sortByDate = (todos) => {
  return [...todos].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};

// --- 할일 포맷팅 ---
// 구조분해 + 템플릿 리터럴로 깔끔한 문자열 생성
export const formatTodo = ({ id, title, done, category, priority, createdAt }) => {
  // 매개변수에서 바로 구조분해
  const status = done ? "[완료]" : "[ ]";
  const date = new Date(createdAt).toISOString().split("T")[0];
  return `${status} #${id} ${title} - ${category} (${priority}) ${date}`;
};
