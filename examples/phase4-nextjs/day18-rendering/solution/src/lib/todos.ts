// 서버 측 할일 데이터 관리 (메모리 저장소)
// 이 파일은 서버에서만 실행됩니다.
// 실제 프로덕션에서는 데이터베이스를 사용하지만,
// 학습을 위해 메모리 저장소를 사용합니다.
import { Todo } from '../types/todo';

// 메모리에 할일 저장 (서버 재시작 시 초기화됨)
let todos: Todo[] = [
  { id: 1, title: 'Next.js 배우기', done: false },
  { id: 2, title: 'Server Component 이해하기', done: false },
  { id: 3, title: 'React 기초 완료', done: true },
  { id: 4, title: 'TypeScript 기초 완료', done: true },
  { id: 5, title: 'App Router 라우팅 구현', done: false },
];

// 다음 ID를 위한 카운터
let nextId = 6;

// 모든 할일 가져오기
export async function getTodos(): Promise<Todo[]> {
  // 배열 복사본을 반환 (원본 보호)
  return [...todos];
}

// 미완료 할일만 가져오기
export async function getActiveTodos(): Promise<Todo[]> {
  return todos.filter((todo) => !todo.done);
}

// 완료된 할일만 가져오기
export async function getCompletedTodos(): Promise<Todo[]> {
  return todos.filter((todo) => todo.done);
}

// 새 할일 추가
export async function addTodo(title: string): Promise<Todo> {
  const newTodo: Todo = {
    id: nextId++,
    title,
    done: false,
  };
  todos.push(newTodo);
  return newTodo;
}

// 할일 완료 토글
export async function toggleTodo(id: number): Promise<Todo | null> {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  todo.done = !todo.done;
  return { ...todo };
}

// 할일 삭제
export async function deleteTodo(id: number): Promise<boolean> {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return false;

  todos.splice(index, 1);
  return true;
}
