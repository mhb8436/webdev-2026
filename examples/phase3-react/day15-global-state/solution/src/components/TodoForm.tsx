import { useState, useRef, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';

// 할일 추가 폼 컴포넌트
// Context를 사용하므로 props가 필요 없음!
// useTodos() 훅에서 addTodo 함수를 직접 가져옴
function TodoForm() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 입력 필드에 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할일을 입력하세요"
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        추가
      </button>
    </form>
  );
}

export default TodoForm;
