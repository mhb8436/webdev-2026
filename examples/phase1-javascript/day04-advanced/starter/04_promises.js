// ============================================
// Day 04 - Promise와 async/await
// ============================================
// 학습목표: 비동기 프로그래밍, Promise, async/await, 에러 처리

// TODO 1: Promise 기본
// function delay(ms) 함수: ms 밀리초 후 resolve 되는 Promise 반환
// 힌트: return new Promise((resolve) => setTimeout(resolve, ms));


// TODO 2: Promise 체이닝
// function fetchUser(id) - 1초 후 사용자 객체 resolve
// function fetchPosts(userId) - 0.5초 후 게시글 배열 resolve
// fetchUser(1).then(user => fetchPosts(user.id)).then(posts => ...)


// TODO 3: async/await로 변환
// async function getUserPosts(userId) {
//   const user = await fetchUser(userId);
//   const posts = await fetchPosts(user.id);
//   return { user, posts };
// }


// TODO 4: 에러 처리
// function fetchData(url) - 가끔 실패하는 비동기 함수
// try/catch로 에러 처리하기


// TODO 5: Promise.all, Promise.race
// 여러 비동기 작업을 병렬로 실행
// Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
// Promise.race([fetchFast(), fetchSlow()])
