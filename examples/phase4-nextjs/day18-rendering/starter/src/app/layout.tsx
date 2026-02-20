import type { Metadata } from 'next';
import './globals.css';
// TODO: Navbar 컴포넌트 import

export const metadata: Metadata = {
  title: '할일 관리 앱',
  description: 'Next.js 서버/클라이언트 컴포넌트로 만든 할일 관리 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* TODO: Navbar 컴포넌트 추가 */}
        {children}
      </body>
    </html>
  );
}
