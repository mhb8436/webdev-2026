// ============================================
// Day 13 - Hooks 심화 연습문제
// ============================================

// --- 연습 1: useForm 커스텀 훅 ---
// 폼 상태 관리 훅을 만드세요
// - values: 폼 값 객체
// - errors: 에러 메시지 객체
// - handleChange: 입력 변경 처리
// - handleSubmit: 제출 시 검증 후 콜백 호출
// - reset: 초기값으로 리셋
// 사용법:
// const { values, errors, handleChange, handleSubmit } = useForm(
//   { name: '', email: '' },
//   { name: (v) => !v ? '이름 필수' : '', email: (v) => !v.includes('@') ? '이메일 형식' : '' }
// );

// TODO: useForm 구현


// --- 연습 2: useMediaQuery 커스텀 훅 ---
// 반응형 훅을 만드세요
// const isMobile = useMediaQuery('(max-width: 768px)');
// const isDark = useMediaQuery('(prefers-color-scheme: dark)');
// 힌트: window.matchMedia(query).addEventListener('change', handler)

// TODO: useMediaQuery 구현


// --- 연습 3: useReducer로 장바구니 ---
// useReducer를 사용한 장바구니를 만드세요
// 액션: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// 상태: { items: CartItem[], totalPrice: number, totalItems: number }

// TODO: cartReducer + ShoppingCartWithReducer 구현


export {};
