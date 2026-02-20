// Day 13 연습문제 정답 - useEffect, localStorage, useRef

import { useState, useEffect, useRef } from 'react';

// ============================================
// 문제 1: 메모장
// ============================================
function Notepad() {
  const [memo, setMemo] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // 마운트 시 localStorage에서 메모 불러오기
  useEffect(() => {
    const savedMemo = localStorage.getItem('notepad-memo');
    const savedTime = localStorage.getItem('notepad-time');
    if (savedMemo) {
      setMemo(savedMemo);
    }
    if (savedTime) {
      setLastSaved(savedTime);
    }
  }, []);

  // 메모가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (memo !== '') {
      localStorage.setItem('notepad-memo', memo);
      const now = new Date().toLocaleString('ko-KR');
      localStorage.setItem('notepad-time', now);
      setLastSaved(now);
    }
  }, [memo]);

  const handleClear = () => {
    setMemo('');
    setLastSaved(null);
    localStorage.removeItem('notepad-memo');
    localStorage.removeItem('notepad-time');
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 작성하세요..."
        style={{
          width: '100%',
          height: '200px',
          padding: '12px',
          fontSize: '14px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          resize: 'vertical',
          fontFamily: 'sans-serif',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <div style={{ fontSize: '13px', color: '#999' }}>
          <span>글자 수: {memo.length}자</span>
          {lastSaved && <span style={{ marginLeft: '16px' }}>마지막 저장: {lastSaved}</span>}
        </div>
        <button
          onClick={handleClear}
          style={{
            padding: '6px 16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}

// ============================================
// 문제 2: 스톱워치
// ============================================
function Stopwatch() {
  const [time, setTime] = useState(0); // 1/100초 단위
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const minutes = Math.floor(time / 6000) % 60;
  const seconds = Math.floor(time / 100) % 60;
  const centiseconds = time % 100;

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  const buttonStyle = (color: string, disabled = false): React.CSSProperties => ({
    padding: '10px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? '#bdc3c7' : color,
    color: 'white',
    margin: '0 4px',
    opacity: disabled ? 0.6 : 1,
  });

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px' }}>
      <div
        style={{
          fontSize: '64px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        {formatNum(minutes)}:{formatNum(seconds)}.{formatNum(centiseconds)}
      </div>

      <div>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={buttonStyle('#27ae60', isRunning)}
        >
          시작
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={buttonStyle('#e67e22', !isRunning)}
        >
          정지
        </button>
        <button onClick={handleReset} style={buttonStyle('#e74c3c')}>
          리셋
        </button>
      </div>

      <p style={{ marginTop: '12px', color: isRunning ? '#27ae60' : '#999', fontSize: '14px' }}>
        {isRunning ? '실행 중...' : '정지됨'}
      </p>
    </div>
  );
}

// ============================================
// 문제 3: 자동 검색 (디바운스)
// ============================================
const fruits = [
  '사과', '바나나', '딸기', '포도', '수박',
  '참외', '복숭아', '블루베리', '키위', '망고',
  '파인애플', '체리', '자두', '석류', '귤',
];

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFruits, setFilteredFruits] = useState(fruits);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 페이지 로드 시 자동 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 디바운스 검색
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredFruits(fruits);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const results = fruits.filter((fruit) => fruit.includes(searchTerm));
      setFilteredFruits(results);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="과일 이름을 검색하세요..."
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {isSearching && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              fontSize: '13px',
            }}
          >
            검색 중...
          </span>
        )}
      </div>

      <p style={{ color: '#666', fontSize: '14px', margin: '0 0 12px' }}>
        {searchTerm
          ? `"${searchTerm}" 검색 결과: ${filteredFruits.length}개`
          : `전체 ${filteredFruits.length}개`}
      </p>

      <div>
        {filteredFruits.length > 0 ? (
          filteredFruits.map((fruit, index) => (
            <div
              key={index}
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
              }}
            >
              {searchTerm ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: fruit.replace(
                      searchTerm,
                      `<strong style="color: #3498db">${searchTerm}</strong>`
                    ),
                  }}
                />
              ) : (
                fruit
              )}
            </div>
          ))
        ) : (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 13 연습문제 정답</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 메모장</h2>
        <Notepad />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 스톱워치</h2>
        <Stopwatch />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 자동 검색 (디바운스)</h2>
        <DebouncedSearch />
      </section>
    </div>
  );
}

export default App;
