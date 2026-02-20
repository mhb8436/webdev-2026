// 할일 관리 앱 - 인터페이스 & 클래스 버전 (정답)
// Day06의 코드를 인터페이스와 클래스로 리팩토링한 완성 코드입니다.

// 우선순위 타입
type Priority = 'high' | 'medium' | 'low';

// ITodo 인터페이스 정의
// 할일 객체의 구조를 명확하게 정의합니다.
interface ITodo {
  readonly id: number;   // 읽기 전용 - 한번 생성되면 변경할 수 없음
  title: string;         // 할일 제목
  done: boolean;         // 완료 여부
  priority: Priority;    // 우선순위
  category: string;      // 카테고리
  createdAt: Date;       // 생성일시
  memo?: string;         // 메모 (선택적 속성 - 없어도 됨)
}

// ITodoService 인터페이스 정의
// 할일 서비스가 반드시 구현해야 할 메서드들의 계약(contract)입니다.
interface ITodoService {
  add(title: string, priority: Priority, category: string, memo?: string): ITodo;
  remove(id: number): boolean;
  toggle(id: number): boolean;
  getAll(): ITodo[];
  findByCategory(category: string): ITodo[];
}

// TodoService 클래스 - ITodoService 인터페이스를 구현합니다
class TodoService implements ITodoService {
  // private: 클래스 외부에서 직접 접근할 수 없는 멤버 변수
  private todos: ITodo[] = [];
  private nextId: number = 1;

  // 할일 추가
  // memo는 선택적 매개변수(?)로, 전달하지 않으면 undefined가 됩니다
  add(title: string, priority: Priority, category: string, memo?: string): ITodo {
    const todo: ITodo = {
      id: this.nextId++,
      title,
      done: false,
      priority,
      category,
      createdAt: new Date(),
      memo,  // 선택적 속성 - undefined이면 속성 자체가 생략됨
    };
    this.todos.push(todo);
    console.log(`추가됨: [${todo.id}] ${todo.title}${todo.memo ? ` (메모: ${todo.memo})` : ''}`);
    return todo;
  }

  // 할일 삭제
  remove(id: number): boolean {
    const index: number = this.todos.findIndex((todo: ITodo) => todo.id === id);
    if (index !== -1) {
      const removed: ITodo = this.todos.splice(index, 1)[0];
      console.log(`삭제됨: [${removed.id}] ${removed.title}`);
      return true;
    }
    console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
    return false;
  }

  // 할일 완료 토글
  // readonly 속성(id)은 변경 불가하지만, done은 변경 가능합니다
  toggle(id: number): boolean {
    const todo: ITodo | undefined = this.todos.find((t: ITodo) => t.id === id);
    if (todo !== undefined) {
      // done은 readonly가 아니므로 변경 가능
      todo.done = !todo.done;
      // todo.id = 999;  // 에러! readonly 속성은 변경 불가
      const status: string = todo.done ? "완료" : "미완료";
      console.log(`토글됨: [${todo.id}] ${todo.title} → ${status}`);
      return true;
    }
    console.log(`ID ${id}에 해당하는 할일을 찾을 수 없습니다.`);
    return false;
  }

  // 전체 할일 반환
  getAll(): ITodo[] {
    return [...this.todos]; // 배열 복사본을 반환하여 외부에서 직접 수정 방지
  }

  // 카테고리별 할일 검색
  findByCategory(category: string): ITodo[] {
    return this.todos.filter((todo: ITodo) => todo.category === category);
  }

  // 우선순위별 할일 검색 (인터페이스 외 추가 메서드)
  findByPriority(priority: Priority): ITodo[] {
    return this.todos.filter((todo: ITodo) => todo.priority === priority);
  }

  // 전체 할일 보기 좋게 출력 (인터페이스 외 추가 메서드)
  printAll(): void {
    if (this.todos.length === 0) {
      console.log("  할일이 없습니다.");
      return;
    }

    this.todos.forEach((todo: ITodo) => {
      const check: string = todo.done ? "✓" : " ";
      const priorityLabel: string = this.getPriorityLabel(todo.priority);
      let line = `  [${check}] ${todo.title} (우선순위: ${priorityLabel}, 카테고리: ${todo.category})`;
      // 선택적 속성 memo가 있을 때만 표시
      if (todo.memo) {
        line += ` - 메모: ${todo.memo}`;
      }
      console.log(line);
    });
    console.log(`  총 ${this.todos.length}개의 할일`);
  }

  // 통계 반환 (인터페이스 외 추가 메서드)
  getStats(): { total: number; completed: number; active: number } {
    const total: number = this.todos.length;
    const completed: number = this.todos.filter((t: ITodo) => t.done).length;
    return { total, completed, active: total - completed };
  }

  // 우선순위 한글 라벨 변환 (private 메서드)
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
}

// === 테스트 코드 ===
const service = new TodoService();

console.log("=== 할일 관리 앱 (인터페이스 & 클래스) ===\n");

// 할일 추가 - memo가 있는 것과 없는 것
service.add("TypeScript 인터페이스 배우기", "high", "공부");
service.add("점심 먹기", "medium", "생활");
service.add("운동하기", "low", "건강", "헬스장 가기");
service.add("TypeScript 클래스 복습", "high", "공부", "implements 중점적으로");

// 전체 출력
console.log("\n--- 전체 할일 목록 ---");
service.printAll();

// 할일 완료 처리
console.log("\n--- 첫 번째 할일 완료 처리 ---");
service.toggle(1);
service.printAll();

// 카테고리 검색
console.log("\n--- '공부' 카테고리 할일 ---");
const studyTodos: ITodo[] = service.findByCategory("공부");
studyTodos.forEach((todo: ITodo) => {
  console.log(`  [${todo.id}] ${todo.title} (${todo.done ? "완료" : "미완료"})`);
});

// 우선순위 검색
console.log("\n--- '높음' 우선순위 할일 ---");
const highPriorityTodos: ITodo[] = service.findByPriority("high");
highPriorityTodos.forEach((todo: ITodo) => {
  console.log(`  [${todo.id}] ${todo.title}`);
});

// 할일 삭제
console.log("\n--- 두 번째 할일 삭제 ---");
service.remove(2);
service.printAll();

// 통계
console.log("\n--- 통계 ---");
const stats = service.getStats();
console.log(`  전체: ${stats.total}개, 완료: ${stats.completed}개, 진행중: ${stats.active}개`);

// readonly 속성 확인 - 아래 코드는 컴파일 에러가 발생합니다
// const todo = service.getAll()[0];
// todo.id = 999;  // 에러! Cannot assign to 'id' because it is a read-only property
