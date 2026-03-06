// ============================================
// Day 29 - Prisma 시드 스크립트 (풀이)
// ============================================
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== 시드 데이터 삽입 시작 ===\n");

  // --- 1. 기존 데이터 정리 (개발 환경에서만) ---
  if (process.env.NODE_ENV !== 'production') {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    console.log("기존 데이터 삭제 완료");
  }

  // --- 2. 사용자 생성 ---
  const admin = await prisma.user.create({
    data: {
      name: '관리자',
      email: 'admin@example.com',
      role: 'admin',
    },
  });
  console.log(`사용자 생성: ${admin.name} (${admin.email})`);

  // --- 3. 관계 데이터와 함께 생성 (nested create) ---
  const hong = await prisma.user.create({
    data: {
      name: '홍길동',
      email: 'hong@example.com',
      role: 'user',
      posts: {
        create: [
          {
            title: 'Express 시작하기',
            content: 'Express는 Node.js 웹 프레임워크입니다...',
            published: true,
          },
          {
            title: 'Prisma ORM 소개',
            content: 'Prisma는 현대적인 ORM입니다...',
            published: true,
          },
          {
            title: '작성 중인 글',
            content: '아직 미완성...',
            published: false,
          },
        ],
      },
    },
    include: { posts: true },
  });
  console.log(`사용자 생성: ${hong.name} (게시글 ${hong.posts.length}개)`);

  // --- 4. createMany로 대량 삽입 ---
  const moreUsers = await prisma.user.createMany({
    data: [
      { name: '김철수', email: 'kim@example.com', role: 'user' },
      { name: '이영희', email: 'lee@example.com', role: 'user' },
      { name: '박민수', email: 'park@example.com', role: 'user' },
    ],
    skipDuplicates: true,
  });
  console.log(`대량 삽입: ${moreUsers.count}명`);

  // --- 5. 댓글 추가 ---
  const firstPost = hong.posts[0];
  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        content: '좋은 글이네요!',
        postId: firstPost.id,
        authorId: admin.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: '많이 배웠습니다.',
        postId: firstPost.id,
        authorId: (await prisma.user.findUnique({ where: { email: 'kim@example.com' } })).id,
      },
    }),
  ]);
  console.log(`댓글 추가: ${comments.length}개`);

  // --- 6. upsert (있으면 업데이트, 없으면 생성) ---
  const upserted = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { name: '슈퍼관리자' },
    create: { name: '슈퍼관리자', email: 'admin@example.com', role: 'admin' },
  });
  console.log(`upsert: ${upserted.name}`);

  // --- 7. 결과 확인 ---
  console.log("\n=== 시드 결과 ===");
  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();
  const commentCount = await prisma.comment.count();
  console.log(`사용자: ${userCount}명`);
  console.log(`게시글: ${postCount}개`);
  console.log(`댓글: ${commentCount}개`);

  // 관계 데이터 확인
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: { select: { title: true, published: true } },
      _count: { select: { posts: true } },
    },
  });
  console.log("\n사용자별 게시글:");
  usersWithPosts.forEach(u => {
    console.log(`  ${u.name} (${u._count.posts}개): ${u.posts.map(p => p.title).join(', ') || '없음'}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
