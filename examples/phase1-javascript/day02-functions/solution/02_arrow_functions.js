// ============================================
// Day 02 - 화살표 함수와 콜백 (풀이)
// ============================================

// --- 1. 화살표 함수 변환 ---
console.log("=== 화살표 함수 ===");

// 매개변수 2개: 괄호 필수
const add = (a, b) => a + b;
console.log("add(3, 5):", add(3, 5));

// 매개변수 1개: 괄호 생략 가능
const square = n => n * n;
console.log("square(4):", square(4));

// 매개변수 0개: 빈 괄호 필수
const greet = () => "안녕하세요!";
console.log("greet():", greet());

// 여러 줄: 중괄호와 return 필요
const getInfo = (name, age) => {
  const message = `${name}님은 ${age}세입니다.`;
  return message;
};
console.log(getInfo("김개발", 25));
console.log("");

// --- 2. 배열 메서드 + 화살표 함수 ---
console.log("=== 배열 메서드 ===");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
console.log("짝수:", evens);

const squares = numbers.map(n => n * n);
console.log("제곱:", squares);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("합계:", sum);
console.log("");

// --- 3. 콜백 함수 ---
console.log("=== 콜백 함수 ===");

function repeat(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}

repeat(3, (i) => console.log(`  ${i + 1}번째 실행`));
console.log("");

// 다양한 콜백 전달
console.log("--- 다양한 콜백 ---");
repeat(5, (i) => process.stdout.write("*"));
console.log(" ← repeat(5, 별출력)");

repeat(3, (i) => console.log(`  카운트: ${i}`));
console.log("");

// --- 4. 함수를 반환하는 함수 ---
console.log("=== 함수 팩토리 ===");

function createMultiplier(factor) {
  return (number) => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log("double(5):", double(5));     // 10
console.log("triple(5):", triple(5));     // 15
console.log("tenTimes(5):", tenTimes(5)); // 50

// 배열에 적용
console.log("map(double):", [1, 2, 3].map(double));   // [2, 4, 6]
console.log("map(triple):", [1, 2, 3].map(triple));   // [3, 6, 9]
console.log("");

// --- 5. 배열 체이닝 ---
console.log("=== 배열 체이닝 ===");

const students = [
  { name: "김철수", score: 85, grade: 3 },
  { name: "이영희", score: 92, grade: 2 },
  { name: "박민수", score: 78, grade: 3 },
  { name: "최지우", score: 95, grade: 1 },
  { name: "정하나", score: 88, grade: 2 },
];

const grade3Names = students
  .filter(s => s.grade === 3)
  .map(s => s.name);
console.log("3학년:", grade3Names);

const topStudents = students
  .filter(s => s.score >= 90)
  .map(s => `${s.name}(${s.score}점)`)
  .join(", ");
console.log("90점 이상:", topStudents);

const avgScore = students.reduce((sum, s) => sum + s.score, 0) / students.length;
console.log("전체 평균:", avgScore.toFixed(1));
