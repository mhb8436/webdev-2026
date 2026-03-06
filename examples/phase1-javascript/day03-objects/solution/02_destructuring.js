// ============================================
// Day 03 - 구조분해 할당과 스프레드 (풀이)
// ============================================

// --- 1. 객체 구조분해 ---
console.log("=== 객체 구조분해 ===");
const user = { name: "김개발", age: 25, city: "서울" };
const { name, age, city } = user;
console.log(`이름: ${name}, 나이: ${age}, 도시: ${city}`);
console.log("");

// --- 2. 기본값과 별칭 ---
console.log("=== 기본값과 별칭 ===");
const config = { host: "localhost", port: 3000 };
const { host: serverHost, port, timeout = 5000 } = config;
console.log(`서버: ${serverHost}:${port}, 타임아웃: ${timeout}`);
console.log("");

// --- 3. 배열 구조분해 ---
console.log("=== 배열 구조분해 ===");
const colors = ["빨강", "파랑", "초록", "노랑", "보라"];

const [first, second, ...rest] = colors;
console.log("첫째:", first);      // "빨강"
console.log("둘째:", second);     // "파랑"
console.log("나머지:", rest);      // ["초록", "노랑", "보라"]

// 건너뛰기
const [, , third] = colors;
console.log("세번째만:", third);   // "초록"

// 변수 교환
let a = 1, b = 2;
[a, b] = [b, a];
console.log(`교환 후: a=${a}, b=${b}`); // a=2, b=1
console.log("");

// --- 4. 스프레드 연산자 ---
console.log("=== 스프레드 연산자 ===");

// 배열 합치기
const front = [1, 2, 3];
const back = [4, 5, 6];
const merged = [...front, ...back];
console.log("배열 합치기:", merged);

// 배열 복사 (얕은 복사)
const copy = [...front];
copy.push(99);
console.log("원본:", front);  // [1, 2, 3] 영향 없음
console.log("복사본:", copy); // [1, 2, 3, 99]

// 객체 합치기
const defaults = { theme: "light", lang: "ko", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 16 };
const settings = { ...defaults, ...userPrefs };
console.log("설정 병합:", settings);
// { theme: "dark", lang: "ko", fontSize: 16 }

// 객체 복사 + 수정
const updatedUser = { ...user, age: 26, email: "kim@dev.com" };
console.log("업데이트된 유저:", updatedUser);
console.log("");

// --- 5. 함수 매개변수 구조분해 ---
console.log("=== 함수 매개변수 구조분해 ===");

function printUser({ name, age, city = "미정" }) {
  console.log(`  ${name} (${age}세, ${city})`);
}

const users = [
  { name: "김철수", age: 30, city: "서울" },
  { name: "이영희", age: 25, city: "부산" },
  { name: "박민수", age: 28 },  // city 없음 → 기본값 "미정"
];

users.forEach(printUser);
console.log("");

// --- 6. 중첩 구조분해 ---
console.log("=== 중첩 구조분해 ===");

const company = {
  name: "테크컴퍼니",
  address: { city: "서울", zip: "12345" },
  employees: [{ name: "김개발", role: "개발자" }]
};

const {
  name: companyName,
  address: { city: companyCity },
  employees: [{ name: firstEmployee, role }]
} = company;

console.log(`회사: ${companyName}`);
console.log(`위치: ${companyCity}`);
console.log(`첫 직원: ${firstEmployee} (${role})`);
