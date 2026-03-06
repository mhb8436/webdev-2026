// ============================================
// Day 08 - 제네릭 연습문제 (풀이)
// ============================================

// --- 연습 1: 제네릭 스택 ---
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

console.log("=== 연습 1: 스택 ===");
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log("peek:", numStack.peek());       // 3
console.log("pop:", numStack.pop());         // 3
console.log("size:", numStack.size());       // 2
console.log("toArray:", numStack.toArray()); // [1, 2]
console.log("isEmpty:", numStack.isEmpty()); // false

const strStack = new Stack<string>();
strStack.push("hello");
strStack.push("world");
console.log("문자열 스택:", strStack.toArray()); // ["hello", "world"]
console.log("");


// --- 연습 2: 제네릭 이벤트 에미터 ---
type EventMap = {
  login: { userId: number; timestamp: Date };
  logout: { userId: number };
  error: { message: string; code: number };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private handlers: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventHandlers = this.handlers[event];
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(data));
    }
  }

  off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    const eventHandlers = this.handlers[event];
    if (eventHandlers) {
      this.handlers[event] = eventHandlers.filter(h => h !== handler);
    }
  }
}

console.log("=== 연습 2: 이벤트 에미터 ===");
const emitter = new TypedEventEmitter<EventMap>();

emitter.on('login', (data) => {
  console.log(`로그인: 사용자 ${data.userId} (${data.timestamp.toLocaleString()})`);
});

emitter.on('error', (data) => {
  console.log(`에러 ${data.code}: ${data.message}`);
});

const logoutHandler = (data: EventMap['logout']) => {
  console.log(`로그아웃: 사용자 ${data.userId}`);
};
emitter.on('logout', logoutHandler);

emitter.emit('login', { userId: 1, timestamp: new Date() });
emitter.emit('error', { message: '접근 거부', code: 403 });
emitter.emit('logout', { userId: 1 });

// off 테스트
emitter.off('logout', logoutHandler);
emitter.emit('logout', { userId: 2 }); // 핸들러 제거되어 출력 없음
console.log("(logout 핸들러 제거 후 emit → 출력 없음)");
console.log("");


// --- 연습 3: 제네릭 파이프라인 ---
interface Pipeline<T> {
  then<U>(fn: (value: T) => U): Pipeline<U>;
  result(): T;
}

function pipe<T>(value: T): Pipeline<T> {
  return {
    then<U>(fn: (value: T) => U): Pipeline<U> {
      return pipe(fn(value));
    },
    result(): T {
      return value;
    },
  };
}

console.log("=== 연습 3: 파이프라인 ===");
const result1 = pipe(5)
  .then(x => x * 2)       // 10
  .then(x => x + 3)       // 13
  .then(x => String(x))   // "13"
  .result();
console.log("파이프 결과:", result1); // "13"

const result2 = pipe([1, 2, 3, 4, 5])
  .then(arr => arr.filter(n => n % 2 === 0))  // [2, 4]
  .then(arr => arr.map(n => n * 10))           // [20, 40]
  .then(arr => arr.reduce((a, b) => a + b, 0)) // 60
  .result();
console.log("배열 파이프:", result2); // 60

const result3 = pipe({ name: '홍길동', age: 30 })
  .then(user => ({ ...user, greeting: `안녕하세요, ${user.name}님` }))
  .then(user => user.greeting)
  .result();
console.log("객체 파이프:", result3); // "안녕하세요, 홍길동님"
