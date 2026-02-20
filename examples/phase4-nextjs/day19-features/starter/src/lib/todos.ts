import { Todo } from '@/types/todo';

// 서버 측 할일 데이터 (메모리 저장소)
const todos: Todo[] = [
  {
    id: '1',
    title: 'Next.js 세부 기능 학습하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Metadata API 이해하기',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'loading.tsx와 error.tsx 구현하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'not-found 페이지 만들기',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: '동적 라우트 상세 페이지 구현하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// 모든 할일 조회
export function getTodos(): Todo[] {
  return todos;
}

// ID로 할일 조회
export function getTodoById(id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

// 완료된 할일 조회
export function getCompletedTodos(): Todo[] {
  return todos.filter((todo) => todo.completed);
}

// 미완료 할일 조회
export function getActiveTodos(): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

// 할일 추가
export function addTodo(title: string): Todo {
  const newTodo: Todo = {
    id: String(Date.now()),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return newTodo;
}

// 할일 토글
export function toggleTodo(id: string): Todo | undefined {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return todo;
}

// 할일 삭제
export function deleteTodo(id: string): boolean {
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
}
