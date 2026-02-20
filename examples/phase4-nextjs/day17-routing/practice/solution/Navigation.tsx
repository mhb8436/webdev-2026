// ============================================
// 연습문제 3 풀이: 활성 링크 표시 네비게이션
// ============================================

// usePathname()은 클라이언트 훅이므로 'use client' 필수
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/products", label: "상품목록" },
  { href: "/cart", label: "장바구니" },
  { href: "/about", label: "소개" },
  { href: "/blog", label: "블로그" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        backgroundColor: "#333",
        padding: "12px 24px",
        display: "flex",
        gap: "16px",
      }}
    >
      {navLinks.map((link) => {
        // 현재 경로와 링크 경로를 비교하여 활성 여부 판단
        // 홈(/)은 정확히 일치할 때만, 나머지는 startsWith로 하위 경로도 포함
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: isActive ? "#fff" : "#aaa",
              textDecoration: isActive ? "underline" : "none",
              fontWeight: isActive ? "bold" : "normal",
              fontSize: "16px",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: isActive
                ? "rgba(255,255,255,0.1)"
                : "transparent",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
