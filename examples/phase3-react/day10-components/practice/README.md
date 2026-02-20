# Day 10 연습문제 - 컴포넌트 분리, Props

## 학습 목표
- 컴포넌트를 역할별로 분리할 수 있다
- Props를 통해 부모에서 자식으로 데이터를 전달할 수 있다
- Props의 타입을 interface로 정의할 수 있다

---

## 문제 1: 상품 카탈로그

온라인 쇼핑몰의 상품 목록을 컴포넌트로 분리하여 만드세요.

### 요구사항
- **Header 컴포넌트**: 쇼핑몰 이름과 상품 개수를 Props로 받아 표시
- **ProductCard 컴포넌트**: 이름, 가격, 이미지URL, 설명을 Props로 받아 카드 형태로 표시
- **ProductList 컴포넌트**: 상품 배열을 Props로 받아 ProductCard를 반복 렌더링
- Props 타입을 `interface`로 정의하세요
- 최소 4개 이상의 상품 데이터를 사용하세요
- 이미지URL은 `https://via.placeholder.com/200` 같은 플레이스홀더를 사용해도 됩니다

### 컴포넌트 구조
```
App
├── Header (storeName, productCount)
└── ProductList (products)
    ├── ProductCard (name, price, imageUrl, description)
    ├── ProductCard
    └── ProductCard
```

---

## 문제 2: 별점 컴포넌트

리뷰 시스템에서 사용할 별점 컴포넌트를 만드세요.

### 요구사항
- **Rating 컴포넌트**: `score` Props(1~5)를 받아 채워진 별(★)과 빈 별(☆)로 표시
- **ReviewCard 컴포넌트**: `author`, `content`, `score` Props를 받아 리뷰를 표시하고 내부에서 Rating 컴포넌트를 사용
- 최소 3개 이상의 리뷰 데이터를 만들어 렌더링하세요
- 별점은 1~5 사이의 정수입니다
- 별의 색상은 금색(#f1c40f)으로 스타일링하세요

### 예시 출력
```
  ★★★★☆ (4/5)
  김철수
  "정말 좋은 상품이에요!"
```

---

## 문제 3: 가족 소개 페이지

가족 구성원을 소개하는 페이지를 컴포넌트로 만드세요.

### 요구사항
- **FamilyMember 컴포넌트**: 이름, 관계, 나이, 한마디를 Props로 받아 표시
- **FamilyList 컴포넌트**: 가족 데이터 배열을 받아 FamilyMember를 반복 렌더링
- Props 타입을 `interface`로 명확히 정의하세요
- 관계에 따라 다른 색상의 배경을 적용하세요 (예: 부모 - 파란색, 형제 - 초록색)
- 최소 4명 이상의 가족 데이터를 사용하세요
- 가족 수를 상단에 표시하세요

### 컴포넌트 구조
```
App
└── FamilyList (members)
    ├── FamilyMember (name, relation, age, message)
    ├── FamilyMember
    └── FamilyMember
```

---

## 파일 구조

```
practice/
├── App.tsx              ← 문제 (주석으로 안내)
└── solution/
    ├── App.tsx           ← 정답 메인
    └── components/
        ├── Header.tsx
        ├── ProductCard.tsx
        ├── ProductList.tsx
        ├── Rating.tsx
        ├── ReviewCard.tsx
        ├── FamilyMember.tsx
        └── FamilyList.tsx
```

## 힌트
- Props 인터페이스 정의: `interface ProductCardProps { name: string; price: number; }`
- 컴포넌트에서 Props 사용: `function ProductCard({ name, price }: ProductCardProps) { ... }`
- `Array(5).fill(null).map((_, i) => ...)` 패턴으로 별을 렌더링할 수 있습니다
