import { NextRequest, NextResponse } from 'next/server';
import { getTodos, addTodo } from '@/lib/todos';

// TODO: GET - 모든 할일 조회
// NextResponse.json()을 사용하여 할일 목록을 반환하세요
export async function GET() {
  // TODO: getTodos()로 데이터 가져오기
  // TODO: NextResponse.json()으로 응답 반환
}

// TODO: POST - 새 할일 추가
// request.json()으로 body를 파싱하고, addTodo()로 추가하세요
export async function POST(request: NextRequest) {
  // TODO: request.json()으로 body 파싱
  // TODO: title 필드 유효성 검사 (비어있으면 400 에러)
  // TODO: addTodo()로 새 할일 추가
  // TODO: 201 상태 코드로 생성된 할일 응답
}
