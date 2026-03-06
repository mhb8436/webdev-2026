// ============================================
// Day 10 - 리스트 렌더링과 조건부 렌더링 (풀이)
// ============================================

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
}

// 역할별 배지
function RoleBadge({ role }: { role: User['role'] }) {
  const colors = { admin: '#e74c3c', user: '#3498db', guest: '#95a5a6' };
  const labels = { admin: '관리자', user: '일반', guest: '게스트' };

  return (
    <span style={{
      background: colors[role],
      color: 'white',
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 12,
    }}>
      {labels[role]}
    </span>
  );
}

// 사용자 카드
function UserCard({ user }: { user: User }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      border: '1px solid #ddd',
      borderRadius: 8,
      borderLeft: `4px solid ${user.isActive ? '#2ecc71' : '#e74c3c'}`,
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: user.isActive ? '#2ecc71' : '#e74c3c',
      }} />
      <span style={{ flex: 1 }}>
        {user.role === 'admin' && '* '}
        {user.name}
      </span>
      <RoleBadge role={user.role} />
      <span style={{ fontSize: 12, color: '#999' }}>
        {user.isActive ? '활성' : '비활성'}
      </span>
    </div>
  );
}

interface Props {
  users?: User[];
}

export default function UserList({ users = sampleUsers }: Props) {
  if (users.length === 0) {
    return <p style={{ color: '#999', textAlign: 'center' }}>사용자가 없습니다</p>;
  }

  const activeCount = users.filter(u => u.isActive).length;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>사용자 목록</h2>
      <p>전체: {users.length}명 | 활성: {activeCount}명</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

const sampleUsers: User[] = [
  { id: 1, name: '김개발', role: 'admin', isActive: true },
  { id: 2, name: '이영희', role: 'user', isActive: true },
  { id: 3, name: '박민수', role: 'user', isActive: false },
  { id: 4, name: '최지우', role: 'guest', isActive: true },
];
