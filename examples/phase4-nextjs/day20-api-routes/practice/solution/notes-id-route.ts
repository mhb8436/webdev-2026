// ============================================
// 연습문제 3 정답: 메모장 개별 API Route (조회/수정/삭제)
// 파일 위치: app/api/notes/[id]/route.ts
// ============================================
// 참고: 실제 프로젝트에서는 notes-route.ts의 데이터 저장소 함수들을
//       별도의 lib/notes.ts로 분리하여 import해야 합니다.
//       여기서는 연습문제 정답으로 독립적인 파일로 작성합니다.

import { NextRequest, NextResponse } from 'next/server';
import { getNoteById, updateNote, deleteNote } from './notes-route';

// GET /api/notes/:id - 특정 메모 조회
// URL 파라미터의 id를 사용하여 특정 메모를 조회합니다
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const note = getNoteById(params.id);

  // 메모가 없으면 404 응답
  if (!note) {
    return NextResponse.json(
      { error: '메모를 찾을 수 없습니다' },
      { status: 404 }
    );
  }

  // 메모 데이터 반환
  return NextResponse.json(note);
}

// PUT /api/notes/:id - 메모 수정
// 요청 body의 title, content 필드를 사용하여 메모를 수정합니다
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 요청 body 파싱
    const body = await request.json();
    const { title, content } = body;

    // 수정할 내용이 없으면 400 에러
    if (title === undefined && content === undefined) {
      return NextResponse.json(
        { error: '수정할 내용이 없습니다 (title 또는 content 필드 필요)' },
        { status: 400 }
      );
    }

    // title이 빈 문자열이면 400 에러
    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return NextResponse.json(
        { error: '제목은 빈 문자열일 수 없습니다' },
        { status: 400 }
      );
    }

    // 메모 수정
    const updatedNote = updateNote(params.id, { title, content });

    // 메모가 없으면 404 응답
    if (!updatedNote) {
      return NextResponse.json(
        { error: '메모를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 수정된 메모 데이터 반환
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json(
      { error: '잘못된 요청입니다' },
      { status: 400 }
    );
  }
}

// DELETE /api/notes/:id - 메모 삭제
// URL 파라미터의 id를 사용하여 메모를 삭제합니다
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 메모 삭제 시도
  const deleted = deleteNote(params.id);

  // 삭제할 메모가 없으면 404 응답
  if (!deleted) {
    return NextResponse.json(
      { error: '메모를 찾을 수 없습니다' },
      { status: 404 }
    );
  }

  // 삭제 성공 메시지 반환
  return NextResponse.json({ message: '메모가 삭제되었습니다' });
}
