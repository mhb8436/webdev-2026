import { useTodos } from '../hooks/useTodos';
import { FilterType } from '../types/todo';

// 할일 필터 컴포넌트
// Context를 사용하므로 props가 필요 없음!
function TodoFilter() {
  // useTodos 훅에서 필터 상태와 변경 함수 가져오기
  const { filter, setFilter } = useTodos();

  // 필터 옵션 정의
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '미완료' },
    { value: 'completed', label: '완료' },
  ];

  return (
    <div className="todo-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-button ${filter === f.value ? 'active' : ''}`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
