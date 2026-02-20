// 홈 페이지 (서버 컴포넌트)
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="todo-app">
      <h1>Next.js 할일 앱</h1>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Next.js의 세부 기능을 활용한 할일 관리 앱입니다.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link
          href="/todos"
          style={{
            display: 'inline-block',
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          할일 목록 보기
        </Link>
        <Link
          href="/completed"
          style={{
            display: 'inline-block',
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          완료된 할일
        </Link>
        <Link
          href="/stats"
          style={{
            display: 'inline-block',
            backgroundColor: '#ff9800',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          통계 보기
        </Link>
      </div>
    </div>
  );
}
