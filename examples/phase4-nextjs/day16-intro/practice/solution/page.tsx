// ============================================
// 연습문제 1 풀이: 포트폴리오 첫 페이지
// ============================================

// 이 컴포넌트는 서버 컴포넌트입니다 (기본값).
// useState, onClick 등을 사용하지 않으므로 'use client'가 필요 없습니다.

import Counter from "./Counter";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "CSS / Tailwind CSS",
];

export default function Home() {
  return (
    <div>
      {/* 연습문제 1: 포트폴리오 */}
      <section style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>홍길동</h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          프론트엔드 개발자를 꿈꾸는 학생입니다.
        </p>

        <h2 style={{ marginTop: "24px" }}>기술 스택</h2>
        <ul style={{ lineHeight: "2" }}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* 연습문제 2: 카운터 (클라이언트 컴포넌트) */}
      <section style={{ marginBottom: "48px" }}>
        <h2>카운터 데모</h2>
        <Counter />
      </section>

      {/* 연습문제 3: 레이아웃 확인 */}
      <section>
        <h2>환영합니다!</h2>
        <p>이곳은 나의 포트폴리오입니다.</p>
        <p style={{ color: "#999", fontSize: "14px" }}>
          위의 헤더와 아래의 푸터는 layout.tsx에서 렌더링됩니다.
        </p>
      </section>
    </div>
  );
}
