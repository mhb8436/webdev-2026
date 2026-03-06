// ============================================
// Day 13 - useEffect 심화 (풀이)
// ============================================

import { useState, useEffect } from 'react';

// --- 타이머 컴포넌트 ---
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 클린업: 컴포넌트 언마운트 또는 isRunning 변경 시
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div>
      <h3>타이머: {seconds}초</h3>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '정지' : '시작'}
      </button>
      <button onClick={() => setSeconds(0)}>리셋</button>
    </div>
  );
}

// --- 데이터 페칭 컴포넌트 ---
function DataFetcher() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // 언마운트 후 상태 업데이트 방지

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('데이터를 가져올 수 없습니다');
        const data = await res.json();
        if (!cancelled) {
          setUsers(data.slice(0, 5));
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; }; // 클린업
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: 'red' }}>에러: {error}</p>;

  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// --- 디바운스 검색 컴포넌트 ---
function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timerId); // 입력할 때마다 이전 타이머 취소
  }, [query]);

  return (
    <div>
      <h3>디바운스 검색</h3>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{ padding: 8, width: '100%' }}
      />
      <p>입력값: "{query}"</p>
      <p>디바운스 결과: "{debouncedQuery}" (300ms 후 반영)</p>
    </div>
  );
}

// --- 메인 데모 ---
export default function UseEffectDemo() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1>useEffect 심화</h1>

      {/* 마운트/언마운트 테스트 */}
      <button onClick={() => setShowTimer(!showTimer)}>
        타이머 {showTimer ? '숨기기' : '보이기'}
      </button>
      {showTimer && <Timer />}

      <hr />
      <DataFetcher />

      <hr />
      <DebouncedSearch />
    </div>
  );
}
