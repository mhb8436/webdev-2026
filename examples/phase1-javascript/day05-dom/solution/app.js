// ============================================
// 할일 관리 앱 - DOM 버전 (정답 코드)
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
// 할일 추가 함수
// ============================================
function addTodo() {
  // input에서 값 가져오기 (앞뒤 공백 제거)
  const text = todoInput.value.trim();

  // 빈 값이면 함수 종료
  if (text === '') {
    todoInput.focus();
    return;
  }

  // 새로운 할일 객체를 만들어 배열에 추가
  const newTodo = {
    id: nextId++,
    text: text,
    done: false
  };
  todos.push(newTodo);

  // 화면 다시 그리기
  renderTodos();

  // input 비우고 포커스 이동
  todoInput.value = '';
  todoInput.focus();
}

// ============================================
// 할일 삭제 함수
// ============================================
function removeTodo(id) {
  // filter를 사용하여 해당 id가 아닌 할일만 남기기
  todos = todos.filter(function(todo) {
    return todo.id !== id;
  });

  // 화면 다시 그리기
  renderTodos();
}

// ============================================
// 할일 완료 토글 함수
// ============================================
function toggleTodo(id) {
  // 배열에서 해당 id의 할일 찾기
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });

  // 찾은 할일의 done 상태 반전
  if (todo) {
    todo.done = !todo.done;
  }

  // 화면 다시 그리기
  renderTodos();
}

// ============================================
// 화면 그리기 함수
// ============================================
function renderTodos() {
  // 기존 목록 내용 비우기
  todoList.innerHTML = '';

  // currentFilter에 따라 보여줄 할일 필터링
  let filteredTodos;

  if (currentFilter === 'active') {
    // 진행중: done이 false인 것만
    filteredTodos = todos.filter(function(todo) {
      return !todo.done;
    });
  } else if (currentFilter === 'completed') {
    // 완료: done이 true인 것만
    filteredTodos = todos.filter(function(todo) {
      return todo.done;
    });
  } else {
    // 전체: 모든 할일
    filteredTodos = todos;
  }

  // 필터링된 할일이 없으면 빈 상태 메시지 표시
  if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'empty-message';

    if (todos.length === 0) {
      emptyMessage.textContent = '할일이 없습니다. 새로운 할일을 추가해 보세요!';
    } else {
      emptyMessage.textContent = '해당하는 할일이 없습니다.';
    }

    todoList.appendChild(emptyMessage);
  }

  // 각 할일에 대해 li 요소 생성
  filteredTodos.forEach(function(todo) {
    // li 요소 만들기
    const li = document.createElement('li');

    // 체크박스 만들기
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', function() {
      toggleTodo(todo.id);
    });

    // 텍스트 span 만들기
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'todo-text';
    // 완료된 할일이면 'done' 클래스 추가 (취소선 스타일)
    if (todo.done) {
      span.classList.add('done');
    }

    // 삭제 버튼 만들기
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
      removeTodo(todo.id);
    });

    // li에 체크박스, 텍스트, 삭제 버튼 추가
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    // 목록에 li 추가
    todoList.appendChild(li);
  });

  // 상태 영역 업데이트 - 남은 할일 개수 표시
  const remainingCount = todos.filter(function(todo) {
    return !todo.done;
  }).length;
  const totalCount = todos.length;

  if (totalCount > 0) {
    statusArea.textContent = '전체: ' + totalCount + '개 | 남은 할일: ' + remainingCount + '개';
  } else {
    statusArea.textContent = '';
  }
}

// ============================================
// 필터 변경 함수
// ============================================
function setFilter(filter) {
  // currentFilter 업데이트
  currentFilter = filter;

  // 모든 필터 버튼에서 'active' 클래스 제거
  filterButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });

  // 클릭된 필터에 해당하는 버튼에 'active' 클래스 추가
  filterButtons.forEach(function(btn) {
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });

  // 화면 다시 그리기
  renderTodos();
}

// ============================================
// 이벤트 리스너 등록
// ============================================

// 추가 버튼 클릭 시 할일 추가
addButton.addEventListener('click', addTodo);

// Enter 키 입력 시 할일 추가
todoInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// 필터 버튼들에 클릭 이벤트 등록
filterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    setFilter(button.dataset.filter);
  });
});

// ============================================
// 초기 화면 그리기
// ============================================
renderTodos();
