// ============================================
// Day 04 추가 연습 풀이
// ============================================

// 문제 5: Promise 체이닝
console.log("=== 문제 5: Promise 체이닝 ===");

function step1() {
  return new Promise(resolve => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 300);
  });
}

function step2(arr) {
  return new Promise(resolve => {
    setTimeout(() => resolve(arr.map(n => n * 2)), 200);
  });
}

function step3(arr) {
  return new Promise(resolve => {
    setTimeout(() => resolve(arr.reduce((s, n) => s + n, 0)), 200);
  });
}

step1()
  .then(data => { console.log("step1:", data); return step2(data); })
  .then(data => { console.log("step2:", data); return step3(data); })
  .then(result => console.log("step3 합계:", result));

// 문제 6: async/await 버전
async function pipeline() {
  console.log("\n=== 문제 6: async/await ===");
  try {
    const data = await step1();
    console.log("step1:", data);
    const doubled = await step2(data);
    console.log("step2:", doubled);
    const sum = await step3(doubled);
    console.log("step3 합계:", sum);
  } catch (error) {
    console.log("에러:", error.message);
  }
}

// 문제 7: Promise.all
async function parallelFetch() {
  console.log("\n=== 문제 7: Promise.all ===");

  function fetchUsers() {
    return new Promise(resolve => setTimeout(() => resolve(["김철수", "이영희", "박민수"]), 300));
  }
  function fetchPosts() {
    return new Promise(resolve => setTimeout(() => resolve(Array.from({ length: 5 }, (_, i) => `게시글${i + 1}`)), 400));
  }
  function fetchComments() {
    return new Promise(resolve => setTimeout(() => resolve(Array.from({ length: 10 }, (_, i) => `댓글${i + 1}`)), 250));
  }

  // 병렬 실행
  const start = Date.now();
  const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
  const parallel = Date.now() - start;

  console.log(`사용자: ${users.length}명, 게시글: ${posts.length}개, 댓글: ${comments.length}개`);
  console.log(`병렬 소요시간: ${parallel}ms (가장 느린 요청만큼만 걸림)`);

  // 순차 실행 비교
  const start2 = Date.now();
  await fetchUsers();
  await fetchPosts();
  await fetchComments();
  const sequential = Date.now() - start2;
  console.log(`순차 소요시간: ${sequential}ms`);
  console.log(`병렬이 약 ${Math.round(sequential / parallel * 10) / 10}배 빠름`);
}

// 문제 8: 재시도 로직
async function retryDemo() {
  console.log("\n=== 문제 8: 재시도 ===");

  class HttpError extends Error {
    constructor(status, message) {
      super(message);
      this.name = "HttpError";
      this.status = status;
    }
  }

  function unreliableFetch() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          reject(new HttpError(503, "서버 일시 장애"));
        } else {
          resolve({ data: "성공 데이터" });
        }
      }, 100);
    });
  }

  async function fetchWithRetry(fn, maxRetries = 5) {
    for (let i = 1; i <= maxRetries; i++) {
      try {
        const result = await fn();
        console.log(`  시도 ${i}: 성공!`);
        return result;
      } catch (error) {
        console.log(`  시도 ${i}: 실패 - ${error.message}`);
        if (i === maxRetries) throw error;
        await new Promise(r => setTimeout(r, 100 * i)); // 점점 길게 대기
      }
    }
  }

  try {
    const result = await fetchWithRetry(unreliableFetch, 5);
    console.log("  최종 결과:", result.data);
  } catch (error) {
    console.log("  모든 시도 실패:", error.message);
  }
}

// 순차 실행
(async () => {
  await pipeline();
  await parallelFetch();
  await retryDemo();
})();
