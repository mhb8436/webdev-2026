// ============================================
// Day 04 - Promise와 async/await (풀이)
// ============================================

// --- 1. Promise 기본 ---
console.log("=== Promise 기본 ===");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- 2. 비동기 데이터 함수 ---
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: "김개발", email: "kim@dev.com" },
        2: { id: 2, name: "이영희", email: "lee@dev.com" },
        3: { id: 3, name: "박민수", email: "park@dev.com" },
      };
      resolve(users[id] || null);
    }, 300);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = [
        { id: 1, userId: 1, title: "첫 번째 글" },
        { id: 2, userId: 1, title: "두 번째 글" },
        { id: 3, userId: 2, title: "영희의 글" },
      ];
      resolve(posts.filter(p => p.userId === userId));
    }, 200);
  });
}

// Promise 체이닝
fetchUser(1)
  .then(user => {
    console.log("사용자:", user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log("게시글:", posts.map(p => p.title));
  });

// --- 3. async/await ---
async function getUserPosts(userId) {
  console.log("\n=== async/await ===");
  const user = await fetchUser(userId);
  console.log("사용자:", user.name);

  const posts = await fetchPosts(user.id);
  console.log("게시글:", posts.map(p => p.title));

  return { user, posts };
}

// --- 4. 에러 처리 ---
function fetchData(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("네트워크 오류 발생"));
      }
      resolve({ data: "성공적인 응답 데이터" });
    }, 100);
  });
}

async function safeDataFetch() {
  console.log("\n=== 에러 처리 ===");
  try {
    const result = await fetchData(false);
    console.log("성공:", result.data);

    const failResult = await fetchData(true);
  } catch (error) {
    console.log("에러 처리:", error.message);
  } finally {
    console.log("항상 실행되는 finally");
  }
}

// --- 5. Promise.all, Promise.race ---
async function parallelDemo() {
  console.log("\n=== Promise.all (병렬 실행) ===");
  const start = Date.now();

  const users = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3),
  ]);
  console.log("모든 사용자:", users.map(u => u.name));
  console.log(`소요 시간: ${Date.now() - start}ms (병렬이라 빠름)`);

  console.log("\n=== Promise.race (먼저 도착한 것) ===");
  const fastest = await Promise.race([
    delay(500).then(() => "느린 응답"),
    delay(100).then(() => "빠른 응답"),
    delay(300).then(() => "중간 응답"),
  ]);
  console.log("가장 빠른 결과:", fastest);

  console.log("\n=== Promise.allSettled ===");
  const results = await Promise.allSettled([
    fetchData(false),
    fetchData(true),
    fetchData(false),
  ]);
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`  ${i}: 성공 - ${result.value.data}`);
    } else {
      console.log(`  ${i}: 실패 - ${result.reason.message}`);
    }
  });
}

// 실행
(async () => {
  await getUserPosts(1);
  await safeDataFetch();
  await parallelDemo();
})();
