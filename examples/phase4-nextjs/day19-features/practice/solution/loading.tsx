// ============================================
// 연습문제 2 풀이: 스켈레톤 로딩 UI (loading.tsx)
// ============================================

// loading.tsx는 같은 폴더(또는 상위 폴더)의 page.tsx가 로딩 중일 때 표시됩니다.
// Next.js의 React Suspense를 자동으로 활용합니다.
// 실제 콘텐츠와 비슷한 형태로 스켈레톤을 만들면 사용자 경험이 좋아집니다.

export default function Loading() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
      {/* CSS 애니메이션 정의 */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .skeleton {
            animation: pulse 1.5s ease-in-out infinite;
            background-color: #e0e0e0;
            border-radius: 4px;
          }
        `}
      </style>

      {/* 제목 스켈레톤 */}
      <div
        className="skeleton"
        style={{ width: "60%", height: "36px", marginBottom: "12px" }}
      />

      {/* 메타 정보 스켈레톤 (날짜, 작성자) */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <div
          className="skeleton"
          style={{ width: "80px", height: "16px" }}
        />
        <div
          className="skeleton"
          style={{ width: "100px", height: "16px" }}
        />
      </div>

      {/* 이미지 스켈레톤 */}
      <div
        className="skeleton"
        style={{
          width: "100%",
          height: "200px",
          marginBottom: "24px",
          borderRadius: "8px",
        }}
      />

      {/* 본문 줄 스켈레톤 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="skeleton" style={{ width: "100%", height: "16px" }} />
        <div className="skeleton" style={{ width: "95%", height: "16px" }} />
        <div className="skeleton" style={{ width: "88%", height: "16px" }} />
        <div className="skeleton" style={{ width: "92%", height: "16px" }} />
        <div className="skeleton" style={{ width: "70%", height: "16px" }} />
      </div>

      {/* 좋아요 버튼 스켈레톤 */}
      <div style={{ marginTop: "24px" }}>
        <div
          className="skeleton"
          style={{ width: "100px", height: "36px", borderRadius: "18px" }}
        />
      </div>
    </div>
  );
}
