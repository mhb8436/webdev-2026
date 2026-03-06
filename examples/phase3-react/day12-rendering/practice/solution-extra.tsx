// ============================================
// Day 12 - 렌더링 최적화 연습문제 (풀이)
// ============================================

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// --- 연습 1: 정렬 가능한 테이블 ---
interface Student {
  id: number;
  name: string;
  score: number;
  grade: number;
}

const STUDENTS: Student[] = [
  { id: 1, name: '홍길동', score: 85, grade: 3 },
  { id: 2, name: '김철수', score: 92, grade: 1 },
  { id: 3, name: '이영희', score: 78, grade: 2 },
  { id: 4, name: '박민수', score: 95, grade: 3 },
  { id: 5, name: '최지우', score: 88, grade: 1 },
  { id: 6, name: '정하나', score: 72, grade: 2 },
  { id: 7, name: '강현우', score: 91, grade: 3 },
  { id: 8, name: '윤서연', score: 83, grade: 1 },
];

type SortKey = keyof Student;
type SortDir = 'asc' | 'desc';

function SortableTable() {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const sorted = useMemo(() => {
    return [...STUDENTS].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = typeof aVal === 'string'
        ? aVal.localeCompare(bVal as string)
        : (aVal as number) - (bVal as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div>
      <h2>정렬 가능한 테이블</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {(['name', 'score', 'grade'] as SortKey[]).map(key => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                style={{
                  padding: 8, borderBottom: '2px solid #333',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                {key === 'name' ? '이름' : key === 'score' ? '점수' : '학년'}
                {arrow(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(s => (
            <tr key={s.id}>
              <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.name}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.score}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.grade}학년</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- 연습 2: 무한 스크롤 ---
function InfiniteList() {
  const [items, setItems] = useState<string[]>(() =>
    Array.from({ length: 20 }, (_, i) => `항목 ${i + 1}`)
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(prev => {
        const start = prev.length;
        const newItems = Array.from({ length: 20 }, (_, i) => `항목 ${start + i + 1}`);
        return [...prev, ...newItems];
      });
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, loadMore]);

  return (
    <div>
      <h2>무한 스크롤 ({items.length}개)</h2>
      <div style={{ height: 300, overflow: 'auto', border: '1px solid #ddd', borderRadius: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>
            {item}
          </div>
        ))}
        <div ref={observerRef} style={{ padding: 12, textAlign: 'center', color: '#888' }}>
          {loading ? '로딩 중...' : '더 보기'}
        </div>
      </div>
    </div>
  );
}

// --- 연습 3: 디바운스 검색 ---
const SEARCH_DATA = [
  'JavaScript 기초', 'TypeScript 타입 시스템', 'React 컴포넌트',
  'useState 훅', 'useEffect 사이드 이펙트', 'React Router 라우팅',
  'Express 미들웨어', 'Node.js 모듈', 'PostgreSQL 쿼리',
  'Prisma ORM', 'REST API 설계', 'JWT 인증',
];

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return SEARCH_DATA.filter(item =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  // 검색어 하이라이트
  const highlight = (text: string) => {
    if (!debouncedQuery) return text;
    const regex = new RegExp(`(${debouncedQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ backgroundColor: '#ffeaa7' }}>{part}</mark>
        : part
    );
  };

  return (
    <div>
      <h2>디바운스 검색</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{ width: '100%', padding: 8, fontSize: 16 }}
      />
      {searching && <p style={{ color: '#888' }}>검색 중...</p>}
      {!searching && debouncedQuery && (
        <p style={{ color: '#888' }}>{results.length}개 결과</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((item, i) => (
          <li key={i} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
            {highlight(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- 데모 ---
export default function Day12Practice() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Day 12 연습문제 풀이</h1>
      <SortableTable />
      <hr />
      <InfiniteList />
      <hr />
      <DebouncedSearch />
    </div>
  );
}
