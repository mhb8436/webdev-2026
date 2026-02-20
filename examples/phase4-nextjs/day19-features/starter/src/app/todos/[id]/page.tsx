import { getTodoById } from '@/lib/todos';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// TODO: 동적 메타데이터
// params에서 id를 가져와서 할일 제목을 메타데이터로 설정하세요
// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   // TODO: getTodoById로 할일 조회
//   // TODO: 할일이 있으면 제목을, 없으면 기본 메시지를 반환
// }

export default async function TodoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: params에서 id 가져와서 할일 조회
  // const todo = getTodoById(params.id);

  // TODO: 할일이 없으면 notFound() 호출
  // if (!todo) { notFound(); }

  // TODO: 할일 상세 정보 렌더링
  // 힌트: todo-detail 클래스를 사용하세요
  // 제목, 상태(완료/미완료), 생성일, 목록으로 돌아가기 링크
  return (
    <div className="todo-detail">
      {/* TODO: 할일 상세 정보 */}
    </div>
  );
}
