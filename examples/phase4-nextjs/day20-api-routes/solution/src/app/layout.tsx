import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

// 메타데이터 설정
export const metadata: Metadata = {
  title: {
    template: '%s | Next.js 할일 앱',
    default: 'Next.js 할일 앱',
  },
  description: 'Next.js App Router와 API Route로 만든 풀스택 할일 관리 앱입니다.',
  keywords: ['Next.js', '할일', 'Todo', 'React', 'API Route', '풀스택'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
