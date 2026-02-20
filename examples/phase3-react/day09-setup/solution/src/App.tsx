// 할일 타입 정의
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function App() {
  // 할일 목록 데이터 (하드코딩)
  const todos: Todo[] = [
    { id: 1, title: '리액트 배우기', done: false },
    { id: 2, title: 'TypeScript 익히기', done: true },
    { id: 3, title: '할일 앱 만들기', done: false },
  ];

  return (
    <div className="app">
      <h1>할일 관리 앱</h1>
      {/* 할일 목록을 map()으로 렌더링 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* 완료 여부를 표시하는 체크박스 */}
            <input
              type="checkbox"
              checked={todo.done}
              readOnly
            />
            {/* 완료된 항목은 취소선 스타일 적용 */}
            <span className={todo.done ? 'todo-text done' : 'todo-text'}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
