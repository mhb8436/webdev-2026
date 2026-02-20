'use client';
// 네비게이션 바 컴포넌트 (Day 17에서 가져옴)
// TODO: Link와 usePathname으로 네비게이션 구현

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: '전체' },
  { href: '/todos', label: '미완료' },
  { href: '/completed', label: '완료' },
  { href: '/stats', label: '통계' },
];

export default function Navbar() {
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
