// ============================================
// Day 02 추가 연습 - 함수 활용
// ============================================

// 문제 5: 배열 유틸리티 함수 만들기
// 아래 함수들을 화살표 함수로 구현하세요
// - unique(arr): 중복 제거된 배열 반환 (Set 활용)
// - flatten(arr): 2차원 배열을 1차원으로 변환 (flat 또는 reduce)
// - chunk(arr, size): 배열을 size 크기의 청크로 분할
// 테스트: unique([1,2,2,3,3]) → [1,2,3]
//         flatten([[1,2],[3,4]]) → [1,2,3,4]
//         chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]


// 문제 6: 고차 함수 구현
// 직접 myMap, myFilter, myReduce를 구현하세요
// (Array.prototype 메서드를 사용하지 않고 for문으로)
// function myMap(arr, fn) { ... }
// function myFilter(arr, fn) { ... }
// function myReduce(arr, fn, initial) { ... }


// 문제 7: 함수 조합
// function pipe(...fns) 함수를 만드세요
// 여러 함수를 순서대로 실행하는 새 함수를 반환합니다
// const process = pipe(
//   x => x * 2,
//   x => x + 10,
//   x => `결과: ${x}`
// );
// process(5) → "결과: 20"
