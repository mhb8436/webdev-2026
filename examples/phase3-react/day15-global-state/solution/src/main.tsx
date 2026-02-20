import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TodoProvider } from './contexts/TodoContext';
import App from './App';

// TodoProvider > BrowserRouter > App 순서로 감싸기
// TodoProvider가 가장 바깥에 있어야 모든 하위 컴포넌트에서 Context에 접근 가능
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoProvider>
  </StrictMode>
);
