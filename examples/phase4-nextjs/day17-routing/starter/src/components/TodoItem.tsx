'use client';
// 개별 할일 항목 컴포넌트
// TODO: 체크박스, 제목, 삭제 버튼을 포함하는 할일 항목 구현

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // TODO: 할일 항목 렌더링
  return (
    <li>
      {/* TODO: 체크박스, 제목, 삭제 버튼 */}
    </li>
  );
}
