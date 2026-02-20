import { useState, useRef, useEffect } from 'react';

// TodoForm 컴포넌트의 Props 타입 정의
interface TodoFormProps {
  onAdd: (title: string) => void;  // 할일 추가 핸들러
}

function TodoForm({ onAdd }: TodoFormProps) {
  // 입력 필드 상태
  const [title, setTitle] = useState('');

  // TODO: useRef로 input 요소를 참조하세요
  // const inputRef = useRef<HTMLInputElement>(null);

  // TODO: useEffect로 컴포넌트 마운트 시 input에 포커스를 설정하세요
  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
    // TODO: 할일 추가 후 input에 다시 포커스를 설정하세요
    // inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        // TODO: ref={inputRef} 를 추가하세요
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
