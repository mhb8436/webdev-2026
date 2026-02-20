// 할일 항목의 타입 정의
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// 필터 타입 정의: 전체, 진행중, 완료
export type FilterType = 'all' | 'active' | 'completed';
