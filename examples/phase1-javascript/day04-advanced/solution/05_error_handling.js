// ============================================
// Day 04 - 에러 처리 심화 (풀이)
// ============================================

// --- 1. 기본 에러 처리 ---
console.log("=== 기본 에러 처리 ===");

function divide(a, b) {
  if (b === 0) throw new Error("0으로 나눌 수 없습니다");
  return a / b;
}

try {
  console.log("10 / 2 =", divide(10, 2));
  console.log("10 / 0 =", divide(10, 0));
} catch (error) {
  console.log("에러:", error.message);
} finally {
  console.log("항상 실행");
}
console.log("");

// --- 2. 에러 타입 구분 ---
console.log("=== 에러 타입 ===");

const errors = [
  () => { null.property; },            // TypeError
  () => { [].length = -1; },           // RangeError
  () => { undeclaredVar; },            // ReferenceError
];

errors.forEach((fn, i) => {
  try { fn(); }
  catch (e) {
    console.log(`  ${e.constructor.name}: ${e.message}`);
  }
});
console.log("");

// --- 3. 커스텀 에러 ---
console.log("=== 커스텀 에러 ===");

class ValidationError extends Error {
  constructor(field, message) {
    super(`${field}: ${message}`);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} (id: ${id})를 찾을 수 없습니다`);
    this.name = "NotFoundError";
    this.resource = resource;
    this.id = id;
  }
}

// --- 4. 입력 검증 ---
console.log("=== 입력 검증 ===");

function validateUser(user) {
  if (!user.name || user.name.trim().length < 2) {
    throw new ValidationError("name", "이름은 2자 이상이어야 합니다");
  }
  if (!user.email || !user.email.includes("@")) {
    throw new ValidationError("email", "유효한 이메일이 아닙니다");
  }
  if (typeof user.age !== "number" || user.age < 0 || user.age > 150) {
    throw new ValidationError("age", "나이는 0~150 사이여야 합니다");
  }
  return true;
}

const testUsers = [
  { name: "김", email: "kim@dev.com", age: 25 },
  { name: "이영희", email: "invalid", age: 30 },
  { name: "박민수", email: "park@dev.com", age: -5 },
  { name: "최지우", email: "choi@dev.com", age: 28 },
];

testUsers.forEach(user => {
  try {
    validateUser(user);
    console.log(`  ${user.name}: 유효함`);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.log(`  ${user.name}: 검증 실패 [${e.field}] ${e.message}`);
    }
  }
});
console.log("");

// --- 5. 비동기 에러 + 재시도 ---
console.log("=== 비동기 재시도 ===");

let attemptCount = 0;

async function unreliableFetch() {
  attemptCount++;
  if (attemptCount < 3) {
    throw new Error(`시도 ${attemptCount}: 네트워크 오류`);
  }
  return { data: "성공!" };
}

async function fetchWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn();
      console.log(`  시도 ${i + 1}: 성공`);
      return result;
    } catch (error) {
      console.log(`  시도 ${i + 1}: ${error.message}`);
      if (i === retries - 1) throw error;
    }
  }
}

(async () => {
  try {
    const result = await fetchWithRetry(unreliableFetch, 5);
    console.log("  최종 결과:", result.data);
  } catch (error) {
    console.log("  모든 시도 실패:", error.message);
  }
})();
