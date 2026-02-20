/**
 * Day 07 연습 문제 정답 - 인터페이스, 함수 타입, 클래스
 */

// ============================================
// 연습 문제 1: 도서관 시스템
// ============================================

interface IBook {
  readonly isbn: string;
  title: string;
  author: string;
  publishedYear: number;
  isBorrowed?: boolean;
}

interface ILibrary {
  addBook(book: IBook): void;
  findBook(isbn: string): IBook | undefined;
  borrowBook(isbn: string): boolean;
  returnBook(isbn: string): boolean;
}

class Library implements ILibrary {
  private books: IBook[] = [];

  addBook(book: IBook): void {
    this.books.push({ ...book, isBorrowed: false });
    console.log(`[도서 추가] "${book.title}" (${book.isbn})`);
  }

  findBook(isbn: string): IBook | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }

  borrowBook(isbn: string): boolean {
    const book = this.findBook(isbn);
    if (!book) {
      console.log(`[대출 실패] ISBN ${isbn}: 존재하지 않는 도서`);
      return false;
    }
    if (book.isBorrowed) {
      console.log(`[대출 실패] "${book.title}": 이미 대출 중`);
      return false;
    }
    book.isBorrowed = true;
    console.log(`[대출 성공] "${book.title}"`);
    return true;
  }

  returnBook(isbn: string): boolean {
    const book = this.findBook(isbn);
    if (!book) {
      console.log(`[반납 실패] ISBN ${isbn}: 존재하지 않는 도서`);
      return false;
    }
    if (!book.isBorrowed) {
      console.log(`[반납 실패] "${book.title}": 대출 중이 아님`);
      return false;
    }
    book.isBorrowed = false;
    console.log(`[반납 성공] "${book.title}"`);
    return true;
  }
}

// 테스트
console.log("=== 도서관 시스템 ===");
const library = new Library();
library.addBook({
  isbn: "978-89-01",
  title: "TypeScript 입문",
  author: "홍길동",
  publishedYear: 2024,
});
library.addBook({
  isbn: "978-89-02",
  title: "JavaScript 마스터",
  author: "김영희",
  publishedYear: 2023,
});
library.addBook({
  isbn: "978-89-03",
  title: "웹 개발의 정석",
  author: "박민수",
  publishedYear: 2024,
});

console.log(library.findBook("978-89-01"));
console.log(library.borrowBook("978-89-01")); // true
console.log(library.borrowBook("978-89-01")); // false (이미 대출 중)
console.log(library.returnBook("978-89-01")); // true
console.log(library.returnBook("978-89-01")); // false (대출 중이 아님)
console.log(library.borrowBook("978-89-99")); // false (존재하지 않는 도서)
console.log();

// ============================================
// 연습 문제 2: 은행 계좌
// ============================================

interface IAccount {
  readonly accountNumber: string;
  owner: string;
  balance: number;
}

interface ITransaction {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  getBalance(): number;
}

// 거래 내역 타입
interface IHistoryEntry {
  type: "입금" | "출금";
  amount: number;
  balance: number;
  date: Date;
}

class BankAccount implements IAccount, ITransaction {
  readonly accountNumber: string;
  owner: string;
  balance: number;
  private history: IHistoryEntry[] = [];

  constructor(accountNumber: string, owner: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("입금 금액은 0보다 커야 합니다.");
    }
    this.balance += amount;
    this.history.push({
      type: "입금",
      amount,
      balance: this.balance,
      date: new Date(),
    });
    console.log(`[입금] ${amount.toLocaleString()}원 → 잔액: ${this.balance.toLocaleString()}원`);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("출금 금액은 0보다 커야 합니다.");
    }
    if (amount > this.balance) {
      throw new Error(
        `잔액이 부족합니다. (현재 잔액: ${this.balance.toLocaleString()}원, 출금 요청: ${amount.toLocaleString()}원)`
      );
    }
    this.balance -= amount;
    this.history.push({
      type: "출금",
      amount,
      balance: this.balance,
      date: new Date(),
    });
    console.log(`[출금] ${amount.toLocaleString()}원 → 잔액: ${this.balance.toLocaleString()}원`);
  }

  getBalance(): number {
    return this.balance;
  }

  printHistory(): void {
    console.log(`\n[거래 내역] 계좌: ${this.accountNumber} (${this.owner})`);
    console.log("-".repeat(50));
    this.history.forEach((entry) => {
      const dateStr = entry.date.toLocaleString("ko-KR");
      console.log(
        `${entry.type} | ${entry.amount.toLocaleString()}원 | 잔액: ${entry.balance.toLocaleString()}원 | ${dateStr}`
      );
    });
    console.log("-".repeat(50));
  }
}

// 테스트
console.log("=== 은행 계좌 ===");
const account = new BankAccount("110-1234-5678", "홍길동");
account.deposit(100000);
account.deposit(50000);
account.withdraw(30000);
console.log(`잔액: ${account.getBalance().toLocaleString()}원`);
account.printHistory();

// 에러 테스트
try {
  account.withdraw(500000); // 잔액 부족
} catch (e) {
  console.log(`에러: ${(e as Error).message}`);
}

try {
  account.deposit(-1000); // 음수 금액
} catch (e) {
  console.log(`에러: ${(e as Error).message}`);
}
console.log();

// ============================================
// 연습 문제 3: 인터페이스 확장
// ============================================

interface IAnimal {
  name: string;
  age: number;
  sound(): string;
}

interface IDog extends IAnimal {
  breed: string;
  isTrainable: boolean;
  fetch(): string;
}

interface ICat extends IAnimal {
  color: string;
  isIndoor: boolean;
  purr(): string;
}

// 각 인터페이스의 객체 생성
const myDog: IDog = {
  name: "바둑이",
  age: 3,
  breed: "진돗개",
  isTrainable: true,
  sound() {
    return "멍멍!";
  },
  fetch() {
    return `${this.name}가 공을 물어왔습니다!`;
  },
};

const myCat: ICat = {
  name: "나비",
  age: 2,
  color: "흰색",
  isIndoor: true,
  sound() {
    return "야옹~";
  },
  purr() {
    return `${this.name}가 골골골~ 소리를 냅니다.`;
  },
};

// 테스트
console.log("=== 인터페이스 확장 ===");
console.log(`${myDog.name}(${myDog.breed}, ${myDog.age}살): ${myDog.sound()}`);
console.log(myDog.fetch());
console.log(`훈련 가능: ${myDog.isTrainable}`);
console.log();

console.log(`${myCat.name}(${myCat.color}, ${myCat.age}살): ${myCat.sound()}`);
console.log(myCat.purr());
console.log(`실내 고양이: ${myCat.isIndoor}`);
console.log();

// 추가 도전: IServiceDog 인터페이스
interface IServiceDog extends IDog {
  role: string;
  assist(): string;
}

const serviceDog: IServiceDog = {
  name: "헬퍼",
  age: 5,
  breed: "래브라도 리트리버",
  isTrainable: true,
  role: "안내견",
  sound() {
    return "멍!";
  },
  fetch() {
    return `${this.name}가 물건을 가져왔습니다.`;
  },
  assist() {
    return `${this.name}(${this.role})가 시각장애인을 안내합니다.`;
  },
};

console.log("=== 서비스 도그 ===");
console.log(`${serviceDog.name} - 역할: ${serviceDog.role}`);
console.log(serviceDog.assist());
