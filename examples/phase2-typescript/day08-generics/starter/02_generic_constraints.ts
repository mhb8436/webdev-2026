// ============================================
// Day 08 - 제네릭 제약과 활용
// ============================================
// 학습목표: extends 제약, keyof, 제네릭 클래스, 조건부 타입

// TODO 1: 제네릭 함수 기본
// function identity<T>(value: T): T - 입력을 그대로 반환
// function firstElement<T>(arr: T[]): T | undefined
// function merge<T, U>(obj1: T, obj2: U): T & U


// TODO 2: 제약 조건 (extends)
// function getLength<T extends { length: number }>(item: T): number
// 문자열, 배열 등 length 속성이 있는 타입만 허용


// TODO 3: keyof 연산자
// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
// 객체의 존재하는 키만 접근 가능하게 타입 안전성 보장


// TODO 4: 제네릭 인터페이스
// interface ApiResponse<T> { status: number; data: T; error?: string; }
// interface PaginatedResponse<T> extends ApiResponse<T[]> {
//   page: number; totalPages: number; totalItems: number;
// }


// TODO 5: 제네릭 클래스 - DataStore<T>
// class DataStore<T extends { id: number }> {
//   add(item: T): void
//   getById(id: number): T | undefined
//   getAll(): T[]
//   update(id: number, updates: Partial<T>): T | undefined
//   delete(id: number): boolean
// }
