// Day 09 연습문제 정답 - Vite, JSX, 첫 컴포넌트

// ============================================
// 문제 1: 프로필 카드
// ============================================
function ProfileCard() {
  const name = '홍길동';
  const job = '프론트엔드 개발자';
  const hobbies = ['코딩', '독서', '등산'];

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '300px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const avatarStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4a90d9',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
  };

  return (
    <div style={cardStyle}>
      <div style={avatarStyle}>{name[0]}</div>
      <h3 style={{ margin: '8px 0' }}>{name}</h3>
      <p style={{ color: '#666', margin: '4px 0 16px' }}>{job}</p>
      <div style={{ textAlign: 'left' }}>
        <strong>취미:</strong>
        <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
          {hobbies.map((hobby, index) => (
            <li key={index} style={{ margin: '4px 0' }}>
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 문제 2: 메뉴판
// ============================================
function MenuBoard() {
  const menuItems = [
    { id: 1, name: '김치찌개', price: 8000 },
    { id: 2, name: '한우 불고기', price: 15000 },
    { id: 3, name: '비빔밥', price: 9000 },
    { id: 4, name: '갈비탕', price: 12000 },
    { id: 5, name: '떡볶이', price: 5000 },
    { id: 6, name: '해물파전', price: 13000 },
  ];

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    marginLeft: '8px',
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: 0 }}>오늘의 메뉴</h3>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#ccc' }}>
          총 {menuItems.length}개 메뉴
        </p>
      </div>
      <div>
        {menuItems.map((item) => (
          <div key={item.id} style={itemStyle}>
            <span>
              {item.name}
              {item.price >= 10000 && <span style={badgeStyle}>인기</span>}
            </span>
            <span style={{ fontWeight: 'bold' }}>
              {item.price.toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 문제 3: 시간표
// ============================================
function Timetable() {
  const days = ['월', '화', '수', '목', '금'];
  const timetable = [
    ['국어', '수학', '영어', '과학', '체육'],
    ['수학', '국어', '사회', '영어', '음악'],
    ['영어', '과학', '국어', '수학', '-'],
    ['사회', '체육', '-', '미술', '국어'],
  ];

  const thStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px 16px',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px 16px',
    textAlign: 'center',
  };

  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>교시</th>
          {days.map((day) => (
            <th key={day} style={thStyle}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timetable.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ ...tdStyle, fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
              {rowIndex + 1}교시
            </td>
            {row.map((subject, colIndex) => (
              <td
                key={colIndex}
                style={{
                  ...tdStyle,
                  color: subject === '-' ? '#ccc' : '#333',
                }}
              >
                {subject}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 09 연습문제 정답</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 프로필 카드</h2>
        <ProfileCard />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 메뉴판</h2>
        <MenuBoard />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 시간표</h2>
        <Timetable />
      </section>
    </div>
  );
}

export default App;
