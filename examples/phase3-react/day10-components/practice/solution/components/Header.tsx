// 문제 1: Header 컴포넌트

interface HeaderProps {
  storeName: string;
  productCount: number;
}

function Header({ storeName, productCount }: HeaderProps) {
  return (
    <div
      style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <h2 style={{ margin: 0 }}>{storeName}</h2>
      <p style={{ margin: '8px 0 0', color: '#bdc3c7' }}>
        총 {productCount}개 상품
      </p>
    </div>
  );
}

export default Header;
