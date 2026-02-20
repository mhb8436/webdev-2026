import { NextRequest, NextResponse } from 'next/server';
import { getTodoById, updateTodo, deleteTodo } from '@/lib/todos';

// TODO: GET - 단건 조회
// params.id로 할일을 조회하고, 없으면 404 응답
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: getTodoById(params.id)로 조회
  // TODO: 없으면 404 응답 (NextResponse.json({ error: '...' }, { status: 404 }))
  // TODO: 있으면 할일 데이터 응답
}

// TODO: PUT - 수정
// request.json()으로 수정 내용을 받아서 updateTodo()로 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: request.json()으로 body 파싱
  // TODO: updateTodo(params.id, body)로 수정
  // TODO: 없으면 404 응답
  // TODO: 수정된 할일 데이터 응답
}

// TODO: DELETE - 삭제
// deleteTodo()로 삭제하고, 결과에 따라 응답
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO: deleteTodo(params.id)로 삭제
  // TODO: 삭제 실패하면 404 응답
  // TODO: 삭제 성공하면 메시지 응답
}
