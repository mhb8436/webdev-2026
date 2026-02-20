// ============================================
// 연습문제 1 정답: 방명록 API Route
// 파일 위치: app/api/guestbook/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server';

// 방명록 항목 타입 정의
interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

// 메모리 저장소 (서버가 재시작되면 초기화됨)
let entries: GuestbookEntry[] = [
  {
    id: 1,
    name: '관리자',
    message: '방명록에 오신 것을 환영합니다!',
    createdAt: '2025-04-29T09:00:00.000Z',
  },
  {
    id: 2,
    name: '홍길동',
    message: '좋은 사이트네요! 자주 방문하겠습니다.',
    createdAt: '2025-04-29T10:30:00.000Z',
  },
];

// 다음 ID를 위한 카운터
let nextId = 3;

// GET /api/guestbook - 전체 방명록 목록 조회
// 메모리 배열에 저장된 모든 방명록 항목을 최신순으로 반환합니다
export async function GET() {
  // 최신 항목이 위에 오도록 역순 정렬
  const sorted = [...entries].reverse();
  return NextResponse.json(sorted);
}

// POST /api/guestbook - 새 방명록 항목 추가
// 요청 body에서 name과 message를 파싱하여 새 항목을 생성합니다
export async function POST(request: NextRequest) {
  try {
    // 요청 body 파싱
    const body = await request.json();
    const { name, message } = body;

    // 유효성 검사: name과 message 모두 필수
    if (
      !name ||
      typeof name !== 'string' ||
      name.trim().length === 0 ||
      !message ||
      typeof message !== 'string' ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: '이름과 메시지는 필수입니다' },
        { status: 400 }
      );
    }

    // 새 방명록 항목 생성
    const newEntry: GuestbookEntry = {
      id: nextId++,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // 메모리 배열에 추가
    entries.push(newEntry);

    // 201 Created 상태로 생성된 항목 반환
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    // JSON 파싱 실패 등의 에러 처리
    return NextResponse.json(
      { error: '잘못된 요청입니다' },
      { status: 400 }
    );
  }
}

// ============================================
// 연습문제 2 정답: 검색 API Route
// 파일 위치: app/api/search/route.ts
// ============================================

/*
import { NextRequest, NextResponse } from 'next/server';

// 하드코딩된 도서 데이터
const books = [
  { id: 1, title: "JavaScript 완벽 가이드", author: "데이비드 플래너건", year: 2020 },
  { id: 2, title: "리액트를 다루는 기술", author: "김민준", year: 2019 },
  { id: 3, title: "모던 JavaScript 튜토리얼", author: "일리아 칸토르", year: 2021 },
  { id: 4, title: "TypeScript 프로그래밍", author: "보리스 체르니", year: 2020 },
  { id: 5, title: "Next.js 실전 프로젝트", author: "이정환", year: 2023 },
  { id: 6, title: "Node.js 디자인 패턴", author: "마리오 카시아로", year: 2022 },
  { id: 7, title: "클린 코드", author: "로버트 마틴", year: 2013 },
  { id: 8, title: "리팩터링 2판", author: "마틴 파울러", year: 2020 },
];

// GET /api/search?q=키워드 - 도서 검색
// 쿼리 파라미터 q에 해당하는 키워드로 도서를 검색합니다
export async function GET(request: NextRequest) {
  // 쿼리 파라미터에서 검색어 추출
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  // 검색어가 없으면 400 에러
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: '검색어(q)는 필수입니다' },
      { status: 400 }
    );
  }

  // 대소문자 구분 없이 검색
  const keyword = query.toLowerCase();
  const results = books.filter(
    (book) =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword)
  );

  // 검색 결과와 개수 반환
  return NextResponse.json({
    query: query,
    count: results.length,
    results: results,
  });
}
*/
