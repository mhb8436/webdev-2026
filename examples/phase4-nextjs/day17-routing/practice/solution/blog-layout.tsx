// ============================================
// 연습문제 2 풀이: 블로그 중첩 레이아웃 (/blog/layout.tsx)
// ============================================
// 실제 프로젝트에서는 app/blog/layout.tsx 경로에 위치해야 합니다.
// 이 레이아웃은 /blog 하위 페이지에만 적용됩니다.
// 루트 레이아웃의 헤더 아래에 이 레이아웃이 중첩됩니다.

const categories = [
  { name: "기술", count: 12 },
  { name: "일상", count: 8 },
  { name: "여행", count: 5 },
  { name: "독서", count: 3 },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      {/* 블로그 전용 사이드바 - /blog 하위 페이지에서만 표시됨 */}
      <aside
        style={{
          width: "200px",
          flexShrink: 0,
          padding: "16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          height: "fit-content",
        }}
      >
        <h3 style={{ marginTop: 0 }}>카테고리</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((cat) => (
            <li
              key={cat.name}
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {cat.name}{" "}
              <span style={{ color: "#999", fontSize: "14px" }}>
                ({cat.count})
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* children: /blog/page.tsx 또는 /blog/[slug]/page.tsx의 내용 */}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
