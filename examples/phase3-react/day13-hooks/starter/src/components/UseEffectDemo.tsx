// ============================================
// Day 13 - useEffect 심화
// ============================================
// 학습목표: 라이프사이클, 의존성 배열, 클린업 함수

import { useState, useEffect } from 'react';

// TODO 1: 마운트/언마운트 감지
// useEffect(() => {
//   console.log("컴포넌트 마운트됨");
//   return () => console.log("컴포넌트 언마운트됨");
// }, []);


// TODO 2: 의존성 배열에 따른 실행
// useEffect(() => { ... }, [count]);  // count 변경 시만 실행
// useEffect(() => { ... }, []);       // 마운트 시 1회만
// useEffect(() => { ... });           // 매 렌더링마다


// TODO 3: 타이머 (setInterval + 클린업)
// const [seconds, setSeconds] = useState(0);
// useEffect에서 setInterval 시작, return에서 clearInterval


// TODO 4: 데이터 페칭
// const [data, setData] = useState(null);
// const [loading, setLoading] = useState(true);
// useEffect에서 fetch() 호출하여 데이터 가져오기


// TODO 5: 디바운스 검색
// const [query, setQuery] = useState('');
// const [debouncedQuery, setDebouncedQuery] = useState('');
// useEffect에서 setTimeout으로 300ms 디바운스 구현
// return으로 clearTimeout (클린업)

export default function UseEffectDemo() {
  return <div>TODO: 구현하세요</div>;
}
