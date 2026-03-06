// ============================================
// Day 09 - Props로 데이터 전달하기 (풀이)
// ============================================

interface ProfileProps {
  name: string;
  role: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

// 래퍼 Card 컴포넌트 (children 활용)
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <h3 style={{ margin: '0 0 8px', color: '#333' }}>{title}</h3>
      {children}
    </div>
  );
}

// 프로필 카드 컴포넌트
function ProfileCard({ name, role, email, isOnline = false }: ProfileProps) {
  return (
    <Card title={name}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* 온라인 상태 점 */}
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: isOnline ? '#2ecc71' : '#ccc',
        }} />
        <span style={{ color: '#666' }}>{isOnline ? '온라인' : '오프라인'}</span>
      </div>
      <p style={{ margin: '8px 0 4px', color: '#555' }}>역할: {role}</p>
      <p style={{ margin: 0, color: '#3498db' }}>{email}</p>
    </Card>
  );
}

// 메인 컴포넌트
const profiles: ProfileProps[] = [
  { name: '김개발', role: '프론트엔드 개발자', email: 'kim@dev.com', isOnline: true },
  { name: '이영희', role: '백엔드 개발자', email: 'lee@dev.com', isOnline: true },
  { name: '박민수', role: 'UI 디자이너', email: 'park@dev.com', isOnline: false },
  { name: '최지우', role: '풀스택 개발자', email: 'choi@dev.com', isOnline: true },
];

export default function Profile() {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>팀원 프로필</h1>
      <p>온라인: {profiles.filter(p => p.isOnline).length}명 / {profiles.length}명</p>
      {profiles.map(profile => (
        <ProfileCard key={profile.email} {...profile} />
      ))}
    </div>
  );
}
