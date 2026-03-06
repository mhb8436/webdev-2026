// ============================================
// Day 03 - JSON 다루기
// ============================================
// 학습목표: JSON.stringify, JSON.parse, 깊은 복사

// TODO 1: 객체 → JSON 문자열 (직렬화)
// const user = { name: "김개발", age: 25, skills: ["JS", "TS"] };
// JSON.stringify(user) - 기본 변환
// JSON.stringify(user, null, 2) - 들여쓰기 포맷팅


// TODO 2: JSON 문자열 → 객체 (역직렬화)
// const jsonStr = '{"name":"이영희","age":30,"city":"부산"}';
// JSON.parse(jsonStr) 로 객체로 변환하세요


// TODO 3: 얕은 복사 vs 깊은 복사
// const original = { name: "원본", nested: { value: 100 } };
// 얕은 복사: { ...original }  → nested는 같은 참조
// 깊은 복사: JSON.parse(JSON.stringify(original))
// structuredClone(original) → 최신 방식
// 각 방식으로 복사 후 nested.value를 변경하고 원본 확인


// TODO 4: JSON 활용 - 데이터 저장/로드 시뮬레이션
// saveTodos(todos) → JSON 문자열로 변환하여 반환
// loadTodos(jsonStr) → 객체 배열로 변환하여 반환
// 에러 처리: try/catch로 잘못된 JSON 처리
