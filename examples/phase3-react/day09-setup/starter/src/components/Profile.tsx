// ============================================
// Day 09 - Props로 데이터 전달하기
// ============================================
// 학습목표: 컴포넌트 Props, 타입 정의, children

// TODO 1: ProfileCard 컴포넌트의 Props 타입 정의
// interface ProfileProps {
//   name: string;
//   role: string;
//   email: string;
//   avatar?: string;   // 선택적
//   isOnline?: boolean;
// }

// TODO 2: ProfileCard 컴포넌트 구현
// function ProfileCard({ name, role, email, isOnline = false }: ProfileProps)
// - 이름, 역할, 이메일 표시
// - isOnline이면 초록 점, 아니면 회색 점 표시

// TODO 3: ProfileList 컴포넌트
// 여러 ProfileCard를 렌더링
// const profiles: ProfileProps[] = [...]
// profiles.map으로 렌더링 (key 필수!)

// TODO 4: children을 받는 Card 래퍼 컴포넌트
// interface CardProps { title: string; children: React.ReactNode; }
// function Card({ title, children }: CardProps)

export default function Profile() {
  return <div>TODO: 구현하세요</div>;
}
