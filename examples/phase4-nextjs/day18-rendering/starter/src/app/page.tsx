// 서버 컴포넌트 - async 함수로 서버에서 데이터를 직접 가져올 수 있음
import { getTodos } from '@/lib/todos';
// TODO: TodoApp 컴포넌트 import

export default async function Home() {
  // TODO: 서버에서 데이터 가져오기
  // const todos = await getTodos();

  return (
    <main>
      <h1>할일 관리</h1>
      {/* TODO: TodoApp에 초기 데이터를 props로 전달 */}
      {/* <TodoApp initialTodos={todos} /> */}
    </main>
  );
}
