// ============================================
// Day 11 - React 할일 앱 (useState 활용)
// ============================================
// 학습목표: 상태 관리, 배열 상태 업데이트, 폼 입력 처리

import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// TODO 1: TodoApp 컴포넌트
// - todos 상태 (Todo[])
// - input 상태 (string)
// - nextId 상태 (number)

// TODO 2: 할일 추가 함수
// function handleAdd() - input이 비어있지 않으면 새 할일 추가
// 힌트: setTodos([...todos, { id: nextId, title: input, done: false }])

// TODO 3: 할일 완료 토글
// function handleToggle(id: number) - done 상태 반전
// 힌트: setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t))

// TODO 4: 할일 삭제
// function handleDelete(id: number) - 해당 할일 제거
// 힌트: setTodos(todos.filter(t => t.id !== id))

// TODO 5: JSX 렌더링
// - 입력 폼 (input + button)
// - 할일 목록 (map으로 렌더링)
// - 각 항목에 완료 체크박스, 제목, 삭제 버튼
// - 통계: 전체 N개, 완료 N개

export default function TodoApp() {
  return <div>TODO: 구현하세요</div>;
}
