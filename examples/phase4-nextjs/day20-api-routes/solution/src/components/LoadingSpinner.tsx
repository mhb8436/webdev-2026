// 재사용 가능한 로딩 스피너 컴포넌트

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
