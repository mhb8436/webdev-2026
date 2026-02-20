import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from '../api/todos';

// 할일 관리 페이지 컴포넌트
function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // 할일 목록 로드
  useEffect(() => {
    if (token) {
      loadTodos();
    }
  }, [token]);

  // 서버에서 할일 목록을 가져옵니다
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos(token!);
      setTodos(data);
      setError('');
    } catch (err) {
      setError('할일 목록을 불러오는데 실패했습니다');
      // 토큰이 만료된 경우 로그아웃 처리
      if (err instanceof Error && err.message.includes('401')) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // 새 할일 추가 핸들러
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const todo = await createTodo(token!, newTitle.trim());
      setTodos([todo, ...todos]);
      setNewTitle('');
      setError('');
    } catch (err) {
      setError('할일 추가에 실패했습니다');
    }
  };

  // 할일 완료 상태 토글 핸들러
  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(token!, todo.id, {
        done: !todo.done,
      });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      setError('할일 수정에 실패했습니다');
    }
  };

  // 할일 삭제 핸들러
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(token!, id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError('할일 삭제에 실패했습니다');
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* 헤더 영역 */}
        <div style={styles.header}>
          <h1 style={styles.title}>내 할일 목록</h1>
          <div style={styles.userInfo}>
            <span style={styles.username}>{user?.username}님</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && <div style={styles.error}>{error}</div>}

        {/* 할일 추가 폼 */}
        <form onSubmit={handleAdd} style={styles.form}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="새로운 할일을 입력하세요"
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            추가
          </button>
        </form>

        {/* 할일 목록 */}
        {loading ? (
          <p style={styles.message}>로딩 중...</p>
        ) : todos.length === 0 ? (
          <p style={styles.message}>할일이 없습니다. 새로운 할일을 추가해보세요!</p>
        ) : (
          <ul style={styles.list}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.item}>
                <div style={styles.itemLeft}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggle(todo)}
                    style={styles.checkbox}
                  />
                  <span
                    style={{
                      ...styles.itemTitle,
                      textDecoration: todo.done ? 'line-through' : 'none',
                      color: todo.done ? '#999' : '#333',
                    }}
                  >
                    {todo.title}
                  </span>
                  <span style={styles.priority}>{todo.priority}</span>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={styles.deleteButton}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 할일 개수 표시 */}
        <div style={styles.footer}>
          <span>
            전체: {todos.length}개 | 완료: {todos.filter((t) => t.done).length}
            개 | 미완료: {todos.filter((t) => !t.done).length}개
          </span>
        </div>
      </div>
    </div>
  );
}

// 인라인 스타일 정의
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  username: {
    color: '#666',
    fontSize: '0.9rem',
  },
  logoutButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#ff5722',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  addButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: '1px solid #eee',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  itemTitle: {
    fontSize: '1rem',
  },
  priority: {
    fontSize: '0.75rem',
    padding: '0.2rem 0.5rem',
    backgroundColor: '#e3f2fd',
    borderRadius: '10px',
    color: '#1565c0',
  },
  deleteButton: {
    padding: '0.3rem 0.6rem',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#999',
    padding: '2rem 0',
  },
  footer: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
};

export default TodoPage;
