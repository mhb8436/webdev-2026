// ============================================
// Day 30 - 입력 유효성 검사 미들웨어
// ============================================
// 학습목표: 요청 데이터 검증, 커스텀 검증 규칙

// TODO 1: 기본 검증 함수들
// const validators = {
//   required: (value) => value !== undefined && value !== null && value !== '',
//   minLength: (min) => (value) => typeof value === 'string' && value.length >= min,
//   maxLength: (max) => (value) => typeof value === 'string' && value.length <= max,
//   isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//   isNumber: (value) => typeof value === 'number' && !isNaN(value),
//   isIn: (options) => (value) => options.includes(value),
// };


// TODO 2: validate 미들웨어 팩토리
// function validate(rules) {
//   rules 형식: { fieldName: [{ validator, message }] }
//   모든 규칙 검사 후 에러가 있으면 400 응답
// }


// TODO 3: 사용 예시
// const todoRules = {
//   title: [
//     { validator: validators.required, message: '제목은 필수입니다' },
//     { validator: validators.minLength(2), message: '제목은 2자 이상이어야 합니다' },
//   ],
//   priority: [
//     { validator: validators.isIn(['high','medium','low']), message: '유효한 우선순위가 아닙니다' },
//   ],
// };
// app.post('/api/todos', validate(todoRules), handler);

// module.exports = { validate, validators };
