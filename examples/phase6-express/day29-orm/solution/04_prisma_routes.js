// ============================================
// Day 29 - Prisma CRUD 라우트 (풀이)
// ============================================
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// --- GET /api/posts (목록 조회) ---
app.get('/api/posts', async (req, res, next) => {
  try {
    const { page = '1', limit = '10', published, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.post.count({ where }),
    ]);

    res.json({
      data: posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// --- GET /api/posts/:id (상세 조회) ---
app.get('/api/posts/:id', async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        author: { select: { id: true, name: true, email: true } },
        comments: {
          include: {
            author: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// --- POST /api/posts (생성) ---
app.post('/api/posts', async (req, res, next) => {
  try {
    const { title, content, authorId, published = false } = req.body;

    if (!title || !authorId) {
      return res.status(400).json({ error: 'title과 authorId는 필수입니다' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        author: { connect: { id: authorId } },
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '작성자를 찾을 수 없습니다' });
    }
    next(err);
  }
});

// --- PUT /api/posts/:id (수정) ---
app.put('/api/posts/:id', async (req, res, next) => {
  try {
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: { title, content, published },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    res.json(post);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    }
    next(err);
  }
});

// --- DELETE /api/posts/:id (삭제) ---
app.delete('/api/posts/:id', async (req, res, next) => {
  try {
    await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    }
    next(err);
  }
});

// --- GET /api/users/:id/posts (사용자별 게시글) ---
app.get('/api/users/:id/posts', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          include: { _count: { select: { comments: true } } },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }

    res.json({
      user: { id: user.id, name: user.name },
      posts: user.posts,
    });
  } catch (err) {
    next(err);
  }
});

// --- POST /api/posts/:id/comments (댓글 추가) ---
app.post('/api/posts/:id/comments', async (req, res, next) => {
  try {
    const { content, authorId } = req.body;

    if (!content || !authorId) {
      return res.status(400).json({ error: 'content와 authorId는 필수입니다' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: Number(req.params.id) } },
        author: { connect: { id: authorId } },
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: '게시글 또는 작성자를 찾을 수 없습니다' });
    }
    next(err);
  }
});

// --- 에러 핸들러 ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 내부 오류' });
});

// --- 서버 시작 ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Prisma 라우트 서버: http://localhost:${PORT}`);
  console.log("");
  console.log("API:");
  console.log("  GET    /api/posts              전체 게시글");
  console.log("  GET    /api/posts/:id           게시글 상세");
  console.log("  POST   /api/posts              게시글 생성");
  console.log("  PUT    /api/posts/:id           게시글 수정");
  console.log("  DELETE /api/posts/:id           게시글 삭제");
  console.log("  GET    /api/users/:id/posts     사용자별 게시글");
  console.log("  POST   /api/posts/:id/comments  댓글 추가");
});
