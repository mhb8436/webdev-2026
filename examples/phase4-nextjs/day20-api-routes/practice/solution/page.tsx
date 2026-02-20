// ============================================
// Day 20 연습문제 정답 - 프론트엔드 페이지
// 방명록, 도서 검색, 메모장 CRUD를 하나의 페이지에서 연동
// ============================================
'use client';

import { useState, useEffect, FormEvent } from 'react';

// ============================================
// 타입 정의
// ============================================

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

interface SearchResult {
  query: string;
  count: number;
  results: Book[];
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 공통 스타일
// ============================================

const sectionStyle: React.CSSProperties = {
  marginBottom: '3rem',
  padding: '1.5rem',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#1a202c',
  borderBottom: '2px solid #3b82f6',
  paddingBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '0.9rem',
  width: '100%',
  boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: '80px',
  resize: 'vertical',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: '500',
};

const dangerButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#ef4444',
};

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#6b7280',
};

const cardStyle: React.CSSProperties = {
  padding: '1rem',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  marginBottom: '0.75rem',
  backgroundColor: '#f9fafb',
};

const errorStyle: React.CSSProperties = {
  color: '#ef4444',
  fontSize: '0.85rem',
  marginTop: '0.5rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  marginBottom: '0.25rem',
  color: '#374151',
};

// ============================================
// 연습문제 1: 방명록 컴포넌트
// ============================================

function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 방명록 목록 조회
  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook');
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error('방명록 조회 실패:', err);
    }
  };

  // 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    fetchEntries();
  }, []);

  // 방명록 작성
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || '작성에 실패했습니다');
        return;
      }

      // 성공 시 폼 초기화 및 목록 갱신
      setName('');
      setMessage('');
      fetchEntries();
    } catch (err) {
      setError('서버와의 통신에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>연습문제 1: 방명록</h2>

      {/* 방명록 작성 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={labelStyle}>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={labelStyle}>메시지</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            style={textareaStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? '작성 중...' : '방명록 작성'}
        </button>
      </form>

      {/* 방명록 목록 */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
        방명록 목록 ({entries.length}건)
      </h3>
      {entries.length === 0 ? (
        <p style={{ color: '#6b7280' }}>아직 작성된 방명록이 없습니다.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong style={{ color: '#1e40af' }}>{entry.name}</strong>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                {new Date(entry.createdAt).toLocaleString('ko-KR')}
              </span>
            </div>
            <p style={{ margin: 0, color: '#374151' }}>{entry.message}</p>
          </div>
        ))
      )}
    </section>
  );
}

// ============================================
// 연습문제 2: 도서 검색 컴포넌트
// ============================================

function SearchSection() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 검색 실행
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || '검색에 실패했습니다');
        return;
      }

      const data: SearchResult = await response.json();
      setResult(data);
    } catch (err) {
      setError('서버와의 통신에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>연습문제 2: 도서 검색</h2>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="도서 제목 또는 저자를 검색하세요 (예: javascript, 마틴)"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </div>
        {error && <p style={errorStyle}>{error}</p>}
      </form>

      {/* 검색 결과 */}
      {result && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
            &quot;{result.query}&quot; 검색 결과: {result.count}건
          </h3>
          {result.results.length === 0 ? (
            <p style={{ color: '#6b7280' }}>검색 결과가 없습니다.</p>
          ) : (
            result.results.map((book) => (
              <div key={book.id} style={cardStyle}>
                <div style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.25rem' }}>
                  {book.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  저자: {book.author} | 출판연도: {book.year}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

// ============================================
// 연습문제 3: 메모장 CRUD 컴포넌트
// ============================================

function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 메모 목록 조회
  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error('메모 조회 실패:', err);
    }
  };

  // 컴포넌트 마운트 시 목록 조회
  useEffect(() => {
    fetchNotes();
  }, []);

  // 메모 추가 또는 수정
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingId) {
        // 수정 모드: PUT 요청
        const response = await fetch(`/api/notes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || '수정에 실패했습니다');
          return;
        }
      } else {
        // 추가 모드: POST 요청
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || '추가에 실패했습니다');
          return;
        }
      }

      // 성공 시 폼 초기화 및 목록 갱신
      resetForm();
      fetchNotes();
    } catch (err) {
      setError('서버와의 통신에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 메모 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 메모를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || '삭제에 실패했습니다');
        return;
      }

      // 수정 중이던 메모가 삭제된 경우 폼 초기화
      if (editingId === id) {
        resetForm();
      }

      fetchNotes();
    } catch (err) {
      alert('서버와의 통신에 실패했습니다');
    }
  };

  // 수정 모드 시작
  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setError('');
  };

  // 폼 초기화
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>연습문제 3: 메모장 CRUD</h2>

      {/* 메모 작성/수정 폼 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={labelStyle}>
            제목 <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="메모 제목을 입력하세요"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={labelStyle}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메모 내용을 입력하세요"
            style={textareaStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading
              ? editingId
                ? '수정 중...'
                : '추가 중...'
              : editingId
                ? '메모 수정'
                : '메모 추가'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={secondaryButtonStyle}>
              취소
            </button>
          )}
        </div>
      </form>

      {/* 메모 목록 */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
        메모 목록 ({notes.length}건)
      </h3>
      {notes.length === 0 ? (
        <p style={{ color: '#6b7280' }}>아직 작성된 메모가 없습니다.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              ...cardStyle,
              borderLeft: editingId === note.id ? '3px solid #3b82f6' : '3px solid transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>
                  {note.title}
                </h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#374151', whiteSpace: 'pre-wrap' }}>
                  {note.content || '(내용 없음)'}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  작성: {new Date(note.createdAt).toLocaleString('ko-KR')}
                  {note.createdAt !== note.updatedAt && (
                    <span> | 수정: {new Date(note.updatedAt).toLocaleString('ko-KR')}</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', flexShrink: 0 }}>
                <button
                  onClick={() => startEdit(note)}
                  style={{ ...buttonStyle, fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  style={{ ...dangerButtonStyle, fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

// ============================================
// 메인 페이지 컴포넌트
// ============================================

export default function PracticeSolutionPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0f172a' }}>
        Day 20 연습문제 정답
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        API Route로 백엔드 만들기 - 방명록, 도서 검색, 메모장 CRUD
      </p>

      <GuestbookSection />
      <SearchSection />
      <NotesSection />
    </div>
  );
}
