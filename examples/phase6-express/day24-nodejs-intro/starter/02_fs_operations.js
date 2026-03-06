// ============================================
// Day 24 - Node.js 파일 시스템 (fs 모듈)
// ============================================
// 학습목표: 파일 읽기, 쓰기, 삭제, 디렉터리 조작

const fs = require('fs');
const path = require('path');

// TODO 1: 동기 파일 쓰기
// fs.writeFileSync('test.txt', '안녕하세요!', 'utf8');
// 결과 확인: fs.readFileSync('test.txt', 'utf8');


// TODO 2: 비동기 파일 읽기/쓰기
// fs.writeFile('async.txt', '비동기 쓰기', 'utf8', (err) => { ... });
// fs.readFile('async.txt', 'utf8', (err, data) => { ... });


// TODO 3: Promise 기반 (fs.promises)
// const fsp = require('fs').promises;
// async function fileDemo() {
//   await fsp.writeFile('promise.txt', '프로미스 방식');
//   const data = await fsp.readFile('promise.txt', 'utf8');
// }


// TODO 4: 파일 추가 쓰기 (appendFile)
// fs.appendFileSync('log.txt', `[${new Date().toISOString()}] 로그 메시지\n`);


// TODO 5: 파일/디렉터리 존재 확인
// fs.existsSync('test.txt')
// fs.statSync('test.txt').isFile()
// fs.statSync('test.txt').isDirectory()


// TODO 6: 디렉터리 생성/읽기
// fs.mkdirSync('output', { recursive: true });
// fs.readdirSync('.') - 현재 디렉터리 파일 목록


// TODO 7: 파일 삭제
// fs.unlinkSync('test.txt');
// fs.rmSync('output', { recursive: true }); - 디렉터리 삭제
