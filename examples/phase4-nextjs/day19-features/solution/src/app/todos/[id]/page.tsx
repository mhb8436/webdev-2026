import { getTodoById, getTodos } from '@/lib/todos';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

// 동적 메타데이터 - 각 할일의 제목을 페이지 메타데이터로 설정
// URL의 id 파라미터를 사용하여 해당 할일의 제목을 가져옵니다
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const todo = getTodoById(params.id);

  // 할일이 없으면 기본 메시지 반환
  if (!todo) {
    return {
      title: '할일을 찾을 수 없습니다',
    };
  }

  // 할일 제목을 메타데이터로 사용
  return {
    title: todo.title,
    description: `할일: ${todo.title} - ${todo.completed ? '완료됨' : '진행 중'}`,
  };
}

export default async function TodoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // params에서 id를 가져와서 할일 조회
  const todo = getTodoById(params.id);

  // 할일이 없으면 404 페이지 표시
  if (!todo) {
    notFound();
  }

  // 날짜 포맷팅
  const createdDate = new Date(todo.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="todo-detail">
      <Link href="/todos" className="back-link">
        &larr; 목록으로 돌아가기
      </Link>
      <h1 style={{ marginTop: '1rem' }}>{todo.title}</h1>
      <span className={`status ${todo.completed ? 'completed' : 'active'}`}>
        {todo.completed ? '완료됨' : '진행 중'}
      </span>
      <p className="created-at">생성일: {createdDate}</p>
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <p style={{ color: '#555' }}>
          <strong>할일 ID:</strong> {todo.id}
        </p>
      </div>
    </div>
  );
}
