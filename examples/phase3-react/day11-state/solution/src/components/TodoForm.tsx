import { useState } from 'react';

// TodoForm 컴포넌트의 Props 인터페이스
interface TodoFormProps {
  onAdd: (title: string) => void;
}

// 할일을 입력하는 폼 컴포넌트
function TodoForm({ onAdd }: TodoFormProps) {
  // 입력 필드의 값을 관리하는 state (제어 컴포넌트)
  const [title, setTitle] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 빈 문자열이면 추가하지 않음
    if (title.trim() === '') return;

    // 부모 컴포넌트의 handleAdd 호출
    onAdd(title.trim());
    // 입력 필드 초기화
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
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
