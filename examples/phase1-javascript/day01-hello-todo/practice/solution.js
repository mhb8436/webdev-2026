// ============================================
// Day 01 연습 문제 풀이 - 변수, 자료형, 배열, console.log
// ============================================

// --------------------------------------------
// 문제 1: 자기소개 프로그램
// --------------------------------------------
console.log('=== 문제 1: 자기소개 프로그램 ===');

const name = '김민수';
const age = 25;
const job = '개발자';

console.log(`이름: ${name}`);
console.log(`나이: ${age}`);
console.log(`직업: ${job}`);
console.log(`이름의 타입: ${typeof name}`);
console.log(`나이의 타입: ${typeof age}`);
console.log(`직업의 타입: ${typeof job}`);

console.log('');

// --------------------------------------------
// 문제 2: 쇼핑 목록
// --------------------------------------------
console.log('=== 문제 2: 쇼핑 목록 ===');

const shoppingList = ['노트북', '키보드', '마우스', '모니터', '헤드셋'];

console.log('=== 쇼핑 목록 ===');
console.log(`1. ${shoppingList[0]}`);
console.log(`2. ${shoppingList[1]}`);
console.log(`3. ${shoppingList[2]}`);
console.log(`4. ${shoppingList[3]}`);
console.log(`5. ${shoppingList[4]}`);
console.log(`총 ${shoppingList.length}개의 물건이 있습니다.`);

console.log('');

// --------------------------------------------
// 문제 3: 온도 변환기
// --------------------------------------------
console.log('=== 문제 3: 온도 변환기 ===');

const temperatures = [0, 25, 37, 100];

const fahrenheit1 = temperatures[0] * 9 / 5 + 32;
console.log(`섭씨 ${temperatures[0]}도 → 화씨 ${fahrenheit1}도`);

const fahrenheit2 = temperatures[1] * 9 / 5 + 32;
console.log(`섭씨 ${temperatures[1]}도 → 화씨 ${fahrenheit2}도`);

const fahrenheit3 = temperatures[2] * 9 / 5 + 32;
console.log(`섭씨 ${temperatures[2]}도 → 화씨 ${fahrenheit3}도`);

const fahrenheit4 = temperatures[3] * 9 / 5 + 32;
console.log(`섭씨 ${temperatures[3]}도 → 화씨 ${fahrenheit4}도`);

console.log('');

// --------------------------------------------
// 문제 4: 좋아하는 것 목록
// --------------------------------------------
console.log('=== 문제 4: 좋아하는 것 목록 ===');

const foods = ['피자', '떡볶이', '초밥'];
const movies = ['인터스텔라', '어벤져스', '기생충'];
const songs = ['Dynamite', 'Blinding Lights', 'Shape of You'];

console.log('=== 좋아하는 것 목록 ===');
console.log(`[음식] 총 ${foods.length}개 - 가장 좋아하는 것: ${foods[0]}`);
console.log(`[영화] 총 ${movies.length}개 - 가장 좋아하는 것: ${movies[0]}`);
console.log(`[노래] 총 ${songs.length}개 - 가장 좋아하는 것: ${songs[0]}`);
