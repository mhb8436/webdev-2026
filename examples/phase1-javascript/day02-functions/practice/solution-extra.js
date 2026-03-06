// ============================================
// Day 02 추가 연습 풀이
// ============================================

// 문제 5: 배열 유틸리티
console.log("=== 문제 5: 배열 유틸리티 ===");

const unique = (arr) => [...new Set(arr)];
const flatten = (arr) => arr.reduce((flat, item) => flat.concat(item), []);
const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

console.log("unique:", unique([1, 2, 2, 3, 3]));
console.log("flatten:", flatten([[1, 2], [3, 4], [5]]));
console.log("chunk:", chunk([1, 2, 3, 4, 5], 2));
console.log("");

// 문제 6: 고차 함수 직접 구현
console.log("=== 문제 6: 고차 함수 구현 ===");

function myMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

function myFilter(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
}

function myReduce(arr, fn, initial) {
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc;
}

const nums = [1, 2, 3, 4, 5];
console.log("myMap(제곱):", myMap(nums, n => n * n));
console.log("myFilter(짝수):", myFilter(nums, n => n % 2 === 0));
console.log("myReduce(합계):", myReduce(nums, (sum, n) => sum + n, 0));
console.log("");

// 문제 7: 함수 조합 (pipe)
console.log("=== 문제 7: 함수 조합 ===");

function pipe(...fns) {
  return (input) => fns.reduce((value, fn) => fn(value), input);
}

const process = pipe(
  x => x * 2,
  x => x + 10,
  x => `결과: ${x}`
);

console.log(process(5));   // "결과: 20"
console.log(process(10));  // "결과: 30"
