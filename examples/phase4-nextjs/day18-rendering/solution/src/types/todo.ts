// 할일 타입 정의 - 서버와 클라이언트 모두에서 공유
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}
