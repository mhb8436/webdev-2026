// ============================================
// Day 05 - DOM 이벤트 심화 (풀이)
// ============================================

const output = document.getElementById('output');

function log(msg) {
  const time = new Date().toLocaleTimeString();
  output.innerHTML = `<div>[${time}] ${msg}</div>` + output.innerHTML;
}

// --- 1. 클릭 카운터 ---
const countBtn = document.getElementById('countBtn');
const resetBtn = document.getElementById('resetBtn');
let count = 0;

countBtn.addEventListener('click', () => {
  count++;
  countBtn.textContent = `클릭: ${count}`;
  log(`버튼 클릭! 카운트: ${count}`);
});

resetBtn.addEventListener('click', () => {
  count = 0;
  countBtn.textContent = '클릭: 0';
  log('카운트 리셋');
});

// --- 2. 키보드 이벤트 ---
const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const preview = document.getElementById('preview');

textInput.addEventListener('input', (e) => {
  const value = e.target.value;
  charCount.textContent = value.length;
  preview.textContent = value;
});

textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    log(`Enter 입력: "${textInput.value}"`);
    textInput.value = '';
    charCount.textContent = '0';
    preview.textContent = '';
  }
});

// 특수 키 감지
textInput.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    log('Ctrl+B 감지! (기본 동작 방지됨)');
  }
});

// --- 3. 이벤트 위임 ---
const cardList = document.getElementById('cardList');
const addCardBtn = document.getElementById('addCardBtn');
let nextCardId = 4;

// 부모에 하나만 등록 → 모든 자식 카드에 적용
cardList.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  card.classList.toggle('highlight');
  const id = card.dataset.id;
  const isHighlighted = card.classList.contains('highlight');
  log(`카드 ${id} ${isHighlighted ? '선택' : '해제'}`);
});

// 새 카드 추가 (이벤트 위임 덕분에 자동으로 이벤트 작동)
addCardBtn.addEventListener('click', () => {
  const newCard = document.createElement('div');
  newCard.className = 'card';
  newCard.dataset.id = nextCardId;
  newCard.textContent = `카드 ${nextCardId} - 동적 추가됨`;
  cardList.appendChild(newCard);
  log(`카드 ${nextCardId} 추가됨 (이벤트 위임으로 자동 동작)`);
  nextCardId++;
});

// --- 4. 이벤트 버블링 ---
document.getElementById('outer').addEventListener('click', (e) => {
  log('버블링: 외부 div 클릭');
});

document.getElementById('middle').addEventListener('click', (e) => {
  log('버블링: 중간 div 클릭');
  // e.stopPropagation();  // 주석 해제하면 외부로 전파 중단
});

document.getElementById('inner').addEventListener('click', (e) => {
  log('버블링: 내부 버튼 클릭 (여기서 시작 → 중간 → 외부 순서로 전파)');
});

log('이벤트 핸들러 등록 완료! 각 영역을 클릭해보세요.');
