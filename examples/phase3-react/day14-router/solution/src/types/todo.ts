// 할일 항목 타입
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// 필터 타입
export type FilterType = 'all' | 'active' | 'completed';
