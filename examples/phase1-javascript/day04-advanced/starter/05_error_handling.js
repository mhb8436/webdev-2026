// ============================================
// Day 04 - 에러 처리 심화
// ============================================
// 학습목표: try/catch/finally, 커스텀 에러, 에러 타입

// TODO 1: 기본 에러 처리
// function divide(a, b) - 0으로 나누기 시 에러 발생
// try/catch/finally 사용


// TODO 2: 에러 타입 구분
// TypeError, RangeError, ReferenceError, SyntaxError
// 각 에러를 발생시키고 catch에서 instanceof로 구분


// TODO 3: 커스텀 에러 클래스
// class ValidationError extends Error { constructor(field, message) }
// class NotFoundError extends Error { constructor(resource, id) }
// 각각 적절한 name과 message를 설정하세요


// TODO 4: 입력 검증 함수
// function validateUser(user) - name, email, age 검증
// 조건 미충족 시 ValidationError 발생
// 테스트: 잘못된 데이터로 호출하여 에러 메시지 확인


// TODO 5: 비동기 에러 처리
// async function fetchWithRetry(fn, retries = 3)
// 실패하면 재시도하고, 모든 시도 실패 시 에러 발생
