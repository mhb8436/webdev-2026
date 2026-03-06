// ============================================
// Day 07 - 인터페이스 심화
// ============================================
// 학습목표: optional, readonly, 인덱스 시그니처, 확장, 클래스 구현

// TODO 1: 선택적 속성과 readonly
// interface User {
//   readonly id: number;
//   name: string;
//   email: string;
//   phone?: string;        // 선택적
//   readonly createdAt: Date;
// }


// TODO 2: 인덱스 시그니처
// interface StringMap { [key: string]: string }
// interface NumberArray { [index: number]: string }
// 다양한 키-값 쌍을 저장할 수 있는 인터페이스


// TODO 3: 인터페이스 확장 (extends)
// interface BaseEntity { id: number; createdAt: Date; updatedAt: Date; }
// interface Post extends BaseEntity { title: string; content: string; }
// interface Comment extends BaseEntity { postId: number; body: string; }


// TODO 4: 클래스에서 인터페이스 구현 (implements)
// interface Printable { print(): void; }
// interface Serializable { toJSON(): string; }
// class TodoItem implements Printable, Serializable { ... }


// TODO 5: 함수 타입 인터페이스
// interface SearchFunction {
//   (items: string[], query: string): string[];
// }
// 이 인터페이스를 구현하는 함수를 작성하세요
