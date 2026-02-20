# Day 25 - fs, path 모듈 연습문제

## 연습 1: 방명록 파일 저장

방명록 데이터를 JSON 파일로 저장하고 불러오는 프로그램을 만드세요.

### 요구사항

- `guestbook.json` 파일에 방명록 데이터를 저장하세요
- 각 방명록 항목은 `{ id, name, message, date }` 형태입니다
- 다음 함수를 구현하세요:
  - `addEntry(name, message)` - 새 방명록 항목을 추가합니다. id는 자동 증가, date는 현재 시간
  - `getEntries()` - 전체 방명록 목록을 반환합니다
  - `deleteEntry(id)` - 해당 id의 항목을 삭제합니다
- `fs.readFileSync`와 `fs.writeFileSync`를 사용하세요
- 파일이 없으면 빈 배열로 초기화하세요

### 힌트

- `JSON.parse()`와 `JSON.stringify(null, 2)`를 활용하세요
- `fs.existsSync()`로 파일 존재 여부를 확인할 수 있습니다
- `Array.filter()`로 특정 항목을 제거할 수 있습니다

---

## 연습 2: 폴더 탐색기

주어진 경로의 파일/폴더 목록을 출력하는 프로그램을 만드세요.

### 요구사항

- `exploreDirectory(dirPath)` 함수를 구현하세요
- 지정된 경로의 모든 파일과 폴더를 나열하세요
- 각 항목에 대해 다음 정보를 출력하세요:
  - 폴더인 경우: `[폴더] 폴더이름`
  - 파일인 경우: `[파일] 파일이름 (확장자: .js, 크기: 1234 bytes)`
- `path.extname()`으로 확장자를 추출하세요
- `fs.statSync()`로 파일 정보를 확인하세요
- 결과를 배열로도 반환하세요

### 힌트

- `fs.readdirSync()`로 디렉토리 내용을 읽으세요
- `stat.isDirectory()`로 폴더 여부를 확인하세요
- `stat.size`로 파일 크기를 확인하세요
- `path.join()`으로 경로를 안전하게 합치세요

---

## 연습 3: 설정 파일 관리

config.json 파일을 읽고 쓰는 ConfigManager를 만드세요.

### 요구사항

- `ConfigManager` 클래스를 구현하세요
- 생성자에서 config 파일 경로를 받으세요
- 다음 메서드를 구현하세요:
  - `get(key)` - 설정값을 읽어옵니다. 없으면 `undefined` 반환
  - `set(key, value)` - 설정값을 저장합니다
  - `getAll()` - 전체 설정을 객체로 반환합니다
  - `reset()` - 설정을 초기값 `{}`으로 리셋합니다
- 설정 변경 시 자동으로 파일에 저장하세요
- 파일이 없으면 자동으로 생성하세요

### 힌트

- 클래스 생성자에서 파일 존재 여부를 확인하고 초기화하세요
- `_load()`와 `_save()` 내부 메서드를 만들면 코드가 깔끔해집니다
