import { useState, useRef, useEffect } from 'react';

// 할일 추가 폼 컴포넌트의 props 타입
interface TodoFormProps {
  onAdd: (title: string) => void;
}

// 할일 추가 폼 컴포넌트
function TodoForm({ onAdd }: TodoFormProps) {
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
    onAdd(trimmed);
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
