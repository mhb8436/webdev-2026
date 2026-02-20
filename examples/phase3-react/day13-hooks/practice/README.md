# Day 13 연습문제 - useEffect, localStorage, useRef

## 학습 목표
- useEffect로 사이드 이펙트를 관리할 수 있다
- localStorage를 활용하여 데이터를 영구 저장할 수 있다
- useRef로 DOM 요소에 직접 접근하거나 값을 유지할 수 있다
- useEffect의 cleanup 함수를 이해하고 활용할 수 있다

---

## 문제 1: 메모장

새로고침해도 내용이 유지되는 자동 저장 메모장을 만드세요.

### 요구사항
- `textarea`에 메모를 작성할 수 있습니다
- 메모 내용은 `localStorage`에 자동 저장됩니다
- 페이지를 새로고침해도 이전에 작성한 메모가 유지됩니다
- `useEffect`를 사용하여 컴포넌트 마운트 시 저장된 메모를 불러오세요
- 메모가 변경될 때마다 localStorage에 저장하세요
- "마지막 저장: 방금 전" 같은 마지막 저장 시간을 표시하세요
- "초기화" 버튼으로 메모를 모두 지울 수 있게 하세요
- 글자 수도 함께 표시하세요

### 힌트
- `localStorage.getItem('key')`, `localStorage.setItem('key', value)`
- `useEffect(() => { ... }, [])` - 마운트 시 1회 실행
- `useEffect(() => { ... }, [memo])` - memo가 변경될 때 실행

---

## 문제 2: 스톱워치

시작/정지/리셋 기능이 있는 정밀 스톱워치를 만드세요.

### 요구사항
- **시작** 버튼: 타이머가 시작됩니다 (10ms 간격으로 업데이트)
- **정지** 버튼: 타이머가 멈춥니다
- **리셋** 버튼: 시간이 00:00.00으로 초기화됩니다
- `useEffect`로 `setInterval`을 관리하세요
- `useRef`로 interval ID를 저장하세요 (리렌더링 시 유지 필요)
- 시간 표시 형식: `MM:SS.ms` (예: 01:23.45)
- 실행 중일 때와 멈춰있을 때 버튼 상태를 다르게 표시하세요

### 힌트
- `useRef<number | null>(null)` 로 interval ID를 저장
- `useEffect`의 cleanup 함수에서 `clearInterval` 호출
- 시간 계산: `Math.floor(time / 6000) % 60` (분), `Math.floor(time / 100) % 60` (초), `time % 100` (밀리초)

---

## 문제 3: 자동 검색 (디바운스)

검색어를 입력하면 잠시 후 자동으로 결과를 필터링하는 검색을 구현하세요.

### 요구사항
- 과일 이름 배열을 준비하세요 (최소 10개)
- 검색어를 입력하면 **500ms 후** 자동으로 결과를 필터링합니다 (디바운스)
- 500ms 내에 추가 입력이 있으면 이전 타이머를 취소하고 다시 시작합니다
- `useEffect`의 cleanup 함수에서 `clearTimeout`으로 이전 타이머를 정리하세요
- `useRef`로 검색 input에 페이지 로드 시 자동 포커스하세요
- 검색 중일 때 "검색 중..." 표시를 해주세요
- 검색 결과 개수를 표시하세요
- 검색어가 비어있으면 전체 목록을 표시하세요

### 힌트
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    // 필터링 로직
  }, 500);

  return () => clearTimeout(timer); // cleanup
}, [searchTerm]);
```

- `useRef<HTMLInputElement>(null)` + `ref.current?.focus()` 로 자동 포커스

---

## 실행 방법

```bash
# Vite 프로젝트에서
npm run dev
# App.tsx 파일을 수정하면 자동으로 반영됩니다
```
