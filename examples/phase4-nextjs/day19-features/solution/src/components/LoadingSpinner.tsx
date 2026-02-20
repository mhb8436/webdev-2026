// 재사용 가능한 로딩 스피너 컴포넌트
// CSS 애니메이션을 사용하여 스피너를 구현
// globals.css에 .spinner, .loading 스타일이 정의되어 있음

interface LoadingSpinnerProps {
  message?: string; // 로딩 메시지 (선택)
}

export default function LoadingSpinner({ message = '로딩 중...' }: LoadingSpinnerProps) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
