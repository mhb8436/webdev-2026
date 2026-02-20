// ============================================
// Day 20 연습문제 - API Route로 백엔드 만들기
// ============================================

// 연습문제 1: 방명록 API
// - /api/guestbook 경로에 route.ts를 만드세요.
// - GET: 전체 방명록 목록 반환
// - POST: 새 방명록 항목 추가 (name, message 필수)
// - 메모리 배열에 데이터 저장
// - NextRequest, NextResponse 사용
// - 프론트에서 fetch로 목록 조회 및 작성 연동
// TODO: /api/guestbook/route.ts를 만드세요

// ============================================

// 연습문제 2: 검색 API
// - /api/search 경로에 route.ts를 만드세요.
// - GET /api/search?q=키워드 형태로 검색
// - 하드코딩된 도서 목록에서 제목/저자로 검색
// - 쿼리 파라미터 q가 없으면 400 에러 반환
// - 검색 결과 개수(count)도 응답에 포함
// - request.nextUrl.searchParams.get('q') 사용
// TODO: /api/search/route.ts를 만드세요

// ============================================

// 연습문제 3: RESTful 메모장 API
// - /api/notes 경로에 route.ts를 만드세요 (GET 목록, POST 추가)
// - /api/notes/[id] 경로에 route.ts를 만드세요 (GET 조회, PUT 수정, DELETE 삭제)
// - 각 메모: id, title, content, createdAt, updatedAt
// - 적절한 HTTP 상태코드 사용 (200, 201, 400, 404)
// TODO: /api/notes/route.ts와 /api/notes/[id]/route.ts를 만드세요

// ============================================

export default function PracticePage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Day 20 연습문제</h1>
      <p>README.md의 지시사항을 따라 API Route를 만들고, 이 페이지에서 연동하세요.</p>

      <hr style={{ margin: '2rem 0' }} />

      {/* 연습문제 1: 방명록 */}
      <section>
        <h2>연습문제 1: 방명록</h2>
        <p>TODO: 방명록 작성 폼과 목록을 구현하세요.</p>
        {/*
          - 이름, 메시지 입력 폼
          - fetch POST /api/guestbook으로 작성
          - fetch GET /api/guestbook으로 목록 조회
          - 방명록 목록 표시
        */}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      {/* 연습문제 2: 도서 검색 */}
      <section>
        <h2>연습문제 2: 도서 검색</h2>
        <p>TODO: 검색어 입력 폼과 검색 결과를 구현하세요.</p>
        {/*
          - 검색어 입력 폼
          - fetch GET /api/search?q=키워드로 검색
          - 검색 결과 개수와 목록 표시
        */}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      {/* 연습문제 3: 메모장 CRUD */}
      <section>
        <h2>연습문제 3: 메모장</h2>
        <p>TODO: 메모 작성/조회/수정/삭제 UI를 구현하세요.</p>
        {/*
          - 제목, 내용 입력 폼 (추가/수정)
          - fetch GET /api/notes로 목록 조회
          - fetch POST /api/notes로 추가
          - fetch PUT /api/notes/[id]로 수정
          - fetch DELETE /api/notes/[id]로 삭제
          - 메모 목록에서 선택하여 수정/삭제
        */}
      </section>
    </div>
  );
}
