import { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo, FilterType } from '../types/todo';

// Context가 제공할 값의 타입 정의
interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  filteredTodos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: FilterType) => void;
}

// Context 생성 (기본값은 null)
export const TodoContext = createContext<TodoContextType | null>(null);

// Provider 컴포넌트
// 모든 할일 관련 상태와 로직을 한 곳에서 관리
export function TodoProvider({ children }: { children: ReactNode }) {
  // 할일 목록 상태 (localStorage에서 초기값 불러오기)
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // 필터 상태
  const [filter, setFilter] = useState<FilterType>('all');

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 할일 추가 함수
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // 할일 완료/미완료 토글 함수
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 할일 삭제 함수
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 필터에 따라 할일 목록 필터링
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true; // 'all'
  });

  // Context.Provider로 children을 감싸고 value로 상태와 함수 전달
  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
