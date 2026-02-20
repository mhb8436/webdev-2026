import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

// 메타데이터 설정 - SEO와 소셜 미디어 공유를 위한 정보
export const metadata: Metadata = {
  // title 템플릿: 하위 페이지 제목이 %s에 들어감
  title: {
    template: '%s | Next.js 할일 앱',
    default: 'Next.js 할일 앱',
  },
  // 페이지 설명
  description: 'Next.js App Router로 만든 할일 관리 앱입니다. 메타데이터, 로딩, 에러 처리 등 세부 기능을 학습합니다.',
  // SEO 키워드
  keywords: ['Next.js', '할일', 'Todo', 'React', '프론트엔드'],
  // Open Graph - 소셜 미디어 공유 시 표시되는 정보
  openGraph: {
    title: 'Next.js 할일 앱',
    description: 'Next.js App Router로 만든 할일 관리 앱',
    type: 'website',
    locale: 'ko_KR',
  },
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
