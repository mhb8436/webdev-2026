// ============================================
// Day 07 - 인터페이스 & 유틸리티 타입 연습문제 (풀이)
// ============================================

// --- 연습 1: 게시판 타입 설계 ---
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: number;
  tags: string[];
  status: 'draft' | 'published';
}

interface Comment extends BaseEntity {
  content: string;
  postId: number;
  authorId: number;
}

// 유틸리티 타입 활용
type CreatePostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
type UpdatePostInput = Partial<CreatePostInput>;
type PostSummary = Pick<Post, 'id' | 'title' | 'status' | 'createdAt'>;

console.log("=== 연습 1 ===");
const newPost: CreatePostInput = {
  title: '첫 글',
  content: '내용입니다',
  authorId: 1,
  tags: ['typescript'],
  status: 'draft',
};
console.log("CreatePostInput:", newPost);

const update: UpdatePostInput = { title: '수정된 제목' };
console.log("UpdatePostInput:", update);

const summary: PostSummary = {
  id: 1, title: '첫 글', status: 'published', createdAt: new Date(),
};
console.log("PostSummary:", summary);
console.log("");


// --- 연습 2: 제네릭 CRUD 인터페이스 ---
interface Repository<T extends BaseEntity> {
  findAll(): T[];
  findById(id: number): T | undefined;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T;
  update(id: number, data: Partial<T>): T | undefined;
  delete(id: number): boolean;
}

class InMemoryRepository<T extends BaseEntity> implements Repository<T> {
  private items: T[] = [];
  private nextId = 1;

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const now = new Date();
    const item = {
      ...data,
      id: this.nextId++,
      createdAt: now,
      updatedAt: now,
    } as T;
    this.items.push(item);
    return item;
  }

  update(id: number, data: Partial<T>): T | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.items[index];
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

console.log("=== 연습 2 ===");
const userRepo = new InMemoryRepository<User>();
const user1 = userRepo.create({ name: '홍길동', email: 'hong@test.com', role: 'admin' });
const user2 = userRepo.create({ name: '김철수', email: 'kim@test.com', role: 'user' });
console.log("생성:", user1.name, user2.name);
console.log("전체:", userRepo.findAll().map(u => u.name));

userRepo.update(1, { name: '홍길동(수정)' });
console.log("수정 후:", userRepo.findById(1)?.name);

userRepo.delete(2);
console.log("삭제 후:", userRepo.findAll().map(u => u.name));
console.log("");


// --- 연습 3: 폼 검증 타입 ---
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

type FormSchema = Record<string, ValidationRule[]>;

function validate(
  data: Record<string, string>,
  schema: FormSchema
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field] || '';
    const fieldErrors: string[] = [];

    for (const rule of rules) {
      if (rule.required && !value.trim()) {
        fieldErrors.push(rule.message);
        continue; // required 실패하면 다른 검증 스킵
      }
      if (rule.minLength && value.length < rule.minLength) {
        fieldErrors.push(rule.message);
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        fieldErrors.push(rule.message);
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        fieldErrors.push(rule.message);
      }
      if (rule.custom && !rule.custom(value)) {
        fieldErrors.push(rule.message);
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return errors;
}

console.log("=== 연습 3 ===");
const loginSchema: FormSchema = {
  email: [
    { required: true, message: '이메일을 입력하세요' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '올바른 이메일 형식이 아닙니다' },
  ],
  password: [
    { required: true, message: '비밀번호를 입력하세요' },
    { minLength: 8, message: '비밀번호는 8자 이상이어야 합니다' },
  ],
};

// 에러 있는 경우
const errors1 = validate({ email: 'invalid', password: '123' }, loginSchema);
console.log("검증 실패:", errors1);

// 정상 입력
const errors2 = validate({ email: 'test@example.com', password: 'mypassword123' }, loginSchema);
console.log("검증 성공:", errors2); // {}

// 빈 입력
const errors3 = validate({ email: '', password: '' }, loginSchema);
console.log("빈 입력:", errors3);
