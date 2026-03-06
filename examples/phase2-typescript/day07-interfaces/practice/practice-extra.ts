// ============================================
// Day 07 - 인터페이스 & 유틸리티 타입 연습문제
// ============================================

// --- 연습 1: 게시판 타입 설계 ---
// 아래 인터페이스를 완성하세요

// TODO: BaseEntity (id, createdAt, updatedAt)
// TODO: User extends BaseEntity (name, email, role: 'admin' | 'user')
// TODO: Post extends BaseEntity (title, content, authorId, tags, status: 'draft' | 'published')
// TODO: Comment extends BaseEntity (content, postId, authorId)

// TODO: CreatePostInput - Post에서 id, createdAt, updatedAt 제외 (Omit 사용)
// TODO: UpdatePostInput - CreatePostInput의 모든 필드를 선택적으로 (Partial 사용)
// TODO: PostSummary - Post에서 id, title, status, createdAt만 (Pick 사용)


// --- 연습 2: 제네릭 CRUD 인터페이스 ---
// TODO: Repository<T> 인터페이스 정의
// - findAll(): T[]
// - findById(id: number): T | undefined
// - create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T
// - update(id: number, data: Partial<T>): T | undefined
// - delete(id: number): boolean

// TODO: InMemoryRepository<T extends BaseEntity> 클래스로 구현


// --- 연습 3: 폼 검증 타입 ---
// TODO: ValidationRule 인터페이스
// - required?: boolean
// - minLength?: number
// - maxLength?: number
// - pattern?: RegExp
// - custom?: (value: string) => boolean
// - message: string

// TODO: FormSchema = Record<string, ValidationRule[]>

// TODO: validate 함수 구현
// function validate(data: Record<string, string>, schema: FormSchema): Record<string, string[]>
// 검증 실패한 필드별 에러 메시지 배열을 반환

// 테스트용 스키마:
// const loginSchema: FormSchema = {
//   email: [
//     { required: true, message: '이메일을 입력하세요' },
//     { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '올바른 이메일 형식이 아닙니다' },
//   ],
//   password: [
//     { required: true, message: '비밀번호를 입력하세요' },
//     { minLength: 8, message: '비밀번호는 8자 이상이어야 합니다' },
//   ],
// };
