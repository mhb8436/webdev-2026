// ============================================
// Day 08 - 제네릭 연습문제
// ============================================

// --- 연습 1: 제네릭 스택 ---
// Stack<T> 클래스를 구현하세요
// - push(item: T): void
// - pop(): T | undefined
// - peek(): T | undefined  (제거하지 않고 맨 위 확인)
// - isEmpty(): boolean
// - size(): number
// - toArray(): T[]

// TODO: Stack<T> 구현


// 테스트
// const stack = new Stack<number>();
// stack.push(1); stack.push(2); stack.push(3);
// console.log(stack.peek());     // 3
// console.log(stack.pop());      // 3
// console.log(stack.size());     // 2
// console.log(stack.toArray());  // [1, 2]


// --- 연습 2: 제네릭 이벤트 에미터 ---
// 타입 안전한 이벤트 시스템을 만드세요

// TODO: EventMap 타입 정의
// type EventMap = {
//   login: { userId: number; timestamp: Date };
//   logout: { userId: number };
//   error: { message: string; code: number };
// };

// TODO: TypedEventEmitter<T> 클래스
// - on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void
// - emit<K extends keyof T>(event: K, data: T[K]): void
// - off<K extends keyof T>(event: K, handler: (data: T[K]) => void): void

// 테스트
// const emitter = new TypedEventEmitter<EventMap>();
// emitter.on('login', (data) => console.log(`로그인: ${data.userId}`));
// emitter.emit('login', { userId: 1, timestamp: new Date() });


// --- 연습 3: 제네릭 파이프라인 ---
// 함수들을 순차적으로 연결하는 파이프라인을 만드세요

// TODO: pipe 함수 구현
// pipe(value)
//   .then(fn1)  // fn1(value)
//   .then(fn2)  // fn2(fn1(value))
//   .result()   // 최종 결과

// 테스트
// const result = pipe(5)
//   .then(x => x * 2)       // 10
//   .then(x => x + 3)       // 13
//   .then(x => String(x))   // "13"
//   .result();
// console.log(result);       // "13"
