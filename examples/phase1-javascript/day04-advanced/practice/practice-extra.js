// ============================================
// Day 04 추가 연습 - 비동기와 모듈 활용
// ============================================

// 문제 5: Promise 체이닝
// 3단계 데이터 처리 파이프라인을 Promise로 구현하세요
// step1: 1초 후 숫자 배열 [1,2,3,4,5] 반환
// step2: 배열을 받아 0.5초 후 각 요소를 2배로 반환
// step3: 배열을 받아 0.5초 후 합계 반환
// step1().then(step2).then(step3).then(결과 출력)


// 문제 6: async/await로 변환
// 문제 5의 코드를 async/await로 다시 작성하세요
// try/catch로 에러 처리 추가


// 문제 7: Promise.all 활용
// 3개의 API를 병렬로 호출하는 시뮬레이션
// fetchUsers(): 1초 후 사용자 3명 반환
// fetchPosts(): 1.5초 후 게시글 5개 반환
// fetchComments(): 0.8초 후 댓글 10개 반환
// Promise.all로 동시에 호출하고 총 소요시간 측정
// (순차 호출 대비 얼마나 빠른지 비교)


// 문제 8: 커스텀 에러 클래스 + 재시도
// class HttpError extends Error { constructor(status, message) }
// async function fetchWithRetry(url, maxRetries = 3)
// - 30% 확률로 실패하는 fetch 시뮬레이션
// - 실패 시 자동 재시도 (최대 maxRetries번)
// - 모든 시도 실패 시 에러 발생
// - 각 시도마다 로그 출력
