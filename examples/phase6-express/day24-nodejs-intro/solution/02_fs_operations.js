// ============================================
// Day 24 - Node.js 파일 시스템 (풀이)
// ============================================

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const testDir = path.join(__dirname, 'temp');

// --- 1. 동기 파일 쓰기/읽기 ---
console.log("=== 동기 파일 I/O ===");

// 디렉터리 생성
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const filePath = path.join(testDir, 'test.txt');
fs.writeFileSync(filePath, '안녕하세요! 동기 방식 파일 쓰기입니다.', 'utf8');
console.log("쓰기 완료:", filePath);

const content = fs.readFileSync(filePath, 'utf8');
console.log("읽기:", content);
console.log("");

// --- 2. 파일 정보 ---
console.log("=== 파일 정보 ===");
const stat = fs.statSync(filePath);
console.log("파일 크기:", stat.size, "bytes");
console.log("생성 시간:", stat.birthtime.toLocaleString());
console.log("파일인가?:", stat.isFile());
console.log("디렉터리인가?:", stat.isDirectory());
console.log("");

// --- 3. 파일 추가 쓰기 ---
console.log("=== 추가 쓰기 ===");
const logPath = path.join(testDir, 'app.log');
for (let i = 1; i <= 3; i++) {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] 로그 ${i}\n`);
}
console.log("로그 내용:\n" + fs.readFileSync(logPath, 'utf8'));

// --- 4. 디렉터리 읽기 ---
console.log("=== 디렉터리 읽기 ===");
const files = fs.readdirSync(testDir);
console.log("파일 목록:", files);

// 파일 상세 정보
files.forEach(file => {
  const fp = path.join(testDir, file);
  const s = fs.statSync(fp);
  console.log(`  ${file} - ${s.size}bytes, ${s.isFile() ? '파일' : '디렉터리'}`);
});
console.log("");

// --- 5. Promise 기반 (async/await) ---
console.log("=== Promise 기반 ===");

async function asyncFileDemo() {
  const asyncPath = path.join(testDir, 'async.txt');

  await fsp.writeFile(asyncPath, 'Promise 기반 파일 쓰기');
  const data = await fsp.readFile(asyncPath, 'utf8');
  console.log("async 읽기:", data);

  // JSON 파일 저장/로드
  const jsonPath = path.join(testDir, 'data.json');
  const todos = [
    { id: 1, title: "공부하기", done: false },
    { id: 2, title: "운동하기", done: true },
  ];
  await fsp.writeFile(jsonPath, JSON.stringify(todos, null, 2));
  const loaded = JSON.parse(await fsp.readFile(jsonPath, 'utf8'));
  console.log("JSON 로드:", loaded);
}

asyncFileDemo()
  .then(() => {
    // --- 6. 정리 (파일/디렉터리 삭제) ---
    console.log("\n=== 정리 ===");
    fs.rmSync(testDir, { recursive: true });
    console.log("임시 디렉터리 삭제 완료");
  })
  .catch(console.error);
