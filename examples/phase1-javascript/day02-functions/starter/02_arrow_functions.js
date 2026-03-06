// ============================================
// Day 02 - 화살표 함수와 콜백
// ============================================
// 학습목표: 화살표 함수 문법, 콜백 함수, 함수를 값으로 다루기

// TODO 1: 일반 함수를 화살표 함수로 변환하세요
// function add(a, b) { return a + b; }
// → const add = (a, b) => a + b;
// function square(n) { return n * n; }
// → const square = ...
// function greet() { return "안녕하세요!"; }
// → const greet = ...


// TODO 2: 배열 메서드에 화살표 함수 사용
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// - 짝수만 필터: numbers.filter(n => ...)
// - 각 수의 제곱: numbers.map(n => ...)
// - 합계: numbers.reduce((sum, n) => ..., 0)


// TODO 3: 콜백 함수 패턴
// function repeat(n, callback) 함수를 만드세요
// n번 반복하면서 callback(i)를 호출합니다
// 사용 예: repeat(3, (i) => console.log(`${i+1}번째 실행`))


// TODO 4: 함수를 반환하는 함수 (함수 팩토리)
// function createMultiplier(factor) 함수를 만드세요
// 이 함수는 인자에 factor를 곱하는 새 함수를 반환합니다
// 예: const double = createMultiplier(2); double(5) → 10


// TODO 5: 배열 메서드 체이닝
// 학생 데이터:
// const students = [
//   { name: "김철수", score: 85, grade: 3 },
//   { name: "이영희", score: 92, grade: 2 },
//   { name: "박민수", score: 78, grade: 3 },
//   { name: "최지우", score: 95, grade: 1 },
//   { name: "정하나", score: 88, grade: 2 },
// ];
// - 3학년 학생만 필터링
// - 이름만 추출
// - 결과 출력
