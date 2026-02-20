// 할일 관리 앱 - 제네릭 & 유틸리티 타입 버전 (정답)
// Day07의 코드를 제네릭 기반으로 리팩토링한 완성 코드입니다.

// ============================================
// 1. 기본 타입 정의
// ============================================

// 우선순위 타입
type Priority = 'high' | 'medium' | 'low';

// ITodo 인터페이스 (Day07에서 가져옴)
interface ITodo {
  readonly id: number;
  title: string;
  done: boolean;
  priority: Priority;
  category: string;
  createdAt: Date;
  memo?: string;
}

// ============================================
// 2. 제네릭 Storage (범용 저장소)
// ============================================

// 제네릭 IStorage 인터페이스
// T extends { id: number } : T는 반드시 id 속성을 가져야 한다는 제약 조건
interface IStorage<T extends { id: number }> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
  update(id: number, updates: Partial<T>): boolean;
  remove(id: number): boolean;
}

// 제네릭 Storage 클래스
// 어떤 데이터 타입이든 id만 있으면 저장할 수 있는 범용 저장소입니다
class DataStorage<T extends { id: number }> implements IStorage<T> {
  private items: T[] = [];

  // 모든 아이템 반환 (배열 복사본)
  getAll(): T[] {
    return [...this.items];
  }

  // id로 아이템 검색
  getById(id: number): T | undefined {
    return this.items.find((item: T) => item.id === id);
  }

  // 아이템 추가
  add(item: T): void {
    this.items.push(item);
  }

  // 부분 업데이트 - Partial<T>로 일부 속성만 업데이트 가능
  update(id: number, updates: Partial<T>): boolean {
    const index: number = this.items.findIndex((item: T) => item.id === id);
    if (index !== -1) {
      // 기존 아이템에 업데이트 내용을 병합합니다
      this.items[index] = { ...this.items[index], ...updates };
      return true;
    }
    return false;
  }

