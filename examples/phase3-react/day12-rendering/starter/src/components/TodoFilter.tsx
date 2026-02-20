import { FilterType } from '../types/todo';

// TodoFilter 컴포넌트의 Props 타입 정의
interface TodoFilterProps {
  current: FilterType;              // 현재 선택된 필터
  onFilterChange: (filter: FilterType) => void;  // 필터 변경 핸들러
}

function TodoFilter({ current, onFilterChange }: TodoFilterProps) {
  // TODO: 전체, 진행중, 완료 3개 버튼을 만드세요
  // TODO: 각 버튼 클릭 시 onFilterChange를 호출하여 필터를 변경하세요
  // TODO: 현재 선택된 필터 버튼에 'active' 클래스를 추가하세요
  //       힌트: className={current === 'all' ? 'filter-btn active' : 'filter-btn'}
  //       또는 템플릿 리터럴: className={`filter-btn ${current === 'all' ? 'active' : ''}`}

  return (
    <div className="filters">
      {/* TODO: 필터 버튼들을 구현하세요 */}
      {/* 버튼 텍스트: 전체, 진행중, 완료 */}
      {/* 각 버튼의 필터값: 'all', 'active', 'completed' */}
    </div>
  );
}

export default TodoFilter;
