// 할일 관리 앱 - 인터페이스 & 클래스 버전
// Day06의 코드를 인터페이스와 클래스로 리팩토링합니다.

// 우선순위 타입
type Priority = 'high' | 'medium' | 'low';

// TODO: ITodo 인터페이스를 정의하세요
// - readonly id: number        (읽기 전용 - 생성 후 변경 불가)
// - title: string              (할일 제목)
// - done: boolean              (완료 여부)
// - priority: Priority         (우선순위)
// - category: string           (카테고리)
// - createdAt: Date            (생성일시)
// - memo?: string              (메모 - 선택적 속성)
interface ITodo {
  // TODO: 위의 속성들을 정의하세요
}

// TODO: ITodoService 인터페이스를 정의하세요
// 할일 서비스가 반드시 구현해야 할 메서드들을 정의합니다.
interface ITodoService {
  // TODO: 아래 메서드 시그니처를 작성하세요
  // add(title: string, priority: Priority, category: string, memo?: string): ITodo
  // remove(id: number): boolean
  // toggle(id: number): boolean
  // getAll(): ITodo[]
  // findByCategory(category: string): ITodo[]
}

// TODO: TodoService 클래스를 구현하세요
// ITodoService 인터페이스를 implements 해야 합니다.
class TodoService implements ITodoService {
  // private 멤버 변수
  private todos: ITodo[] = [];
  private nextId: number = 1;

  // TODO: add 메서드 구현
  // - 새로운 할일을 생성하여 배열에 추가합니다
  // - memo는 선택적 매개변수입니다

  // TODO: remove 메서드 구현
  // - 해당 id의 할일을 삭제합니다

  // TODO: toggle 메서드 구현
  // - 해당 id의 할일 완료 상태를 토글합니다

  // TODO: getAll 메서드 구현
  // - 모든 할일을 반환합니다

  // TODO: findByCategory 메서드 구현
  // - 특정 카테고리의 할일들을 반환합니다

  // TODO: printAll 메서드 구현 (인터페이스 외 추가 메서드)
  // - 모든 할일을 보기 좋게 콘솔에 출력합니다
}

// === 테스트 코드 ===
const service = new TodoService();

console.log("=== 할일 관리 앱 (인터페이스 & 클래스) ===\n");

// 할일 추가
service.add("TypeScript 인터페이스 배우기", "high", "공부");
service.add("점심 먹기", "medium", "생활");
service.add("운동하기", "low", "건강", "헬스장 가기");
service.add("TypeScript 클래스 복습", "high", "공부", "implements 중점적으로");

// 전체 출력
console.log("--- 전체 할일 목록 ---");
// service.printAll();

// 할일 완료 처리
console.log("\n--- 첫 번째 할일 완료 처리 ---");
service.toggle(1);
// service.printAll();

// 카테고리 검색
console.log("\n--- '공부' 카테고리 할일 ---");
const studyTodos = service.findByCategory("공부");
console.log(studyTodos);

// 할일 삭제
console.log("\n--- 두 번째 할일 삭제 ---");
service.remove(2);
// service.printAll();

// 전체 목록 확인
console.log("\n--- 최종 할일 목록 ---");
const allTodos = service.getAll();
console.log(`총 ${allTodos.length}개의 할일`);
