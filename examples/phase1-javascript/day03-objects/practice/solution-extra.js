// ============================================
// Day 03 추가 연습 풀이
// ============================================

// 문제 5: 학생 관리 시스템
console.log("=== 문제 5: 학생 관리 ===");

class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
    this.scores = [];
  }

  addScore(score) {
    this.scores.push(score);
  }

  getAverage() {
    if (this.scores.length === 0) return 0;
    return this.scores.reduce((sum, s) => sum + s, 0) / this.scores.length;
  }

  getGrade() {
    const avg = this.getAverage();
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    return 'D';
  }
}

const s1 = new Student("김철수", 3);
s1.addScore(85); s1.addScore(92); s1.addScore(78);

const s2 = new Student("이영희", 2);
s2.addScore(95); s2.addScore(88); s2.addScore(91);

const s3 = new Student("박민수", 3);
s3.addScore(65); s3.addScore(72); s3.addScore(68);

[s1, s2, s3].forEach(s => {
  console.log(`${s.name} (${s.grade}학년): 평균 ${s.getAverage().toFixed(1)} → ${s.getGrade()}`);
});
console.log("");

// 문제 6: 장바구니
console.log("=== 문제 6: 장바구니 ===");

const cart = {
  items: [],

  addItem(name, price, qty) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ name, price, qty });
    }
  },

  removeItem(name) {
    this.items = this.items.filter(i => i.name !== name);
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getItemCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  print() {
    console.log("--- 장바구니 ---");
    this.items.forEach(i => {
      console.log(`  ${i.name} x${i.qty} = ${(i.price * i.qty).toLocaleString()}원`);
    });
    console.log(`  총 ${this.getItemCount()}개, ${this.getTotal().toLocaleString()}원`);
  },
};

cart.addItem("노트북", 1500000, 1);
cart.addItem("마우스", 50000, 2);
cart.addItem("키보드", 120000, 1);
cart.print();
cart.removeItem("마우스");
console.log("마우스 제거 후:");
cart.print();
console.log("");

// 문제 7: 구조분해 + 스프레드
console.log("=== 문제 7: 구조분해 + 스프레드 ===");

const response = {
  status: 200,
  data: {
    users: [
      { id: 1, name: "김철수", address: { city: "서울", zip: "12345" } },
      { id: 2, name: "이영희", address: { city: "부산", zip: "67890" } },
    ]
  },
  meta: { page: 1, total: 50 }
};

const { status, data: { users }, meta: { page } } = response;
console.log(`상태: ${status}, 페이지: ${page}`);

const [{ address: { city: firstCity } }] = users;
console.log("첫 사용자 도시:", firstCity);

const newUsers = [...users, { id: 3, name: "박민수", address: { city: "대구", zip: "11111" } }];
console.log("이름 목록:", newUsers.map(({ name }) => name));
console.log("");

// 문제 8: CSV → JSON
console.log("=== 문제 8: CSV → JSON ===");

const csv = "이름,나이,도시\n김철수,25,서울\n이영희,30,부산\n박민수,28,대구";
const lines = csv.split("\n");
const headers = lines[0].split(",");
const result = lines.slice(1).map(line => {
  const values = line.split(",");
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = isNaN(values[i]) ? values[i] : Number(values[i]);
  });
  return obj;
});
console.log(JSON.stringify(result, null, 2));
