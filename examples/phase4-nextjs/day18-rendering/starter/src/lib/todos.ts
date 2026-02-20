// 서버 측 할일 데이터 관리 (메모리 저장소)
// 이 파일은 서버에서만 실행됩니다
import { Todo } from '../types/todo';

// 메모리에 할일 저장 (서버 재시작 시 초기화됨)
let todos: Todo[] = [
  { id: 1, title: 'Next.js 배우기', done: false },
  { id: 2, title: 'Server Component 이해하기', done: false },
  { id: 3, title: 'React 기초 완료', done: true },
];

// 다음 ID를 위한 카운터
let nextId = 4;

// TODO: 모든 할일 가져오기
export async function getTodos(): Promise<Todo[]> {
  // TODO: 구현하세요
  // 힌트: todos 배열을 복사해서 반환
  return [];
}

// TODO: 미완료 할일만 가져오기
export async function getActiveTodos(): Promise<Todo[]> {
  // TODO: 구현하세요
  return [];
}

// TODO: 완료된 할일만 가져오기
export async function getCompletedTodos(): Promise<Todo[]> {
  // TODO: 구현하세요
  return [];
}

// TODO: 새 할일 추가
export async function addTodo(title: string): Promise<Todo> {
  // TODO: 구현하세요
  // 힌트: nextId를 사용하여 새 Todo 생성 후 todos 배열에 추가
  return { id: 0, title: '', done: false };
}

// TODO: 할일 완료 토글
export async function toggleTodo(id: number): Promise<Todo | null> {
  // TODO: 구현하세요
  // 힌트: id로 할일을 찾아 done 값을 반전
  return null;
}

// TODO: 할일 삭제
export async function deleteTodo(id: number): Promise<boolean> {
  // TODO: 구현하세요
  // 힌트: id로 할일을 찾아 배열에서 제거
  return false;
}
