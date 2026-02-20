import { useState, useRef, useEffect } from 'react';

// TodoForm 컴포넌트의 Props 타입 정의
interface TodoFormProps {
  onAdd: (title: string) => void;  // 할일 추가 핸들러
}

function TodoForm({ onAdd }: TodoFormProps) {
  // 입력 필드 상태
  const [title, setTitle] = useState('');

  // useRef로 input DOM 요소를 직접 참조
  const inputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트가 마운트될 때 input에 포커스 설정
  // 빈 의존성 배열 [] = 마운트 시 한 번만 실행
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;  // 빈 문자열 방지
    onAdd(title.trim());
    setTitle('');  // 입력 필드 초기화
    // 할일 추가 후 input에 다시 포커스 (사용자 편의성)
    inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;
