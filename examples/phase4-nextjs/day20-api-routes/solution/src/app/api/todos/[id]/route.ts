import { NextRequest, NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '@/lib/todos';

// GET /api/todos/:id - 단건 조회
// URL 파라미터의 id를 사용하여 특정 할일을 조회합니다
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = getTodoById(params.id);

  // 할일이 없으면 404 응답
  if (!todo) {
    return NextResponse.json(
      { error: '할일을 찾을 수 없습니다' },
      { status: 404 }
    );
  }

  // 할일 데이터 반환
  return NextResponse.json(todo);
}

// PUT /api/todos/:id - 수정
// 요청 body의 title, completed 필드를 사용하여 할일을 수정합니다
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 요청 body 파싱
    const body = await request.json();
    const { title, completed } = body;

    // 수정할 내용이 없으면 400 에러
    if (title === undefined && completed === undefined) {
      return NextResponse.json(
        { error: '수정할 내용이 없습니다 (title 또는 completed 필드 필요)' },
        { status: 400 }
      );
    }

    // 할일 수정
    const updatedTodo = updateTodo(params.id, { title, completed });

    // 할일이 없으면 404 응답
    if (!updatedTodo) {
      return NextResponse.json(
        { error: '할일을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 수정된 할일 데이터 반환
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: '잘못된 요청입니다' },
      { status: 400 }
    );
  }
}

// DELETE /api/todos/:id - 삭제
// URL 파라미터의 id를 사용하여 할일을 삭제합니다
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 할일 삭제 시도
  const deleted = deleteTodo(params.id);

  // 삭제할 할일이 없으면 404 응답
  if (!deleted) {
    return NextResponse.json(
      { error: '할일을 찾을 수 없습니다' },
      { status: 404 }
    );
  }

  // 삭제 성공 메시지 반환
  return NextResponse.json({ message: '할일이 삭제되었습니다' });
}
