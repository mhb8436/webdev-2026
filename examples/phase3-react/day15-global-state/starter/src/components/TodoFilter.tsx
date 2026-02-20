import { FilterType } from '../types/todo';

// 필터 컴포넌트의 props 타입
// TODO: Context를 사용하면 props 대신 useTodos()로 변경 가능
interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// 할일 필터 컴포넌트
function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
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
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
