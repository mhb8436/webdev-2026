import type { Metadata } from 'next';
import './globals.css';

// 메타데이터 설정 - 페이지 제목과 설명
export const metadata: Metadata = {
  title: '할일 관리 앱',
  description: 'Next.js로 만든 할일 관리 앱',
};

// 루트 레이아웃 - 모든 페이지를 감싸는 최상위 레이아웃
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
