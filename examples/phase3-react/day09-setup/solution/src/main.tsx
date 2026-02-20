import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'

// React 앱의 진입점
// document에서 root 요소를 찾아 React 앱을 렌더링합니다
createRoot(document.getElementById('root')!).render(<App />)
