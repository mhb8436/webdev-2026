import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

// TODO: metadata 설정
// title을 템플릿 방식으로 설정하세요 (template, default)
// description, keywords 등을 추가하세요
export const metadata: Metadata = {
  // TODO: title 설정 (template 방식)
  // TODO: description 설정
  // TODO: keywords 설정
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
