// ============================================
// Day 19 연습문제 - metadata, loading, error, not-found
// ============================================

// 연습문제 1: 동적 메타데이터
// - /blog/[slug] 경로에 generateMetadata를 사용하세요.
// - 존재하지 않는 slug면 notFound()를 호출하세요.
// - not-found.tsx도 만드세요.
// TODO: blog/[slug]/page.tsx와 not-found.tsx를 만드세요

// ============================================

// 연습문제 2: 스켈레톤 로딩
// - loading.tsx에 스켈레톤 UI를 구현하세요.
// - CSS 애니메이션으로 깜빡이는 효과를 추가하세요.
// TODO: loading.tsx를 만드세요

// ============================================

// 연습문제 3: 에러 복구
// - error.tsx에서 에러를 표시하고 reset()으로 복구하세요.
// - 의도적으로 에러를 발생시키는 페이지를 만드세요.
// TODO: error.tsx와 에러 발생 페이지를 만드세요

export default function Home() {
  return (
    <div>
      <h1>연습문제를 풀어보세요!</h1>
      <p>README.md의 지시사항을 따라 metadata, loading, error 파일을 만드세요.</p>
    </div>
  );
}
