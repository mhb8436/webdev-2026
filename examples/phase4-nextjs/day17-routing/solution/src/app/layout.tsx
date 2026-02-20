import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '할일 관리 앱',
  description: 'Next.js 라우팅으로 만든 할일 관리 앱',
};

// 루트 레이아웃 - 모든 페이지를 감싸는 최상위 레이아웃
// Navbar를 여기에 배치하면 모든 페이지에서 공통으로 표시됨
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* 네비게이션 바 - 모든 페이지에서 공통으로 보임 */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
