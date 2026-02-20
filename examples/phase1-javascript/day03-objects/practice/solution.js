// ============================================
// Day 03 연습 문제 풀이 - 객체, 배열 메서드, Date
// ============================================

// --------------------------------------------
// 문제 1: 학생 관리
// --------------------------------------------
console.log('=== 문제 1: 학생 관리 ===');

const students = [
    { name: '김철수', score: 92, grade: 3 },
    { name: '이영희', score: 88, grade: 2 },
    { name: '박지민', score: 76, grade: 1 },
    { name: '최수현', score: 64, grade: 2 },
    { name: '정우성', score: 55, grade: 3 },
];

// 전체 평균 점수 계산
let totalScore = 0;
for (let i = 0; i < students.length; i++) {
    totalScore += students[i].score;
}
const averageScore = totalScore / students.length;
console.log(`전체 평균: ${averageScore}점`);

// 평균 이상 학생 필터링
const aboveAverage = students.filter(function (student) {
    return student.score >= averageScore;
});

// 이름 목록 추출
const names = aboveAverage.map(function (student) {
    return student.name;
});

console.log('=== 평균 이상 학생 ===');
console.log(`우수 학생: ${names.join(', ')}`);

console.log('');

// --------------------------------------------
// 문제 2: 영화 검색기
// --------------------------------------------
console.log('=== 문제 2: 영화 검색기 ===');

const movies = [
    { title: '기생충', genre: '드라마', rating: 9.5, year: 2019 },
    { title: '어벤져스', genre: '액션', rating: 8.5, year: 2012 },
    { title: '다크나이트', genre: '액션', rating: 9.0, year: 2008 },
    { title: '인사이드 아웃', genre: '애니메이션', rating: 8.8, year: 2015 },
    { title: '라라랜드', genre: '로맨스', rating: 8.7, year: 2016 },
    { title: '올드보이', genre: '드라마', rating: 8.9, year: 2003 },
];

// 장르별 검색
function searchByGenre(movies, genre) {
    return movies.filter(function (movie) {
        return movie.genre === genre;
    });
}

// 평점순 정렬
function sortByRating(movies) {
    // 원본 배열을 변경하지 않기 위해 복사 후 정렬
    const copied = movies.slice();
    copied.sort(function (a, b) {
        return b.rating - a.rating;
    });
    return copied;
}

// 특정 년도 이후 영화
function getMoviesAfter(movies, year) {
    return movies.filter(function (movie) {
        return movie.year >= year;
    });
}

// 장르 검색 테스트
const actionMovies = searchByGenre(movies, '액션');
console.log('=== 액션 영화 ===');
actionMovies.forEach(function (movie) {
    console.log(`- ${movie.title} (${movie.year}) ★${movie.rating}`);
});

console.log('');

// 평점순 정렬 테스트
const sorted = sortByRating(movies);
console.log('=== 평점순 정렬 ===');
sorted.forEach(function (movie, index) {
    console.log(`${index + 1}. ${movie.title} ★${movie.rating}`);
});

console.log('');

// 년도 필터 테스트
const recentMovies = getMoviesAfter(movies, 2015);
console.log('=== 2015년 이후 영화 ===');
recentMovies.forEach(function (movie) {
    console.log(`- ${movie.title} (${movie.year})`);
});

console.log('');

// --------------------------------------------
// 문제 3: D-Day 계산기
// --------------------------------------------
console.log('=== 문제 3: D-Day 계산기 ===');

function calculateDDay(targetDate, eventName) {
    const today = new Date();
    const target = new Date(targetDate);

    // 시간 부분을 제거하고 날짜만 비교
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        console.log(`${eventName}까지: D-${diffDays}`);
    } else if (diffDays === 0) {
        console.log(`${eventName}: D-Day (오늘입니다!)`);
    } else {
        console.log(`${eventName}: ${Math.abs(diffDays)}일 지났습니다`);
    }
}

// 오늘 날짜 출력
const today = new Date();
const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
const dayName = dayNames[today.getDay()];
console.log(
    `오늘: ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${dayName})`
);

// D-Day 테스트
calculateDDay('2025-12-25', '크리스마스');
calculateDDay('2026-01-01', '새해');
calculateDDay('2025-01-01', '올해 시작일');
calculateDDay('2025-07-01', '여름방학');

console.log('');

// --------------------------------------------
// 문제 4: 주소록
// --------------------------------------------
console.log('=== 문제 4: 주소록 ===');

const contacts = [
    {
        name: '김철수',
        phone: '010-1234-5678',
        email: 'cs@email.com',
        group: '친구',
    },
    {
        name: '이영희',
        phone: '010-2345-6789',
        email: 'yh@email.com',
        group: '직장',
    },
    {
        name: '김영수',
        phone: '010-1111-2222',
        email: 'ys@email.com',
        group: '가족',
    },
    {
        name: '김미영',
        phone: '010-3333-4444',
        email: 'my@email.com',
        group: '가족',
    },
    {
        name: '박준혁',
        phone: '010-5555-6666',
        email: 'jh@email.com',
        group: '친구',
    },
];

// 이름으로 검색
function findByName(contacts, name) {
    return contacts.find(function (contact) {
        return contact.name === name;
    });
}

// 그룹별 필터
function filterByGroup(contacts, group) {
    return contacts.filter(function (contact) {
        return contact.group === group;
    });
}

// 전체 요약 출력
function printSummary(contacts) {
    const summaries = contacts.map(function (contact, index) {
        return `${index + 1}. ${contact.name} (${contact.group}) - ${contact.email}`;
    });

    summaries.forEach(function (summary) {
        console.log(summary);
    });
}

// 이름으로 검색 테스트
console.log('=== 이름으로 검색: 김철수 ===');
const found = findByName(contacts, '김철수');
if (found) {
    console.log(`이름: ${found.name}`);
    console.log(`전화번호: ${found.phone}`);
    console.log(`이메일: ${found.email}`);
    console.log(`그룹: ${found.group}`);
} else {
    console.log('검색 결과가 없습니다.');
}

console.log('');

// 그룹별 필터 테스트
console.log('=== 그룹: 가족 ===');
const familyContacts = filterByGroup(contacts, '가족');
familyContacts.forEach(function (contact) {
    console.log(`- ${contact.name} (${contact.phone})`);
});

console.log('');

// 전체 요약 테스트
console.log('=== 전체 연락처 요약 ===');
printSummary(contacts);
