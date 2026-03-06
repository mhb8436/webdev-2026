// ============================================
// Day 29 - Prisma 시드 스크립트
// ============================================
// 학습목표: 초기 데이터 삽입, createMany, 관계 데이터
// 실행: npx prisma db seed (package.json에 seed 설정 필요)
// 또는: node starter/03_prisma_seed.js

// TODO 1: PrismaClient 생성
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// TODO 2: 사용자 시드 데이터
// const users = [
//   { name: '관리자', email: 'admin@example.com', role: 'admin' },
//   { name: '홍길동', email: 'hong@example.com', role: 'user' },
//   { name: '김철수', email: 'kim@example.com', role: 'user' },
// ];

// TODO 3: createMany로 대량 삽입
// await prisma.user.createMany({ data: users, skipDuplicates: true });

// TODO 4: 관계 데이터 삽입 (create with nested)
// await prisma.user.create({
//   data: {
//     name: '이영희',
//     email: 'lee@example.com',
//     posts: {
//       create: [
//         { title: '첫 번째 글', content: '내용...' },
//         { title: '두 번째 글', content: '내용...' },
//       ],
//     },
//   },
// });

// TODO 5: upsert (있으면 업데이트, 없으면 생성)
// await prisma.user.upsert({
//   where: { email: 'admin@example.com' },
//   update: { name: '슈퍼관리자' },
//   create: { name: '슈퍼관리자', email: 'admin@example.com', role: 'admin' },
// });

// TODO 6: main 함수 패턴
// async function main() {
//   try { ... } finally { await prisma.$disconnect(); }
// }
// main();
