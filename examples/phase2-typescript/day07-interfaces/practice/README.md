# Day 07 - 인터페이스, 함수 타입, 클래스: 연습 문제

## 연습 문제 1: 도서관 시스템

인터페이스와 클래스를 활용하여 간단한 도서관 시스템을 구현하세요.

### 요구사항

- `IBook` 인터페이스를 정의하세요:
  - `isbn`: `string` (readonly - 한번 정해지면 변경 불가)
  - `title`: `string`
  - `author`: `string`
  - `publishedYear`: `number`
  - `isBorrowed?`: `boolean` (선택적 속성)

- `ILibrary` 인터페이스를 정의하세요:
  - `addBook(book: IBook): void` - 도서 추가
  - `findBook(isbn: string): IBook | undefined` - ISBN으로 도서 검색
  - `borrowBook(isbn: string): boolean` - 도서 대출 (이미 대출 중이면 false)
  - `returnBook(isbn: string): boolean` - 도서 반납

- `Library` 클래스로 `ILibrary`를 구현하세요:
  - 내부에 `books: IBook[]` 배열을 관리하세요.
  - 대출/반납 시 `isBorrowed` 상태를 변경하세요.

### 테스트 시나리오

```typescript
const library = new Library();
library.addBook({ isbn: "978-89-01", title: "TypeScript 입문", author: "홍길동", publishedYear: 2024 });
library.addBook({ isbn: "978-89-02", title: "JavaScript 마스터", author: "김영희", publishedYear: 2023 });
console.log(library.borrowBook("978-89-01")); // true
console.log(library.borrowBook("978-89-01")); // false (이미 대출 중)
console.log(library.returnBook("978-89-01")); // true
```

---

## 연습 문제 2: 은행 계좌

인터페이스와 클래스를 활용하여 은행 계좌 시스템을 구현하세요.

### 요구사항

- `IAccount` 인터페이스를 정의하세요:
  - `accountNumber`: `string` (readonly)
  - `owner`: `string`
  - `balance`: `number`

- `ITransaction` 인터페이스를 정의하세요:
  - `deposit(amount: number): void` - 입금
  - `withdraw(amount: number): void` - 출금
  - `getBalance(): number` - 잔액 조회

- `BankAccount` 클래스로 `IAccount`와 `ITransaction`을 구현하세요:
  - 출금 시 잔액이 부족하면 에러를 발생시키세요.
  - 입금/출금 금액이 0 이하이면 에러를 발생시키세요.
  - 거래 내역을 배열로 저장하고 출력하는 `printHistory()` 메서드를 추가하세요.

### 테스트 시나리오

```typescript
const account = new BankAccount("110-1234-5678", "홍길동");
account.deposit(100000);
account.deposit(50000);
account.withdraw(30000);
console.log(`잔액: ${account.getBalance()}원`); // 120000원
account.printHistory();
```

---

## 연습 문제 3: 인터페이스 확장

`extends` 키워드를 사용하여 인터페이스를 확장하세요.

### 요구사항

- `IAnimal` 인터페이스를 정의하세요:
  - `name`: `string`
  - `age`: `number`
  - `sound(): string` - 울음소리 반환

- `IDog` 인터페이스를 `IAnimal`에서 확장하세요:
  - `breed`: `string` (품종)
  - `isTrainable`: `boolean`
  - `fetch(): string` - 물건 가져오기 메서드

- `ICat` 인터페이스를 `IAnimal`에서 확장하세요:
  - `color`: `string` (털 색상)
  - `isIndoor`: `boolean` (실내 고양이 여부)
  - `purr(): string` - 골골 소리 메서드

- 각 인터페이스의 인스턴스(객체)를 만들어 테스트하세요.
- **추가 도전**: `IServiceDog`를 `IDog`에서 확장하여 `role: string`(안내견, 구조견 등)과 `assist(): string` 메서드를 추가하세요.

---

## 실행 방법

```bash
# TypeScript 컴파일
npx tsc

# 실행
node dist/practice.js
```
