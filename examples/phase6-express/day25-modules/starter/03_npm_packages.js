// ============================================
// Day 25 - 유용한 npm 패키지 활용
// ============================================
// 학습목표: lodash, dayjs, uuid 등 실무 필수 패키지
// 실행: npm install lodash dayjs uuid && node starter/03_npm_packages.js

// TODO 1: lodash - 유틸리티 라이브러리
// const _ = require('lodash');
// _.chunk([1,2,3,4,5], 2)      → [[1,2],[3,4],[5]]
// _.uniq([1,1,2,3,3])          → [1,2,3]
// _.groupBy(users, 'role')     → { admin: [...], user: [...] }
// _.debounce(fn, 300)          → 디바운스된 함수
// _.cloneDeep(obj)             → 깊은 복사
// _.pick(obj, ['name','age'])  → 특정 키만 추출
// _.omit(obj, ['password'])    → 특정 키 제외

// TODO 2: dayjs - 날짜/시간 처리
// const dayjs = require('dayjs');
// dayjs().format('YYYY-MM-DD HH:mm:ss')
// dayjs('2024-01-15').add(7, 'day')
// dayjs('2024-12-25').diff(dayjs(), 'day')
// dayjs().startOf('month')
// relativeTime 플러그인: dayjs().fromNow()

// TODO 3: uuid - 고유 ID 생성
// const { v4: uuidv4 } = require('uuid');
// const id = uuidv4(); → 'a1b2c3d4-...'

// TODO 4: 실습 - 사용자 데이터 처리
// const users = [
//   { name: '홍길동', role: 'admin', joinDate: '2023-01-15', score: 85 },
//   { name: '김철수', role: 'user', joinDate: '2023-06-20', score: 72 },
//   ...
// ];
// - lodash로 역할별 그룹핑
// - dayjs로 가입일로부터 경과일 계산
// - uuid로 각 사용자에게 고유 토큰 부여
