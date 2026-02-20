// ============================================
// 연습문제 1 풀이: 동적 메타데이터 (/blog/[slug]/page.tsx)
// ============================================
// 실제 프로젝트에서는 app/blog/[slug]/page.tsx 경로에 위치해야 합니다.

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// 블로그 글 데이터 (실제로는 DB나 CMS에서 가져옴)
const posts = [
  {
    slug: "nextjs-intro",
    title: "Next.js 입문 가이드",
    content:
      "Next.js는 React 기반의 풀스택 프레임워크입니다. App Router를 사용하면 파일 시스템 기반 라우팅, 서버 컴포넌트, 스트리밍 등 다양한 기능을 활용할 수 있습니다.",
    date: "2025-04-23",
    author: "김개발",
  },
  {
    slug: "react-hooks",
    title: "React Hooks 완벽 정리",
    content:
      "useState, useEffect, useRef, useMemo, useCallback 등 React의 핵심 Hooks를 정리합니다. 각 Hook의 용도와 사용 시 주의점을 알아봅니다.",
    date: "2025-04-22",
    author: "이리액트",
  },
  {
    slug: "typescript-tips",
    title: "TypeScript 실전 팁",
    content:
      "타입 가드, 제네릭 활용법, 유틸리티 타입 등 실무에서 바로 쓸 수 있는 TypeScript 팁을 소개합니다.",
    date: "2025-04-21",
    author: "박타입",
  },
];

// generateMetadata: 동적으로 메타데이터를 생성하는 함수
// Next.js가 이 함수를 호출하여 <head>에 메타데이터를 삽입합니다.
// params에서 slug를 받아 해당 글의 제목을 title로 설정합니다.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "페이지를 찾을 수 없습니다",
    };
  }

  return {
    title: `${post.title} | 내 블로그`,
    description: post.content.slice(0, 100),
  };
}

// 페이지 컴포넌트
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  // 글이 없으면 notFound() 호출 -> not-found.tsx 렌더링
  if (!post) {
    notFound();
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <article>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>{post.title}</h1>
        <div style={{ color: "#999", fontSize: "14px", marginBottom: "24px" }}>
          <span>{post.date}</span>
          <span style={{ marginLeft: "16px" }}>작성자: {post.author}</span>
        </div>
        <div
          style={{
            lineHeight: "1.8",
            fontSize: "16px",
            color: "#333",
          }}
        >
          {post.content}
        </div>
      </article>

      <div style={{ marginTop: "32px" }}>
        <Link href="/blog" style={{ color: "#0070f3" }}>
          &larr; 블로그 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
