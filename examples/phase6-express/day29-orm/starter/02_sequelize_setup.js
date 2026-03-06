// ============================================
// Day 29 - Sequelize ORM 기초
// ============================================
// 학습목표: Sequelize로 모델 정의, CRUD, 관계 설정
// 실행: npm install sequelize sqlite3

const { Sequelize, DataTypes } = require('sequelize');

// TODO 1: Sequelize 인스턴스 생성 (SQLite 사용)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite',
//   logging: console.log,
// });

// TODO 2: User 모델 정의
// const User = sequelize.define('User', {
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, unique: true, allowNull: false },
//   role: { type: DataTypes.STRING, defaultValue: 'user' },
// });

// TODO 3: Post 모델 정의 + 관계 설정
// const Post = sequelize.define('Post', { ... });
// User.hasMany(Post);         // 1:N
// Post.belongsTo(User);       // N:1

// TODO 4: DB 동기화 및 시드 데이터
// await sequelize.sync({ force: true });
// await User.create({ name: "김개발", email: "kim@dev.com" });

// TODO 5: CRUD 작업
// 생성: User.create({ ... })
// 전체 조회: User.findAll()
// 단건 조회: User.findByPk(1)
// 조건 조회: User.findAll({ where: { role: 'admin' } })
// 수정: User.update({ name: "수정" }, { where: { id: 1 } })
// 삭제: User.destroy({ where: { id: 1 } })

// TODO 6: 관계 데이터 조회
// User.findAll({ include: Post }) - eager loading
// 특정 사용자의 게시글: user.getPosts()
