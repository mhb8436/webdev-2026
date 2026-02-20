// 할일 API 호출 함수 (토큰 포함)
const API_URL = '/api';

// 할일 타입 정의
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// 할일 목록 조회
export async function fetchTodos(token: string): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('할일 조회에 실패했습니다');
  }

  return response.json();
}

// 할일 생성
export async function createTodo(
  token: string,
  title: string
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('할일 생성에 실패했습니다');
  }

  return response.json();
}

// 할일 수정
export async function updateTodo(
  token: string,
  id: number,
  data: { title?: string; done?: boolean; priority?: string; category?: string }
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('할일 수정에 실패했습니다');
  }

  return response.json();
}

// 할일 삭제
export async function deleteTodo(
  token: string,
  id: number
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('할일 삭제에 실패했습니다');
  }

  return response.json();
}
