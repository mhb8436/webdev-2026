'use client';
// 할일 관리 메인 클라이언트 컴포넌트
// TODO: 서버에서 받은 초기 데이터(initialTodos)를 props로 받아 상태 관리

import { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoAppProps {
  initialTodos: Todo[];
  showForm?: boolean; // 입력 폼 표시 여부
}

export default function TodoApp({ initialTodos, showForm = true }: TodoAppProps) {
  // TODO: initialTodos로 상태 초기화
  // const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // TODO: 할일 추가 (서버 API 호출 또는 클라이언트 상태 업데이트)
  // TODO: 할일 삭제
  // TODO: 할일 토글

  return (
    <div>
      {/* TODO: showForm이 true일 때 TodoForm 렌더링 */}
      {/* TODO: TodoList로 할일 목록 렌더링 */}
    </div>
  );
}
