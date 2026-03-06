// ============================================
// Day 06 - 유니온 타입과 리터럴 타입 (풀이)
// ============================================

// --- 1. 유니온 타입 ---
console.log("=== 유니온 타입 ===");

let id: string | number;
id = "ABC-123";
console.log("문자열 id:", id);
id = 42;
console.log("숫자 id:", id);

function formatValue(value: string | number | boolean): string {
  return `값: ${value} (타입: ${typeof value})`;
}
console.log(formatValue("hello"));
console.log(formatValue(42));
console.log(formatValue(true));
console.log("");

// --- 2. 리터럴 타입 ---
console.log("=== 리터럴 타입 ===");

type Direction = "north" | "south" | "east" | "west";
type HttpStatus = 200 | 301 | 404 | 500;

function move(direction: Direction, steps: number): string {
  return `${direction} 방향으로 ${steps}칸 이동`;
}
console.log(move("north", 3));

function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case 200: return "성공";
    case 301: return "리다이렉트";
    case 404: return "찾을 수 없음";
    case 500: return "서버 에러";
  }
}
console.log("404:", getStatusMessage(404));
console.log("");

// --- 3. 타입 내로잉 ---
console.log("=== 타입 내로잉 ===");

function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log(`문자열 ID: ${id.toUpperCase()}`);
  } else {
    console.log(`숫자 ID: ${id.toFixed(2)}`);
  }
}
printId("abc-123");
printId(42);
console.log("");

// --- 4. 타입 가드 ---
console.log("=== 타입 가드 ===");

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processInput(input: unknown): string {
  if (isString(input)) return `문자열: "${input.trim()}"`;
  if (isNumber(input)) return `숫자: ${input * 2}`;
  return "알 수 없는 타입";
}
console.log(processInput("  hello  "));
console.log(processInput(21));
console.log(processInput(true));
console.log("");

// --- 5. 판별 유니온 ---
console.log("=== 판별 유니온 ===");

type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 10, height: 3 },
  { kind: "triangle", base: 8, height: 6 },
];

shapes.forEach(shape => {
  console.log(`${shape.kind}: 넓이 = ${getArea(shape).toFixed(2)}`);
});
