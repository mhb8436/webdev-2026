// ============================================
// Day 01 추가 연습 풀이
// ============================================

// 문제 5: 학생 성적 분석기
console.log("=== 문제 5: 학생 성적 분석기 ===");
const students = ["김철수", "이영희", "박민수", "최지우", "정하나"];
const scores = [85, 92, 78, 95, 88];

for (let i = 0; i < students.length; i++) {
  console.log(`${students[i]}: ${scores[i]}점`);
}

const maxScore = Math.max(...scores);
const minScore = Math.min(...scores);
const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;

console.log(`최고 점수: ${maxScore}점`);
console.log(`최저 점수: ${minScore}점`);
console.log(`평균 점수: ${avgScore.toFixed(1)}점`);

const topStudents = students.filter((_, i) => scores[i] >= 90);
console.log(`90점 이상: ${topStudents.join(", ")}`);
console.log("");

// 문제 6: 문자열 분석기
console.log("=== 문제 6: 문자열 분석기 ===");
const sentence = "JavaScript는 웹 개발의 필수 프로그래밍 언어입니다";
console.log(`글자 수: ${sentence.length}`);
console.log(`공백 제외: ${sentence.replace(/ /g, "").length}`);
console.log(`단어 수: ${sentence.split(" ").length}`);
console.log(`'프로그래밍' 포함: ${sentence.includes("프로그래밍")}`);
console.log(`공백→_: ${sentence.replace(/ /g, "_")}`);
console.log("");

// 문제 7: 배열 조작 챌린지
console.log("=== 문제 7: 배열 조작 챌린지 ===");
const nums = [5, 3, 8, 1, 9, 2, 7, 4, 6, 10];
console.log("오름차순:", [...nums].sort((a, b) => a - b));
console.log("짝수만:", nums.filter(n => n % 2 === 0));
console.log("2배:", nums.map(n => n * 2));
console.log("합계:", nums.reduce((s, n) => s + n, 0));
console.log("5보다 큰 수:", nums.filter(n => n > 5).length, "개");
