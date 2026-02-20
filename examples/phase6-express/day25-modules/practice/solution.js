// =============================================
// Day 25 정답 - fs, path 모듈
// =============================================

const fs = require('fs');
const path = require('path');

// 연습 1: 방명록 파일 저장
// 방명록 데이터를 JSON 파일로 저장하고 불러오는 프로그램을 만드세요.
// -----------------------------------------

const GUESTBOOK_FILE = path.join(__dirname, 'guestbook.json');

function loadGuestbook() {
  if (!fs.existsSync(GUESTBOOK_FILE)) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify([], null, 2));
    return [];
  }
  const data = fs.readFileSync(GUESTBOOK_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveGuestbook(entries) {
  fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(entries, null, 2));
}

function addEntry(name, message) {
  const entries = loadGuestbook();
  const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
  const newEntry = {
    id: newId,
    name,
    message,
    date: new Date().toISOString()
  };
  entries.push(newEntry);
  saveGuestbook(entries);
  console.log(`방명록이 추가되었습니다: ${name} - "${message}"`);
  return newEntry;
}

function getEntries() {
  const entries = loadGuestbook();
  console.log('=== 방명록 목록 ===');
  entries.forEach(entry => {
    console.log(`[${entry.id}] ${entry.name}: ${entry.message} (${entry.date})`);
  });
  return entries;
}

function deleteEntry(id) {
  const entries = loadGuestbook();
  const filtered = entries.filter(entry => entry.id !== id);
  if (filtered.length === entries.length) {
    console.log(`id ${id}인 항목을 찾을 수 없습니다.`);
    return false;
  }
  saveGuestbook(filtered);
  console.log(`id ${id} 항목이 삭제되었습니다.`);
  return true;
}

// 테스트
console.log('--- 연습 1: 방명록 ---');
addEntry('김민수', '안녕하세요! 좋은 사이트네요.');
addEntry('이서연', '방문 기념으로 글 남깁니다.');
addEntry('박지호', '유용한 정보 감사합니다!');
getEntries();
deleteEntry(2);
console.log('\n삭제 후:');
getEntries();


// 연습 2: 폴더 탐색기
// 주어진 경로의 파일/폴더 목록을 출력하는 프로그램을 만드세요.
// -----------------------------------------

function exploreDirectory(dirPath) {
  const absolutePath = path.resolve(dirPath);
  console.log(`\n=== 폴더 탐색: ${absolutePath} ===`);

  if (!fs.existsSync(absolutePath)) {
    console.log('해당 경로가 존재하지 않습니다.');
    return [];
  }

  const items = fs.readdirSync(absolutePath);
  const result = [];

  items.forEach(item => {
    const itemPath = path.join(absolutePath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const info = { type: '폴더', name: item };
      console.log(`  [폴더] ${item}`);
      result.push(info);
    } else {
      const ext = path.extname(item) || '없음';
      const size = stat.size;
      const info = { type: '파일', name: item, ext, size };
      console.log(`  [파일] ${item} (확장자: ${ext}, 크기: ${size} bytes)`);
      result.push(info);
    }
  });

  console.log(`총 ${result.length}개 항목`);
  return result;
}

// 테스트
console.log('\n--- 연습 2: 폴더 탐색기 ---');
exploreDirectory(__dirname);


// 연습 3: 설정 파일 관리
// config.json 파일을 읽고 쓰는 ConfigManager를 만드세요.
// -----------------------------------------

class ConfigManager {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
    this._init();
  }

  _init() {
    if (!fs.existsSync(this.filePath)) {
      this._save({});
    }
  }

  _load() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  _save(config) {
    fs.writeFileSync(this.filePath, JSON.stringify(config, null, 2));
  }

  get(key) {
    const config = this._load();
    return config[key];
  }

  set(key, value) {
    const config = this._load();
    config[key] = value;
    this._save(config);
    console.log(`설정 저장: ${key} = ${JSON.stringify(value)}`);
  }

  getAll() {
    return this._load();
  }

  reset() {
    this._save({});
    console.log('설정이 초기화되었습니다.');
  }
}

// 테스트
console.log('\n--- 연습 3: 설정 파일 관리 ---');
const config = new ConfigManager(path.join(__dirname, 'config.json'));

config.set('appName', '나의 앱');
config.set('version', '1.0.0');
config.set('port', 3000);
config.set('database', { host: 'localhost', name: 'mydb' });

console.log('appName:', config.get('appName'));
console.log('port:', config.get('port'));
console.log('존재하지 않는 키:', config.get('nothing'));
console.log('전체 설정:', config.getAll());

config.reset();
console.log('리셋 후:', config.getAll());
