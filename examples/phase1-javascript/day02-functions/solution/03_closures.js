// ============================================
// Day 02 - 클로저와 스코프 (풀이)
// ============================================

// --- 1. 스코프 이해 ---
console.log("=== 스코프 ===");

const globalVar = "전역 변수";

function scopeDemo() {
  const functionVar = "함수 스코프 변수";
  console.log("함수 내부:", globalVar);       // 접근 가능
  console.log("함수 내부:", functionVar);      // 접근 가능

  if (true) {
    const blockVar = "블록 스코프 변수";
    let blockLet = "블록 let 변수";
    console.log("블록 내부:", blockVar);       // 접근 가능
  }
  // console.log(blockVar);  // 에러! 블록 밖에서 접근 불가
}

scopeDemo();
// console.log(functionVar);  // 에러! 함수 밖에서 접근 불가
console.log("");

// --- 2. 클로저 기본 - 카운터 ---
console.log("=== 클로저: 카운터 ===");

function createCounter(initial = 0) {
  let count = initial;  // 외부에서 직접 접근 불가!

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log("초기값:", counter.getCount());    // 0
counter.increment();
counter.increment();
counter.increment();
console.log("3번 증가:", counter.getCount()); // 3
counter.decrement();
console.log("1번 감소:", counter.getCount()); // 2
// console.log(count);  // 에러! 직접 접근 불가
console.log("");

// --- 3. Private 변수: 은행 계좌 ---
console.log("=== 클로저: 은행 계좌 ===");

function createBankAccount(owner, initialBalance) {
  let balance = initialBalance;  // private 변수

  return {
    deposit(amount) {
      if (amount <= 0) {
        console.log("  입금액은 0보다 커야 합니다");
        return false;
      }
      balance += amount;
      console.log(`  입금: ${amount}원 → 잔액: ${balance}원`);
      return true;
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("  잔액이 부족합니다");
        return false;
      }
      balance -= amount;
      console.log(`  출금: ${amount}원 → 잔액: ${balance}원`);
      return true;
    },
    getBalance: () => balance,
    getOwner: () => owner,
  };
}

const account = createBankAccount("김개발", 10000);
console.log(`계좌주: ${account.getOwner()}`);
console.log(`잔액: ${account.getBalance()}원`);
account.deposit(5000);
account.withdraw(3000);
account.withdraw(20000);  // 잔액 부족
console.log(`최종 잔액: ${account.getBalance()}원`);
console.log("");

// --- 4. IIFE ---
console.log("=== IIFE (즉시 실행 함수) ===");

const appModule = (function () {
  // 이 안의 변수는 전역을 오염시키지 않음
  const version = "1.0.0";
  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    console.log(`  앱 v${version} 초기화 완료`);
  }

  return { init, getVersion: () => version };
})();

appModule.init();
console.log("  버전:", appModule.getVersion());
console.log("");

// --- 5. for 루프와 클로저 ---
console.log("=== for 루프 클로저 문제 ===");

// 문제 코드 (var 사용 시 모두 3 출력)
console.log("--- var 사용 (문제) ---");
for (var i = 0; i < 3; i++) {
  setTimeout(function () { console.log("  var:", i); }, 100);
}

// 해결 1: let 사용
console.log("--- let 사용 (해결) ---");
for (let j = 0; j < 3; j++) {
  setTimeout(function () { console.log("  let:", j); }, 200);
}

// 해결 2: IIFE 클로저
console.log("--- IIFE 클로저 (해결) ---");
for (var k = 0; k < 3; k++) {
  (function (captured) {
    setTimeout(function () { console.log("  IIFE:", captured); }, 300);
  })(k);
}
