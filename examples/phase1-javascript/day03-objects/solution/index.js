// Day 03 - 할일에 정보 추가하기 (풀이)
// 학습목표: 객체, 배열 메서드(filter, find, map, forEach), Date 객체

// --- 데이터 저장소 ---
let nextId = 1; // 다음 할일에 부여할 ID
let todos = []; // 할일 객체들을 저장하는 배열

// --- 할일 추가 ---
// 할일 객체를 생성하여 배열에 추가합니다.
function addTodo(title, priority, category) {
  // 할일 객체 생성
  const todo = {
    id: nextId,
    title: title,
    done: false,
    priority: priority, // 'high', 'medium', 'low'
    category: category,
    createdAt: new Date(),
  };

  // 배열에 추가
  todos.push(todo);

  // ID 증가
  nextId++;

  // 추가된 할일 정보 출력
  console.log(
    `추가됨: ${todo.title} (우선순위: ${todo.priority}, 카테고리: ${todo.category})`
  );
}

// --- 할일 완료 ---
// id로 할일을 찾아서 done을 true로 변경합니다.
function completeTodo(id) {
  // find로 해당 id의 할일 찾기
  const todo = todos.find(function (t) {
    return t.id === id;
  });

  if (todo) {
    todo.done = true;
    console.log(`완료됨: ${todo.title}`);
  } else {
    console.log("할일을 찾을 수 없습니다.");
  }
}

// --- 카테고리별 검색 ---
// 특정 카테고리에 해당하는 할일들을 반환합니다.
function findByCategory(category) {
  return todos.filter(function (todo) {
    return todo.category === category;
  });
}

// --- 우선순위별 검색 ---
// 특정 우선순위에 해당하는 할일들을 반환합니다.
function findByPriority(priority) {
  return todos.filter(function (todo) {
    return todo.priority === priority;
  });
}

// --- 키워드 검색 ---
// 할일 제목에 키워드가 포함된 할일들을 반환합니다.
function searchTodos(keyword) {
  return todos.filter(function (todo) {
    return todo.title.includes(keyword);
  });
}

// --- 할일 요약 ---
// 각 할일을 요약 문자열로 변환하여 배열로 반환합니다.
function getTodoSummary() {
  return todos.map(function (todo) {
    const status = todo.done ? "[완료]" : "[ ]";
    return `${status} #${todo.id} ${todo.title} - ${todo.category} (${todo.priority})`;
  });
}

// --- 할일 출력 ---
// 할일 목록을 보기 좋게 출력합니다.
function printTodos() {
  if (todos.length === 0) {
    console.log("할일이 없습니다.");
    return;
  }

  todos.forEach(function (todo) {
    const status = todo.done ? " [완료]" : "";
    console.log(
      `- ${todo.title}${status} (${todo.category}, ${todo.priority})`
    );
  });
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
studyTodos.forEach(function (todo) {
  const status = todo.done ? " [완료]" : "";
  console.log(`- ${todo.title}${status} (${todo.priority})`);
});

// 4. 우선순위별 검색
console.log("\n[우선순위: high]");
const highTodos = findByPriority("high");
highTodos.forEach(function (todo) {
  const status = todo.done ? " [완료]" : "";
  console.log(`- ${todo.title}${status} (${todo.category})`);
});

// 5. 키워드 검색
console.log('\n[검색: "코드"]');
const searchResult = searchTodos("코드");
searchResult.forEach(function (todo) {
  console.log(`- ${todo.title} (${todo.category}, ${todo.priority})`);
});

// 6. 할일 요약
console.log("\n[할일 요약]");
const summaries = getTodoSummary();
summaries.forEach(function (summary) {
  console.log(summary);
});

// 7. 전체 할일 출력
console.log("\n[전체 할일 목록]");
printTodos();

// 8. 추가 기능 테스트: 생성 시간 확인
console.log("\n[생성 시간 확인]");
todos.forEach(function (todo) {
  console.log(`#${todo.id} ${todo.title} - 생성: ${todo.createdAt.toLocaleString()}`);
});
