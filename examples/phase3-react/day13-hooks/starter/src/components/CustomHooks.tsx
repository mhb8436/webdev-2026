// ============================================
// Day 13 - 커스텀 훅 만들기
// ============================================
// 학습목표: 재사용 가능한 로직을 커스텀 훅으로 추출

import { useState, useEffect } from 'react';

// TODO 1: useLocalStorage 훅
// function useLocalStorage<T>(key: string, initialValue: T) {
//   localStorage에 값을 저장/불러오는 useState 래퍼
//   반환: [value, setValue]
// }


// TODO 2: useDebounce 훅
// function useDebounce<T>(value: T, delay: number): T {
//   value가 변경된 후 delay ms 뒤에 반영
// }


// TODO 3: useFetch 훅
// function useFetch<T>(url: string) {
//   반환: { data: T | null, loading: boolean, error: string | null }
// }


// TODO 4: useToggle 훅
// function useToggle(initialValue: boolean = false) {
//   반환: [value, toggle] - toggle()으로 true/false 전환
// }


// TODO 5: useCounter 훅
// function useCounter(initialValue: number = 0) {
//   반환: { count, increment, decrement, reset }
// }


// TODO 6: 컴포넌트에서 커스텀 훅 사용하기
export default function CustomHooksDemo() {
  return <div>TODO: 커스텀 훅을 만들고 사용하세요</div>;
}
