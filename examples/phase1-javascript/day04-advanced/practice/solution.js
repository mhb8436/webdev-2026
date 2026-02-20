// ============================================
// Day 04 연습 문제 풀이 - 구조분해, spread, 화살표함수, reduce
// ============================================

// --------------------------------------------
// 문제 1: 객체 병합기
// --------------------------------------------
console.log('=== 문제 1: 객체 병합기 ===');

const mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
};

const obj1 = { name: '김철수', age: 25, city: '서울' };
const obj2 = { age: 30, job: '개발자', city: '부산' };
const merged = mergeObjects(obj1, obj2);

console.log('원본1:', obj1);
console.log('원본2:', obj2);
console.log('병합:', merged);

// 원본이 변경되지 않았는지 확인
console.log('원본1 변경 여부:', obj1.age === 25 ? '변경 없음' : '변경됨');

console.log('');

// --------------------------------------------
// 문제 2: 배열 유틸리티
// --------------------------------------------
console.log('=== 문제 2: 배열 유틸리티 ===');

// 중복 제거
const unique = (arr) => [...new Set(arr)];

// 배열 섞기 (Fisher-Yates 알고리즘)
const shuffle = (arr) => {
    const result = [...arr]; // 원본 복사
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]]; // 구조분해로 swap
    }
    return result;
};

// 배열 청크 나누기
const chunk = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const duplicated = [1, 2, 2, 3, 3, 3, 4, 5];
console.log(`원본: [${duplicated}]`);
console.log(`중복 제거: [${unique(duplicated)}]`);

console.log('');

const original = [1, 2, 3, 4, 5];
console.log(`원본: [${original}]`);
console.log(`섞기: [${shuffle(original)}]`);
console.log(`원본 유지: [${original}]`);

console.log('');

const nums = [1, 2, 3, 4, 5, 6, 7];
console.log(`원본: [${nums}]`);
console.log('2개씩 나누기:', chunk(nums, 2));
console.log('3개씩 나누기:', chunk(nums, 3));

console.log('');

// --------------------------------------------
// 문제 3: 구조분해 연습
// --------------------------------------------
console.log('=== 문제 3: 구조분해 연습 ===');

const data = {
    user: {
        name: '이영희',
        address: {
            city: '서울',
            zip: '06123',
        },
    },
    scores: [90, 85, 78],
};

// 중첩 객체 구조분해
const {
    user: {
        name: userName,
        address: { city, zip },
    },
    scores: [firstScore, ...restScores],
} = data;

console.log(`도시: ${city}`);
console.log(`우편번호: ${zip}`);
console.log(`첫 번째 점수: ${firstScore}`);
console.log(`나머지 점수: [${restScores}]`);
console.log(`사용자 이름: ${userName}`);

console.log('');

// --------------------------------------------
// 문제 4: reduce 마스터
// --------------------------------------------
console.log('=== 문제 4: reduce 마스터 ===');

// 1. 배열의 최대값 찾기
const findMax = (arr) =>
    arr.reduce((max, current) => (current > max ? current : max), arr[0]);

const numbers = [5, 3, 9, 1, 7, 2, 8];
console.log(`배열: [${numbers}]`);
console.log(`최대값: ${findMax(numbers)}`);

console.log('');

// 2. 문자열 배열을 하나의 문장으로 합치기
const joinWords = (arr) =>
    arr.reduce((sentence, word) => sentence + ' ' + word);

const words = ['나는', '자바스크립트를', '공부합니다'];
console.log(`단어: [${words.map((w) => `'${w}'`).join(', ')}]`);
console.log(`문장: ${joinWords(words)}`);

console.log('');

// 3. 배열의 요소 빈도수 카운팅
const countFrequency = (arr) =>
    arr.reduce((freq, item) => {
        freq[item] = (freq[item] || 0) + 1;
        return freq;
    }, {});

const items = ['a', 'b', 'a', 'c', 'b', 'a'];
console.log(`배열: [${items.map((i) => `'${i}'`).join(', ')}]`);
console.log('빈도수:', countFrequency(items));
