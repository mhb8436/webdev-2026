// ============================================
// Day 03 - 구조분해 할당과 스프레드
// ============================================
// 학습목표: 객체/배열 구조분해, 스프레드 연산자, rest 매개변수

// TODO 1: 객체 구조분해 기본
// const user = { name: "김개발", age: 25, city: "서울" };
// 구조분해로 name, age, city를 개별 변수로 추출하세요
// 힌트: const { name, age, city } = user;


// TODO 2: 기본값과 별칭
// const config = { host: "localhost", port: 3000 };
// timeout 속성이 없으면 기본값 5000 사용
// host를 serverHost라는 다른 이름으로 추출
// 힌트: const { host: serverHost, timeout = 5000 } = config;


// TODO 3: 배열 구조분해
// const colors = ["빨강", "파랑", "초록", "노랑", "보라"];
// 첫 두 개만 추출, 나머지는 rest로 모으기
// 특정 위치 건너뛰기 (쉼표로)


// TODO 4: 스프레드 연산자
// 배열 합치기: [...arr1, ...arr2]
// 객체 합치기: {...obj1, ...obj2}
// 배열/객체 복사하기 (얕은 복사)


// TODO 5: 함수 매개변수에서 구조분해
// function printUser({ name, age, city = "미정" }) 함수 작성
// const users 배열을 forEach로 돌면서 호출


// TODO 6: 중첩 구조분해
// const company = {
//   name: "테크컴퍼니",
//   address: { city: "서울", zip: "12345" },
//   employees: [{ name: "김개발", role: "개발자" }]
// };
// company.address.city와 첫 번째 직원 이름을 추출하세요
