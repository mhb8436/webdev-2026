// ============================================
// 할일 관리 앱 - DOM 버전 (스타터 코드)
// ============================================

// 할일 데이터 배열
let todos = [];
let nextId = 1;
let currentFilter = 'all';

// DOM 요소 가져오기
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const statusArea = document.getElementById('status');
const filterButtons = document.querySelectorAll('.filter-button');

// ============================================
// TODO: 할일 추가 함수
// ============================================
function addTodo() {
  // TODO: input에서 값 가져오기 (trim()으로 앞뒤 공백 제거)

  // TODO: 빈 값이면 함수 종료 (return)

  // TODO: 새로운 할일 객체를 만들어 todos 배열에 추가
  //   할일 객체 형태: { id: nextId++, text: 할일텍스트, done: false }

  // TODO: 화면 다시 그리기 (renderTodos 호출)

  // TODO: input 값 비우기

  // TODO: input에 포커스 이동 (todoInput.focus())
}

// ============================================
// TODO: 할일 삭제 함수
// ============================================
function removeTodo(id) {
  // TODO: filter를 사용하여 해당 id가 아닌 할일만 남기기

  // TODO: 화면 다시 그리기
}

// ============================================
// TODO: 할일 완료 토글 함수
// ============================================
function toggleTodo(id) {
  // TODO: todos 배열에서 해당 id의 할일 찾기 (find 사용)

  // TODO: 찾은 할일의 done 값을 반전 (!todo.done)

  // TODO: 화면 다시 그리기
}

// ============================================
// TODO: 화면 그리기 함수
// ============================================
function renderTodos() {
  // TODO: todoList 내용 비우기 (innerHTML = '')

  // TODO: currentFilter에 따라 보여줄 할일 필터링
  //   'all': 전체 보기
  //   'active': done이 false인 것만
  //   'completed': done이 true인 것만

  // TODO: 필터링된 할일이 없으면 빈 상태 메시지 표시
  //   예: "할일이 없습니다" 또는 "해당하는 할일이 없습니다"

  // TODO: 필터링된 각 할일에 대해 li 요소 생성
  //   1. li 요소 만들기: document.createElement('li')
  //
  //   2. 체크박스 만들기: document.createElement('input')
  //      - type을 'checkbox'로 설정
  //      - checked를 todo.done으로 설정
  //      - change 이벤트에 toggleTodo(todo.id) 연결
  //
  //   3. 텍스트 span 만들기: document.createElement('span')
  //      - textContent에 할일 텍스트 설정
  //      - className에 'todo-text' 설정
  //      - todo.done이면 'done' 클래스 추가
  //
  //   4. 삭제 버튼 만들기: document.createElement('button')
  //      - textContent에 '삭제' 설정
  //      - className에 'delete-button' 설정
  //      - click 이벤트에 removeTodo(todo.id) 연결
  //
  //   5. li에 체크박스, span, 버튼 추가 (appendChild)
  //   6. todoList에 li 추가 (appendChild)

  // TODO: 상태 영역 업데이트
  //   남은 할일 개수 표시 (done이 false인 것의 수)
  //   예: "남은 할일: 3개"
}

// ============================================
// TODO: 필터 변경 함수
// ============================================
function setFilter(filter) {
  // TODO: currentFilter를 새 필터값으로 업데이트

  // TODO: 모든 필터 버튼에서 'active' 클래스 제거
  //   filterButtons.forEach(btn => btn.classList.remove('active'))

  // TODO: 클릭된 버튼에 'active' 클래스 추가
  //   data-filter 속성이 filter와 같은 버튼 찾기

  // TODO: 화면 다시 그리기
}

// ============================================
// TODO: 이벤트 리스너 등록
// ============================================

// TODO: addButton 클릭 시 addTodo 함수 실행
// addButton.addEventListener('click', addTodo);

// TODO: todoInput에서 Enter 키 입력 시 addTodo 함수 실행
// todoInput.addEventListener('keypress', function(event) {
//   if (event.key === 'Enter') {
//     addTodo();
//   }
// });

// TODO: 필터 버튼들에 클릭 이벤트 등록
// filterButtons.forEach(function(button) {
//   button.addEventListener('click', function() {
//     setFilter(button.dataset.filter);
//   });
// });

// 초기 화면 그리기
// renderTodos();
