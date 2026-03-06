// ============================================
// Day 02 - 클로저와 스코프
// ============================================
// 학습목표: 스코프 체인, 클로저의 개념과 활용

// TODO 1: 스코프 이해
// 전역 스코프, 함수 스코프, 블록 스코프(let/const)의 차이를
// 예제를 만들어 확인하세요


// TODO 2: 클로저 기본
// function createCounter() 함수를 만드세요
// 내부에 count 변수를 선언하고
// { increment, decrement, getCount } 객체를 반환하세요
// 외부에서 count를 직접 수정할 수 없지만,
// 반환된 함수들로 조작할 수 있어야 합니다


// TODO 3: 클로저로 private 변수 만들기
// function createBankAccount(owner, initialBalance) 함수를 만드세요
// balance를 외부에서 직접 접근할 수 없게 하고
// deposit(amount), withdraw(amount), getBalance(), getOwner()를 반환하세요


// TODO 4: 즉시 실행 함수 (IIFE)
// (function() { ... })() 형태로
// 전역 스코프를 오염시키지 않는 코드를 작성하세요


// TODO 5: for 루프와 클로저 문제
// 아래 코드의 문제점을 찾고 해결하세요:
// for (var i = 0; i < 3; i++) {
//   setTimeout(function() { console.log(i); }, 100);
// }
// 예상: 0, 1, 2 → 실제: 3, 3, 3
// let을 사용하거나 클로저로 해결하세요
