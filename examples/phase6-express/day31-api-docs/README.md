# Day 31 - API 문서: Swagger

> **Phase 6: Express** | 학습일: 31일차

---

## 학습 목표

- OpenAPI/Swagger 표준 규격을 이해한다
- swagger-jsdoc으로 JSDoc 기반 API 명세를 작성한다
- swagger-ui-express로 인터랙티브 문서를 제공한다
- Bearer 인증 스킴을 Swagger에 설정한다

---

## 핵심 개념

### 1. OpenAPI 명세

```yaml
openapi: 3.0.0
info:
  title: 할일 관리 API
  version: 1.0.0
paths:
  /api/todos:
    get:
      summary: 할일 목록 조회
      security:
        - bearerAuth: []
```

### 2. swagger-jsdoc

```javascript
/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 할일 목록 조회
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', authMiddleware, async (req, res) => { ... });
```

### 3. Swagger 설정

```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: '할일 API', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

### 4. 스키마 정의

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         done:
 *           type: boolean
 */
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `src/swagger.js` | Swagger 설정 (OpenAPI 기본 정보, 보안 스킴) |
| `src/index.js` | swagger-ui-express 미들웨어 연결 |
| `src/routes/auth.js` | 인증 API Swagger 주석 |
| `src/routes/todos.js` | 할일 API Swagger 주석 |

### solution/ (완성 코드)

동일 구조의 완성된 코드

---

## 실행 방법

```bash
npm install
npm run db:migrate
npm run dev
```

브라우저에서 `http://localhost:3000/api-docs` 접속 → Swagger UI

---

## 정리

| 개념 | 핵심 |
|------|------|
| OpenAPI | REST API 문서 표준 규격 |
| swagger-jsdoc | JSDoc 주석 → OpenAPI 명세 자동 생성 |
| swagger-ui-express | 브라우저에서 인터랙티브 API 문서 |
| @swagger | 라우트 위에 JSDoc 주석으로 명세 작성 |
| bearerAuth | JWT 토큰 인증 스킴 |
| /api-docs | Swagger UI 접속 경로 |

> **다음 시간**: Day 32 - 풀스택 완성 (React + Express 연동)
