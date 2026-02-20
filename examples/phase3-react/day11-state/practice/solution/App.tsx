// Day 11 연습문제 정답 - useState, 이벤트

import { useState } from 'react';

// ============================================
// 문제 1: 장바구니
// ============================================
interface Product {
  id: number;
  name: string;
  price: number;
}

const productList: Product[] = [
  { id: 1, name: '노트북', price: 1200000 },
  { id: 2, name: '마우스', price: 35000 },
  { id: 3, name: '키보드', price: 89000 },
  { id: 4, name: '모니터', price: 350000 },
  { id: 5, name: '헤드셋', price: 65000 },
];

function ShoppingCart() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      {/* 상품 목록 */}
      <div>
        <h3>상품 목록</h3>
        {productList.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderBottom: '1px solid #eee',
              width: '300px',
            }}
          >
            <span>{product.name}</span>
            <span>{product.price.toLocaleString()}원</span>
            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              담기
            </button>
          </div>
        ))}
      </div>

      {/* 장바구니 */}
      <div>
        <h3>장바구니 ({cart.length}개)</h3>
        {cart.length === 0 ? (
          <p style={{ color: '#999' }}>장바구니가 비어있습니다</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderBottom: '1px solid #eee',
                  width: '300px',
                }}
              >
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()}원</span>
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              총 금액: {totalPrice.toLocaleString()}원
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// 문제 2: 가위바위보 게임
// ============================================
type Choice = '가위' | '바위' | '보';
type Result = '승리' | '패배' | '무승부' | null;

function RockPaperScissors() {
  const [myChoice, setMyChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [record, setRecord] = useState({ win: 0, lose: 0, draw: 0 });

  const choices: Choice[] = ['가위', '바위', '보'];
  const emojis: Record<Choice, string> = { 가위: '✌️', 바위: '✊', 보: '🖐️' };

  const judge = (my: Choice, computer: Choice): Result => {
    if (my === computer) return '무승부';
    if (
      (my === '가위' && computer === '보') ||
      (my === '바위' && computer === '가위') ||
      (my === '보' && computer === '바위')
    ) {
      return '승리';
    }
    return '패배';
  };

  const play = (my: Choice) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    const gameResult = judge(my, computer);

    setMyChoice(my);
    setComputerChoice(computer);
    setResult(gameResult);

    setRecord((prev) => ({
      win: prev.win + (gameResult === '승리' ? 1 : 0),
      lose: prev.lose + (gameResult === '패배' ? 1 : 0),
      draw: prev.draw + (gameResult === '무승부' ? 1 : 0),
    }));
  };

  const resetRecord = () => {
    setRecord({ win: 0, lose: 0, draw: 0 });
    setMyChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const getResultColor = (result: Result): string => {
    if (result === '승리') return '#27ae60';
    if (result === '패배') return '#e74c3c';
    return '#f39c12';
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            style={{
              fontSize: '24px',
              padding: '12px 24px',
              margin: '0 8px',
              cursor: 'pointer',
              border: '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
          >
            {emojis[choice]} {choice}
          </button>
        ))}
      </div>

      {result && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '20px',
            maxWidth: '400px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>나</p>
              <p style={{ fontSize: '40px', margin: 0 }}>{emojis[myChoice!]}</p>
              <p style={{ margin: '4px 0 0' }}>{myChoice}</p>
            </div>
            <div style={{ textAlign: 'center', alignSelf: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>VS</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>컴퓨터</p>
              <p style={{ fontSize: '40px', margin: 0 }}>{emojis[computerChoice!]}</p>
              <p style={{ margin: '4px 0 0' }}>{computerChoice}</p>
            </div>
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: getResultColor(result),
              margin: 0,
            }}
          >
            {result}!
          </p>
        </div>
      )}

      <div
        style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          maxWidth: '400px',
        }}
      >
        <h4 style={{ margin: '0 0 8px' }}>전적</h4>
        <p style={{ margin: '4px 0' }}>
          <span style={{ color: '#27ae60' }}>승: {record.win}</span> |{' '}
          <span style={{ color: '#e74c3c' }}>패: {record.lose}</span> |{' '}
          <span style={{ color: '#f39c12' }}>무: {record.draw}</span>
        </p>
        <button
          onClick={resetRecord}
          style={{
            marginTop: '8px',
            padding: '4px 12px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f8f9fa',
          }}
        >
          리셋
        </button>
      </div>
    </div>
  );
}

// ============================================
// 문제 3: 폼 유효성 검사
// ============================================
function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.length >= 2;
  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 6;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '300px',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '4px',
  };

  const validStyle: React.CSSProperties = {
    color: '#27ae60',
    fontSize: '13px',
    margin: '0 0 12px',
  };

  const invalidStyle: React.CSSProperties = {
    color: '#e74c3c',
    fontSize: '13px',
    margin: '0 0 12px',
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#d5f5e3',
          borderRadius: '8px',
          maxWidth: '350px',
        }}
      >
        <h3 style={{ margin: '0 0 8px', color: '#27ae60' }}>가입 완료!</h3>
        <p style={{ margin: 0 }}>환영합니다, {name}님!</p>
        <button
          onClick={() => {
            setName('');
            setEmail('');
            setPassword('');
            setSubmitted(false);
          }}
          style={{ marginTop: '12px', padding: '6px 16px', cursor: 'pointer' }}
        >
          다시 하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '350px' }}>
      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{
            ...inputStyle,
            borderColor: name.length > 0 ? (isNameValid ? '#27ae60' : '#e74c3c') : '#ddd',
          }}
        />
        {name.length > 0 && (
          <p style={isNameValid ? validStyle : invalidStyle}>
            {isNameValid ? '사용 가능한 이름입니다' : '이름은 2자 이상 입력해주세요'}
          </p>
        )}
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>이메일</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          style={{
            ...inputStyle,
            borderColor: email.length > 0 ? (isEmailValid ? '#27ae60' : '#e74c3c') : '#ddd',
          }}
        />
        {email.length > 0 && (
          <p style={isEmailValid ? validStyle : invalidStyle}>
            {isEmailValid ? '올바른 이메일 형식입니다' : '올바른 이메일 형식이 아닙니다 (@ 필요)'}
          </p>
        )}
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
          비밀번호
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          style={{
            ...inputStyle,
            borderColor:
              password.length > 0 ? (isPasswordValid ? '#27ae60' : '#e74c3c') : '#ddd',
          }}
        />
        {password.length > 0 && (
          <p style={isPasswordValid ? validStyle : invalidStyle}>
            {isPasswordValid
              ? '사용 가능한 비밀번호입니다'
              : `비밀번호는 6자 이상이어야 합니다 (현재 ${password.length}자)`}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        style={{
          marginTop: '16px',
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: isFormValid ? '#3498db' : '#bdc3c7',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
        }}
      >
        가입하기
      </button>
    </form>
  );
}

// ============================================
// 메인 App 컴포넌트
// ============================================
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 11 연습문제 정답</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 1: 장바구니</h2>
        <ShoppingCart />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 2: 가위바위보 게임</h2>
        <RockPaperScissors />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>문제 3: 폼 유효성 검사</h2>
        <SignupForm />
      </section>
    </div>
  );
}

export default App;
