// ============================================
// Day 12 - 필터링과 검색 기능
// ============================================
// 학습목표: 동적 필터링, 검색, 정렬

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// TODO 1: 샘플 데이터 정의
// const products: Product[] = [...]

// TODO 2: 상태 관리
// const [search, setSearch] = useState('');
// const [category, setCategory] = useState('all');
// const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
// const [showInStock, setShowInStock] = useState(false);

// TODO 3: 필터링 로직
// let filtered = products
//   .filter(p => p.name.includes(search))
//   .filter(p => category === 'all' || p.category === category)
//   .filter(p => !showInStock || p.inStock);

// TODO 4: 정렬 로직
// filtered.sort((a, b) => sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name));

// TODO 5: UI 구현
// - 검색 input
// - 카테고리 select
// - 재고만 보기 checkbox
// - 정렬 기준 select
// - 결과 목록 + 결과 수 표시

export default function FilterableList() {
  return <div>TODO: 구현하세요</div>;
}
