// ============================================
// Day 12 - 필터링과 검색 기능 (풀이)
// ============================================

import { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: '맥북 프로', price: 2500000, category: '노트북', inStock: true },
  { id: 2, name: '갤럭시 북', price: 1500000, category: '노트북', inStock: true },
  { id: 3, name: '아이패드', price: 900000, category: '태블릿', inStock: false },
  { id: 4, name: '갤럭시 탭', price: 700000, category: '태블릿', inStock: true },
  { id: 5, name: '에어팟', price: 250000, category: '음향', inStock: true },
  { id: 6, name: '갤럭시 버즈', price: 180000, category: '음향', inStock: false },
  { id: 7, name: '매직 키보드', price: 400000, category: '액세서리', inStock: true },
  { id: 8, name: 'MX Keys', price: 150000, category: '액세서리', inStock: true },
];

const categories = ['all', ...new Set(products.map(p => p.category))];

export default function FilterableList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter(p => category === 'all' || p.category === category)
      .filter(p => !showInStockOnly || p.inStock)
      .sort((a, b) =>
        sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
      );
  }, [search, category, sortBy, showInStockOnly]);

  const formatPrice = (price: number) =>
    price.toLocaleString('ko-KR') + '원';

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>상품 목록</h1>

      {/* 필터 컨트롤 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="상품 검색..."
          style={{ padding: 8 }}
        />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: 8 }}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? '전체 카테고리' : cat}</option>
            ))}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'price')} style={{ padding: 8 }}>
            <option value="name">이름순</option>
            <option value="price">가격순</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={e => setShowInStockOnly(e.target.checked)}
            />
            재고있는 것만
          </label>
        </div>
      </div>

      {/* 결과 수 */}
      <p style={{ color: '#666' }}>
        {filtered.length}개 상품 (전체 {products.length}개)
      </p>

      {/* 상품 목록 */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>검색 결과가 없습니다</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 12, border: '1px solid #ddd', borderRadius: 8,
              opacity: product.inStock ? 1 : 0.5,
            }}>
              <div>
                <strong>{product.name}</strong>
                <span style={{
                  marginLeft: 8, padding: '2px 6px', fontSize: 12,
                  background: '#eee', borderRadius: 4,
                }}>
                  {product.category}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>{formatPrice(product.price)}</div>
                <div style={{ fontSize: 12, color: product.inStock ? 'green' : 'red' }}>
                  {product.inStock ? '재고 있음' : '품절'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
