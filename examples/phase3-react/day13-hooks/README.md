# Day 13: 데이터 저장과 최적화 (4/20)

## 학습 목표
- `useEffect` 훅 이해하기 (마운트, 의존성 배열)
- `localStorage`를 활용한 데이터 영속성 구현
- `useRef` 훅으로 DOM 요소 직접 접근하기

## 문제 정의
> "새로고침해도 할일이 사라지지 않게 하자"

Day 12에서 만든 필터 기능이 있는 할일 앱에 데이터 저장 기능을 추가합니다.
브라우저를 새로고침하거나 닫았다가 다시 열어도 할일 데이터가 유지됩니다.

## 핵심 개념

### 1. useEffect 훅

컴포넌트의 사이드 이펙트(부수 효과)를 처리하는 훅입니다.
렌더링과 직접 관련 없는 작업(데이터 저장, API 호출, DOM 조작 등)에 사용합니다.

```tsx
// 기본 형태
useEffect(() => {
  // 실행할 사이드 이펙트
}, [의존성배열]);
```

#### 마운트 시 한 번만 실행
의존성 배열을 빈 배열 `[]`로 설정하면 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.

```tsx
useEffect(() => {
  console.log('컴포넌트가 마운트되었습니다');
}, []);  // 빈 배열 = 마운트 시에만 실행
```

#### 특정 값이 변경될 때 실행
의존성 배열에 값을 넣으면 해당 값이 변경될 때마다 실행됩니다.

```tsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);  // todos가 변경될 때마다 실행
```

### 2. localStorage

브라우저에 데이터를 영구적으로 저장하는 Web API입니다.
문자열만 저장할 수 있어서 객체는 `JSON.stringify()`/`JSON.parse()`로 변환해야 합니다.

```tsx
// 저장
localStorage.setItem('todos', JSON.stringify(todos));

// 불러오기
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];
```

#### useState 지연 초기화
`useState`에 함수를 전달하면 초기 렌더링 시에만 실행됩니다.
`localStorage` 읽기처럼 비용이 드는 초기화에 적합합니다.

```tsx
// 함수형 초기화: 첫 렌더링에만 localStorage를 읽음
const [todos, setTodos] = useState<Todo[]>(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});
```

### 3. useRef 훅

렌더링에 영향을 주지 않으면서 값을 유지하거나 DOM 요소를 직접 참조할 때 사용합니다.

```tsx
// DOM 요소 참조
const inputRef = useRef<HTMLInputElement>(null);

// 포커스 설정
inputRef.current?.focus();

// JSX에서 연결
<input ref={inputRef} />
```

## 프로젝트 구조

```
starter/
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx      # 할일 입력 폼 (useRef TODO)
│   │   ├── TodoItem.tsx      # 할일 항목 (Day 12 완성본)
│   │   ├── TodoList.tsx      # 할일 목록 (Day 12 완성본)
│   │   └── TodoFilter.tsx    # 필터 버튼 (Day 12 완성본)
│   ├── types/
│   │   └── todo.ts           # 타입 정의
│   ├── App.tsx               # 메인 앱 (useEffect/localStorage TODO)
│   ├── App.css               # 스타일
│   └── main.tsx              # 진입점
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 실습 단계

### 단계 1: localStorage에서 초기 데이터 불러오기
`useState`의 지연 초기화를 사용하여 `localStorage`에 저장된 할일 데이터를 불러옵니다.

### 단계 2: useEffect로 데이터 자동 저장
`todos` 상태가 변경될 때마다 `localStorage`에 저장하는 `useEffect`를 작성합니다.

### 단계 3: useRef로 입력 필드 자동 포커스
`TodoForm` 컴포넌트에서 `useRef`를 사용하여 페이지 로드 시 입력 필드에 자동으로 포커스를 설정합니다.

### 단계 4: 할일 추가 후 포커스 복귀
할일을 추가한 후 입력 필드에 다시 포커스가 가도록 합니다.

## 실행 방법

```bash
cd starter  # 또는 cd solution
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 완성 화면 기능
- Day 12의 모든 기능 유지 (추가/삭제/토글/필터/통계)
- 페이지 새로고침 후에도 할일 데이터 유지
- 페이지 로드 시 입력 필드에 자동 포커스
- 할일 추가 후 입력 필드에 포커스 복귀

## 확인 방법
1. 할일을 몇 개 추가합니다
2. 일부 할일을 완료 상태로 변경합니다
3. 브라우저를 새로고침합니다 (F5 또는 Cmd+R)
4. 할일 데이터가 그대로 유지되는지 확인합니다
5. 브라우저 개발자 도구 > Application > Local Storage에서 저장된 데이터를 확인합니다

## 심화 학습
- `useEffect`의 클린업(cleanup) 함수에 대해 알아보세요
- `sessionStorage`와 `localStorage`의 차이점을 비교해 보세요
- 커스텀 훅 `useLocalStorage`를 만들어 로직을 재사용해 보세요
- `nextId`도 `localStorage`에 저장하여 ID 중복을 방지해 보세요
