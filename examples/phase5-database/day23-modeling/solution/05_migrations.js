// ============================================
// Day 23 - 스키마 마이그레이션 패턴 (풀이)
// ============================================
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'migrations.db'));
db.pragma('journal_mode = WAL');

// --- 1. 마이그레이션 추적 테이블 ---
db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    applied_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  )
`);

// --- 2. 마이그레이션 정의 ---
const migrations = [
  {
    name: '001_create_users',
    up: `
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      )
    `,
    down: `DROP TABLE IF EXISTS users`,
  },
  {
    name: '002_add_users_role',
    up: `ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'`,
    down: `
      CREATE TABLE users_backup AS SELECT id, name, email, created_at FROM users;
      DROP TABLE users;
      ALTER TABLE users_backup RENAME TO users;
    `,
  },
  {
    name: '003_create_posts',
    up: `
      CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      )
    `,
    down: `DROP TABLE IF EXISTS posts`,
  },
  {
    name: '004_create_tags',
    up: `
      CREATE TABLE tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
      CREATE TABLE post_tags (
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      );
    `,
    down: `
      DROP TABLE IF EXISTS post_tags;
      DROP TABLE IF EXISTS tags;
    `,
  },
  {
    name: '005_add_posts_status',
    up: `ALTER TABLE posts ADD COLUMN status TEXT NOT NULL DEFAULT 'draft'`,
    down: `
      CREATE TABLE posts_backup AS SELECT id, title, content, user_id, created_at FROM posts;
      DROP TABLE posts;
      ALTER TABLE posts_backup RENAME TO posts;
    `,
  },
];

// --- 3. 적용된 마이그레이션 조회 ---
function getAppliedMigrations() {
  return db.prepare('SELECT name FROM migrations ORDER BY id').all().map(r => r.name);
}

// --- 4. migrate (up) ---
function migrate() {
  const applied = new Set(getAppliedMigrations());
  const pending = migrations.filter(m => !applied.has(m.name));

  if (pending.length === 0) {
    console.log("적용할 마이그레이션이 없습니다.\n");
    return;
  }

  const run = db.transaction(() => {
    for (const m of pending) {
      console.log(`  ▶ 적용: ${m.name}`);
      db.exec(m.up);
      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(m.name);
    }
  });

  try {
    run();
    console.log(`${pending.length}개 마이그레이션 적용 완료\n`);
  } catch (err) {
    console.error(`마이그레이션 실패: ${err.message}\n`);
  }
}

// --- 5. rollback (down) ---
function rollback(steps = 1) {
  const applied = getAppliedMigrations();
  if (applied.length === 0) {
    console.log("롤백할 마이그레이션이 없습니다.\n");
    return;
  }

  const toRollback = applied.slice(-steps).reverse();

  const run = db.transaction(() => {
    for (const name of toRollback) {
      const m = migrations.find(m => m.name === name);
      if (!m) {
        throw new Error(`마이그레이션 정의를 찾을 수 없음: ${name}`);
      }
      console.log(`  ◀ 롤백: ${m.name}`);
      db.exec(m.down);
      db.prepare('DELETE FROM migrations WHERE name = ?').run(m.name);
    }
  });

  try {
    run();
    console.log(`${toRollback.length}개 마이그레이션 롤백 완료\n`);
  } catch (err) {
    console.error(`롤백 실패: ${err.message}\n`);
  }
}

// --- 6. 상태 확인 ---
function status() {
  const applied = new Set(getAppliedMigrations());

  console.log("적용됨:");
  migrations.forEach(m => {
    if (applied.has(m.name)) {
      const row = db.prepare('SELECT applied_at FROM migrations WHERE name = ?').get(m.name);
      console.log(`  ✓ ${m.name} (${row.applied_at})`);
    }
  });

  console.log("미적용:");
  const pending = migrations.filter(m => !applied.has(m.name));
  if (pending.length === 0) {
    console.log("  (없음)");
  } else {
    pending.forEach(m => console.log(`  ○ ${m.name}`));
  }
  console.log("");
}

// --- 실행 ---
console.log("=== 마이그레이션 시스템 ===\n");

// 전체 마이그레이션 적용
console.log("--- 1) migrate ---");
migrate();

console.log("--- 상태 확인 ---");
status();

// 테이블 확인
console.log("--- 생성된 테이블 ---");
const tables = db.prepare(`
  SELECT name FROM sqlite_master
  WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
  ORDER BY name
`).all();
console.log(tables.map(t => t.name).join(', '));
console.log("");

// 마지막 2개 롤백
console.log("--- 2) rollback 2 ---");
rollback(2);

console.log("--- 상태 확인 ---");
status();

// 다시 마이그레이션
console.log("--- 3) migrate 다시 ---");
migrate();

console.log("--- 최종 상태 ---");
status();

db.close();
