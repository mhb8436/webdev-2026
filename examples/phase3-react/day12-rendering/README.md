# Day 12 - 필터링, 검색, 정렬, 렌더링 최적화

> **Phase 3: React** | 학습일: 12일차

---

## 학습 목표

- 필터/검색/정렬을 조합한 데이터 처리를 구현한다
- `useMemo`로 계산 비용이 큰 연산을 최적화한다
- 조건부 렌더링 패턴을 능숙하게 활용한다
- 리스트에서 `key`의 역할을 깊이 이해한다

---

## 핵심 개념

### 1. 필터 + 검색 + 정렬 조합

```tsx
const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
const [searchQuery, setSearchQuery] = useState("");
const [sortBy, setSortBy] = useState<"name" | "price">("name");

const filteredProducts = useMemo(() => {
  let result = products;

  // 1. 카테고리 필터
  if (filter !== "all") {
    result = result.filter(p => p.category === filter);
  }

  // 2. 검색
  if (searchQuery) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 3. 정렬
  result = [...result].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)
  );

  return result;
}, [products, filter, searchQuery, sortBy]);
```

### 2. useMemo

의존성이 변경될 때만 재계산합니다.

```tsx
// 비용이 큰 계산을 메모이제이션
const statistics = useMemo(() => ({
  total: todos.length,
  completed: todos.filter(t => t.done).length,
  averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
}), [todos, scores]);
```

### 3. 정렬 가능한 테이블

```tsx
const [sortKey, setSortKey] = useState<"name" | "score">("name");
const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

const handleSort = (key: typeof sortKey) => {
  if (key === sortKey) {
    setSortDir(d => d === "asc" ? "desc" : "asc");  // 방향 토글
  } else {
    setSortKey(key);
    setSortDir("asc");
  }
};
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/App.tsx` | 할일 필터(전체/진행중/완료), 통계 |
| `src/components/FilterableList.tsx` | 상품 목록 검색/카테고리 필터/정렬/재고 필터 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice-extra.tsx` | 정렬 가능한 테이블, 무한 스크롤, 디바운스 검색 |
| `solution-extra.tsx` | 풀이 (IntersectionObserver, useMemo 활용) |

---

## 실행 방법

```bash
cd starter && npm install && npm run dev
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| 필터링 | `filter()`로 조건에 맞는 데이터만 |
| 검색 | `includes()` + `toLowerCase()` |
| 정렬 | `sort()` + `localeCompare`(문자열) / `a - b`(숫자) |
| useMemo | 의존성 변경 시에만 재계산 |
| key | 리스트 항목의 고유 식별자 |

> **다음 시간**: Day 13 - useEffect, 커스텀 훅
