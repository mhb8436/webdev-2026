'use client';
// 클라이언트 컴포넌트 - useState, useEffect 등 React 훅 사용을 위해 필요
// TODO: React Phase에서 만든 할일 앱 로직을 여기로 가져오세요

import { useState, useEffect } from 'react';

// 할일 타입 정의
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoApp() {
  // TODO: useState로 todos 상태 관리
  // const [todos, setTodos] = useState<Todo[]>([]);

  // TODO: 새 할일 입력값 상태
  // const [input, setInput] = useState('');

  // TODO: useEffect로 localStorage에서 할일 불러오기
  // useEffect(() => {
  //   ...
  // }, []);

  // TODO: todos가 변경될 때 localStorage에 저장
  // useEffect(() => {
  //   ...
  // }, [todos]);

  // TODO: 할일 추가 함수
  // const addTodo = () => { ... };

  // TODO: 할일 삭제 함수
  // const deleteTodo = (id: number) => { ... };

  // TODO: 할일 완료 토글 함수
  // const toggleTodo = (id: number) => { ... };

  // TODO: JSX 렌더링 - 입력 폼, 할일 목록
  return (
    <div>
      {/* TODO: 할일 입력 폼 */}
      {/* TODO: 할일 목록 렌더링 */}
    </div>
  );
}
