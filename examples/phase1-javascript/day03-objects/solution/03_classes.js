// ============================================
// Day 03 - ES6 클래스 (풀이)
// ============================================

// --- 1. Animal 클래스 ---
console.log("=== Animal 클래스 ===");

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(`${this.name}: ${this.sound}!`);
  }

  toString() {
    return `Animal(${this.name})`;
  }
}

const cat = new Animal("고양이", "야옹");
cat.speak();
console.log(cat.toString());
console.log("");

// --- 2. Dog 클래스 (상속) ---
console.log("=== 상속: Dog ===");

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "멍멍");  // 부모 생성자 호출
    this.breed = breed;
  }

  fetch(item) {
    console.log(`${this.name}(이)가 ${item}을 물어왔습니다!`);
  }

  toString() {
    return `Dog(${this.name}, ${this.breed})`;
  }
}

const dog = new Dog("바둑이", "진돗개");
dog.speak();       // 부모 메서드 사용
dog.fetch("공");   // 자기 메서드
console.log(dog.toString());
console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true
console.log("");

// --- 3. TodoItem 클래스 ---
console.log("=== TodoItem 클래스 ===");

class TodoItem {
  static nextId = 1;

  constructor(title, priority = "medium") {
    this.id = TodoItem.nextId++;
    this.title = title;
    this.priority = priority;
    this.done = false;
    this.createdAt = new Date();
  }

  toggle() {
    this.done = !this.done;
    return this;
  }

  toString() {
    const status = this.done ? "V" : " ";
    return `[${status}] ${this.title} (${this.priority})`;
  }
}

const item1 = new TodoItem("공부하기", "high");
const item2 = new TodoItem("운동하기");
console.log(item1.toString());
item1.toggle();
console.log(item1.toString());
console.log("");

// --- 4. TodoList 클래스 ---
console.log("=== TodoList 클래스 ===");

class TodoList {
  #todos = [];  // private 필드

  add(title, priority) {
    const item = new TodoItem(title, priority);
    this.#todos.push(item);
    console.log(`추가: ${item.toString()}`);
    return item;
  }

  remove(id) {
    const index = this.#todos.findIndex(t => t.id === id);
    if (index === -1) {
      console.log(`ID ${id}을 찾을 수 없습니다`);
      return false;
    }
    const removed = this.#todos.splice(index, 1)[0];
    console.log(`삭제: ${removed.title}`);
    return true;
  }

  getByPriority(priority) {
    return this.#todos.filter(t => t.priority === priority);
  }

  get completed() {
    return this.#todos.filter(t => t.done).length;
  }

  get total() {
    return this.#todos.length;
  }

  print() {
    console.log("\n--- 할일 목록 ---");
    if (this.#todos.length === 0) {
      console.log("  (비어있음)");
      return;
    }
    this.#todos.forEach(todo => {
      console.log(`  ${todo.id}. ${todo.toString()}`);
    });
    console.log(`완료: ${this.completed}/${this.total}`);
  }
}

// --- 5. 테스트 ---
const list = new TodoList();
const t1 = list.add("TypeScript 배우기", "high");
const t2 = list.add("점심 먹기", "medium");
const t3 = list.add("운동하기", "low");
list.print();

t1.toggle();
list.print();

const highItems = list.getByPriority("high");
console.log("\nHigh 우선순위:", highItems.map(t => t.title));

list.remove(t2.id);
list.print();
