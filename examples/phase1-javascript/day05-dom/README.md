# Day 05 - 브라우저에서 보이는 할일 앱 (3/27)

## 학습 목표

- **DOM 조작**: `getElementById`, `createElement`, `appendChild` 등을 사용하여 HTML 요소를 동적으로 제어하기
- **이벤트 처리**: `addEventListener`로 클릭, 키보드 입력 등의 사용자 상호작용 처리하기
- **HTML/CSS 기본**: 웹 페이지의 구조(HTML)와 스타일(CSS)을 이해하고 활용하기

## 오늘의 문제

> "HTML과 DOM으로 할일 앱을 브라우저에서 동작하게 만들자"

지금까지는 콘솔에서만 할일 앱을 실행했습니다. 오늘은 **브라우저 화면**에서 직접 할일을 추가하고, 완료 체크하고, 삭제할 수 있는 진짜 웹 앱을 만들어 봅니다.

## 핵심 개념

### 1. DOM (Document Object Model)

DOM은 HTML 문서를 자바스크립트로 조작할 수 있게 해주는 인터페이스입니다.

```javascript
// 요소 가져오기
const element = document.getElementById('my-id');

// 새 요소 만들기
const newElement = document.createElement('div');
newElement.textContent = '안녕하세요';

// 요소 추가하기
document.body.appendChild(newElement);
```

### 2. 이벤트 리스너

사용자의 동작(클릭, 입력 등)에 반응하는 코드를 등록합니다.

```javascript
// 클릭 이벤트
button.addEventListener('click', function() {
  console.log('버튼이 클릭되었습니다!');
});

// 키보드 이벤트
input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    console.log('엔터 키가 눌렸습니다!');
  }
});
```

### 3. 동적 화면 렌더링

데이터가 변경될 때마다 화면을 다시 그리는 패턴입니다.

```javascript
// 데이터 변경 -> 화면 다시 그리기
function render() {
  list.innerHTML = '';  // 기존 내용 비우기
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    list.appendChild(li);
  });
}
```

## 실행 방법

`starter/index.html` 파일을 브라우저에서 직접 열면 됩니다.

### 방법 1: 파일 탐색기에서 열기
`index.html` 파일을 더블 클릭하거나 브라우저로 드래그하세요.

### 방법 2: 터미널에서 열기
```bash
# macOS
open starter/index.html

# Windows
start starter/index.html

# Linux
xdg-open starter/index.html
```

## 단계별 구현 가이드

### Step 1: 할일 추가 기능

1. `addTodo()` 함수에서 input의 값을 가져옵니다
2. 빈 값인지 확인합니다 (빈 문자열이면 추가하지 않음)
3. 새로운 할일 객체를 만들어 `todos` 배열에 추가합니다
4. 화면을 다시 그리고 input을 비웁니다

### Step 2: 화면 그리기 (renderTodos)

1. `todoList`의 내용을 비웁니다
2. `todos` 배열을 순회하면서 각 할일에 대해:
   - `li` 요소를 생성합니다
   - 체크박스, 텍스트, 삭제 버튼을 만들어 `li`에 추가합니다
   - `li`를 `todoList`에 추가합니다

### Step 3: 완료 토글과 삭제

1. `toggleTodo(id)`: 해당 할일의 `done` 값을 반전시킵니다
2. `removeTodo(id)`: `filter`를 사용하여 해당 할일을 제거합니다
3. 두 함수 모두 실행 후 화면을 다시 그립니다

### Step 4: 필터 기능

1. 필터 버튼(전체/진행중/완료)을 클릭하면 `setFilter()` 호출
2. `currentFilter` 값에 따라 보여줄 할일을 필터링합니다
3. 활성화된 필터 버튼의 스타일을 변경합니다

### Step 5: 이벤트 리스너 연결

1. "추가" 버튼에 클릭 이벤트를 등록합니다
2. input에 Enter 키 이벤트를 등록합니다
3. 필터 버튼들에 클릭 이벤트를 등록합니다

## 도전 과제

- [ ] 할일이 없을 때 "할일이 없습니다" 메시지 표시하기
- [ ] 남은 할일 개수를 화면에 표시하기
- [ ] 할일 추가 후 input에 자동으로 포커스 이동하기
- [ ] 완료된 할일에 취소선 스타일 적용하기

## 정답 확인

`solution/` 폴더에 완성된 코드가 있습니다. 먼저 스스로 도전해 보고, 막히는 부분이 있을 때 참고하세요!
