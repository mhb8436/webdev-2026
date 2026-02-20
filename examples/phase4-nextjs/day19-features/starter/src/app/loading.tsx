// TODO: 전역 로딩 UI
// 이 파일은 app/ 아래의 모든 페이지가 로딩 중일 때 표시됩니다
// React Suspense 기반으로 동작합니다

export default function Loading() {
  return (
    <div className="loading">
      {/* TODO: 로딩 스피너 구현 */}
      {/* 힌트: LoadingSpinner 컴포넌트를 import해서 사용하거나 */}
      {/* 직접 <div className="spinner"></div>를 사용하세요 */}
    </div>
  );
}
