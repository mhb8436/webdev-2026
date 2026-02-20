// 네비게이션 바 컴포넌트 (서버 컴포넌트)
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/todos">할일 목록</Link>
        </li>
        <li>
          <Link href="/completed">완료된 할일</Link>
        </li>
        <li>
          <Link href="/stats">통계</Link>
        </li>
      </ul>
    </nav>
  );
}
