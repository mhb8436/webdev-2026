import { FilterType } from '../types/todo';

// TodoFilter 컴포넌트의 Props 타입 정의
interface TodoFilterProps {
  current: FilterType;              // 현재 선택된 필터
  onFilterChange: (filter: FilterType) => void;  // 필터 변경 핸들러
}

// 필터 옵션 정의: 값과 표시 텍스트
const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
];

function TodoFilter({ current, onFilterChange }: TodoFilterProps) {
  return (
    <div className="filters">
      {FILTER_OPTIONS.map(option => (
        <button
          key={option.value}
          className={`filter-btn ${current === option.value ? 'active' : ''}`}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
