// =============================================
// Day 27 연습 3 정답 - 상품 라우터 (별도 파일)
// =============================================

const express = require('express');
const router = express.Router();

// 샘플 데이터
let products = [
  { id: 1, name: '노트북', price: 1200000 },
  { id: 2, name: '키보드', price: 89000 },
  { id: 3, name: '마우스', price: 45000 }
];
let nextId = 4;

// 상품 목록
router.get('/', (req, res) => {
  res.json(products);
});

// 상품 추가
router.post('/', (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name과 price는 필수입니다' });
  }

  const newProduct = { id: nextId++, name, price: Number(price) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 상품 조회
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: '상품을 찾을 수 없습니다' });
  }

  res.json(product);
});

// 상품 삭제
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: '상품을 찾을 수 없습니다' });
  }

  const deleted = products.splice(index, 1)[0];
  res.json({ message: '상품이 삭제되었습니다', deleted });
});

module.exports = router;
