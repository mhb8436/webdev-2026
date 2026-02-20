// ============================================
// Day 01 - 첫 번째 할일 만들기 (풀이)
// ============================================
// 학습목표: 변수(let, const), 자료형(string, number, boolean),
//          배열(Array), console.log
// ============================================

// --- 변수 선언 ---
// const: 변경할 수 없는 상수 (앱 이름, 버전처럼 변하지 않는 값)
const appName = "나의 할일 관리";
const version = 1.0;

// 할일 목록 배열 (문자열 배열)
const todos = ["점심 먹기", "JavaScript 공부하기", "운동하기", "책 읽기", "코딩 연습하기"];

// --- 자료형 확인 (typeof 사용법) ---
// typeof 연산자를 사용하면 변수의 자료형을 확인할 수 있습니다.
console.log("--- 자료형 확인 ---");
console.log("appName의 타입:", typeof appName);   // string
console.log("version의 타입:", typeof version);   // number
console.log("todos의 타입:", typeof todos);       // object (배열은 object 타입)
console.log("");

// --- let vs const 차이점 ---
// let: 값을 나중에 변경할 수 있는 변수
// const: 한번 할당하면 변경할 수 없는 상수
let count = 0;          // let으로 선언하면 값을 바꿀 수 있음
count = todos.length;   // 값 변경 가능!
// const appName = "다른 이름";  // 오류! const는 재할당 불가

console.log("--- let vs const 차이 ---");
console.log("count (let):", count, "-> 값을 변경할 수 있습니다.");
console.log("appName (const):", appName, "-> 값을 변경할 수 없습니다.");
console.log("");

// --- boolean 자료형 ---
// boolean은 true(참) 또는 false(거짓) 값을 가집니다.
const isDone = false;
console.log("--- boolean 자료형 ---");
console.log("isDone:", isDone);
console.log("isDone의 타입:", typeof isDone);  // boolean
console.log("");

// --- 할일 목록 출력 ---
// 앱 헤더 출력
console.log(`=== ${appName} v${version} ===`);

// for 반복문으로 할일 목록 출력
// i는 0부터 시작하지만, 사용자에게 보여줄 때는 i+1로 1부터 시작
for (let i = 0; i < todos.length; i++) {
    console.log(`${i + 1}. ${todos[i]}`);
}

// 구분선 출력
console.log("--------------------------");

// 전체 할일 개수 출력
console.log(`총 할일 개수: ${todos.length}개`);
