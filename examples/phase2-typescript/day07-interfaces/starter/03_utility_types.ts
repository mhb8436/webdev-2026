// ============================================
// Day 07 - 유틸리티 타입
// ============================================
// 학습목표: Partial, Required, Pick, Omit, Record, Readonly

// interface Todo {
//   id: number;
//   title: string;
//   done: boolean;
//   priority: "high" | "medium" | "low";
//   category: string;
// }

// TODO 1: Partial<T> - 모든 속성을 선택적으로
// function updateTodo(id: number, updates: Partial<Todo>): Todo
// 일부 필드만 전달해서 업데이트


// TODO 2: Required<T> - 모든 속성을 필수로
// interface Config { host?: string; port?: number; debug?: boolean; }
// type StrictConfig = Required<Config>


// TODO 3: Pick<T, K> - 특정 속성만 추출
// type TodoPreview = Pick<Todo, "id" | "title" | "done">
// 목록에서 간단한 미리보기용


// TODO 4: Omit<T, K> - 특정 속성 제외
// type CreateTodoInput = Omit<Todo, "id">
// 새 할일 생성 시 id는 서버에서 부여


// TODO 5: Record<K, V> - 키-값 매핑
// type PriorityCount = Record<"high" | "medium" | "low", number>
// 우선순위별 할일 개수 집계


// TODO 6: Readonly<T> - 모든 속성을 읽기 전용으로
// type FrozenTodo = Readonly<Todo>
// 수정 시도하면 컴파일 에러
