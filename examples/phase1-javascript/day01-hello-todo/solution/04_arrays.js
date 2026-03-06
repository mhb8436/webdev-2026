// ============================================
// Day 01 - 배열 심화 (풀이)
// ============================================

// --- 1. 배열 생성과 접근 ---
console.log("=== 배열 생성과 접근 ===");
const fruits = ["사과", "바나나", "오렌지", "포도", "딸기"];
console.log("전체:", fruits);
console.log("첫번째:", fruits[0]);
console.log("마지막:", fruits[fruits.length - 1]);
console.log("at(-1):", fruits.at(-1));  // 음수 인덱스
console.log("길이:", fruits.length);
console.log("");

// --- 2. 배열 수정 ---
console.log("=== 배열 수정 ===");
const items = ["A", "B", "C"];

items.push("D");
console.log("push('D'):", items);    // ["A", "B", "C", "D"]

items.pop();
console.log("pop():", items);        // ["A", "B", "C"]

items.unshift("Z");
console.log("unshift('Z'):", items); // ["Z", "A", "B", "C"]

items.shift();
console.log("shift():", items);      // ["A", "B", "C"]

items.splice(1, 1, "X", "Y");
console.log("splice(1,1,'X','Y'):", items); // ["A", "X", "Y", "C"]
console.log("");

// --- 3. 배열 탐색 ---
console.log("=== 배열 탐색 ===");
console.log("indexOf('바나나'):", fruits.indexOf("바나나"));
console.log("includes('포도'):", fruits.includes("포도"));
console.log("includes('수박'):", fruits.includes("수박"));

const numbers = [10, 25, 30, 45, 50];
console.log("find(n > 20):", numbers.find(n => n > 20));       // 25
console.log("findIndex(n > 20):", numbers.findIndex(n => n > 20)); // 1
console.log("");

// --- 4. 배열 반복 ---
console.log("=== 배열 반복 ===");

console.log("--- for문 ---");
for (let i = 0; i < fruits.length; i++) {
  console.log(`  ${i}: ${fruits[i]}`);
}

console.log("--- for...of ---");
for (const fruit of fruits) {
  console.log(`  ${fruit}`);
}

console.log("--- forEach ---");
fruits.forEach((fruit, index) => {
  console.log(`  [${index}] ${fruit}`);
});
console.log("");

// --- 5. 배열 변환 ---
console.log("=== 배열 변환 ===");

const prices = [1000, 2000, 3000];
const withTax = prices.map(price => price * 1.1);
console.log("map(세금포함):", withTax);

const scores = [85, 92, 45, 78, 95, 60, 33];
const passed = scores.filter(score => score >= 60);
console.log("filter(60점이상):", passed);

const sum = scores.reduce((acc, cur) => acc + cur, 0);
console.log("reduce(합계):", sum);
console.log("평균:", (sum / scores.length).toFixed(1));

const nums = [30, 10, 50, 20, 40];
nums.sort((a, b) => a - b);
console.log("sort(오름차순):", nums);

nums.sort((a, b) => b - a);
console.log("sort(내림차순):", nums);

// 체이닝
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .reduce((sum, n) => sum + n, 0);
console.log("체이닝(짝수 제곱의 합):", result); // 220
