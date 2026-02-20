'use client';
// 할일 목록 컴포넌트
// TodoItem 컴포넌트를 사용하여 할일 리스트 렌더링

import TodoItem from './TodoItem';

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
  // 빈 목록일 때 안내 메시지
  if (todos.length === 0) {
    return <p className="empty-message">표시할 할일이 없습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
