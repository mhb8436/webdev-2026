import { NextRequest, NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/lib/todos';

// GET /api/todos - 모든 할일 조회
// 서버의 메모리 저장소에서 전체 할일 목록을 가져와 JSON으로 반환합니다
export async function GET() {
  const todos = getTodos();
  return NextResponse.json(todos);
}

// POST /api/todos - 새 할일 추가
// 요청 body에서 title을 파싱하여 새로운 할일을 생성합니다
export async function POST(request: NextRequest) {
  try {
    // 요청 body 파싱
    const body = await request.json();
    const { title } = body;

    // title 유효성 검사
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: '할일 제목은 필수입니다' },
        { status: 400 }
      );
    }

    // 새 할일 추가
    const newTodo = addTodo(title.trim());

    // 201 Created 상태로 생성된 할일 반환
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    // JSON 파싱 실패 등의 에러 처리
    return NextResponse.json(
      { error: '잘못된 요청입니다' },
      { status: 400 }
    );
  }
}
