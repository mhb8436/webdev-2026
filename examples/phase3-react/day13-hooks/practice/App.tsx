// Day 13 연습문제 - useEffect, localStorage, useRef
// 아래 주석을 읽고 각 문제를 구현하세요.

import { useState, useEffect, useRef } from 'react';

// ============================================
// 문제 1: 메모장
// ============================================
// - textarea에 메모를 작성하세요
// - useEffect로 마운트 시 localStorage에서 메모를 불러오세요
// - 메모가 변경될 때마다 localStorage에 저장하세요
// - 마지막 저장 시간을 표시하세요
// - 글자 수를 표시하세요
// - "초기화" 버튼으로 메모를 지울 수 있게 하세요

// ============================================
// 문제 2: 스톱워치
// ============================================
// - 시작/정지/리셋 버튼을 만드세요
// - useEffect로 setInterval을 관리하세요
// - useRef로 interval ID를 저장하세요
// - 시간 표시: MM:SS.ms 형식
// - cleanup 함수에서 clearInterval을 호출하세요
// - 실행 중/정지 상태에 따라 버튼 스타일 변경

// ============================================
// 문제 3: 자동 검색 (디바운스)
// ============================================
// - 과일 이름 배열을 만드세요 (최소 10개)
// - 검색어 입력 후 500ms 뒤에 자동으로 필터링
// - useEffect의 cleanup에서 clearTimeout으로 디바운스 구현
// - useRef로 input에 자동 포커스
// - "검색 중..." 표시
// - 검색 결과 개수 표시

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 13 연습문제</h1>

      {/* 문제 1: 메모장 */}
      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 메모장</h2>
        {/* 여기에 메모장을 구현하세요 */}
      </section>

      {/* 문제 2: 스톱워치 */}
      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 스톱워치</h2>
        {/* 여기에 스톱워치를 구현하세요 */}
      </section>

      {/* 문제 3: 자동 검색 */}
      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 자동 검색 (디바운스)</h2>
        {/* 여기에 자동 검색을 구현하세요 */}
      </section>
    </div>
  );
}

export default App;