  // id로 아이템 삭제
  remove(id: number): boolean {
    const index: number = this.items.findIndex((item: T) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

// ============================================
// 3. 유틸리티 타입으로 DTO 정의
// ============================================

// CreateTodoDTO - 할일 생성 시 필요한 데이터
// Omit으로 id, createdAt, done을 제외 (서버/서비스에서 자동 설정되는 값)
type CreateTodoDTO = Omit<ITodo, 'id' | 'createdAt' | 'done'>;

// UpdateTodoDTO - 할일 수정 시 필요한 데이터
// Pick으로 수정 가능한 속성만 선택한 뒤, Partial로 모두 선택적으로 만듦
type UpdateTodoDTO = Partial<Pick<ITodo, 'title' | 'priority' | 'category' | 'memo'>>;

// TodoSummary - 할일 목록에서 간략하게 보여줄 데이터
// Pick으로 필요한 속성만 선택
type TodoSummary = Pick<ITodo, 'id' | 'title' | 'done'>;

// TodoFilter - 할일 필터링 옵션 (유니온 타입)
type TodoFilter = 'all' | 'active' | 'completed';

// ============================================
// 4. TodoService - Storage<ITodo>를 활용한 서비스
// ============================================

class TodoService {
  // 내부적으로 제네릭 Storage를 사용합니다
  private storage: DataStorage<ITodo>;
  private nextId: number = 1;

  constructor() {
    this.storage = new DataStorage<ITodo>();
  }

  // 할일 생성 - CreateTodoDTO를 받아서 완전한 ITodo를 만듭니다
  create(dto: CreateTodoDTO): ITodo {
    const todo: ITodo = {
      id: this.nextId++,
      title: dto.title,
      done: false,                // 기본값: 미완료
      priority: dto.priority,
      category: dto.category,
      createdAt: new Date(),      // 현재 시간 자동 설정
      memo: dto.memo,             // 선택적 속성
    };
    this.storage.add(todo);
    console.log(`생성됨: [${todo.id}] ${todo.title}`);
    return todo;
  }

  // 할일 부분 업데이트 - UpdateTodoDTO로 원하는 속성만 수정합니다
  update(id: number, dto: UpdateTodoDTO): boolean {
    const result: boolean = this.storage.update(id, dto);
    if (result) {
      const updated: ITodo | undefined = this.storage.getById(id);
      console.log(`업데이트됨: [${id}] ${updated?.title}`);
    } else {
      console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
    }
    return result;
  }

  // 할일 삭제
  remove(id: number): boolean {
    const todo: ITodo | undefined = this.storage.getById(id);
    const result: boolean = this.storage.remove(id);
    if (result && todo) {
      console.log(`삭제됨: [${id}] ${todo.title}`);
    } else {
      console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
    }
    return result;
  }

  // 완료 상태 토글
  toggle(id: number): boolean {
    const todo: ITodo | undefined = this.storage.getById(id);
    if (todo !== undefined) {
      const result: boolean = this.storage.update(id, { done: !todo.done });
      const status: string = !todo.done ? "완료" : "미완료";
      console.log(`토글됨: [${id}] ${todo.title} → ${status}`);
      return result;
    }
    console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
    return false;
  }

  // 전체 할일 반환
  getAll(): ITodo[] {
    return this.storage.getAll();
  }

  // TodoFilter에 따라 필터링
  filter(filterType: TodoFilter): ITodo[] {
    const all: ITodo[] = this.storage.getAll();
    switch (filterType) {
      case 'all':
        return all;
      case 'active':
        return all.filter((todo: ITodo) => !todo.done);
      case 'completed':
        return all.filter((todo: ITodo) => todo.done);
    }
  }

  // TodoSummary 배열 반환 - 간략한 정보만 포함
  getSummaries(): TodoSummary[] {
    return this.storage.getAll().map((todo: ITodo): TodoSummary => ({
      id: todo.id,
      title: todo.title,
      done: todo.done,
    }));
  }

  // 우선순위 한글 라벨 변환
  private getPriorityLabel(priority: Priority): string {
    switch (priority) {
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
    }
  }

  // 전체 할일 출력
  printAll(): void {
    const todos: ITodo[] = this.storage.getAll();
    if (todos.length === 0) {
      console.log("  할일이 없습니다.");
      return;
    }
    todos.forEach((todo: ITodo) => {
      const check: string = todo.done ? "✓" : " ";
      const priorityLabel: string = this.getPriorityLabel(todo.priority);
      let line = `  [${check}] ${todo.title} (우선순위: ${priorityLabel}, 카테고리: ${todo.category})`;
      if (todo.memo) {
        line += ` - 메모: ${todo.memo}`;
      }
      console.log(line);
    });
    console.log(`  총 ${todos.length}개의 할일`);
  }
}

// ============================================
// 5. 테스트
// ============================================

const service = new TodoService();

console.log("=== 할일 관리 앱 (제네릭 & 유틸리티 타입) ===\n");

// CreateTodoDTO를 사용하여 할일 생성
// id, createdAt, done은 서비스에서 자동으로 설정됩니다
service.create({ title: "TypeScript 제네릭 배우기", priority: "high", category: "공부" });
service.create({ title: "점심 먹기", priority: "medium", category: "생활" });
service.create({ title: "운동하기", priority: "low", category: "건강", memo: "헬스장" });
service.create({ title: "유틸리티 타입 복습", priority: "high", category: "공부", memo: "Partial, Pick, Omit" });

// 전체 출력
console.log("\n--- 전체 할일 ---");
service.printAll();

// UpdateTodoDTO를 사용하여 부분 업데이트
// title과 priority만 수정 (다른 속성은 그대로 유지)
console.log("\n--- 첫 번째 할일 업데이트 ---");
service.update(1, { title: "TypeScript 제네릭 마스터하기", priority: "medium" });
service.printAll();

// 완료 토글 후 필터링
console.log("\n--- 1, 3번 할일 완료 처리 ---");
service.toggle(1);
service.toggle(3);

// TodoFilter를 사용하여 필터링
console.log("\n--- 활성(미완료) 할일만 ---");
const activeTodos: ITodo[] = service.filter('active');
activeTodos.forEach((todo: ITodo) => {
  console.log(`  [${todo.id}] ${todo.title}`);
});

console.log("\n--- 완료된 할일만 ---");
const completedTodos: ITodo[] = service.filter('completed');
completedTodos.forEach((todo: ITodo) => {
  console.log(`  [${todo.id}] ${todo.title}`);
});

// TodoSummary를 사용하여 간략한 정보만 출력
console.log("\n--- 할일 요약 (TodoSummary) ---");
const summaries: TodoSummary[] = service.getSummaries();
summaries.forEach((summary: TodoSummary) => {
  const status: string = summary.done ? "완료" : "미완료";
  console.log(`  [${summary.id}] ${summary.title} - ${status}`);
});

// 할일 삭제
console.log("\n--- 두 번째 할일 삭제 ---");
service.remove(2);
service.printAll();

// ============================================
// 6. 제네릭 재사용 테스트 - User 데이터에도 동일한 Storage 사용
// ============================================

// IUser 인터페이스 - id 속성이 있으므로 Storage<IUser>로 사용 가능
interface IUser {
  readonly id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

console.log("\n=== 제네릭 재사용: User Storage ===\n");

// 동일한 Storage 클래스를 User 타입으로 재사용합니다
const userStorage = new DataStorage<IUser>();

userStorage.add({ id: 1, name: "홍길동", email: "hong@test.com", role: "admin" });
userStorage.add({ id: 2, name: "김철수", email: "kim@test.com", role: "user" });
userStorage.add({ id: 3, name: "이영희", email: "lee@test.com", role: "user" });

// 전체 사용자 출력
console.log("--- 전체 사용자 ---");
const allUsers: IUser[] = userStorage.getAll();
allUsers.forEach((user: IUser) => {
  console.log(`  [${user.id}] ${user.name} (${user.email}) - ${user.role}`);
});

// 사용자 검색
console.log("\n--- ID 2 사용자 검색 ---");
const foundUser: IUser | undefined = userStorage.getById(2);
if (foundUser) {
  console.log(`  찾음: ${foundUser.name} (${foundUser.email})`);
}

// 사용자 업데이트
console.log("\n--- ID 2 사용자 역할 변경 ---");
userStorage.update(2, { role: "admin" });
const updatedUser: IUser | undefined = userStorage.getById(2);
if (updatedUser) {
  console.log(`  업데이트됨: ${updatedUser.name} → ${updatedUser.role}`);
}

// 사용자 삭제
console.log("\n--- ID 3 사용자 삭제 ---");
userStorage.remove(3);
console.log(`  남은 사용자: ${userStorage.getAll().length}명`);
