# Day 05 - DOM 조작과 이벤트 처리

> **Phase 1: JavaScript** | 학습일: 5일차

---

## 학습 목표

- DOM 요소를 선택하고 동적으로 생성/삭제한다
- 이벤트 리스너를 등록하고 이벤트 객체를 활용한다
- 이벤트 버블링과 이벤트 위임 패턴을 이해한다
- 키보드/마우스 이벤트를 처리한다
- 데이터→화면 렌더링 패턴(render 함수)을 익힌다

---

## 핵심 개념

### 1. DOM 요소 선택

```javascript
const title = document.getElementById("title");       // ID로 1개
const btn = document.querySelector(".btn-primary");    // CSS 선택자로 1개
const items = document.querySelectorAll(".item");      // CSS 선택자로 여러 개
```

### 2. DOM 조작

```javascript
// 생성 및 추가
const li = document.createElement("li");
li.textContent = "새 항목";
li.classList.add("item");
document.getElementById("list").appendChild(li);

// 속성/스타일 변경
li.setAttribute("data-id", "1");
li.style.color = "red";
li.classList.toggle("active");

// 제거
li.remove();
```

### 3. 이벤트 리스너

```javascript
// 클릭
button.addEventListener("click", (e) => {
  console.log("클릭!", e.target);
});

// 키보드
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") console.log("엔터!");
});

// 실시간 입력
input.addEventListener("input", (e) => {
  console.log("입력값:", e.target.value);
});
```

### 4. 이벤트 버블링과 위임

```javascript
// 버블링: 자식 → 부모로 이벤트 전파
// <ul id="list">
//   <li><button class="delete-btn">삭제</button></li>
// </ul>

// 이벤트 위임: 부모에 리스너 하나만 등록
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();  // 가장 가까운 li 제거
  }
});
```

> **이벤트 위임의 장점**: 동적으로 추가된 요소에도 자동 적용, 리스너 수 감소

### 5. 렌더링 패턴

```javascript
let todos = [];

function render() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";  // 비우고 다시 그리기
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.title;
    list.appendChild(li);
  });
}

// 데이터 변경 → render() 호출
todos.push({ title: "새 할일" });
render();
```

---

## 실습 파일

### starter/ (직접 구현)

| 파일 | 내용 |
|------|------|
| `index.html` + `app.js` | 할일 앱 (추가, 삭제, 체크, 필터) |
| `02_events.html` + `02_events.js` | 클릭 카운터, 키보드 이벤트, 이벤트 위임, 버블링 데모 |

### practice/ (연습 문제)

| 파일 | 내용 |
|------|------|
| `practice-extra.html` + `practice-extra.js` | 탭 UI, 할일 목록(이벤트 위임), 마우스 따라다니기 |
| `solution-extra.js` | 연습 문제 풀이 |

---

## 실행 방법

HTML 파일을 브라우저에서 직접 열어 실행합니다:

```bash
open starter/index.html          # 할일 앱
open starter/02_events.html      # 이벤트 데모
open practice/practice-extra.html  # 연습 문제
```

---

## 정리

| 개념 | 핵심 |
|------|------|
| DOM 선택 | `querySelector`, `querySelectorAll` |
| DOM 조작 | `createElement`, `appendChild`, `remove` |
| 이벤트 | `addEventListener("click", handler)` |
| 버블링 | 자식→부모로 이벤트 전파 |
| 이벤트 위임 | 부모에 리스너 등록 + `e.target`으로 판별 |
| `e.preventDefault()` | 기본 동작 방지 (폼 제출 등) |
| 렌더링 패턴 | 데이터 변경 → `render()` 호출 |

> **다음 시간**: Day 06 - TypeScript 기초 (타입, 유니온, 타입 좁히기)
