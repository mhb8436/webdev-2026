// ============================================
// Day 02 - 할일 추가하고 삭제하기 (풀이)
// ============================================
// 학습목표: 함수 선언, 매개변수, return, 조건문(if/else), 반복문
// ============================================

// --- 데이터 ---
// 새로운 할일의 id를 자동으로 부여하기 위한 변수
let nextId = 1;

// 할일 목록 배열 (객체 배열)
// 각 할일은 { id: 숫자, title: 문자열, done: boolean } 형태
let todos = [];

// ============================================
// 함수 정의
// ============================================

// 할일을 추가하는 함수
// 매개변수: title - 할일 제목 (string)
function addTodo(title) {
    // 새 할일 객체 생성 및 배열에 추가
    const newTodo = {
        id: nextId,
        title: title,
        done: false
    };
    todos.push(newTodo);

    // 추가 완료 메시지 출력
    console.log(`[추가] "${title}"가 추가되었습니다. (id: ${nextId})`);

    // 다음 할일을 위해 id 증가
    nextId++;
}

// 할일을 삭제하는 함수
// 매개변수: id - 삭제할 할일의 id (number)
function removeTodo(id) {
    // findIndex: 조건에 맞는 항목의 인덱스를 반환 (없으면 -1)
    const index = todos.findIndex(function (todo) {
        return todo.id === id;
    });

    // 해당 id의 할일을 찾지 못한 경우
    if (index === -1) {
        console.log(`[오류] id ${id}번 할일을 찾을 수 없습니다.`);
        return;
    }

    // 삭제할 할일의 제목을 미리 저장 (출력용)
    const removedTitle = todos[index].title;

    // splice: 배열에서 특정 위치의 항목을 삭제
    // splice(시작인덱스, 삭제개수)
    todos.splice(index, 1);

    console.log(`[삭제] "${removedTitle}"가 삭제되었습니다.`);
}

// 할일을 완료 처리하는 함수
// 매개변수: id - 완료할 할일의 id (number)
function completeTodo(id) {
    // find: 조건에 맞는 첫 번째 항목을 반환 (없으면 undefined)
    const todo = todos.find(function (todo) {
        return todo.id === id;
    });

    // 해당 id의 할일을 찾지 못한 경우
    if (!todo) {
        console.log(`[오류] id ${id}번 할일을 찾을 수 없습니다.`);
        return;
    }

    // 이미 완료된 할일인 경우
    if (todo.done) {
        console.log(`[알림] "${todo.title}"은 이미 완료된 할일입니다.`);
        return;
    }

    // 완료 처리
    todo.done = true;
    console.log(`[완료] "${todo.title}"가 완료되었습니다!`);
}

// 할일 목록을 출력하는 함수
function printTodos() {
    console.log("=== 할일 목록 ===");

    // 할일이 없는 경우
    if (todos.length === 0) {
        console.log("등록된 할일이 없습니다.");
        console.log("------------------");
        return;
    }

    // 각 할일 출력
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        // 삼항 연산자: 조건 ? 참일때값 : 거짓일때값
        const status = todo.done ? "[x]" : "[ ]";
        console.log(`${status} ${todo.id}. ${todo.title}`);
    }

    console.log("------------------");

    // 통계 계산
    const total = todos.length;
    let doneCount = 0;

    // 완료된 할일 개수 세기
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].done) {
            doneCount++;
        }
    }

    const notDoneCount = total - doneCount;

    console.log(`전체: ${total}개 | 완료: ${doneCount}개 | 미완료: ${notDoneCount}개`);
}

// ============================================
// 테스트 시나리오
// ============================================
console.log("=== 할일 관리 프로그램 테스트 ===\n");

// 1단계: 할일 추가
addTodo("JavaScript 공부하기");
addTodo("운동하기");
addTodo("책 읽기");
console.log("");

// 2단계: 할일 완료
completeTodo(1);          // JavaScript 공부하기 완료
completeTodo(1);          // 이미 완료된 할일 테스트
completeTodo(999);        // 존재하지 않는 id 테스트
console.log("");

// 3단계: 할일 삭제
removeTodo(3);            // 책 읽기 삭제
removeTodo(999);          // 존재하지 않는 id 테스트
console.log("");

// 4단계: 목록 출력
printTodos();
