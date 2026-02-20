'use client';
// 할일 목록 컴포넌트
// TODO: TodoItem 컴포넌트를 사용하여 할일 목록 렌더링

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // TODO: 빈 목록일 때 안내 메시지 표시
  // TODO: TodoItem 컴포넌트로 각 할일 렌더링
  return (
    <ul>
      {/* TODO: 할일 목록 렌더링 */}
    </ul>
  );
}
