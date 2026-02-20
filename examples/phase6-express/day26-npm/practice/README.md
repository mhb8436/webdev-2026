# Day 26 - npm, 패키지 관리 연습문제

## 연습 1: 날짜 유틸리티

dayjs 패키지를 설치하고, 날짜 관련 유틸리티 함수들을 만드세요.

### 요구사항

- `npm install dayjs`로 패키지를 설치하세요
- 다음 함수를 구현하세요:
  - `formatToday()` - 오늘 날짜를 `YYYY년 MM월 DD일 (ddd)` 형식으로 반환
  - `calculateDDay(targetDate)` - 목표 날짜까지 남은 일수를 반환 (예: "D-30" 또는 "D+5")
  - `getRelativeTime(dateString)` - 상대적 시간을 한국어로 반환 (예: "3일 전", "2시간 전", "방금 전")
- 각 함수의 실행 결과를 콘솔에 출력하세요

### 힌트

- `dayjs().format()` 메서드로 날짜를 포맷팅하세요
- `dayjs().diff()`로 날짜 차이를 계산하세요
- `relativeTime` 플러그인과 한국어 locale을 활용해보세요
- `dayjs.extend()`로 플러그인을 등록하세요

---

## 연습 2: 랜덤 데이터 생성기

faker 패키지를 설치하고, 가짜 사용자 프로필을 생성하세요.

### 요구사항

- `npm install @faker-js/faker`로 패키지를 설치하세요
- 가짜 사용자 프로필 10개를 생성하세요
- 각 프로필에는 다음 정보를 포함하세요:
  - `id` - 1부터 순서대로
  - `name` - 가짜 이름
  - `email` - 가짜 이메일
  - `address` - 가짜 주소 (도시 + 거리 주소)
  - `phone` - 가짜 전화번호
  - `createdAt` - 가짜 날짜
- 생성된 데이터를 `users.json` 파일로 저장하세요
- 콘솔에도 표 형태로 출력하세요

### 힌트

- `faker.person.fullName()`으로 이름을 생성하세요
- `faker.internet.email()`으로 이메일을 생성하세요
- `faker.location.city()`와 `faker.location.streetAddress()`를 활용하세요
- `console.table()`로 보기 좋게 출력할 수 있습니다

---

## 연습 3: 환경 변수 관리

dotenv 패키지로 .env 파일에서 설정을 읽어오세요.

### 요구사항

- `npm install dotenv`로 패키지를 설치하세요
- `.env` 파일을 만들고 다음 변수를 저장하세요:
  - `PORT=3000`
  - `DB_HOST=localhost`
  - `DB_NAME=myapp`
  - `SECRET_KEY=my-super-secret-key-123`
- `.env.example` 파일도 만드세요 (값 대신 설명을 넣어주세요)
- dotenv로 환경 변수를 불러와서 설정 내용을 출력하세요
- `SECRET_KEY`는 일부만 보이도록 마스킹 처리하세요 (예: "my-s****")

### 힌트

- `require('dotenv').config()`로 .env 파일을 로드하세요
- `process.env.PORT`로 환경 변수에 접근하세요
- `.env` 파일은 `.gitignore`에 추가해야 합니다
- `.env.example`은 값 대신 `your_port_here` 같은 플레이스홀더를 넣으세요
