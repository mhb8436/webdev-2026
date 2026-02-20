// Day 29 - ORM (Prisma) 연습 문제 정답
// 사전 준비:
//   npm init -y
//   npm install express @prisma/client
//   npm install -D prisma
//   npx prisma init
//   schema.prisma 파일을 prisma/ 폴더에 복사
//   npx prisma migrate dev --name init

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

// ============================================
// 문제 1: 블로그 ORM - Post CRUD
// ============================================

// POST /api/posts - 새 게시글 작성
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, authorName } = req.body;

    if (!title || !content || !authorName) {
      return res.status(400).json({ error: 'title, content, authorName은 필수입니다.' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorName
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: '게시글 작성에 실패했습니다.' });
  }
});

// GET /api/posts - 전체 게시글 목록 조회
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: '게시글 목록 조회에 실패했습니다.' });
  }
});

// GET /api/posts/:id - 특정 게시글 상세 조회
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: '게시글 조회에 실패했습니다.' });
  }
});

// PUT /api/posts/:id - 게시글 수정
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published })
      }
    });

    res.json(post);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).json({ error: '게시글 수정에 실패했습니다.' });
  }
});

// DELETE /api/posts/:id - 게시글 삭제
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: '게시글이 삭제되었습니다.' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.status(500).json({ error: '게시글 삭제에 실패했습니다.' });
  }
});

// ============================================
// 문제 2: 관계 설정 - User와 Article (1:N)
// ============================================

// POST /api/users - 사용자 생성
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'name과 email은 필수입니다.' });
    }

    const user = await prisma.user.create({
      data: { name, email }
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
    }
    res.status(500).json({ error: '사용자 생성에 실패했습니다.' });
  }
});

// GET /api/users - 사용자 목록 조회 (작성한 글 포함)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        articles: true  // 1:N 관계 데이터를 함께 조회
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: '사용자 목록 조회에 실패했습니다.' });
  }
});

// GET /api/users/:id/posts - 특정 사용자의 글 목록 조회
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;

    // 방법 1: user를 찾고 articles를 include
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { articles: true }
    });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    res.json(user.articles);
  } catch (error) {
    res.status(500).json({ error: '글 목록 조회에 실패했습니다.' });
  }
});

// POST /api/users/:id/posts - 특정 사용자로 글 작성
app.post('/api/users/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'title과 content는 필수입니다.' });
    }

    // 사용자 존재 확인
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // connect를 사용하여 기존 사용자와 연결
    const article = await prisma.article.create({
      data: {
        title,
        content,
        author: {
          connect: { id: parseInt(id) }
        }
      }
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: '글 작성에 실패했습니다.' });
  }
});

// ============================================
// 문제 3: Prisma 쿼리 연습 - Product
// ============================================

// GET /api/products/search - 조건 검색 (where)
// 쿼리: ?category=전자기기&minPrice=10000&maxPrice=50000
app.get('/api/products/search', async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    // where 조건을 동적으로 구성
    const where = {};

    if (category) {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice);
      if (maxPrice) where.price.lte = parseInt(maxPrice);
    }

    const products = await prisma.product.findMany({
      where
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: '상품 검색에 실패했습니다.' });
  }
});

// GET /api/products/names - 필드 선택 (select)
// id와 name만 반환
app.get('/api/products/names', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: '상품 이름 목록 조회에 실패했습니다.' });
  }
});

// GET /api/products/:id - 관계 포함 (include)
// 쿼리: ?includeCategory=true
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { includeCategory } = req.query;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      // includeCategory 쿼리 파라미터에 따라 관계 데이터 포함 여부 결정
      ...(includeCategory === 'true' && {
        include: {
          categoryRel: true
        }
      })
    });

    if (!product) {
      return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: '상품 조회에 실패했습니다.' });
  }
});

// GET /api/products - 정렬 (orderBy) + 페이지네이션 (skip/take)
// 쿼리: ?sort=price&order=asc&page=1&limit=10
app.get('/api/products', async (req, res) => {
  try {
    const {
      sort = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '10'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // orderBy: 동적으로 정렬 기준 설정
    const orderBy = {};
    orderBy[sort] = order;  // 예: { price: 'asc' }

    // 전체 개수와 데이터를 동시에 조회
    const [total, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        orderBy,
        skip,         // 건너뛸 개수
        take: limitNum // 가져올 개수
      })
    ]);

    res.json({
      data: products,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    res.status(500).json({ error: '상품 목록 조회에 실패했습니다.' });
  }
});

// POST /api/products - 상품 추가 (테스트용)
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        inStock: inStock !== undefined ? inStock : true
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: '상품 추가에 실패했습니다.' });
  }
});

// ============================================
// 서버 시작
// ============================================
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 프로세스 종료 시 Prisma 연결 해제
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
