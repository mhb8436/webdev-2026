'use client';
// 개별 할일 항목 클라이언트 컴포넌트
// TODO: 체크박스, 제목, 삭제 버튼 구현

import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      {/* TODO: 할일 항목 렌더링 */}
    </li>
  );
}
