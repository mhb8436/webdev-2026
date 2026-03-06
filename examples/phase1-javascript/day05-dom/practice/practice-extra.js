// ============================================
// Day 05 - DOM 연습문제
// ============================================
// practice-extra.html과 함께 사용

// --- 연습 1: 탭 UI ---
// 요구사항:
// - 탭 버튼 클릭 시 해당 탭 내용만 표시
// - 클릭된 버튼에 'active' 클래스 추가
// - 이벤트 위임으로 구현 (각 버튼이 아닌 .tabs에 이벤트 등록)
// 힌트: e.target.dataset.tab으로 탭 ID 가져오기

// TODO: 탭 UI 구현


// --- 연습 2: 할일 목록 (이벤트 위임) ---
// 요구사항:
// - 입력 후 추가 버튼 또는 Enter로 할일 추가
// - 각 항목에 삭제 버튼 추가
// - ul#todo-list에 이벤트 위임으로 삭제 처리
// - 빈 입력 방지
// 힌트: li.innerHTML에 삭제 버튼 포함, e.target.classList.contains('delete-btn')

// TODO: 할일 목록 구현


// --- 연습 3: 마우스 따라다니는 박스 ---
// 요구사항:
// - #drag-area 안에서 마우스를 움직이면 #follow-box가 따라감
// - 박스가 영역 밖으로 나가지 않도록 제한
// - mousemove 이벤트 사용
// 힌트: e.offsetX, e.offsetY 또는 getBoundingClientRect()

// TODO: 마우스 따라다니기 구현
