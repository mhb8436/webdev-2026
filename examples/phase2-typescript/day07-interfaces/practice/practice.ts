/**
 * Day 07 연습 문제 - 인터페이스, 함수 타입, 클래스
 *
 * 각 문제의 TODO를 채워주세요.
 * 완성 후 `npx tsc && node dist/practice.js`로 실행하세요.
 */

// ============================================
// 연습 문제 1: 도서관 시스템
// ============================================

// TODO: IBook 인터페이스를 정의하세요
// - isbn: string (readonly)
// - title: string
// - author: string
// - publishedYear: number
// - isBorrowed?: boolean (선택적)

// TODO: ILibrary 인터페이스를 정의하세요
// - addBook(book: IBook): void
// - findBook(isbn: string): IBook | undefined
// - borrowBook(isbn: string): boolean
// - returnBook(isbn: string): boolean

// TODO: Library 클래스를 구현하세요

// 테스트
// console.log("=== 도서관 시스템 ===");
// const library = new Library();
// library.addBook({ isbn: "978-89-01", title: "TypeScript 입문", author: "홍길동", publishedYear: 2024 });
// library.addBook({ isbn: "978-89-02", title: "JavaScript 마스터", author: "김영희", publishedYear: 2023 });
// library.addBook({ isbn: "978-89-03", title: "웹 개발의 정석", author: "박민수", publishedYear: 2024 });
//
// console.log(library.findBook("978-89-01"));
// console.log(library.borrowBook("978-89-01")); // true
// console.log(library.borrowBook("978-89-01")); // false (이미 대출 중)
// console.log(library.returnBook("978-89-01")); // true
// console.log(library.returnBook("978-89-01")); // false (대출 중이 아님)
// console.log(library.borrowBook("978-89-99")); // false (존재하지 않는 도서)

// ============================================
// 연습 문제 2: 은행 계좌
// ============================================

// TODO: IAccount 인터페이스를 정의하세요
// - accountNumber: string (readonly)
// - owner: string
// - balance: number

// TODO: ITransaction 인터페이스를 정의하세요
// - deposit(amount: number): void
// - withdraw(amount: number): void
// - getBalance(): number

// TODO: BankAccount 클래스를 구현하세요
// - IAccount와 ITransaction을 모두 구현
// - 거래 내역(history) 배열 관리
// - printHistory() 메서드 추가

// 테스트
// console.log("\n=== 은행 계좌 ===");
// const account = new BankAccount("110-1234-5678", "홍길동");
// account.deposit(100000);
// account.deposit(50000);
// account.withdraw(30000);
// console.log(`잔액: ${account.getBalance()}원`);
// account.printHistory();
//
// // 에러 테스트
// try {
//   account.withdraw(500000); // 잔액 부족
// } catch (e) {
//   console.log(`에러: ${(e as Error).message}`);
// }
//
// try {
//   account.deposit(-1000); // 음수 금액
// } catch (e) {
//   console.log(`에러: ${(e as Error).message}`);
// }

// ============================================
// 연습 문제 3: 인터페이스 확장
// ============================================

// TODO: IAnimal 인터페이스를 정의하세요
// - name: string
// - age: number
// - sound(): string

// TODO: IDog 인터페이스를 IAnimal에서 확장하세요
// - breed: string
// - isTrainable: boolean
// - fetch(): string

// TODO: ICat 인터페이스를 IAnimal에서 확장하세요
// - color: string
// - isIndoor: boolean
// - purr(): string

// TODO: 각 인터페이스의 객체를 만들어 테스트하세요

// 테스트
// console.log("\n=== 인터페이스 확장 ===");
// const dog: IDog = { ... };
// console.log(`${dog.name}(${dog.breed}): ${dog.sound()}`);
// console.log(dog.fetch());
//
// const cat: ICat = { ... };
// console.log(`${cat.name}(${cat.color}): ${cat.sound()}`);
// console.log(cat.purr());

// 추가 도전: IServiceDog 인터페이스
// TODO: IServiceDog를 IDog에서 확장하세요
// - role: string
// - assist(): string
