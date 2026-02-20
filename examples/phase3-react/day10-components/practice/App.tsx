// Day 10 연습문제 - 컴포넌트 분리, Props
// 아래 주석을 읽고 각 문제를 구현하세요.
// 컴포넌트를 별도 파일로 분리하거나, 이 파일 안에 모두 작성해도 됩니다.

// ============================================
// 문제 1: 상품 카탈로그
// ============================================
// Header 컴포넌트를 만드세요
// - Props: storeName(string), productCount(number)
// - 쇼핑몰 이름과 상품 개수를 표시

// ProductCard 컴포넌트를 만드세요
// - Props: name(string), price(number), imageUrl(string), description(string)
// - 카드 형태로 상품 정보를 표시

// ProductList 컴포넌트를 만드세요
// - Props: products 배열
// - ProductCard를 반복 렌더링

// Props 타입을 interface로 정의하세요

// ============================================
// 문제 2: 별점 컴포넌트
// ============================================
// Rating 컴포넌트를 만드세요
// - Props: score(number, 1~5)
// - 채워진 별(★)과 빈 별(☆)로 점수 표시
// - 별 색상: 금색(#f1c40f)

// ReviewCard 컴포넌트를 만드세요
// - Props: author(string), content(string), score(number)
// - Rating 컴포넌트를 내부에서 사용

// ============================================
// 문제 3: 가족 소개 페이지
// ============================================
// FamilyMember 컴포넌트를 만드세요
// - Props: name(string), relation(string), age(number), message(string)
// - 관계에 따라 다른 배경색 적용

// FamilyList 컴포넌트를 만드세요
// - Props: members 배열
// - FamilyMember를 반복 렌더링
// - 상단에 가족 수 표시

// Props 타입을 interface로 정의하세요

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Day 10 연습문제</h1>

      {/* 문제 1: 상품 카탈로그 */}
      <section>
        <h2>문제 1: 상품 카탈로그</h2>
        {/* Header와 ProductList 컴포넌트를 사용하세요 */}
      </section>

      {/* 문제 2: 별점 컴포넌트 */}
      <section>
        <h2>문제 2: 별점 컴포넌트</h2>
        {/* ReviewCard 컴포넌트를 사용하세요 */}
      </section>

      {/* 문제 3: 가족 소개 페이지 */}
      <section>
        <h2>문제 3: 가족 소개 페이지</h2>
        {/* FamilyList 컴포넌트를 사용하세요 */}
      </section>
    </div>
  );
}

export default App;
