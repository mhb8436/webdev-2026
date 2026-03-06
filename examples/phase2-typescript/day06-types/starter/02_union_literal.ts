// ============================================
// Day 06 - 유니온 타입과 리터럴 타입
// ============================================
// 학습목표: 유니온 타입, 리터럴 타입, 타입 내로잉, 판별 유니온

// TODO 1: 유니온 타입 변수 선언
// id가 string 또는 number일 수 있는 변수 선언
// function formatValue(value: string | number | boolean): string 구현


// TODO 2: 리터럴 타입 선언
// type Direction = "north" | "south" | "east" | "west"
// type HttpStatus = 200 | 301 | 404 | 500
// 각 타입을 매개변수로 받는 함수 작성


// TODO 3: 타입 내로잉 함수
// function printId(id: string | number): void
// typeof로 string/number를 구분하여 다르게 처리


// TODO 4: 타입 가드 함수
// function isString(value: unknown): value is string
// function isNumber(value: unknown): value is number
// unknown 타입 입력을 안전하게 처리하는 processInput 함수


// TODO 5: 판별 유니온 (Discriminated Union)
// type Circle = { kind: "circle"; radius: number }
// type Rectangle = { kind: "rectangle"; width: number; height: number }
// type Triangle = { kind: "triangle"; base: number; height: number }
// type Shape = Circle | Rectangle | Triangle
// function getArea(shape: Shape): number 구현 (switch문 사용)
