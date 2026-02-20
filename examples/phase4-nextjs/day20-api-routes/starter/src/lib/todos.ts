import { Todo } from '@/types/todo';

// 서버 측 할일 데이터 (메모리 저장소)
// 서버가 재시작되면 초기 데이터로 리셋됩니다
const todos: Todo[] = [
  {
    id: '1',
    title: 'API Route 학습하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'GET 핸들러 구현하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'POST 핸들러 구현하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'PUT/DELETE 핸들러 구현하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'fetch로 프론트엔드 연동하기',
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

// 할일 수정 (제목, 완료 상태 등)
export function updateTodo(
  id: string,
  updates: Partial<Pick<Todo, 'title' | 'completed'>>
): Todo | undefined {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    if (updates.title !== undefined) {
      todo.title = updates.title;
    }
    if (updates.completed !== undefined) {
      todo.completed = updates.completed;
    }
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
