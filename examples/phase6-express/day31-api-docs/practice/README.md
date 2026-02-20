# Day 31 - API 문서 (Swagger) 연습 문제

## 사전 준비

```bash
npm init -y
npm install express swagger-jsdoc swagger-ui-express
```

---

## 문제 1: Swagger 설정

swagger-jsdoc과 swagger-ui-express를 사용하여 기본 Swagger 설정을 만드세요.

### 요구사항

- **swagger-jsdoc 설정**:
  - OpenAPI 버전: `3.0.0`
  - API 정보: 제목 `"메모 API"`, 버전 `"1.0.0"`, 설명 `"메모 관리를 위한 REST API"`
  - 서버 URL: `http://localhost:3000`
  - APIs 경로: 현재 파일 (`'./*.js'`)
- **swagger-ui-express 연결**:
  - `/api-docs` 경로에서 Swagger UI가 표시되도록 설정
  - `swagger.serve`와 `swagger.setup(specs)`를 사용
- 서버를 실행하고 `http://localhost:3000/api-docs`에 접속하면 Swagger UI가 나타나야 함

### 예상 결과

```
브라우저에서 http://localhost:3000/api-docs 접속 시
-> Swagger UI가 표시됨
-> API 제목: "메모 API"
-> API 버전: "1.0.0"
-> API 설명: "메모 관리를 위한 REST API"
```

---

## 문제 2: API 문서화

메모(Memo) API에 JSDoc 주석으로 Swagger 문서를 추가하세요.

### 요구사항

- **메모 데이터 구조**: `id`(정수), `title`(문자열), `content`(문자열), `createdAt`(문자열)
- **Swagger 컴포넌트 스키마 정의**:
  - `Memo` 스키마: 전체 메모 객체
  - `MemoInput` 스키마: 메모 생성/수정 시 입력값 (`title`, `content`)
- 각 API 엔드포인트에 `@swagger` 태그 추가:
  - `GET /api/memos` - 전체 메모 목록 조회
    - 태그: Memos
    - 응답: 200 (메모 배열)
  - `POST /api/memos` - 새 메모 작성
    - 태그: Memos
    - 요청 바디: MemoInput 스키마
    - 응답: 201 (생성된 메모)
  - `PUT /api/memos/:id` - 메모 수정
    - 태그: Memos
    - 경로 파라미터: id
    - 요청 바디: MemoInput 스키마
    - 응답: 200 (수정된 메모), 404 (메모 없음)
  - `DELETE /api/memos/:id` - 메모 삭제
    - 태그: Memos
    - 경로 파라미터: id
    - 응답: 200 (삭제 완료), 404 (메모 없음)

### 예상 결과

```
Swagger UI에서:
- "Memos" 태그 아래 4개의 API 엔드포인트가 표시됨
- 각 엔드포인트를 펼치면 요청/응답 스키마가 보임
- "Try it out" 버튼으로 실제 API를 테스트할 수 있음
```

---

## 문제 3: Postman 컬렉션

메모 API의 Postman 컬렉션 JSON 파일을 직접 작성하세요.

### 요구사항

- Postman Collection Format v2.1.0 사용
- 컬렉션 이름: `"메모 API 컬렉션"`
- 다음 API 요청을 포함:
  1. **메모 목록 조회**: GET `http://localhost:3000/api/memos`
  2. **메모 작성**: POST `http://localhost:3000/api/memos`
     - Body(JSON): `{ "title": "테스트 메모", "content": "테스트 내용입니다." }`
  3. **메모 수정**: PUT `http://localhost:3000/api/memos/1`
     - Body(JSON): `{ "title": "수정된 메모", "content": "수정된 내용입니다." }`
  4. **메모 삭제**: DELETE `http://localhost:3000/api/memos/1`
- 각 요청에 `Content-Type: application/json` 헤더 포함
- 파일명: `memo-api.postman_collection.json`

### 사용 방법

```
1. Postman을 열고 "Import" 버튼 클릭
2. 생성된 JSON 파일을 드래그 앤 드롭 또는 선택
3. "메모 API 컬렉션"이 Postman에 추가됨
4. 각 요청을 선택하고 "Send" 버튼으로 테스트
```
