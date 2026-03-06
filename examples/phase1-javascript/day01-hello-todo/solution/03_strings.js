// ============================================
// Day 01 - 문자열 다루기 (풀이)
// ============================================

const message = "Hello, JavaScript World!";

// --- 1. 문자열 기본 ---
console.log("=== 문자열 기본 ===");
console.log("원본:", message);
console.log("길이:", message.length);
console.log("대문자:", message.toUpperCase());
console.log("소문자:", message.toLowerCase());
console.log("3번째 글자:", message[2]);
console.log("마지막 글자:", message[message.length - 1]);
console.log("");

// --- 2. 문자열 검색 ---
console.log("=== 문자열 검색 ===");
console.log("indexOf('JavaScript'):", message.indexOf("JavaScript"));  // 7
console.log("indexOf('Python'):", message.indexOf("Python"));          // -1
console.log("includes('World'):", message.includes("World"));          // true
console.log("startsWith('Hello'):", message.startsWith("Hello"));      // true
console.log("endsWith('!'):", message.endsWith("!"));                  // true
console.log("");

// --- 3. 문자열 자르기 ---
console.log("=== 문자열 자르기 ===");
console.log("slice(7, 17):", message.slice(7, 17));       // "JavaScript"
console.log("slice(-6):", message.slice(-6));               // "orld!"
console.log("substring(7, 17):", message.substring(7, 17));
console.log("split(', '):", message.split(", "));           // ["Hello", "JavaScript World!"]
console.log("split(''):", "abc".split(""));                  // ["a", "b", "c"]
console.log("");

// --- 4. 문자열 변환 ---
console.log("=== 문자열 변환 ===");
const messy = "   공백 포함 문자열   ";
console.log("trim():", `'${messy.trim()}'`);
console.log("trimStart():", `'${messy.trimStart()}'`);
console.log("replace:", message.replace("JavaScript", "TypeScript"));
console.log("repeat(3):", "하하".repeat(3));
console.log("padStart:", "5".padStart(3, "0"));   // "005"
console.log("padEnd:", "5".padEnd(3, "0"));        // "500"
console.log("");

// --- 5. 템플릿 리터럴 ---
console.log("=== 템플릿 리터럴 ===");
const userName = "김개발";
const score = 85;

const multiLine = `
이름: ${userName}
점수: ${score}
등급: ${score >= 90 ? "A" : score >= 80 ? "B" : "C"}
합격여부: ${score >= 60 ? "합격" : "불합격"}
`;
console.log(multiLine);

console.log(`3 + 4 = ${3 + 4}`);
console.log(`현재 시간: ${new Date().toLocaleTimeString()}`);
console.log(`배열 길이: ${[1, 2, 3].length}`);
