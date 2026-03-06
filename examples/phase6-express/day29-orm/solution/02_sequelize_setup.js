// ============================================
// Day 29 - Sequelize ORM 기초 (풀이)
// ============================================
const { Sequelize, DataTypes } = require('sequelize');

// --- 1. DB 연결 ---
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

// --- 2. 모델 정의 ---
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
});

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  published: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Comment = sequelize.define('Comment', {
  body: { type: DataTypes.TEXT, allowNull: false },
});

// --- 3. 관계 설정 ---
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// --- 4. 실행 ---
(async () => {
  try {
    // DB 동기화 (테이블 재생성)
    await sequelize.sync({ force: true });
    console.log("DB 동기화 완료\n");

    // 시드 데이터
    const kim = await User.create({ name: "김개발", email: "kim@dev.com", role: "admin" });
    const lee = await User.create({ name: "이영희", email: "lee@dev.com" });
    const park = await User.create({ name: "박민수", email: "park@dev.com" });

    const post1 = await Post.create({ title: "Sequelize 배우기", content: "ORM 기초", userId: kim.id, published: true });
    const post2 = await Post.create({ title: "Express 가이드", content: "서버 만들기", userId: kim.id, published: true });
    const post3 = await Post.create({ title: "React Hooks", content: "훅 활용법", userId: lee.id });

    await Comment.create({ body: "좋은 글이네요!", postId: post1.id, userId: lee.id });
    await Comment.create({ body: "감사합니다!", postId: post1.id, userId: park.id });
    await Comment.create({ body: "도움이 됐어요", postId: post2.id, userId: lee.id });

    console.log("시드 데이터 삽입 완료\n");

    // --- 5. CRUD ---
    console.log("=== 전체 사용자 ===");
    const users = await User.findAll({ raw: true });
    console.table(users);

    console.log("=== 조건 조회 (admin) ===");
    const admins = await User.findAll({ where: { role: 'admin' }, raw: true });
    console.table(admins);

    console.log("=== 단건 조회 ===");
    const user = await User.findByPk(1);
    console.log("ID 1:", user.toJSON());

    console.log("\n=== 수정 ===");
    await User.update({ name: "김수정" }, { where: { id: 3 } });
    const updated = await User.findByPk(3);
    console.log("수정:", updated.name);

    // --- 6. 관계 데이터 조회 ---
    console.log("\n=== Eager Loading (include) ===");
    const usersWithPosts = await User.findAll({
      include: [{
        model: Post,
        attributes: ['title', 'published'],
      }],
    });

    usersWithPosts.forEach(u => {
      console.log(`\n${u.name}의 게시글:`);
      u.Posts.forEach(p => console.log(`  - ${p.title} (${p.published ? '공개' : '비공개'})`));
    });

    console.log("\n=== 게시글 + 댓글 ===");
    const postsWithComments = await Post.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
    });

    postsWithComments.forEach(p => {
      console.log(`\n"${p.title}" by ${p.User.name}`);
      p.Comments.forEach(c => console.log(`  댓글: ${c.body} - ${c.User.name}`));
    });

    // 통계
    console.log("\n=== 통계 ===");
    const postCount = await Post.count();
    const publishedCount = await Post.count({ where: { published: true } });
    console.log(`전체 게시글: ${postCount}, 공개: ${publishedCount}`);

  } catch (error) {
    console.error("에러:", error.message);
  } finally {
    await sequelize.close();
    console.log("\nDB 연결 종료");
  }
})();
