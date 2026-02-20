// 홈 페이지 - TodoApp 컴포넌트를 렌더링합니다
// TodoApp은 API Route(/api/todos)를 통해 서버와 통신하는 클라이언트 컴포넌트입니다
import TodoApp from '@/components/TodoApp';

export default function HomePage() {
  return <TodoApp />;
}
