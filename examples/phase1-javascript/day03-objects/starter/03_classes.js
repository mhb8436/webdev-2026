// ============================================
// Day 03 - ES6 클래스
// ============================================
// 학습목표: class 선언, 생성자, 메서드, 상속, static

// TODO 1: Animal 클래스 만들기
// - constructor(name, sound): 이름과 울음소리 저장
// - speak() 메서드: "이름: 울음소리!" 출력
// - toString() 메서드: "Animal(이름)" 반환


// TODO 2: Dog 클래스 (Animal 상속)
// - constructor(name, breed): super로 부모 생성자 호출 (sound는 "멍멍")
// - fetch(item) 메서드: "이름이 item을 물어왔습니다!" 출력


// TODO 3: TodoItem 클래스
// - constructor(title, priority = "medium")
// - static 변수 nextId로 자동 ID 부여
// - toggle() 메서드: done 상태 반전
// - toString() 메서드: "[완료/미완료] 제목 (우선순위)" 반환


// TODO 4: TodoList 클래스
// - constructor(): todos 빈 배열
// - add(title, priority): TodoItem 생성하여 추가
// - remove(id): id로 할일 삭제
// - getByPriority(priority): 우선순위별 필터링
// - get completed(): 완료된 항목 수 (getter)
// - print(): 전체 목록 출력


// TODO 5: 테스트 코드
// const list = new TodoList();
// list.add("공부하기", "high");
// list.add("운동하기", "low");
// list.print();
