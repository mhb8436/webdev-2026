// ============================================
// 연습문제 3 정답: 메모장 CRUD API Route (목록/추가)
// 파일 위치: app/api/notes/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// 메모 타입 정의
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 메모리 저장소 (서버가 재시작되면 초기화됨)
// notes-id-route.ts와 공유하려면 별도의 lib 파일로 분리하는 것이 좋습니다
let notes: Note[] = [
  {
    id: '1',
    title: '회의록',
    content: '오늘 회의에서 논의된 내용: API 설계 방향 결정',
    createdAt: '2025-04-29T09:00:00.000Z',
    updatedAt: '2025-04-29T09:00:00.000Z',
  },
  {
    id: '2',
    title: '학습 메모',
    content: 'Next.js API Route는 app/api 폴더에 route.ts를 만들어 정의한다.',
    createdAt: '2025-04-29T10:00:00.000Z',
    updatedAt: '2025-04-29T10:00:00.000Z',
  },
];

// 다음 ID를 위한 카운터
let nextId = 3;

// 메모 저장소를 외부에서 접근할 수 있도록 export (notes-id-route.ts에서 사용)
// 실제 프로젝트에서는 별도의 lib 파일로 분리합니다
export function getNotes(): Note[] {
  return notes;
}

export function getNoteById(id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function addNote(title: string, content: string): Note {
  const now = new Date().toISOString();
  const newNote: Note = {
    id: String(nextId++),
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
  };
  notes.push(newNote);
  return newNote;
}

export function updateNote(
  id: string,
  updates: { title?: string; content?: string }
): Note | null {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;

  const note = notes[index];
  notes[index] = {
    ...note,
    ...(updates.title !== undefined && { title: updates.title.trim() }),
    ...(updates.content !== undefined && { content: updates.content.trim() }),
    updatedAt: new Date().toISOString(),
  };
  return notes[index];
}

export function deleteNote(id: string): boolean {
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return false;
  notes.splice(index, 1);
  return true;
}

// GET /api/notes - 전체 메모 목록 조회
// 메모리 배열에 저장된 모든 메모를 반환합니다
export async function GET() {
  const allNotes = getNotes();
  return NextResponse.json(allNotes);
}

// POST /api/notes - 새 메모 추가
// 요청 body에서 title과 content를 파싱하여 새 메모를 생성합니다
export async function POST(request: NextRequest) {
  try {
    // 요청 body 파싱
    const body = await request.json();
    const { title, content } = body;

    // title 유효성 검사 (필수)
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: '제목은 필수입니다' },
        { status: 400 }
      );
    }

    // 새 메모 추가 (content는 선택사항, 빈 문자열 허용)
    const newNote = addNote(title, content || '');

    // 201 Created 상태로 생성된 메모 반환
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    // JSON 파싱 실패 등의 에러 처리
    return NextResponse.json(
      { error: '잘못된 요청입니다' },
      { status: 400 }
    );
  }
}
