// ============================================
// Day 02 연습 문제 풀이 - 함수, 조건문, 반복문
// ============================================

// --------------------------------------------
// 문제 1: 계산기 함수
// --------------------------------------------
console.log('=== 문제 1: 계산기 함수 ===');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return '0으로 나눌 수 없습니다';
    }
    return a / b;
}

console.log(`10 + 3 = ${add(10, 3)}`);
console.log(`10 - 3 = ${subtract(10, 3)}`);
console.log(`10 * 3 = ${multiply(10, 3)}`);
console.log(`10 / 3 = ${divide(10, 3)}`);
console.log(`10 / 0 = ${divide(10, 0)}`);

console.log('');

// --------------------------------------------
// 문제 2: 성적 판별기
// --------------------------------------------
console.log('=== 문제 2: 성적 판별기 ===');

function getGrade(score) {
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

const scores = [95, 82, 73, 61, 45];
for (let i = 0; i < scores.length; i++) {
    console.log(`${scores[i]}점 → ${getGrade(scores[i])}`);
}

console.log('');

// --------------------------------------------
// 문제 3: 구구단 출력기
// --------------------------------------------
console.log('=== 문제 3: 구구단 출력기 ===');

function printMultiTable(n) {
    console.log(`=== ${n}단 ===`);
    for (let i = 1; i <= 9; i++) {
        console.log(`${n} x ${i} = ${n * i}`);
    }
}

printMultiTable(3);
console.log('');
printMultiTable(7);

console.log('');

// --------------------------------------------
// 문제 4: 배열 통계
// --------------------------------------------
console.log('=== 문제 4: 배열 통계 ===');

function getStats(arr) {
    let sum = 0;
    let max = arr[0];
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];

        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    const average = sum / arr.length;

    return { sum, average, max, min };
}

const numbers = [10, 20, 30, 40, 50];
const stats = getStats(numbers);
console.log(`입력: [${numbers}]`);
console.log(`합계: ${stats.sum}`);
console.log(`평균: ${stats.average}`);
console.log(`최대값: ${stats.max}`);
console.log(`최소값: ${stats.min}`);

console.log('');

// 추가 테스트
const numbers2 = [3, 7, 1, 9, 4, 6, 2, 8, 5];
const stats2 = getStats(numbers2);
console.log(`입력: [${numbers2}]`);
console.log(`합계: ${stats2.sum}`);
console.log(`평균: ${stats2.average}`);
console.log(`최대값: ${stats2.max}`);
console.log(`최소값: ${stats2.min}`);
