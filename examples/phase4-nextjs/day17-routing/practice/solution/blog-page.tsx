// ============================================
// 연습문제 2 풀이: 블로그 글 목록 (/blog/page.tsx)
// ============================================
// 실제 프로젝트에서는 app/blog/page.tsx 경로에 위치해야 합니다.

import Link from "next/link";

const posts = [
  { slug: "react-intro", title: "React 입문 가이드", date: "2025-04-20", category: "기술" },
  { slug: "nextjs-start", title: "Next.js 시작하기", date: "2025-04-18", category: "기술" },
  { slug: "css-tips", title: "CSS 꿀팁 모음", date: "2025-04-15", category: "기술" },
  { slug: "daily-routine", title: "개발자의 하루", date: "2025-04-10", category: "일상" },
];

export default function BlogPage() {
  return (
    <div>
      <h1>블로그</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map((post) => (
          <article
            key={post.slug}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2 style={{ margin: "0 0 8px 0" }}>{post.title}</h2>
              <div style={{ color: "#999", fontSize: "14px" }}>
                <span>{post.date}</span>
                <span style={{ marginLeft: "12px" }}>{post.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
