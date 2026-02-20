'use client';
// 할일 목록 클라이언트 컴포넌트
// TODO: TodoItem을 사용하여 목록 렌더링

import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // TODO: 빈 목록 안내 메시지
  // TODO: TodoItem으로 각 항목 렌더링
  return (
    <ul>
      {/* TODO: 할일 목록 렌더링 */}
    </ul>
  );
}
