'use client';
// 할일 입력 폼 - 클라이언트 컴포넌트
// 사용자 입력을 받아 부모 컴포넌트에 전달
// useState를 사용하므로 'use client' 필요

import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  // 입력값 상태 관리
  const [input, setInput] = useState('');

  // 할일 추가 핸들러
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setInput(''); // 입력 필드 초기화
  };

  // Enter 키로 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="새 할일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}
