// TODO: 인증 API 호출 함수
const API_URL = '/api';

// 로그인 API 호출
export async function login(email: string, password: string) {
  // TODO: fetch로 POST /api/auth/login 호출
  // const response = await fetch(`${API_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!response.ok) {
  //   const error = await response.json();
  //   throw new Error(error.error || '로그인에 실패했습니다');
  // }
  // return response.json();

  throw new Error('로그인 함수를 구현해주세요');
}

// 회원가입 API 호출
export async function register(
  username: string,
  email: string,
  password: string
) {
  // TODO: fetch로 POST /api/auth/register 호출
  // const response = await fetch(`${API_URL}/auth/register`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, email, password }),
  // });
  // if (!response.ok) {
  //   const error = await response.json();
  //   throw new Error(error.error || '회원가입에 실패했습니다');
  // }
  // return response.json();

  throw new Error('회원가입 함수를 구현해주세요');
}
