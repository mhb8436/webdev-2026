import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

// useTodos 커스텀 훅
// TodoContext를 쉽게 사용할 수 있게 해주는 훅입니다
// 어떤 컴포넌트에서든 useTodos()를 호출하면 할일 데이터와 함수에 접근 가능
export function useTodos() {
  const context = useContext(TodoContext);

  // TodoProvider 밖에서 사용하면 에러 발생
  if (!context) {
    throw new Error('useTodos는 TodoProvider 안에서만 사용할 수 있습니다');
  }

  return context;
}
