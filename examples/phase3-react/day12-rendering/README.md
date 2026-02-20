# Day 12: 완료 체크와 필터 (4/17)

## 학습 목표
- 조건부 렌더링 (`&&` 연산자, 삼항 연산자) 이해하기
- 리스트 렌더링에서 `key`의 역할 이해하기
- `filter()` 메서드를 활용한 데이터 필터링

## 문제 정의
> "할일 완료/미완료 토글과 상태별 필터를 만들자"

Day 11에서 만든 할일 앱에 완료 상태 표시와 필터 기능을 추가합니다.
사용자가 할일의 완료 여부를 체크하고, 전체/진행중/완료 상태별로 목록을 필터링할 수 있습니다.

## 핵심 개념

### 1. 조건부 렌더링

React에서 조건에 따라 다른 UI를 보여주는 방법입니다.

#### && 연산자 (단축 평가)
조건이 참일 때만 오른쪽 요소를 렌더링합니다.

```tsx
{/* 할일이 없을 때만 메시지 표시 */}
{todos.length === 0 && <p>할일이 없습니다</p>}
```

#### 삼항 연산자
조건에 따라 두 가지 중 하나를 렌더링합니다.

```tsx
{/* 완료 상태에 따라 다른 스타일 적용 */}
<span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
  {todo.title}
</span>
```

### 2. 리스트와 key

React에서 배열을 렌더링할 때 각 항목에 고유한 `key`를 부여해야 합니다.
`key`는 React가 어떤 항목이 변경, 추가, 삭제되었는지 효율적으로 파악하는 데 사용됩니다.

```tsx
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />  {/* id를 key로 사용 */}
))}
```

> 주의: 배열 인덱스를 key로 사용하면 항목의 순서가 바뀔 때 문제가 발생할 수 있습니다.

### 3. filter()를 활용한 필터링

`filter()` 메서드는 조건을 만족하는 요소만 모아 새 배열을 반환합니다.

```tsx
// 필터 상태에 따라 할일 목록 필터링
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.done;    // 미완료만
  if (filter === 'completed') return todo.done;   // 완료만
  return true;                                     // 전체
});
```

## 프로젝트 구조

```
starter/
├── src/
│   ├── components/
│   │   ├── TodoForm.tsx      # 할일 입력 폼 (Day 11 완성본)
│   │   ├── TodoItem.tsx      # 할일 항목 (Day 11 완성본)
│   │   ├── TodoList.tsx      # 할일 목록 (Day 11 완성본)
│   │   └── TodoFilter.tsx    # 필터 버튼 (TODO)
│   ├── types/
│   │   └── todo.ts           # 타입 정의 (FilterType 추가)
│   ├── App.tsx               # 메인 앱 (TODO)
│   ├── App.css               # 스타일
│   └── main.tsx              # 진입점
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 실습 단계

### 단계 1: 필터링된 할일 목록 계산하기
`App.tsx`에서 `filter` 상태값에 따라 `filteredTodos`를 계산합니다.

### 단계 2: TodoFilter 컴포넌트 완성하기
`TodoFilter.tsx`에서 전체/진행중/완료 3개 버튼을 만들고, 현재 선택된 필터에 `active` 클래스를 추가합니다.

### 단계 3: 통계 표시하기
완료된 할일 수와 전체 할일 수를 화면에 표시합니다.

### 단계 4: 조건부 렌더링 적용하기
할일이 없을 때 "할일이 없습니다" 메시지를 표시합니다.

### 단계 5: 완료 상태 시각적 표현
체크박스와 취소선으로 완료된 할일을 구분합니다.

## 실행 방법

```bash
cd starter  # 또는 cd solution
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 완성 화면 기능
- 할일 추가/삭제/토글 (Day 11 기능 유지)
- 체크박스로 완료 상태 토글
- 완료된 할일에 취소선 표시
- 전체/진행중/완료 필터 버튼
- 선택된 필터에 하이라이트 스타일
- 완료/전체 통계 표시
- 할일이 없을 때 안내 메시지 표시

## 심화 학습
- `useMemo`를 사용하여 `filteredTodos` 계산을 최적화해 보세요
- 필터 버튼 대신 탭(Tab) UI로 변경해 보세요
- 완료된 할일 일괄 삭제 기능을 추가해 보세요
