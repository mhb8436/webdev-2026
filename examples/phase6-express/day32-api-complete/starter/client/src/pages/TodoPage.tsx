import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// TODO: useAuth import
// import { useAuth } from '../context/AuthContext';
// TODO: 할일 API 함수 import
// import { fetchTodos, createTodo, updateTodo, deleteTodo, Todo } from '../api/todos';

// TODO: 할일 타입 (api/todos.ts에서 가져오거나 여기서 정의)
interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// TODO: 할일 관리 페이지 컴포넌트 구현
function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // TODO: useAuth에서 token, user, logout 가져오기
  // const { token, user, logout, isAuthenticated } = useAuth();

  // TODO: 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/login');
  // }, [isAuthenticated, navigate]);

  // TODO: 할일 목록 로드
  // useEffect(() => {
  //   if (token) loadTodos();
  // }, [token]);

  // TODO: 서버에서 할일 목록을 가져오는 함수
  const loadTodos = async () => {
    // try {
    //   setLoading(true);
    //   const data = await fetchTodos(token!);
    //   setTodos(data);
    // } catch (err) { ... }
    setLoading(false);
  };

  // TODO: 새 할일 추가 핸들러
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // TODO: createTodo API 호출 후 목록 업데이트
    setError('할일 추가 기능을 구현해주세요');
  };

  // TODO: 할일 완료 상태 토글 핸들러
  const handleToggle = async (todo: Todo) => {
    // TODO: updateTodo API 호출 후 목록 업데이트
    setError('할일 수정 기능을 구현해주세요');
  };

  // TODO: 할일 삭제 핸들러
  const handleDelete = async (id: number) => {
    // TODO: deleteTodo API 호출 후 목록 업데이트
    setError('할일 삭제 기능을 구현해주세요');
  };

  // TODO: 로그아웃 핸들러
  const handleLogout = () => {
    // logout();
    // navigate('/login');
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        {/* 헤더 영역 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0 }}>내 할일 목록</h1>
          <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ff5722', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            로그아웃
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* 할일 추가 폼 */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="새로운 할일을 입력하세요"
            style={{ flex: 1, padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            추가
          </button>
        </form>

        {/* 할일 목록 */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#999' }}>로딩 중...</p>
        ) : todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>
            할일이 없습니다. 새로운 할일을 추가해보세요!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggle(todo)}
                  />
                  <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : '#333' }}>
                    {todo.title}
                  </span>
                </div>
                <button onClick={() => handleDelete(todo.id)} style={{ padding: '0.3rem 0.6rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
