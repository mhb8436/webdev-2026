'use client';
// 네비게이션 바 - 클라이언트 컴포넌트
// usePathname() 훅을 사용하므로 'use client' 필요

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 네비게이션 링크 목록
const links = [
  { href: '/', label: '전체' },
  { href: '/todos', label: '미완료' },
  { href: '/completed', label: '완료' },
  { href: '/stats', label: '통계' },
];

export default function Navbar() {
  // 현재 URL 경로
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
