// ============================================
// Day 30 - 입력 유효성 검사 미들웨어 (풀이)
// ============================================

const validators = {
  required: (value) => value !== undefined && value !== null && value !== '',
  minLength: (min) => (value) => typeof value === 'string' && value.length >= min,
  maxLength: (max) => (value) => typeof value === 'string' && value.length <= max,
  isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  isNumber: (value) => typeof value === 'number' && !isNaN(value),
  isBoolean: (value) => typeof value === 'boolean',
  isIn: (options) => (value) => options.includes(value),
  min: (minVal) => (value) => typeof value === 'number' && value >= minVal,
  max: (maxVal) => (value) => typeof value === 'number' && value <= maxVal,
  matches: (pattern) => (value) => pattern.test(value),
};

function validate(rules) {
  return (req, res, next) => {
    const errors = [];

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = req.body[field];

      for (const rule of fieldRules) {
        // required가 아니고 값이 없으면 건너뛰기
        if (rule.validator !== validators.required && !validators.required(value)) {
          continue;
        }

        if (!rule.validator(value)) {
          errors.push({
            field,
            message: rule.message || `${field} 필드가 유효하지 않습니다`,
            value,
          });
          break; // 필드당 첫 번째 에러만
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: '입력 데이터 검증 실패',
        details: errors,
      });
    }

    next();
  };
}

// 미리 정의된 검증 규칙 모음
const todoRules = {
  title: [
    { validator: validators.required, message: '제목은 필수입니다' },
    { validator: validators.minLength(2), message: '제목은 2자 이상이어야 합니다' },
    { validator: validators.maxLength(100), message: '제목은 100자 이하여야 합니다' },
  ],
  priority: [
    { validator: validators.isIn(['high', 'medium', 'low']), message: '우선순위는 high/medium/low 중 하나여야 합니다' },
  ],
};

const userRules = {
  email: [
    { validator: validators.required, message: '이메일은 필수입니다' },
    { validator: validators.isEmail, message: '유효한 이메일 형식이 아닙니다' },
  ],
  password: [
    { validator: validators.required, message: '비밀번호는 필수입니다' },
    { validator: validators.minLength(8), message: '비밀번호는 8자 이상이어야 합니다' },
  ],
  name: [
    { validator: validators.required, message: '이름은 필수입니다' },
    { validator: validators.minLength(2), message: '이름은 2자 이상이어야 합니다' },
  ],
};

module.exports = { validate, validators, todoRules, userRules };
