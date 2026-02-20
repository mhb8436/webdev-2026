import { useState } from 'react';

// TodoForm 컴포넌트의 Props 타입 정의
interface TodoFormProps {
  onAdd: (title: string) => void;  // 할일 추가 핸들러
}

function TodoForm({ onAdd }: TodoFormProps) {
  // 입력 필드 상태
  const [title, setTitle] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;  // 빈 문자열 방지
    onAdd(title.trim());
    setTitle('');  // 입력 필드 초기화
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
