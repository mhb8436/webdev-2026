// 전역 로딩 UI
// app/ 아래의 모든 페이지가 로딩 중일 때 표시됩니다
// React Suspense 기반으로 동작합니다
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return <LoadingSpinner message="페이지를 불러오는 중..." />;
}
