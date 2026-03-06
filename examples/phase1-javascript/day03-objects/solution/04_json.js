// ============================================
// Day 03 - JSON 다루기 (풀이)
// ============================================

// --- 1. 직렬화 ---
console.log("=== 객체 → JSON ===");
const user = { name: "김개발", age: 25, skills: ["JS", "TS"] };

const jsonCompact = JSON.stringify(user);
console.log("압축:", jsonCompact);

const jsonPretty = JSON.stringify(user, null, 2);
console.log("포맷팅:\n" + jsonPretty);

// 특정 키만 포함
const partial = JSON.stringify(user, ["name", "age"]);
console.log("부분:", partial);  // {"name":"김개발","age":25}
console.log("");

// --- 2. 역직렬화 ---
console.log("=== JSON → 객체 ===");
const jsonStr = '{"name":"이영희","age":30,"city":"부산"}';
const parsed = JSON.parse(jsonStr);
console.log("파싱:", parsed);
console.log("이름:", parsed.name);
console.log("타입:", typeof parsed); // "object"
console.log("");

// --- 3. 얕은 복사 vs 깊은 복사 ---
console.log("=== 복사 비교 ===");
const original = { name: "원본", nested: { value: 100 } };

// 얕은 복사
const shallow = { ...original };
shallow.nested.value = 999;
console.log("얕은 복사 후 원본:", original.nested.value); // 999 (영향 받음!)

// 원본 복구
original.nested.value = 100;

// 깊은 복사 (JSON 방식)
const deep = JSON.parse(JSON.stringify(original));
deep.nested.value = 999;
console.log("깊은 복사 후 원본:", original.nested.value); // 100 (영향 없음)

// structuredClone (최신 방식)
const deep2 = structuredClone(original);
deep2.nested.value = 777;
console.log("structuredClone 후 원본:", original.nested.value); // 100
console.log("");

// --- 4. 데이터 저장/로드 ---
console.log("=== 데이터 저장/로드 ===");

function saveTodos(todos) {
  return JSON.stringify(todos, null, 2);
}

function loadTodos(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data)) throw new Error("배열이 아닙니다");
    return data;
  } catch (error) {
    console.log("로드 실패:", error.message);
    return [];
  }
}

const todos = [
  { id: 1, title: "공부하기", done: false },
  { id: 2, title: "운동하기", done: true },
];

const saved = saveTodos(todos);
console.log("저장된 JSON:\n" + saved);

const loaded = loadTodos(saved);
console.log("로드된 데이터:", loaded);

// 잘못된 JSON 처리
const invalid = loadTodos("{잘못된 json}");
console.log("잘못된 JSON:", invalid); // []
