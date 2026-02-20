'use client';

// 에러 페이지 (Day 19에서 완성)
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
