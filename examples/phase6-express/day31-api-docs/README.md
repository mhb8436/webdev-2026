# Day 31 - API 문서 만들기 (5/28)

## 학습 목표

- **Swagger/OpenAPI**: API 문서 표준 규격 이해
- **swagger-jsdoc**: JSDoc 주석으로 API 명세 작성
- **swagger-ui-express**: Express에서 Swagger UI 제공
- **API 명세 작성**: 엔드포인트, 파라미터, 응답 형식 문서화

## 문제 정의

> "다른 개발자가 쓸 수 있도록 API 문서를 만들자"

API를 만들었지만, 다른 개발자(또는 프론트엔드 개발자)가 사용하려면 문서가 필요합니다.
Swagger를 사용하면 코드에 주석을 달아 자동으로 인터랙티브 API 문서를 생성할 수 있습니다.

## 핵심 개념

### 1. OpenAPI 명세

OpenAPI(구 Swagger)는 REST API를 설명하기 위한 표준 규격입니다.

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
      responses:
        200:
          description: 성공
```

### 2. swagger-jsdoc

JavaScript 코드의 JSDoc 주석에서 OpenAPI 명세를 자동 생성합니다.

```javascript
/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 할일 목록 조회
 *     tags: [Todos]
 */
router.get('/', async (req, res) => { ... });
```

### 3. swagger-ui-express

생성된 명세를 브라우저에서 볼 수 있는 UI로 제공합니다.

```javascript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

## 실습 단계

### Step 1: Swagger 설정 파일 작성

`src/swagger.js`에서 OpenAPI 기본 설정과 보안 스킴을 정의하세요.

### Step 2: Express 앱에 Swagger UI 연결

`src/index.js`에서 swagger-ui-express 미들웨어를 추가하세요.

### Step 3: 인증 라우트에 Swagger 주석 추가

`src/routes/auth.js`에 회원가입, 로그인 API 문서를 작성하세요.

### Step 4: 할일 라우트에 Swagger 주석 추가

`src/routes/todos.js`에 CRUD API 문서를 작성하세요.

## 실행 방법

```bash
npm install
npm run db:migrate
npm run dev
```

브라우저에서 `http://localhost:3000/api-docs`에 접속하면 Swagger UI를 볼 수 있습니다.

## 체크리스트

- [ ] swagger-jsdoc과 swagger-ui-express를 설치했는가?
- [ ] Swagger 설정에 Bearer 인증 스킴을 정의했는가?
- [ ] 모든 엔드포인트에 Swagger 주석을 추가했는가?
- [ ] /api-docs에서 Swagger UI가 정상 표시되는가?
- [ ] Swagger UI에서 직접 API를 테스트할 수 있는가?
- [ ] 요청/응답 스키마가 올바르게 문서화되었는가?

## 다음 단계

Day 32에서는 React 프론트엔드와 Express 백엔드를 연동하여 풀스택 앱을 완성합니다.
