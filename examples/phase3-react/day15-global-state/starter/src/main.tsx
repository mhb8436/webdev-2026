import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// TODO: TodoProvider import
// import { TodoProvider } from './contexts/TodoContext';

// TODO: TodoProvider로 앱 전체를 감싸기
// TodoProvider > BrowserRouter > App 순서로 감싸야 합니다
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* TODO: TodoProvider로 감싸기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* TODO: TodoProvider 닫기 */}
  </StrictMode>
);
