// ============================================
// Day 25 - 유용한 npm 패키지 활용 (풀이)
// ============================================
const _ = require('lodash');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const { v4: uuidv4 } = require('uuid');

dayjs.extend(relativeTime);

// --- 1. lodash 활용 ---
console.log("=== lodash ===");

// 배열 유틸
console.log("chunk:", _.chunk([1, 2, 3, 4, 5, 6], 2));      // [[1,2],[3,4],[5,6]]
console.log("uniq:", _.uniq([1, 1, 2, 3, 3, 4]));            // [1,2,3,4]
console.log("flatten:", _.flatten([[1, 2], [3, [4]]]));       // [1,2,3,[4]]
console.log("flattenDeep:", _.flattenDeep([[1, [2]], [3, [4]]])); // [1,2,3,4]
console.log("difference:", _.difference([1, 2, 3], [2, 3, 4]));  // [1]
console.log("intersection:", _.intersection([1, 2, 3], [2, 3, 4])); // [2,3]

// 객체 유틸
const user = { name: '홍길동', email: 'hong@test.com', password: 'secret', role: 'admin' };
console.log("pick:", _.pick(user, ['name', 'email']));       // { name, email }
console.log("omit:", _.omit(user, ['password']));             // password 제외

// 그룹핑
const students = [
  { name: '김철수', grade: 'A' },
  { name: '이영희', grade: 'B' },
  { name: '박민수', grade: 'A' },
  { name: '최지우', grade: 'C' },
  { name: '정하나', grade: 'B' },
];
console.log("groupBy:", _.groupBy(students, 'grade'));
console.log("countBy:", _.countBy(students, 'grade'));        // { A: 2, B: 2, C: 1 }
console.log("sortBy:", _.sortBy(students, 'name').map(s => s.name));

// 깊은 복사
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = _.cloneDeep(original);
cloned.b.c = 999;
console.log("원본:", original.b.c);  // 2 (영향 없음)
console.log("복사:", cloned.b.c);    // 999
console.log("");

// --- 2. dayjs 활용 ---
console.log("=== dayjs ===");

// 현재 시간
console.log("현재:", dayjs().format('YYYY-MM-DD HH:mm:ss'));
console.log("날짜만:", dayjs().format('YYYY년 MM월 DD일'));

// 날짜 연산
const nextWeek = dayjs().add(7, 'day');
console.log("일주일 후:", nextWeek.format('YYYY-MM-DD'));

const lastMonth = dayjs().subtract(1, 'month');
console.log("한달 전:", lastMonth.format('YYYY-MM-DD'));

// 날짜 차이
const targetDate = dayjs('2026-12-31');
const daysLeft = targetDate.diff(dayjs(), 'day');
console.log(`${targetDate.format('YYYY-MM-DD')}까지 ${daysLeft}일 남음`);

// 상대 시간 (relativeTime 플러그인)
console.log("3시간 전:", dayjs().subtract(3, 'hour').fromNow());
console.log("2일 후:", dayjs().add(2, 'day').fromNow());

// 시작/끝
console.log("이번 달 시작:", dayjs().startOf('month').format('YYYY-MM-DD'));
console.log("이번 달 끝:", dayjs().endOf('month').format('YYYY-MM-DD'));

// 비교
const date1 = dayjs('2024-06-15');
const date2 = dayjs('2024-12-25');
console.log("date1 < date2:", date1.isBefore(date2));
console.log("같은 달:", date1.isSame(date2, 'month'));
console.log("");

// --- 3. uuid 활용 ---
console.log("=== uuid ===");
for (let i = 0; i < 3; i++) {
  console.log(`UUID ${i + 1}: ${uuidv4()}`);
}
console.log("");

// --- 4. 실습: 사용자 데이터 처리 ---
console.log("=== 종합 실습 ===");

const users = [
  { name: '홍길동', role: 'admin', joinDate: '2023-01-15', score: 85 },
  { name: '김철수', role: 'user', joinDate: '2023-06-20', score: 72 },
  { name: '이영희', role: 'user', joinDate: '2024-03-10', score: 91 },
  { name: '박민수', role: 'admin', joinDate: '2022-11-05', score: 68 },
  { name: '최지우', role: 'user', joinDate: '2024-08-01', score: 95 },
];

// 1) 역할별 그룹핑
const byRole = _.groupBy(users, 'role');
console.log("역할별 인원:");
Object.entries(byRole).forEach(([role, members]) => {
  console.log(`  ${role}: ${members.map(m => m.name).join(', ')}`);
});

// 2) 점수 상위 3명
const top3 = _.orderBy(users, 'score', 'desc').slice(0, 3);
console.log("점수 상위 3:", top3.map(u => `${u.name}(${u.score})`).join(', '));

// 3) 가입 경과일 계산
console.log("가입 경과:");
users.forEach(u => {
  const days = dayjs().diff(dayjs(u.joinDate), 'day');
  const relative = dayjs(u.joinDate).fromNow();
  console.log(`  ${u.name}: ${days}일 전 (${relative})`);
});

// 4) 고유 토큰 부여
const usersWithToken = users.map(u => ({
  ..._.pick(u, ['name', 'role']),
  token: uuidv4(),
}));
console.log("토큰 부여:");
usersWithToken.forEach(u => {
  console.log(`  ${u.name}: ${u.token}`);
});
