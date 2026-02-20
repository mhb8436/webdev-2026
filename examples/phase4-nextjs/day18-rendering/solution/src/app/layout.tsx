import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

// 메타데이터 설정 - 서버 컴포넌트에서만 export 가능
export const metadata: Metadata = {
  title: '할일 관리 앱',
  description: 'Next.js 서버/클라이언트 컴포넌트로 만든 할일 관리 앱',
};

// 루트 레이아웃 - 서버 컴포넌트
// Navbar(클라이언트 컴포넌트)를 서버 컴포넌트 안에서 사용
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* Navbar는 클라이언트 컴포넌트이지만 서버 컴포넌트 안에서 사용 가능 */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
