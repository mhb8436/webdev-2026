'use client';

// TODO: 에러 페이지 구현
// error.tsx는 반드시 'use client' 지시어가 필요합니다!
// Error Boundary는 클라이언트에서 동작하기 때문입니다

// error: 발생한 에러 객체
// reset: 에러를 초기화하고 다시 렌더링을 시도하는 함수
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page">
      {/* TODO: 에러 아이콘이나 이미지 */}
      {/* TODO: 에러 메시지 표시 (error.message 사용) */}
      {/* TODO: 다시 시도 버튼 (reset 함수 호출) */}
    </div>
  );
}
