import { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo, FilterType } from '../types/todo';

// TODO: TodoContextType 인터페이스 정의
// 이 인터페이스는 Context가 제공할 값의 타입을 정의합니다
interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  // TODO: 함수 타입 추가
  // addTodo: (title: string) => void;
  // toggleTodo: (id: number) => void;
  // deleteTodo: (id: number) => void;
  // setFilter: (filter: FilterType) => void;
  // filteredTodos: Todo[];
}

// TODO: Context 생성
// 힌트: createContext의 기본값은 null로 설정
// export const TodoContext = createContext<TodoContextType | null>(null);

// TODO: Provider 컴포넌트 구현
// Provider는 children을 받아서 Context.Provider로 감싸는 컴포넌트입니다
export function TodoProvider({ children }: { children: ReactNode }) {
  // TODO: 할일 상태 (localStorage에서 불러오기)
  // const [todos, setTodos] = useState<Todo[]>(() => {
  //   const saved = localStorage.getItem('todos');
  //   return saved ? JSON.parse(saved) : [];
  // });

  // TODO: 필터 상태
  // const [filter, setFilter] = useState<FilterType>('all');

  // TODO: localStorage 연동 (useEffect)
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  // TODO: 할일 추가 함수
  // const addTodo = (title: string) => { ... };

  // TODO: 할일 토글 함수
  // const toggleTodo = (id: number) => { ... };

  // TODO: 할일 삭제 함수
  // const deleteTodo = (id: number) => { ... };

  // TODO: 필터링된 할일 계산
  // const filteredTodos = todos.filter(...)

  // TODO: Context.Provider로 children 감싸기
  // return (
  //   <TodoContext.Provider value={{ todos, filter, addTodo, toggleTodo, deleteTodo, setFilter, filteredTodos }}>
  //     {children}
  //   </TodoContext.Provider>
  // );

  return <>{children}</>;
}
