// ============================================
// Day 05 - DOM 이벤트 심화
// ============================================
// 학습목표: 이벤트 핸들링, 이벤트 위임, 버블링/캡처링

const output = document.getElementById('output');

function log(msg) {
  output.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}<br>` + output.innerHTML;
}

// TODO 1: 클릭 카운터
// const countBtn = document.getElementById('countBtn');
// const resetBtn = document.getElementById('resetBtn');
// let count = 0;
// countBtn.addEventListener('click', () => { ... });
// resetBtn.addEventListener('click', () => { ... });


// TODO 2: 키보드 이벤트 (실시간 입력)
// const textInput = document.getElementById('textInput');
// textInput.addEventListener('input', (e) => {
//   const value = e.target.value;
//   charCount.textContent = value.length;
//   preview.textContent = value;
// });
// Enter 키 감지: textInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') ... })


// TODO 3: 이벤트 위임
// 부모 요소(cardList)에 하나의 이벤트만 등록하여 모든 카드 클릭 처리
// const cardList = document.getElementById('cardList');
// cardList.addEventListener('click', (e) => {
//   const card = e.target.closest('.card');
//   if (!card) return;
//   // card.dataset.id 로 ID 접근
//   // card.classList.toggle('highlight');
// });
// 카드 추가 버튼: 새 카드를 동적으로 추가해도 이벤트가 자동 동작


// TODO 4: 이벤트 버블링
// outer, middle, inner 각각에 클릭 이벤트 등록
// 어떤 순서로 이벤트가 발생하는지 log로 출력
// e.stopPropagation() 으로 전파 중단 테스트
