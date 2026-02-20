// 할일 관리 앱 - 제네릭 & 유틸리티 타입 버전
// Day07의 코드를 제네릭 기반으로 리팩토링합니다.

// 우선순위 타입
type Priority = 'high' | 'medium' | 'low';

// 기존 Day07의 ITodo 인터페이스
interface ITodo {
  readonly id: number;
  title: string;
  done: boolean;
  priority: Priority;
  category: string;
  createdAt: Date;
  memo?: string;
}

// TODO: 제네릭 IStorage 인터페이스를 정의하세요
// T는 반드시 { id: number } 속성을 가져야 합니다 (제네릭 제약 조건)
interface IStorage<T extends { id: number }> {
  // TODO: getAll(): T[]
  // TODO: getById(id: number): T | undefined
  // TODO: add(item: T): void
  // TODO: update(id: number, updates: Partial<T>): boolean
  // TODO: remove(id: number): boolean
}

// TODO: 제네릭 Storage 클래스를 구현하세요
// IStorage<T> 인터페이스를 implements 합니다
class DataStorage<T extends { id: number }> implements IStorage<T> {
  private items: T[] = [];

  // TODO: getAll 구현 - 모든 아이템 반환

  // TODO: getById 구현 - id로 아이템 검색

  // TODO: add 구현 - 아이템 추가

  // TODO: update 구현 - Partial<T>로 부분 업데이트

  // TODO: remove 구현 - id로 아이템 삭제
}

// TODO: CreateTodoDTO 타입을 정의하세요
// Omit을 사용하여 ITodo에서 id, createdAt, done을 제외합니다
// type CreateTodoDTO = Omit<ITodo, 'id' | 'createdAt' | 'done'>;

// TODO: UpdateTodoDTO 타입을 정의하세요
// Partial과 Pick을 조합하여 title, priority, category, memo만 선택적으로 업데이트
// type UpdateTodoDTO = Partial<Pick<ITodo, 'title' | 'priority' | 'category' | 'memo'>>;

// TODO: TodoSummary 타입을 정의하세요
// Pick을 사용하여 id, title, done만 포함하는 요약 타입
// type TodoSummary = Pick<ITodo, 'id' | 'title' | 'done'>;

// TODO: TodoFilter 유니온 타입을 정의하세요
// type TodoFilter = 'all' | 'active' | 'completed';

// TODO: TodoService 클래스를 구현하세요
// 내부적으로 DataStorage<ITodo>를 사용합니다
class TodoService {
  private storage: DataStorage<ITodo>;
  private nextId: number = 1;

  constructor() {
    this.storage = new DataStorage<ITodo>();
  }

  // TODO: create 메서드 - CreateTodoDTO를 받아서 ITodo를 생성하고 저장

  // TODO: update 메서드 - id와 UpdateTodoDTO를 받아서 업데이트

  // TODO: remove 메서드 - id로 삭제

  // TODO: toggle 메서드 - 완료 상태 토글

  // TODO: getAll 메서드 - 전체 할일 반환

  // TODO: filter 메서드 - TodoFilter에 따라 필터링

  // TODO: getSummaries 메서드 - TodoSummary[] 반환

  // TODO: printAll 메서드 - 전체 할일 출력
}

// === 테스트 코드 ===
const service = new TodoService();

console.log("=== 할일 관리 앱 (제네릭 & 유틸리티 타입) ===\n");

// 할일 생성 (CreateTodoDTO 사용)
// service.create({ title: "TypeScript 제네릭 배우기", priority: "high", category: "공부" });
// service.create({ title: "점심 먹기", priority: "medium", category: "생활" });
// service.create({ title: "운동하기", priority: "low", category: "건강", memo: "헬스장" });

// 전체 출력
// console.log("--- 전체 할일 ---");
// service.printAll();

// 부분 업데이트 (UpdateTodoDTO 사용)
// console.log("\n--- 첫 번째 할일 업데이트 ---");
// service.update(1, { title: "TypeScript 제네릭 마스터하기", priority: "medium" });
// service.printAll();

// 필터링 (TodoFilter 사용)
// console.log("\n--- 활성 할일만 ---");
// service.toggle(1);
// const activeTodos = service.filter('active');
// console.log(activeTodos);

// 요약 (TodoSummary 사용)
// console.log("\n--- 할일 요약 ---");
// const summaries = service.getSummaries();
// console.log(summaries);

// 제네릭 재사용 테스트
// interface IUser {
//   readonly id: number;
//   name: string;
//   email: string;
// }
// const userStorage = new DataStorage<IUser>();
// userStorage.add({ id: 1, name: "홍길동", email: "hong@test.com" });
// console.log("\n--- User Storage 테스트 ---");
// console.log(userStorage.getAll());
