// ============================================
// Day 05 - DOM 연습문제 (풀이)
// ============================================

// --- 연습 1: 탭 UI (이벤트 위임) ---
const tabContainer = document.querySelector('#ex1 .tabs');
tabContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;

  const tabId = btn.dataset.tab;

  // 모든 탭 내용 숨기기
  document.querySelectorAll('#ex1 .tab-content').forEach(content => {
    content.style.display = 'none';
  });

  // 모든 버튼 비활성화
  document.querySelectorAll('#ex1 .tab-btn').forEach(b => {
    b.classList.remove('active');
  });

  // 선택된 탭 표시
  document.getElementById(tabId).style.display = 'block';
  btn.classList.add('active');
});


// --- 연습 2: 할일 목록 (이벤트 위임) ---
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoAddBtn = document.getElementById('todo-add');

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">삭제</button>
  `;
  todoList.appendChild(li);
  todoInput.value = '';
  todoInput.focus();
}

todoAddBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// 이벤트 위임으로 삭제 처리
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('li').remove();
  }
});


// --- 연습 3: 마우스 따라다니는 박스 ---
const dragArea = document.getElementById('drag-area');
const followBox = document.getElementById('follow-box');

dragArea.addEventListener('mousemove', (e) => {
  const rect = dragArea.getBoundingClientRect();
  const boxSize = 40;

  // 마우스 위치 (영역 기준 상대좌표)
  let x = e.clientX - rect.left - boxSize / 2;
  let y = e.clientY - rect.top - boxSize / 2;

  // 영역 밖으로 나가지 않도록 제한
  x = Math.max(0, Math.min(x, rect.width - boxSize));
  y = Math.max(0, Math.min(y, rect.height - boxSize));

  followBox.style.left = x + 'px';
  followBox.style.top = y + 'px';
});
