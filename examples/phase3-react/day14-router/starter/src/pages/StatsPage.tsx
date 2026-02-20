import { Todo } from '../types/todo';
// TODO: useNavigate import
// import { useNavigate } from 'react-router-dom';

// 통계 페이지 props 타입
interface StatsPageProps {
  todos: Todo[];
}

// 통계 페이지 컴포넌트
function StatsPage({ todos }: StatsPageProps) {
  // TODO: useNavigate 훅 사용
  // const navigate = useNavigate();

  // TODO: 통계 계산
  // - 총 할일 수
  // - 완료된 할일 수
  // - 미완료 할일 수
  // - 완료율 (퍼센트)

  return (
    <div className="page">
      <h2>통계</h2>
      {/* TODO: 통계 정보 표시 */}
      {/* 총 할일, 완료, 미완료, 완료율 */}

      {/* TODO: useNavigate를 사용하여 홈으로 이동하는 버튼 */}
      {/* 힌트: onClick={() => navigate('/')} */}
    </div>
  );
}

export default StatsPage;
