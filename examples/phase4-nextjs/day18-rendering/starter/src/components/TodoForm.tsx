'use client';
// 할일 입력 폼 클라이언트 컴포넌트
// TODO: 새 할일을 입력받아 부모 컴포넌트에 전달

import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  // TODO: 입력값 상태 관리
  // const [input, setInput] = useState('');

  // TODO: 폼 제출 핸들러
  // TODO: Enter 키 핸들러

  return (
    <div className="todo-form">
      {/* TODO: 입력 필드와 추가 버튼 */}
    </div>
  );
}
