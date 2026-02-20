'use client';
// Day 16에서 완성한 TodoApp 컴포넌트
// TODO: 필터 기능을 추가하여 페이지별로 다른 할일 목록을 표시할 수 있게 확장하세요

import { useState, useEffect } from 'react';

// 할일 타입 정의
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// 필터 타입: 전체, 미완료, 완료
type FilterType = 'all' | 'active' | 'completed';

// Props 타입 - 필터를 외부에서 지정할 수 있도록
interface TodoAppProps {
  filter?: FilterType;
}

const STORAGE_KEY = 'nextjs-todos';

export default function TodoApp({ filter = 'all' }: TodoAppProps) {
  // TODO: 할일 상태 관리
  // TODO: localStorage 연동
  // TODO: 필터에 따라 할일 목록 필터링
  // TODO: 할일 추가/삭제/토글

  return (
    <div>
      {/* TODO: filter가 'all'일 때만 입력 폼 표시 */}
      {/* TODO: 필터링된 할일 목록 렌더링 */}
    </div>
  );
}
