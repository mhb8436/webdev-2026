// ============================================
// Day 13 - 커스텀 훅 만들기 (풀이)
// ============================================

import { useState, useEffect, useCallback } from 'react';

// --- 1. useLocalStorage ---
function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// --- 2. useDebounce ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// --- 3. useFetch ---
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// --- 4. useToggle ---
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// --- 5. useCounter ---
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  return {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
    reset: () => setCount(initialValue),
  };
}

// --- 6. 데모 컴포넌트 ---
export default function CustomHooksDemo() {
  // useLocalStorage
  const [name, setName] = useLocalStorage('userName', '');

  // useDebounce
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // useToggle
  const [isDark, toggleDark] = useToggle(false);

  // useCounter
  const counter = useCounter(0);

  // useFetch
  const { data, loading, error } = useFetch<{ title: string }>(
    'https://jsonplaceholder.typicode.com/todos/1'
  );

  return (
    <div style={{
      maxWidth: 500, margin: '0 auto', padding: 20,
      background: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
    }}>
      <h1>커스텀 훅 데모</h1>

      {/* useLocalStorage */}
      <section>
        <h3>useLocalStorage</h3>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름 (새로고침해도 유지됨)"
          style={{ padding: 8, width: '100%' }}
        />
        <p>저장된 이름: {name || '(없음)'}</p>
      </section>

      <hr />

      {/* useDebounce */}
      <section>
        <h3>useDebounce</h3>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="검색어..."
          style={{ padding: 8, width: '100%' }}
        />
        <p>디바운스 결과: "{debouncedSearch}"</p>
      </section>

      <hr />

      {/* useToggle */}
      <section>
        <h3>useToggle</h3>
        <button onClick={toggleDark}>
          {isDark ? '라이트 모드' : '다크 모드'}
        </button>
      </section>

      <hr />

      {/* useCounter */}
      <section>
        <h3>useCounter: {counter.count}</h3>
        <button onClick={counter.decrement}>-</button>
        <button onClick={counter.increment}>+</button>
        <button onClick={counter.reset}>리셋</button>
      </section>

      <hr />

      {/* useFetch */}
      <section>
        <h3>useFetch</h3>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: 'red' }}>에러: {error}</p>}
        {data && <p>가져온 데이터: {data.title}</p>}
      </section>
    </div>
  );
}
