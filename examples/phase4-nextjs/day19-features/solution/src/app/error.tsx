'use client';

// 에러 페이지 구현
// error.tsx는 반드시 'use client' 지시어가 필요합니다!
// Error Boundary는 클라이언트에서 동작하기 때문입니다
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 에러 로깅 (선택적으로 에러 리포팅 서비스에 전송 가능)
  useEffect(() => {
    console.error('에러 발생:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-icon">!</div>
      <h2>오류가 발생했습니다</h2>
      <p>{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
