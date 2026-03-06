// ============================================
// Day 10 - 리스트 렌더링과 조건부 렌더링
// ============================================
// 학습목표: map으로 리스트, key prop, 조건부 렌더링

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
}

// TODO 1: User 타입의 배열을 props로 받기
// interface Props { users: User[]; }

// TODO 2: map으로 사용자 카드 렌더링
// 각 카드에 key={user.id} 필수!

// TODO 3: 조건부 렌더링
// - isActive인 사용자만 초록색 표시
// - role이 'admin'이면 별표 표시
// - users가 비어있으면 "사용자가 없습니다" 표시

// TODO 4: 역할별 배지 컴포넌트
// function RoleBadge({ role }: { role: User['role'] })
// admin → 빨강, user → 파랑, guest → 회색

export default function UserList() {
  return <div>TODO: 구현하세요</div>;
}
