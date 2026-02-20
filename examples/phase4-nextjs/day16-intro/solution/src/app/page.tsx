// 서버 컴포넌트 - 'use client' 지시어가 필요하지 않음
// 클라이언트 컴포넌트인 TodoApp을 import해서 사용
import TodoApp from '@/components/TodoApp';

export default function Home() {
  return (
    <main>
      <h1>할일 관리</h1>
      {/* 클라이언트 컴포넌트를 서버 컴포넌트 안에서 렌더링 */}
      <TodoApp />
    </main>
  );
}
