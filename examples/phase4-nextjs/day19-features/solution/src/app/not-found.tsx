// 전역 404 페이지
// 존재하지 않는 URL에 접근했을 때 표시됩니다
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <h3>페이지를 찾을 수 없습니다</h3>
      <p>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
