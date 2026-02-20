// =============================================
// Day 26 정답 - npm, 패키지 관리
// =============================================
// 먼저 필요한 패키지를 설치하세요:
// npm install dayjs @faker-js/faker dotenv

const fs = require('fs');
const path = require('path');

// 연습 1: 날짜 유틸리티
// dayjs 패키지를 사용하여 날짜 관련 유틸리티 함수들을 만드세요.
// -----------------------------------------

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const koLocale = require('dayjs/locale/ko');

dayjs.extend(relativeTime);
dayjs.locale('ko');

function formatToday() {
  return dayjs().format('YYYY년 MM월 DD일 (ddd)');
}

function calculateDDay(targetDate) {
  const target = dayjs(targetDate);
  const today = dayjs().startOf('day');
  const diff = target.diff(today, 'day');

  if (diff > 0) {
    return `D-${diff}`;
  } else if (diff < 0) {
    return `D+${Math.abs(diff)}`;
  } else {
    return 'D-Day';
  }
}

function getRelativeTime(dateString) {
  return dayjs(dateString).fromNow();
}

// 테스트
console.log('--- 연습 1: 날짜 유틸리티 ---');
console.log('오늘 날짜:', formatToday());
console.log('크리스마스까지:', calculateDDay('2025-12-25'));
console.log('새해까지:', calculateDDay('2026-01-01'));

const threeDaysAgo = dayjs().subtract(3, 'day').toISOString();
const twoHoursAgo = dayjs().subtract(2, 'hour').toISOString();
const fiveMinAgo = dayjs().subtract(5, 'minute').toISOString();

console.log('3일 전:', getRelativeTime(threeDaysAgo));
console.log('2시간 전:', getRelativeTime(twoHoursAgo));
console.log('5분 전:', getRelativeTime(fiveMinAgo));


// 연습 2: 랜덤 데이터 생성기
// faker 패키지를 사용하여 가짜 사용자 프로필을 생성하세요.
// -----------------------------------------

const { faker } = require('@faker-js/faker');

function generateUsers(count) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: `${faker.location.city()} ${faker.location.streetAddress()}`,
      phone: faker.phone.number(),
      createdAt: faker.date.past().toISOString()
    });
  }

  return users;
}

console.log('\n--- 연습 2: 랜덤 데이터 생성기 ---');
const users = generateUsers(10);

// 콘솔에 표 형태로 출력
console.table(users.map(u => ({
  id: u.id,
  name: u.name,
  email: u.email,
  phone: u.phone
})));

// JSON 파일로 저장
const usersFile = path.join(__dirname, 'users.json');
fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
console.log(`사용자 데이터가 ${usersFile}에 저장되었습니다.`);


// 연습 3: 환경 변수 관리
// dotenv 패키지로 .env 파일에서 설정을 읽어오세요.
// -----------------------------------------

// .env 파일 생성 (실제 프로젝트에서는 수동으로 만듭니다)
const envContent = `PORT=3000
DB_HOST=localhost
DB_NAME=myapp
SECRET_KEY=my-super-secret-key-123`;

const envPath = path.join(__dirname, '.env');
fs.writeFileSync(envPath, envContent);

// .env.example 파일 생성
const envExampleContent = `# 서버 포트 번호
PORT=your_port_here

# 데이터베이스 호스트
DB_HOST=your_db_host_here

# 데이터베이스 이름
DB_NAME=your_db_name_here

# 시크릿 키 (보안 주의)
SECRET_KEY=your_secret_key_here`;

const envExamplePath = path.join(__dirname, '.env.example');
fs.writeFileSync(envExamplePath, envExampleContent);

// dotenv로 환경 변수 로드
require('dotenv').config({ path: envPath });

function maskSecret(value, visibleChars = 4) {
  if (!value || value.length <= visibleChars) return value;
  return value.substring(0, visibleChars) + '****';
}

console.log('\n--- 연습 3: 환경 변수 관리 ---');
console.log('=== 환경 변수 설정 ===');
console.log(`PORT: ${process.env.PORT}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`SECRET_KEY: ${maskSecret(process.env.SECRET_KEY)}`);
console.log('\n.env 파일과 .env.example 파일이 생성되었습니다.');
console.log('주의: .env 파일은 .gitignore에 추가하세요!');
