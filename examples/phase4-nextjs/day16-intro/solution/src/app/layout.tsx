import type { Metadata } from 'next';
import './globals.css';

// 메타데이터 설정 - 서버에서 HTML <head>에 자동으로 포함됨
export const metadata: Metadata = {
  title: '할일 관리 앱',
  description: 'Next.js로 만든 할일 관리 앱',
};

// 루트 레이아웃 - 모든 페이지를 감싸는 최상위 레이아웃
// layout.tsx는 서버 컴포넌트로 유지 (metadata export를 위해)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
