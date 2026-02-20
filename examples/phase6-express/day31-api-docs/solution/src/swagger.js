const swaggerJSDoc = require('swagger-jsdoc');

// Swagger/OpenAPI 설정
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '할일 관리 API',
      version: '1.0.0',
      description: '할일 관리 REST API 문서 - JWT 인증 기반의 할일 CRUD API입니다',
    },
    // 서버 URL 설정
    servers: [
      {
        url: 'http://localhost:3000',
        description: '개발 서버',
      },
    ],
    // Bearer 토큰 인증 스킴 설정
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '로그인 후 받은 JWT 토큰을 입력하세요',
        },
      },
    },
  },
  // 라우트 파일에서 Swagger 주석을 읽어옴
  apis: ['./src/routes/*.js'],
};

// swaggerJSDoc으로 명세 생성
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
